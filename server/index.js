import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

// SQLite setup
const db = new Database('ttt.sqlite');
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);
CREATE TABLE IF NOT EXISTS matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_x_id INTEGER NOT NULL,
  player_o_id INTEGER NOT NULL,
  winner TEXT CHECK(winner IN ('X','O','draw')) NOT NULL,
  board_size INTEGER NOT NULL,
  win_condition INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_x_id) REFERENCES players(id),
  FOREIGN KEY(player_o_id) REFERENCES players(id)
);
`);

const upsertPlayer = db.prepare(`INSERT OR IGNORE INTO players(name) VALUES (?)`);
const getPlayer = db.prepare(`SELECT id FROM players WHERE name = ?`);
const insertMatch = db.prepare(`
  INSERT INTO matches(player_x_id, player_o_id, winner, board_size, win_condition)
  VALUES (?, ?, ?, ?, ?)
`);

// Save a result
app.post('/api/results', (req, res) => {
  const { playerX, playerO, winner, boardSize, winCondition } = req.body;
  if (!playerX || !playerO || !winner || !boardSize || !winCondition) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const tx = db.transaction(() => {
    upsertPlayer.run(playerX);
    upsertPlayer.run(playerO);
    const x = getPlayer.get(playerX);
    const o = getPlayer.get(playerO);
    insertMatch.run(x.id, o.id, winner, boardSize, winCondition);
  });
  try {
    tx();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Get stats per player
app.get('/api/stats', (req, res) => {
  const rows = db.prepare(`
    WITH totals AS (
      SELECT p.name as name,
             SUM(CASE WHEN m.winner = 'X' AND m.player_x_id = p.id THEN 1 ELSE 0 END) as wins,
             SUM(CASE WHEN m.winner = 'O' AND m.player_o_id = p.id THEN 1 ELSE 0 END) as wins_o,
             SUM(CASE WHEN (m.winner = 'X' AND m.player_o_id = p.id) OR (m.winner = 'O' AND m.player_x_id = p.id) THEN 1 ELSE 0 END) as losses,
             SUM(CASE WHEN m.winner = 'draw' AND (m.player_x_id = p.id OR m.player_o_id = p.id) THEN 1 ELSE 0 END) as draws
      FROM players p
      LEFT JOIN matches m ON m.player_x_id = p.id OR m.player_o_id = p.id
      GROUP BY p.id
    )
    SELECT name, (wins + wins_o) as wins, losses, draws FROM totals ORDER BY (wins + wins_o) DESC, name
  `).all();
  res.json(rows);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));



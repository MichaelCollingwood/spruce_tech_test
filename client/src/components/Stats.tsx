import React, { useEffect, useState } from "react";

type Row = { name: string; wins: number; losses: number; draws: number };

export default function Stats() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/stats")
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setRows([]));
  }, []);

  if (!rows.length) return null;

  return (
    <div className="grid grid-cols-5 gap-2 text-sm mx-auto">
      <div className="font-medium"></div>
      <div className="font-medium">Wins</div>
      <div className="font-medium">Losses</div>
      <div className="font-medium">Draws</div>
      <div className="font-medium">W/L %</div>
      {rows.map((r) => (
        <React.Fragment key={r.name}>
          <div>{r.name}</div>
          <div>{r.wins}</div>
          <div>{r.losses}</div>
          <div>{r.draws}</div>
          <div>
            {r.wins + r.losses > 0
              ? Math.round((r.wins / (r.wins + r.losses)) * 100) + "%"
              : "-"}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

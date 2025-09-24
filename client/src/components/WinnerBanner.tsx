import React, { useContext, useEffect, useRef } from "react";
import { GameConfigContext, Result } from "../context/GameConfigContext";
import { useController } from "../hooks/useController";

export default function WinnerBanner() {
  const {
    resultState: [result, setResult],
    playersState: [players],
  } = useContext(GameConfigContext)!;
  const { reset } = useController();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bannerRef.current &&
        !bannerRef.current.contains(event.target as Node)
      ) {
        setResult(undefined);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [result, setResult]);

  if (!result) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        ref={bannerRef}
        className="animate-bounce-slow bg-white/95 border-2 border-green-700 shadow-2xl rounded-full px-6 py-3 flex items-center gap-3 pointer-events-auto"
      >
        <span className="text-2xl">🎉</span>
        <p className="font-semibold text-green-900 text-lg">
          {getMessage(result, players)}
        </p>
        <span className="text-2xl">🎉</span>
        <button
          className="ml-2 px-3 py-1 text-sm rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition-colors"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function getMessage(
  result: Result,
  players: [string | undefined, string | undefined],
) {
  switch (result) {
    case "win":
      return `${players[0] ?? "X"} won!`;
    case "lose":
      return `${players[1] ?? "O"} won!`;
    case "draw":
      return "Draw 😐";
  }
}

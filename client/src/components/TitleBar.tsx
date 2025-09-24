import React, { useEffect, useRef, useState } from "react";
import Settings from "./Settings";
import { useController } from "../hooks/useController";

export default function TitleBar() {
  const { reset } = useController();
  const [isSettingsPopoverOpen, setIsSettingsPopoverOpen] =
    useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSettingsPopoverOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsSettingsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSettingsPopoverOpen]);

  return (
    <div className="w-full p-4 relative">
      <div className="grid grid-cols-3 text-2xl gap-2 text-center">
        <h1 className="col-start-2 text-green-800">Tic Tac Toe</h1>
        <div
          className="inline-flex gap-2 justify-end relative flex-wrap"
          ref={popoverRef}
        >
          <button
            className="px-3 py-1 text-sm rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition-colors"
            onClick={() => setIsSettingsPopoverOpen((isOpen) => !isOpen)}
          >
            Settings
          </button>
          <button
            className="px-3 py-1 text-sm rounded-full border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition-colors"
            onClick={reset}
          >
            Reset
          </button>
          {isSettingsPopoverOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg z-50">
              <Settings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

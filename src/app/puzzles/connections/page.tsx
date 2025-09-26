"use client";
import React, { useEffect, useMemo, useState } from "react";
import "@/styles/globals.css";
import Navigation from "@/components/nav";

type Tile = { id: string; text: string; groupId: string };
type Group = { id: string; title: string; color: string };
type Puzzle = { groups: Group[]; tiles: Tile[] };

const SAMPLE_PUZZLE: Puzzle = {
  groups: [
    { id: "g1", title: "BOYS ____", color: "bg-yellow-200" },
    { id: "g2", title: "AP-", color: "bg-green-200" },
    { id: "g3", title: "FIRST SYLLABLES OF FACULTY", color: "bg-blue-200" },
    { id: "g4", title: "DI-", color: "bg-purple-200" },
  ],
  tiles: [
    { id: "1", text: "BATHROOM", groupId: "g1" },
    { id: "2", text: "STATE", groupId: "g1" },
    { id: "3", text: "SWIMMING", groupId: "g1" },
    { id: "4", text: "BASKETBALL", groupId: "g1" },
    { id: "5", text: "USH", groupId: "g2" },
    { id: "6", text: "ES", groupId: "g2" },
    { id: "7", text: "ART", groupId: "g2" },
    { id: "8", text: "PLY", groupId: "g2" },
    { id: "9", text: "CAT", groupId: "g3" },
    { id: "10", text: "BROW", groupId: "g3" },
    { id: "11", text: "SIR", groupId: "g3" },
    { id: "12", text: "RAIN", groupId: "g3" },
    { id: "13", text: "POLE", groupId: "g4" },
    { id: "14", text: "OXIDE", groupId: "g4" },
    { id: "15", text: "PAOLA", groupId: "g4" },
    { id: "16", text: "ROMA", groupId: "g4" },
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function toShareGrid(solvedOrder: string[]): string {
  const map: Record<string, string> = {
    g1: "🟨",
    g2: "🟩",
    g3: "🟦",
    g4: "🟪",
  };
  const rows = chunk(solvedOrder, 4);
  return rows.map((r) => r.map((gid) => map[gid]).join("")).join("\n");
}

export default function ConnectionsGame({
  puzzle = SAMPLE_PUZZLE,
  title = "Week of October 29th",
  allowHints = false,
}: {
  puzzle?: Puzzle;
  title?: string;
  allowHints?: boolean;
}) {
  const [tiles, setTiles] = useState<Tile[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [lockedGroups, setLockedGroups] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[][]>([]);
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    setTiles(shuffle(puzzle.tiles));
  }, [puzzle.tiles]);

  const solvedOrder = useMemo(() => {
    if (!tiles) return [] as string[];
    const order: string[] = [];
    tiles.forEach((t) => order.push(t.groupId));
    return order;
  }, [tiles]);

  const remainingGroups = useMemo(() => {
    return puzzle.groups.filter((g) => !lockedGroups.includes(g.id));
  }, [puzzle.groups, lockedGroups]);

  function lockedTileIds(): Set<string> {
    const ids = new Set<string>();
    if (!tiles) return ids;
    tiles.forEach((t) => {
      if (lockedGroups.includes(t.groupId)) ids.add(t.id);
    });
    return ids;
  }

  function toggle(id: string) {
    if (won || !tiles) return;
    if (lockedTileIds().has(id)) return;
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  }

  function submitGuess() {
    if (!tiles || selected.length !== 4) return;
    const selTiles = tiles.filter((t) => selected.includes(t.id));
    const groupId = selTiles[0].groupId;
    const isAllSame = selTiles.every((t) => t.groupId === groupId);

    if (isAllSame) {
      setLockedGroups((prev) => [...prev, groupId]);
      setMessage("Correct! Group locked.");
      setTiles((prev) => {
        if (!prev) return prev;
        const correct = prev.filter((t) => selected.includes(t.id));
        const rest = prev.filter((t) => !selected.includes(t.id));
        return [...correct, ...rest];
      });
      setSelected([]);
    } else {
      setMistakes((m) => m + 1);
      setMessage("Not quite. Try again.");
      setHistory((h) => [...h, selected]);
    }
  }

  function shuffleTiles() {
    if (!tiles) return;
    setTiles((prev) => {
      if (!prev) return prev;
      const locked = prev.filter((t) => lockedGroups.includes(t.groupId));
      const free = prev.filter((t) => !lockedGroups.includes(t.groupId));
      return [...locked, ...shuffle(free)];
    });
    setMessage("Shuffled remaining tiles.");
  }

  function hint() {
    if (!allowHints || !tiles) return;
    const free = tiles.filter((t) => !lockedGroups.includes(t.groupId));
    for (const g of remainingGroups) {
      const candidates = free.filter((t) => t.groupId === g.id);
      if (candidates.length >= 2) {
        const ids = candidates.slice(0, 2).map((t) => t.id);
        setSelected(ids);
        setMessage("Hint: these two belong together.");
        return;
      }
    }
  }

  function deselectAll() {
    setSelected([]);
    setMessage(null);
  }

  function undo() {
    const last = history[history.length - 1];
    if (!last) return;
    setSelected(last);
    setHistory((h) => h.slice(0, -1));
  }

  useEffect(() => {
    if (lockedGroups.length === 4) {
      setWon(true);
      setMessage("You solved it! 🎉");
    }
  }, [lockedGroups]);

  function reset() {
    setTiles(shuffle(puzzle.tiles));
    setSelected([]);
    setLockedGroups([]);
    setMistakes(0);
    setMessage(null);
    setWon(false);
    setHistory([]);
  }

 
  return (
    <>
      <Navigation></Navigation>
      <div className="bg-blue-50">
        <div className="border-blue-300 border-b">
          <div className=" ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-14 pb-8 border-blue-300 border-l border-r ">
            <div className="p-10">
              <span className="font-medium text-4xl inline-block">
                Puzzles
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#1d4ed8"
                className="inline-block ml-2 mb-2"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>{" "}
              <span className="font-medium text-7xl block">Connections</span>
            </div>
          </div>
        </div>

        <div className="ml-[20%] mr-[20%] p-14 border-blue-300 border-l border-r bg-white">
          <header className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl tracking-tight">{title}</h1>
            <div className="text-sm text-gray-400">Mistakes: {mistakes}</div>
          </header>

          <div className="grid grid-cols-4 gap-2">
            {tiles
              ? tiles.map((t) => {
                  const isLocked = lockedGroups.includes(t.groupId);
                  const isSelected = selected.includes(t.id);
                  const base = isLocked
                    ? puzzle.groups.find((g) => g.id === t.groupId)?.color ||
                      "bg-gray-200"
                    : " hover:scale-110 bg-blue-50";
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggle(t.id)}
                      className={`select-none  border border-blue-300 p-4 text-center tracking-tight shadow-sm transition text-blue-700 ${base} ${
                        isSelected ? "ring-4 ring-black/30" : ""
                      } ${isLocked ? "cursor-default" : ""}`}
                    >
                      {t.text}
                    </button>
                  );
                })
              : Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16  border border-gray-200 bg-gray-100 animate-pulse"
                  />
                ))}
          </div>

          <div className="my-4 space-y-2">
            {puzzle.groups.map((g) =>
              lockedGroups.includes(g.id) ? (
                <div key={g.id} className={` ${g.color} p-3 font-medium`}>
                  {g.title}
                </div>
              ) : null
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={submitGuess}
              disabled={selected.length !== 4 || won}
              className=" border-blue-300   bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit
            </button>
            <button
              onClick={shuffleTiles}
              disabled={won}
              className=" border-blue-300 border px-4 py-2 "
            >
              Shuffle
            </button>
            <button
              onClick={deselectAll}
              className=" border-blue-300 border px-4 py-2 "
            >
              Deselect
            </button>
            {allowHints && (
              <button
                onClick={hint}
                disabled={won}
                className=" border-blue-300  border px-4 py-2 "
              >
                Hint
              </button>
            )}
            <button
              onClick={undo}
              className=" border-blue-300 border px-4 py-2 "
            >
              Undo
            </button>
            
            <button
              onClick={reset}
              className=" border-blue-300 border px-4 py-2 "
            >
              New Game
            </button>
          </div>

          {message && (
            <div className="mt-3  bg-gray-50 p-3 text-sm text-gray-800 shadow-inner">
              {message}
            </div>
          )}

          <p className="mt-6 text-sm text-gray-400">
            Select four tiles that share a common category. Lock all four
            categories to win.
          </p>
        </div>
      </div>
    </>
  );
}

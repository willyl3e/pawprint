"use client";

import "@/styles/globals.css";
import Navigation from "@/components/nav";
import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Inline WordEntryGame (tracks mistakes) ---
function WordEntryGame({
  answer,
  clue,
  title = "Deskguesser",
  maxMistakes = 5,
  caseInsensitive = true,
  submitOnEnter = true,
  enableHint = false,
}: {
  answer: string;
  clue?: string;
  title?: string;
  maxMistakes?: number;
  caseInsensitive?: boolean;
  submitOnEnter?: boolean;
  enableHint?: boolean;
}) {
  const [value, setValue] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "correct" | "incorrect" | "failed"
  >("idle");
  const [hint, setHint] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedAnswer = useMemo(
    () => (caseInsensitive ? answer.trim().toLowerCase() : answer.trim()),
    [answer, caseInsensitive]
  );

  const isOutOfTries =
    typeof maxMistakes === "number" && mistakes >= maxMistakes;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function normalize(s: string) {
    return caseInsensitive ? s.trim().toLowerCase() : s.trim();
  }

  function submit() {
    if (status === "correct" || status === "failed") return;
    const guess = normalize(value);
    if (!guess) return;

    if (guess === normalizedAnswer) {
      setStatus("correct");
    } else {
      setMistakes((m) => m + 1);
      setStatus("incorrect");
    }
  }

  useEffect(() => {
    if (status === "incorrect" && isOutOfTries) setStatus("failed");
  }, [status, isOutOfTries]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (submitOnEnter && e.key === "Enter") submit();
  }

  function revealHint() {
    if (!enableHint) return;
    if (mistakes >= 4 && normalizedAnswer.length > 1) {
      setHint(`Ends with: ${normalizedAnswer.at(-1)?.toUpperCase()}`);
    } else if (mistakes >= 2) {
      setHint(`Starts with: ${normalizedAnswer[0]?.toUpperCase()}`);
    } else {
      setHint("Make a couple of attempts to unlock hints.");
    }
  }

  function reset() {
    setValue("");
    setMistakes(0);
    setHint(null);
    setStatus("idle");
    inputRef.current?.focus();
  }

  const canSubmit =
    value.trim().length > 0 && status !== "correct" && status !== "failed";

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-3xl tracking-tighter">{title}</h2>
        <p className=" text-gray-500 tracking-tighter text-xl mt-1">
          Mistakes: {mistakes}
          {typeof maxMistakes === "number" ? ` / ${maxMistakes}` : ""}
        </p>
      </header>

      <span className="text-2xl tracking-tighter block mb-4 mt-2">Who&aspos;s desk is this?</span>

      <img className="w-64 mb-5" src="https://theartofeducation.edu/wp-content/uploads/2020/08/IMG_2116.jpg"></img>



      {clue && (
        <div className="mb-4 bg-gray-50 p-3 text-sm text-gray-700">
          <span className="font-medium">Clue:</span> {clue}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          className="w-full border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/30"
          placeholder="Type your answer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={status === "correct" || status === "failed"}
        />
        <button
          onClick={submit}
          disabled={!canSubmit}
          className=" bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit
        </button>
      </div>

      <div className="mt-3 min-h-[2rem] text-sm">
        {status === "correct" && (
          <div className="rounded-xl bg-green-100 p-3 text-green-900">
            ✅ Correct!
          </div>
        )}
        {status === "incorrect" && (
          <div className="rounded-xl bg-yellow-100 p-3 text-yellow-900">
            Not quite. Try again.
          </div>
        )}
        {status === "failed" && (
          <div className="rounded-xl bg-red-100 p-3 text-red-900">
            Out of tries. The answer was{" "}
            <span className="font-semibold">{answer}</span>.
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {enableHint && (
          <button onClick={revealHint} className="rounded-xl border px-3 py-2">
            Hint
          </button>
        )}
        <button onClick={reset} className="border px-3 py-2">
          Reset
        </button>
      </div>

      {hint && (
        <div className="mt-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-800 shadow-inner">
          {hint}
        </div>
      )}
    </div>
  );
}

// --- Your Page with the game inserted ---
export default function Page() {
  return (
    <>
      <Navigation />
      <div className="bg-blue-50">
        <div className="ml-[20%] mr-[20%] tracking-tighter text-blue-700 pt-[5%] border-blue-300 border-b border-l border-r pb-14 pl-10 pr-10">
          <span className="font-medium text-4xl">
            The Seymour Pawprint
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
            Puzzles
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
          </span>
          <span className="font-medium text-7xl block">Deskguesser</span>
        </div>

        <div className="ml-[20%] mr-[20%] pb-16 bg-white border-blue-300 border-l border-r p-14">
          <WordEntryGame
            title="Week of October 29th"
            answer="library"
            maxMistakes={5}
          />
        </div>
      </div>
    </>
  );
}

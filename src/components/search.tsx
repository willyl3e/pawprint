'use client';

import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const submitSearch = async () => {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <span>Search for articles:</span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter keyword"
        className="border p-2"
      />
      <button onClick={submitSearch} className="ml-2 bg-blue-500 text-white px-4 py-2">
        Search
      </button>

      <div className="mt-4">
        {results.map((result, idx) => (
          <div key={idx} className="p-2 border-b">
            {result.title || result.name || JSON.stringify(result)}
          </div>
        ))}
      </div>
    </div>
  );
}

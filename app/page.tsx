'use client';

import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [premise, setPremise] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlot = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://your-backend.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, premise }),
      });
      const data = await res.json();
      setOutput(data.result || data.error);
    } catch {
      setOutput('Error: Could not connect to backend.');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Plot Generator</h1>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Genre (e.g., Fantasy)"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        rows={4}
        placeholder="Your story premise..."
        value={premise}
        onChange={(e) => setPremise(e.target.value)}
      />
      <button
        onClick={generatePlot}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Plot'}
      </button>
      {output && (
        <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {output}
        </div>
      )}
    </main>
  );
}

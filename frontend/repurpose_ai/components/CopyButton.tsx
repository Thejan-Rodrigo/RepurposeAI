'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition flex items-center gap-1.5"
    >
      {copied ? (
        <span className="text-green-600 font-semibold">✓ Copied!</span>
      ) : (
        <span>📋 Copy Text</span>
      )}
    </button>
  );
}
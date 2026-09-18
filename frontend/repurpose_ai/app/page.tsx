'use client';

import { useState } from 'react';
import UrlForm from '@/components/UrlForm';
import LoadingState from '@/components/LoadingState';
import { SocialAssets } from '@/types';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<SocialAssets | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const res = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate assets. Check your URL.');
      }

      const result = await res.json();
      setAssets(result.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">RepurposeAI</h1>
          <p className="text-gray-600">Turn long videos or blogs into social media posts instantly.</p>
        </div>

        <UrlForm onSubmit={handleGenerate} isLoading={loading} />

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {loading && <LoadingState />}

        {assets && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Assets Generated Successfully!</h2>
            <pre className="bg-gray-50 p-4 rounded text-xs overflow-x-auto text-gray-800">
              {JSON.stringify(assets, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
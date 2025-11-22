'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';

interface LinkStats {
  id: number;
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string;
  created_at: string;
}

export default function StatsPage() {
  const params = useParams();
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/links');
        const links = await response.json();
        const link = links.find((l: any) => l.code === params.code);
        setStats(link || null);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.code) {
      fetchStats();
    }
  }, [params.code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-8">Loading statistics...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h2>
          <p className="text-gray-600">The requested short link does not exist.</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Statistics for <span className="text-blue-600">{stats.code}</span>
          </h1>
          <p className="text-gray-600 mb-6">Track your link performance</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Short URL</h3>
              <p className="mt-2 font-mono text-blue-600">
                {typeof window !== 'undefined' && `${window.location.origin}/${stats.code}`}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Target URL</h3>
              <p className="mt-2 text-gray-600 break-all">{stats.target_url}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Total Clicks</h3>
              <p className="mt-2 text-3xl font-bold text-blue-600">{stats.clicks}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Last Clicked</h3>
              <p className="mt-2 text-gray-600">
                {stats.last_clicked 
                  ? new Date(stats.last_clicked).toLocaleString()
                  : 'Never clicked'
                }
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Created</h3>
              <p className="mt-2 text-gray-600">
                {new Date(stats.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <a 
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ← Back to Dashboard
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/${stats.code}`)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Copy Short URL
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
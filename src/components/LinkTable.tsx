'use client';
import { useState, useEffect } from 'react';

interface Link {
  id: number;
  code: string;
  target_url: string;
  clicks: number;
  last_clicked: string;
  created_at: string;
}

export default function LinkTable({ refreshKey }: { refreshKey: number }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [refreshKey]);

  const handleDelete = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      setLinks(prev => prev.filter(link => link.code !== code));
    } catch (error) {
      console.error('Failed to delete link:', error);
    }
  };

  const copyToClipboard = (code: string) => {
    const url = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(url);
    alert('✅ Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-semibold">Loading your links...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            📊 Your Links
            <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {links.length} total
            </span>
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        {links.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No links yet</h3>
            <p className="text-gray-500">Create your first short link to get started!</p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            <div className="md:hidden">
              {links.map((link) => (
                <div key={link.id} className="border-b border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {link.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(link.code)}
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Copy"
                      >
                        📋
                      </button>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3 truncate" title={link.target_url}>
                    {link.target_url}
                  </div>
                  <div className="flex space-x-3">
                    <a 
                      href={`/code/${link.code}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      📊 Stats
                    </a>
                    <button
                      onClick={() => handleDelete(link.code)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <table className="min-w-full divide-y divide-gray-200 hidden md:table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Short Code
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Target URL
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded-lg border border-blue-200">
                          {link.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(link.code)}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-100 rounded-lg"
                          title="Copy to clipboard"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="max-w-md truncate text-sm text-gray-600 font-medium" title={link.target_url}>
                        {link.target_url}
                      </div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        👆 {link.clicks} clicks
                      </span>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap space-x-2">
                      <a 
                        href={`/code/${link.code}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        📊 Stats
                      </a>
                      <button
                        onClick={() => handleDelete(link.code)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import LinkForm from '@/components/LinkForm';
import LinkTable from '@/components/LinkTable';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLinkCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            URL Shortener
          </h1>
          <p className="text-gray-600 mt-3 text-lg">Create short links and track their performance</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-1">
            <LinkForm onLinkCreated={handleLinkCreated} />
          </div>
          <div className="xl:col-span-3">
            <LinkTable key={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
}
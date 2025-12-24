'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Click {
  click_x: number;
  click_y: number;
  timestamp: string;
}

export default function HeatmapPage() {
  const [pageUrl, setPageUrl] = useState('');
  const [clicks, setClicks] = useState<Click[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageUrls, setPageUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchPageUrls();
  }, []);

  const fetchPageUrls = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      setPageUrls(data);
    } catch (error) {
      console.error('Failed to fetch page URLs:', error);
    }
  };

  const handleFetchClicks = async () => {
    if (!pageUrl) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/clicks?pageUrl=${encodeURIComponent(pageUrl)}`);
      const data = await res.json();
      setClicks(data);
    } catch (error) {
      console.error('Failed to fetch clicks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <nav style={{ marginBottom: '30px' }}>
        <Link href="/" style={{ marginRight: '20px', textDecoration: 'underline' }}>Sessions</Link>
        <Link href="/heatmap" style={{ textDecoration: 'underline' }}>Heatmap</Link>
      </nav>

      <h1 style={{ marginBottom: '20px' }}>Click Heatmap</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Page URL:
          <select 
            value={pageUrl} 
            onChange={(e) => setPageUrl(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', minWidth: '400px' }}
          >
            <option value="">Select a page URL</option>
            {pageUrls.map(url => (
              <option key={url} value={url}>{url}</option>
            ))}
          </select>
        </label>
        <button 
          onClick={handleFetchClicks} 
          disabled={!pageUrl || loading}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          {loading ? 'Loading...' : 'Show Heatmap'}
        </button>
      </div>

      {clicks.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '10px' }}>{clicks.length} clicks on this page</h2>
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '600px', 
              border: '2px solid #ccc',
              backgroundColor: '#f5f5f5',
              overflow: 'hidden'
            }}
          >
            {clicks.map((click, index) => {
              const maxX = Math.max(...clicks.map(c => c.click_x), 1920);
              const maxY = Math.max(...clicks.map(c => c.click_y), 1080);
              
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `${(click.click_x / maxX) * 100}%`,
                    top: `${(click.click_y / maxY) * 100}%`,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


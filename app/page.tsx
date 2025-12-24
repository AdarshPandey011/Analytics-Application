'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Session {
  session_id: string;
  event_count: number;
  first_event: string;
  last_event: string;
}

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/sessions');
      const data = await res.json();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>CausalFunnel Analytics Dashboard</h1>
      
      <nav style={{ marginBottom: '30px' }}>
        <Link href="/" style={{ marginRight: '20px', textDecoration: 'underline' }}>Sessions</Link>
        <Link href="/heatmap" style={{ textDecoration: 'underline' }}>Heatmap</Link>
      </nav>

      <div>
        <h2 style={{ marginBottom: '20px' }}>Sessions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : sessions.length === 0 ? (
          <p>No sessions found. Visit the demo page to generate events.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Session ID</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Event Count</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>First Event</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Last Event</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.session_id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{session.session_id}</td>
                  <td style={{ padding: '10px' }}>{session.event_count}</td>
                  <td style={{ padding: '10px' }}>{new Date(session.first_event).toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>{new Date(session.last_event).toLocaleString()}</td>
                  <td style={{ padding: '10px' }}>
                    <Link href={`/session/${session.session_id}`} style={{ color: 'blue' }}>
                      View Events
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


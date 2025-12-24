'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Event {
  _id: string;
  session_id: string;
  event_type: string;
  page_url: string;
  timestamp: string;
  click_x?: number;
  click_y?: number;
}

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [sessionId]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ marginBottom: '20px', display: 'inline-block', color: 'blue' }}>
        ← Back to Sessions
      </Link>
      
      <h1 style={{ marginBottom: '20px' }}>Session: {sessionId}</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found for this session.</p>
      ) : (
        <div>
          <h2 style={{ marginBottom: '20px' }}>User Journey ({events.length} events)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {events.map((event, index) => (
              <div 
                key={event._id} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '15px', 
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong>#{index + 1} - {event.event_type}</strong>
                  <span style={{ color: '#666' }}>{new Date(event.timestamp).toLocaleString()}</span>
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>URL: {event.page_url}</div>
                {event.click_x !== undefined && event.click_y !== undefined && (
                  <div style={{ color: '#666', fontSize: '14px' }}>
                    Click position: ({event.click_x}, {event.click_y})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


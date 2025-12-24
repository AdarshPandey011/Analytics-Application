import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('casualfunnel');
    const sessions = await db.collection('events').aggregate([
      {
        $group: {
          _id: '$session_id',
          event_count: { $sum: 1 },
          first_event: { $min: '$timestamp' },
          last_event: { $max: '$timestamp' }
        }
      },
      {
        $project: {
          session_id: '$_id',
          event_count: 1,
          first_event: 1,
          last_event: 1,
          _id: 0
        }
      },
      {
        $sort: { first_event: -1 }
      }
    ]).toArray();
    
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}


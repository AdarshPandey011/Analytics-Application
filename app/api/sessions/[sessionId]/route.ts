import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const client = await clientPromise;
    const db = client.db('casualfunnel');
    const events = await db.collection('events')
      .find({ session_id: sessionId })
      .sort({ timestamp: 1 })
      .toArray();
    
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session events' }, { status: 500 });
  }
}


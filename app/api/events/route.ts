import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    const client = await clientPromise;
    const db = client.db('casualfunnel');
    await db.collection('events').insertOne(event);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to store event' }, { status: 500 });
  }
}


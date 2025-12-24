import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('casualfunnel');
    const pages = await db.collection('events').distinct('page_url');
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageUrl = searchParams.get('pageUrl');
    
    if (!pageUrl) {
      return NextResponse.json({ error: 'pageUrl parameter required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('casualfunnel');
    const clicks = await db.collection('events')
      .find({ 
        event_type: 'click',
        page_url: pageUrl 
      })
      .project({ click_x: 1, click_y: 1, timestamp: 1, _id: 0 })
      .toArray();
    
    return NextResponse.json(clicks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clicks' }, { status: 500 });
  }
}


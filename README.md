# CausalFunnel Analytics Application

Simple user analytics application that tracks user interactions and displays them in a dashboard.

## Tech Stack

- **Frontend**: Next.js 14 (React)
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a `.env.local` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/casualfunnel
```
   - For MongoDB Atlas, use your connection string

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) for the dashboard
5. Open [http://localhost:3000/demo](http://localhost:3000/demo) to test event tracking

## Features

- **Event Tracking**: Tracks page views and clicks with session ID, timestamp, and coordinates
- **Sessions View**: Lists all sessions with event counts
- **Session Details**: View all events for a specific session (user journey)
- **Heatmap View**: Visualize click positions on a page

## Project Structure

- `public/tracker.js` - Client-side tracking script
- `app/api/events` - API to receive and store events
- `app/api/sessions` - API to fetch sessions list
- `app/api/sessions/[sessionId]` - API to fetch events for a session
- `app/api/clicks` - API to fetch click data for heatmap
- `app/page.tsx` - Sessions dashboard
- `app/session/[sessionId]/page.tsx` - Session details page
- `app/heatmap/page.tsx` - Heatmap visualization
- `app/demo/page.tsx` - Demo page for testing


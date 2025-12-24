# CausalFunnel Analytics Application

User analytics application that tracks page views and clicks, displaying them in a dashboard.

## Tech Stack

- Next.js 14 (React)
- Node.js API Routes
- MongoDB

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
MONGODB_URI=your_mongodb_connection_string
```

3. Run development server:
```bash
npm run dev
```

4. Visit `http://localhost:3000` for dashboard
5. Visit `http://localhost:3000/demo` to test tracking

## Features

- Track page views and clicks with session ID, timestamp, and coordinates
- View all sessions with event counts
- View user journey for each session
- Visualize click positions on heatmap

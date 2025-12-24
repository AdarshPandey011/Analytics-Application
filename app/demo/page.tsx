import Script from 'next/script';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Demo Page for Event Tracking</h1>
      <p>Click anywhere on this page to generate click events. Page view events are tracked automatically.</p>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Interactive Section</h2>
        <button style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}>
          Button 1
        </button>
        <button style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}>
          Button 2
        </button>
        <button style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}>
          Button 3
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h2>Another Section</h2>
        <p>This is another section where you can click to generate more events.</p>
        <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Dashboard</Link>
      </div>

      <Script src="/tracker.js" strategy="afterInteractive" />
    </div>
  );
}


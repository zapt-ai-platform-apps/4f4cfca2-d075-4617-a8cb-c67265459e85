import '../styles/globals.css';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: process.env.NEXT_PUBLIC_APP_ID
    }
  }
});

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (!window.location.hostname.includes('vercel.app')) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://cloud.umami.is/script.js';
      script.setAttribute('data-website-id', process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <footer className="fixed bottom-0 w-full text-center p-2 bg-gray-800 text-white">
        Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="underline">ZAPT</a>
      </footer>
    </>
  )
}

export default MyApp;
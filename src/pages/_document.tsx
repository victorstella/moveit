import Document, { Html, Head, Main, NextScript } from 'next/document';

const SITE_URL = 'https://moveit-pomodoro.vercel.app';
const TITLE = 'Move.it — Gamified Pomodoro with Physical Challenges';
const DESCRIPTION =
  'Take short physical breaks during focus sessions. Every 25-minute Pomodoro triggers a random body or eye exercise. Earn XP, level up, and stay healthy while you work or study.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Move.it',
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Pomodoro timer',
    'Random physical challenges',
    'XP and leveling system',
    'Avatar generation',
    'No account required',
  ],
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Basic */}
          <meta charSet="utf-8" />
          <meta name="description" content={DESCRIPTION} />
          <link rel="canonical" href={SITE_URL} />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Move.it" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={TITLE} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content={OG_IMAGE} />

          {/* Theme */}
          <meta name="theme-color" content="#5965e0" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />

          {/* JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

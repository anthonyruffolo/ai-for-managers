import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl = 'https://ai-for-managers-student-dashboard.danielgwilkie.chatgpt.site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'AI for Managers',
  description: 'A Blackboard-style, student-centered learning portal for non-coders studying AI-enabled management.',
  openGraph: {
    title: 'AI for Managers',
    description: 'A familiar course portal for non-coders learning to manage AI-enabled work.',
    type: 'website',
    url: siteUrl,
    images: [`${siteUrl}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Managers',
    description: 'A familiar course portal for non-coders learning to manage AI-enabled work.',
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

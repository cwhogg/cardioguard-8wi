import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
  description: 'Get advanced cardiovascular biomarkers for entrepreneurs and health-conscious individuals. ApoB, Lp(a), and hs-CRP testing without doctor visits or insurance.',
  keywords: 'cardiovascular biomarkers entrepreneurs, apolipoprotein b test, lipoprotein a test, advanced lipid panel without doctor, heart disease prevention blood tests',
  authors: [{ name: 'CardioGuard' }],
  creator: 'CardioGuard',
  publisher: 'CardioGuard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cardioguard.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers for entrepreneurs and health-conscious individuals. ApoB, Lp(a), and hs-CRP testing without doctor visits or insurance.',
    url: 'https://cardioguard.com',
    siteName: 'CardioGuard',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers for entrepreneurs and health-conscious individuals. ApoB, Lp(a), and hs-CRP testing without doctor visits or insurance.',
    creator: '@cardioguard',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-inter bg-background text-textPrimary min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
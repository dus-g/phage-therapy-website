import type { Metadata } from 'next';
import { PT_Serif, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { LanguageProvider } from '@/lib/i18n';

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Huoma Biotech — Phage Therapy / 噬菌体治疗',
  description: 'Bacteriophage therapy for antibiotic-resistant bacterial infections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ptSerif.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <ScrollToTopButton />
          {process.env.NEXT_PUBLIC_TAWK_ID ? (
            <Script id="tawk" strategy="afterInteractive">{`var Tawk_API=Tawk_API||{};var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];s1.async=true;s1.src='https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_ID}';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);`}</Script>
          ) : null}
        </LanguageProvider>
      </body>
    </html>
  );
}

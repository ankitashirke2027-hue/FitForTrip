import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata:Metadata={
  metadataBase:new URL('https://fitfortrip.in'),
  title:'FitForTrip — Never Pack a Bad Fit Again',
  description:'Plan trip outfits with destination moodboards, Pinterest inspiration, day-by-day looks, and shopping shortcuts.',
  alternates:{canonical:'/'},
  openGraph:{
    type:'website',
    url:'https://fitfortrip.in/',
    siteName:'FitForTrip',
    title:'FitForTrip — Never Pack a Bad Fit Again',
    description:'Plan trip outfits with destination moodboards, Pinterest inspiration, day-by-day looks, and shopping shortcuts.',
    images:[{url:'/opengraph-image',width:1200,height:630,alt:'FitForTrip — plan outfits for every trip'}],
  },
  twitter:{card:'summary_large_image',title:'FitForTrip — Never Pack a Bad Fit Again',description:'Plan trip outfits with destination moodboards, Pinterest inspiration, day-by-day looks, and shopping shortcuts.',images:['/opengraph-image']},
  icons:{icon:'/favicon.svg'},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "z01qlygp8j");`}</Script>{children}</body></html>}

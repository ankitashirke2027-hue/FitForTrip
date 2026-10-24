import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata:Metadata={title:'FitForTrip — Never Pack a Bad Fit Again',description:'Plan stylish outfits for every trip based on your destination, weather, personal style and local fashion trends. Join the FitForTrip waitlist.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "z01qlygp8j");`}</Script>{children}</body></html>}

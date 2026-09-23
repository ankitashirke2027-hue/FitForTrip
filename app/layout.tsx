import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'FitForTrip — Never Pack a Bad Fit Again',description:'Plan stylish outfits for every trip based on your destination, weather, personal style and local fashion trends. Join the FitForTrip waitlist.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

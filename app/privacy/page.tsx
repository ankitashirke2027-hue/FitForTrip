import type {Metadata} from 'next';
import Link from 'next/link';
import styles from './privacy.module.css';

export const metadata:Metadata={
  title:'Privacy Policy | FitForTrip',
  description:'Learn what FitForTrip collects, how trip and account data are used, and how to request access or deletion.',
  alternates:{canonical:'/privacy'},
  openGraph:{title:'Privacy Policy | FitForTrip',url:'https://fitfortrip.in/privacy'},
};

export default function PrivacyPage(){
  return <main className={styles.page}>
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>FitForTrip <span>✦</span></Link>
      <Link href="/app" className={styles.appLink}>Back to the app ↗</Link>
    </header>
    <article className={styles.content}>
      <p className={styles.eyebrow}>A CLEAR, HUMAN READ</p>
      <h1>Privacy, with<br/><em>the details.</em></h1>
      <p className={styles.updated}>Last updated November 5, 2026</p>
      <p className={styles.lede}>This notice explains what information FitForTrip handles when you visit the site, join the waitlist, or plan a trip in the app. FitForTrip is a trip outfit-planning product; it does not process purchases or operate the retailers linked from the app.</p>

      <section><h2>Information you provide</h2>
        <ul>
          <li><strong>Account information:</strong> your email address and account sign-in details. Supabase Auth handles authentication; FitForTrip does not store your password in its app database.</li>
          <li><strong>Trip information:</strong> trip names, destinations and dates, style and activity choices, notes, saved inspiration and daily look or packing selections.</li>
          <li><strong>Waitlist information:</strong> the email address you submit for product updates.</li>
          <li><strong>Campaign details, when present:</strong> if you arrive with campaign tags such as UTM parameters, the browser may keep the first campaign source, medium, campaign, term, content, landing path and capture time in local storage. When you create an account, this information may be attached to your Supabase account metadata.</li>
        </ul>
      </section>

      <section><h2>Product searches and Pinterest</h2>
        <p>If you use product matching, FitForTrip sends the selected Pin image URL to SerpApi to request visual matches. If you use text search, the selected clothing-piece description is sent to SerpApi for a Google Shopping search. Search requests are made to provide the results you asked for. Pinterest hosts the embedded Pin and image; loading a Pin can cause your browser to connect to Pinterest.</p>
        <p>To enforce the limit of 20 product searches per user per UTC day, FitForTrip stores your account ID, the UTC date and the number of searches used for that date in Supabase. Search counters are not shown to other users.</p>
        <p>Search results and retailer links are suggestions. Retailer websites have their own privacy practices and handle any visit or purchase. FitForTrip currently uses no commission links and does not receive a commission from purchases.</p>
      </section>

      <section><h2>How information is used</h2>
        <ul>
          <li>To authenticate your account and save, show, update or delete your trips.</li>
          <li>To provide the Pinterest inspiration and product-search features you request, including applying the daily search limit.</li>
          <li>To send product updates if you join the waitlist.</li>
          <li>To understand site use and improve FitForTrip through Microsoft Clarity.</li>
          <li>To protect, troubleshoot and maintain the service.</li>
        </ul>
      </section>

      <section><h2>Analytics and browser storage</h2>
        <p>Microsoft Clarity is installed on the website to record usage and interaction information, such as page activity and session playback. The signed-in app interface is marked for Clarity masking so its contents are excluded from session capture. Clarity and Supabase may use browser storage or cookies needed for their services. Campaign attribution, when available, is stored in your browser’s local storage under the key <code>fitfortrip:first-touch-attribution:v1</code>.</p>
        <p>FitForTrip also loads external content, including Pinterest Pins and images hosted by Pinterest, Unsplash and retailer image servers. Your browser may connect directly to those providers to display that content.</p>
      </section>

      <section><h2>Service providers</h2>
        <p>FitForTrip uses providers to operate the product: Vercel for hosting, Supabase for authentication and trip data, Microsoft Clarity for usage analytics, Pinterest for embedded inspiration, and SerpApi for requested visual or shopping searches. These providers may process technical information such as your IP address and browser details when your browser or the app connects to them.</p>
        <p>Read their notices: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a>, <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a>, <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft</a>, <a href="https://policy.pinterest.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">Pinterest</a>, and <a href="https://serpapi.com/privacy" target="_blank" rel="noopener noreferrer">SerpApi</a>.</p>
      </section>

      <section><h2>Storage and deletion</h2>
        <p>Account and trip data are stored in Supabase and are available to your signed-in account. You can delete individual trips in the app. Waitlist email addresses are stored in Supabase until you ask us to remove them. The app does not currently provide a self-service account deletion control. To request access to, correction of, or deletion of account or waitlist information, email <a href="mailto:fitf4trip@gmail.com">fitf4trip@gmail.com</a>. We may need to verify the request using the email on the account.</p>
        <p>We keep information for as long as needed to operate the account or waitlist and respond to requests. Deleting an account also removes its associated trip and shop-usage records from the application database; service-provider backups may persist for a limited period under their own processes.</p>
      </section>

      <section><h2>Your choices</h2>
        <p>You can stop using the app, sign out, delete individual trips, or clear local storage and cookies through your browser settings. Clearing browser storage may remove saved campaign attribution or sign you out. You can also contact us to ask about your information or request its deletion.</p>
      </section>

      <section><h2>Changes and contact</h2>
        <p>We may update this notice as FitForTrip changes. The date at the top will show when it was last revised. For questions or requests, contact <a href="mailto:fitf4trip@gmail.com">fitf4trip@gmail.com</a>.</p>
      </section>
    </article>
    <footer className={styles.footer}><span>© 2026 FitForTrip</span><Link href="/">Back to FitForTrip home</Link></footer>
  </main>;
}

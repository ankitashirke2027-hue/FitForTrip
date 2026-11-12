'use client';

import { useEffect } from 'react';
import { captureFirstTouchAttribution } from '../lib/attribution';
import {
  AppCTA,
  Capsule,
  Comparison,
  Destinations,
  Features,
  Footer,
  FinalCTA,
  HowItWorks,
  Packing,
  Problem,
  Shop,
} from './sections';

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const paris = photo('photo-1600421693661-8a4accf2a899');
const outfit = photo('photo-1716004354593-95e48f5e9187');

function PhoneMockup() {
  return (
    <div className="phone" aria-label="Sample FitForTrip trip preview">
      <div className="phone-top"><span>9:41</span><b className="island"/><span>••• ▰</span></div>
      <div className="phone-inner">
        <div className="phone-brand">FitForTrip <span>✦</span></div>
        <p className="eyebrow">SAMPLE TRIP</p>
        <h3>Bonjour, Paris.</h3>
        <div className="phone-meta"><span>12—17 OCT · 5 DAYS</span><span>CITY BREAK</span></div>
        <div className="phone-photo">
          <img src={outfit} alt="Neutral layers for a Paris city break"/>
          <span>DAY 01 <b>City strolls &amp; café stops</b></span>
          <i aria-hidden="true">♡</i>
        </div>
        <div className="phone-bottom">
          <span>YOUR TRIP CAPSULE</span>
          <strong>7 outfits. Zero overthinking.</strong>
          <div>◉ &nbsp; My trip <span>♡ &nbsp; Looks</span><span>☷ &nbsp; Packing</span></div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="pill">THE WELL-DRESSED WAY TO GET AWAY <span>✦ APP NOW LIVE</span></div>
        <h1>Never pack<br/>a <em>bad fit</em><br/>again<span className="period">.</span></h1>
        <p>Plan multi-city trips, choose outfits from destination moodboards, and pack with confidence.</p>
        <div className="hero-actions">
          <AppCTA label="Plan my next trip"/>
          <a className="text-link" href="#how-it-works">See how it works ↓</a>
        </div>
      </div>
      <div className="hero-art" aria-label="FitForTrip sample trip preview">
        <div className="orbit"/>
        <span className="big-star" aria-hidden="true">✳</span>
        <div className="polaroid paris"><img src={paris} alt="The Eiffel Tower in Paris"/><span>Meet me in Paris ♡</span></div>
        <div className="float-chip weather">✦ <b>PARIS · CITY BREAK</b><small>Walks, cafés &amp; dinner plans.</small></div>
        <PhoneMockup/>
        <div className="float-chip style">✦ YOUR STYLE <b>Minimal + Chic</b></div>
        <div className="float-chip capsule">✓ <b>7 outfits planned</b><small>One very happy suitcase.</small></div>
        <div className="trip-stamp">FIT FOR<br/><em>the trip</em><br/>✦ EST. 2026 ✦</div>
        <div className="art-caption">YOUR NEXT TRIP, BUT BETTER DRESSED.</div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    captureFirstTouchAttribution();
    const art = document.querySelector<HTMLElement>('.hero-art');
    const move = (event: PointerEvent) => {
      if (art && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 1000) {
        art.style.translate = `${(event.clientX / window.innerWidth - 0.5) * 9}px ${(event.clientY / window.innerHeight - 0.5) * 7}px`;
      }
    };
    const scroll = () => document.body.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('pointermove', move);
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <>
      <nav className="navbar" aria-label="Main navigation">
        <a className="wordmark" href="#top">FitForTrip<span>✦</span></a>
        <div className="navlinks">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#why">Why FitForTrip</a>
        </div>
        <a className="nav-cta" href="/app">Start planning free <span>↗</span></a>
      </nav>
      <main id="top">
        <Hero/>
        <Problem/>
        <HowItWorks/>
        <Destinations/>
        <Capsule/>
        <Shop/>
        <Features/>
        <Comparison/>
        <Packing/>
        <FinalCTA/>
      </main>
      <Footer/>
    </>
  );
}

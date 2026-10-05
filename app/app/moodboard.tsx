'use client';
import {useState} from 'react';
import Image from 'next/image';
import {looks,looksForDestination,retailers,type MoodLook} from '../../lib/moodboard';
import type {TripDetails} from '../../lib/trip';

function ShopLook({look}:{look:MoodLook}){
  const [piece,setPiece]=useState(look.pieces[0]);
  const selected=look.pieces.includes(piece)?piece:look.pieces[0];
  return <div className="fft-match-panel"><div className="fft-match-head"><div><span className="fft-kicker">SHOP THE LOOK</span><h3>{look.title}</h3><p>Choose a piece to see similar styles at each store.</p></div><span className="fft-match-star">✳</span></div><div className="fft-piece-row">{look.pieces.map(item=><button key={item} className={selected===item?'active':''} onClick={()=>setPiece(item)}>{item}</button>)}</div><div className="fft-retailer-results">{retailers.map(store=><a key={store.name} href={store.url(selected)} target="_blank" rel="noopener noreferrer" aria-label={`Find ${selected} at ${store.name}`}><span><small>{store.name}</small><strong>{selected}</strong></span><b>↗</b></a>)}</div><p className="fft-hint">These are searches for similar pieces, not exact product matches. Each store sets availability and prices. No commission links.</p></div>;
}

export function Moodboard({details,onChange}:{details:TripDetails;onChange:(patch:Partial<TripDetails>)=>void}){
  const [focused,setFocused]=useState<string>('');
  const selected=details.selectedLooks||[];
  const available=details.stops.flatMap(stop=>looksForDestination(stop.destination,details,stop.start));
  const visible=looks.find(look=>look.id===focused&&available.some(item=>item.id===focused))||available.find(look=>selected.includes(look.id))||available[0];
  return <div className="fft-panel fft-wide fft-moodboard"><span className="fft-kicker">06 / YOUR MOODBOARD</span><h2>See your trip in outfits.</h2><p>Looks for your destinations, ordered around your style and plans. Tap a photo to pick a look and find pieces like it, all from here.</p><div className="fft-board-groups">{details.stops.map((stop,index)=>{const options=looksForDestination(stop.destination,details,stop.start);return <section className="fft-board-group" key={stop.id}><div className="fft-board-title"><div><span className="fft-kicker">STOP {String(index+1).padStart(2,'0')}</span><h3>{stop.destination}</h3></div><span>{stop.start?new Date(`${stop.start}T12:00:00`).toLocaleDateString('en-IN',{month:'long',year:'numeric'}):'Your style edit'} ✦</span></div><div className="fft-board-grid">{options.map(look=><button key={look.id} className={'fft-look-card '+(visible?.id===look.id?'active':'')} onClick={()=>{setFocused(look.id);if(!selected.includes(look.id))onChange({selectedLooks:[...selected,look.id]})}} aria-pressed={selected.includes(look.id)}><Image src={look.image} alt={look.alt} fill sizes="(max-width: 600px) 45vw, 35vw"/><span className="fft-look-overlay"><small>{look.occasion.toUpperCase()} · {look.place.toUpperCase()}</small><strong>{look.title}</strong><span>{selected.includes(look.id)?'Saved to your trip ♡':'Choose this look ↗'}</span></span></button>)}</div></section>})}</div>{visible&&<ShopLook key={visible.id} look={visible}/>}<p className="fft-hint">Save your trip to keep chosen looks. Moodboard images are original FitForTrip inspiration, curated for each destination.</p></div>;
}

export function ShopMoodboard({details,onInspiration}:{details:TripDetails;onInspiration:()=>void}){
  const chosen=looks.filter(look=>(details.selectedLooks||[]).includes(look.id));
  const [focused,setFocused]=useState(chosen[0]?.id||'');
  const visible=chosen.find(look=>look.id===focused)||chosen[0];
  return <div className="fft-panel fft-wide fft-moodboard"><span className="fft-kicker">07 / THE FINISHING TOUCH</span><h2>Shop from your moodboard.</h2><p>Find similar pieces for the looks you chose. Start with what you already own, then explore the missing pieces.</p>{chosen.length?<><div className="fft-shop-looks">{chosen.map(look=><button key={look.id} className={visible?.id===look.id?'active':''} onClick={()=>setFocused(look.id)}><Image src={look.image} alt="" width={48} height={58}/><span>{look.title}</span></button>)}</div>{visible&&<ShopLook key={visible.id} look={visible}/>}</>:<div className="fft-empty"><p>Choose a look from your moodboard first.</p><button className="fft-primary" onClick={onInspiration}>See my moodboard ↗</button></div>}</div>;
}

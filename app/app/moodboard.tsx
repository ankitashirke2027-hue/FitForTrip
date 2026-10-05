'use client';

import {useState} from 'react';
import Image from 'next/image';
import {lookForDay,looksForDestination,retailers,type MoodLook} from '../../lib/moodboard';
import {tripDays,type DayStyle,type TripDay,type TripDetails} from '../../lib/trip';

const styles:DayStyle[]=['Easy','Polished','Evening'];

function DayPicker({days,details,active,onPick}:{days:TripDay[];details:TripDetails;active:string;onPick:(key:string)=>void}){
  return <div className="fft-day-picker" aria-label="Trip days">{days.map(day=>{
    const chosen=lookForDay(details,day);
    return <button key={day.key} className={active===day.key?'active':''} onClick={()=>onPick(day.key)} aria-current={active===day.key?'date':undefined}>
      <small>DAY {String(day.number).padStart(2,'0')} {chosen?'✓':''}</small>
      <strong>{day.date?new Date(`${day.date}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):day.destination}</strong>
      <span>{day.destination}</span>
    </button>;
  })}</div>;
}

function ShopLook({look,day}:{look:MoodLook;day:TripDay}){
  return <section className="fft-match-panel" aria-label={`Shopping links for day ${day.number}`}>
    <div className="fft-match-head"><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} / SHOP THE LOOK</span><h3>{look.title}</h3><p>Pieces for {day.label}. Explore similar styles at each store.</p></div><span className="fft-match-star">✳</span></div>
    <div className="fft-piece-list">{look.pieces.map(piece=><div className="fft-piece-shop" key={piece}>
      <strong>{piece}</strong>
      <div className="fft-store-links">{retailers.map(store=><a key={store.name} href={store.url(piece)} target="_blank" rel="noopener noreferrer" aria-label={`Find ${piece} at ${store.name}`}>{store.name} <span>↗</span></a>)}</div>
    </div>)}</div>
    <p className="fft-hint">Store links search for similar pieces; they are not exact product matches. Prices and availability are set by each store. No commission links.</p>
  </section>;
}

export function Moodboard({details,onChange,initialDay,onDayChange}:{details:TripDetails;onChange:(patch:Partial<TripDetails>)=>void;initialDay:string;onDayChange:(key:string)=>void}){
  const days=tripDays(details);
  const [focused,setFocused]=useState(initialDay);
  const day=days.find(item=>item.key===focused)||days[0];
  const chosen=day?lookForDay(details,day):undefined;
  const style:DayStyle=day?(details.dayStyles?.[day.key]||chosen?.style||'Easy'):'Easy';
  const options=day?looksForDestination(day.destination,details,day.date).sort((a,b)=>Number(b.style===style)-Number(a.style===style)):[];
  const count=days.filter(item=>lookForDay(details,item)).length;
  const chooseDay=(key:string)=>{setFocused(key);onDayChange(key)};
  const chooseStyle=(next:DayStyle)=>{
    if(!day)return;
    onChange({dayStyles:{...details.dayStyles,[day.key]:next}});
  };
  const chooseLook=(look:MoodLook)=>{
    if(!day)return;
    const existing=details.outfits.find(outfit=>outfit.label===day.label);
    const outfit={id:existing?.id||crypto.randomUUID(),label:day.label,items:look.pieces,packed:false};
    onChange({
      dayStyles:{...details.dayStyles,[day.key]:look.style},
      dayLooks:{...details.dayLooks,[day.key]:look.id},
      outfits:existing?details.outfits.map(item=>item.id===existing.id?outfit:item):[...details.outfits,outfit],
    });
  };
  return <div className="fft-panel fft-wide fft-moodboard">
    <span className="fft-kicker">06 / YOUR DAY-BY-DAY MOODBOARD</span>
    <h2>Plan a look for every day.</h2>
    <p>Choose a day, set the style, then pick the outfit you want to wear. Shopping links follow that day’s outfit.</p>
    <div className="fft-day-progress"><strong>{count} of {days.length} days styled</strong><span>{days.length>1?'Choose each day below ✦':'Add travel dates in Trip plan to see every day ✦'}</span></div>
    <DayPicker days={days} details={details} active={day?.key||''} onPick={chooseDay}/>
    {day&&<><div className="fft-day-heading"><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} · STOP {String(day.stopNumber).padStart(2,'0')}</span><h3>{day.label}</h3></div><span>{chosen?'Outfit chosen ♡':'Choose an outfit'}</span></div>
      <div className="fft-day-style"><strong>What’s the mood for this day?</strong><div>{styles.map(item=><button key={item} className={style===item?'active':''} aria-pressed={style===item} onClick={()=>chooseStyle(item)}>{item}</button>)}</div></div>
      <div className="fft-board-grid fft-day-options">{options.map(look=><button key={look.id} className={'fft-look-card '+(chosen?.id===look.id?'active':'')} onClick={()=>chooseLook(look)} aria-pressed={chosen?.id===look.id}>
        <Image src={look.image} alt={look.alt} fill sizes="(max-width: 600px) 45vw, 25vw"/>
        <span className="fft-look-overlay"><small>{look.style.toUpperCase()} · {look.occasion.toUpperCase()}</small><strong>{look.title}</strong><span>{chosen?.id===look.id?'Chosen for this day ♡':'Choose for this day ↗'}</span></span>
      </button>)}</div>
      {chosen?<ShopLook key={`${day.key}-${chosen.id}`} look={chosen} day={day}/>:<div className="fft-empty fft-day-empty">Pick one of the looks above to see its clothing links for Day {day.number}.</div>}
      {day.number<days.length&&<button className="fft-next-day" onClick={()=>chooseDay(days[day.number].key)}>Plan Day {day.number+1} →</button>}
    </>}
    <p className="fft-hint">Save your trip to keep each day’s style and outfit. Images are original FitForTrip inspiration.</p>
  </div>;
}

export function ShopMoodboard({details,onInspiration}:{details:TripDetails;onInspiration:(key:string)=>void}){
  const days=tripDays(details);
  const [focused,setFocused]=useState('');
  const day=days.find(item=>item.key===focused)||days[0];
  const chosen=day?lookForDay(details,day):undefined;
  const count=days.filter(item=>lookForDay(details,item)).length;
  return <div className="fft-panel fft-wide fft-moodboard">
    <span className="fft-kicker">07 / SHOP YOUR DAILY LOOKS</span><h2>Find pieces for each day.</h2>
    <p>Select a day to see the outfit you chose and shopping links for every piece. Start with what you already own.</p>
    <div className="fft-day-progress"><strong>{count} of {days.length} days styled</strong><span>Direct retailer searches · no commission links</span></div>
    <DayPicker days={days} details={details} active={day?.key||''} onPick={setFocused}/>
    {day&&(chosen?<><div className="fft-shop-day-hero"><Image src={chosen.image} alt={chosen.alt} width={98} height={120}/><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} · {day.label.toUpperCase()}</span><h3>{chosen.title}</h3><button onClick={()=>onInspiration(day.key)}>Change this outfit ↗</button></div></div><ShopLook key={`${day.key}-${chosen.id}`} look={chosen} day={day}/></>:<div className="fft-empty fft-day-empty"><p>No outfit chosen for Day {day.number} yet.</p><button className="fft-primary" onClick={()=>onInspiration(day.key)}>Choose a look for this day ↗</button></div>)}
  </div>;
}

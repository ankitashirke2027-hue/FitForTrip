'use client';

import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';
import {lookForDay,looksForDestination,retailers,type MoodLook} from '../../lib/moodboard';
import {tripDays,type DayStyle,type TripDay,type TripDetails} from '../../lib/trip';

const styles:DayStyle[]=['Easy','Polished','Evening'];
declare global {interface Window {buildPinterest?:()=>void}}

function PinterestPin({url}:{url:string}){
  const mount=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!mount.current)return;
    mount.current.replaceChildren();
    const link=document.createElement('a');
    link.href=url;
    link.textContent='View original Pin on Pinterest';
    link.setAttribute('data-pin-do','embedPin');
    mount.current.appendChild(link);
    window.buildPinterest?.();
  },[url]);
  return <div ref={mount} className="fft-pin-embed" aria-label="Original Pinterest Pin"/>;
}

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

function TripBoard({days,details,active,onPick}:{days:TripDay[];details:TripDetails;active:string;onPick:(key:string)=>void}){
  return <div className="fft-trip-board" aria-label="Your trip mood board">{days.map(day=>{
    const look=lookForDay(details,day);
    return <button key={day.key} className={'fft-trip-board-tile '+(active===day.key?'active':'')} onClick={()=>onPick(day.key)} aria-label={`Day ${day.number}, ${day.label}: ${look?.title||'choose an outfit'}`} aria-current={active===day.key?'step':undefined}>
      <span className="fft-trip-board-empty">{look?'♥':'✳'}</span>
      <span className="fft-trip-board-caption"><small>DAY {String(day.number).padStart(2,'0')} · {day.destination}</small><strong>{look?.title||'Choose a look'}</strong></span>
    </button>;
  })}</div>;
}

function ShopLook({look,day,pieces}:{look:MoodLook;day:TripDay;pieces:string[]}){
  return <section className="fft-match-panel" aria-label={`Shopping links for day ${day.number}`}>
    <div className="fft-match-head"><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} / SHOP THE LOOK</span><h3>{look.title}</h3><p>Pieces for {day.label}. Explore similar styles at each store.</p></div><span className="fft-match-star">✳</span></div>
    <div className="fft-piece-list">{pieces.filter(Boolean).map((piece,index)=><div className="fft-piece-shop" key={`${piece}-${index}`}>
      <strong>{piece}</strong>
      <div className="fft-store-links">{retailers.map(store=><a key={store.name} href={store.url(piece)} target="_blank" rel="noopener noreferrer" aria-label={`Find ${piece} at ${store.name}`}>{store.name} <span>↗</span></a>)}</div>
    </div>)}</div>
    <p className="fft-hint">Store links search for similar pieces; they are not exact product matches. Prices and availability are set by each store. No commission links.</p>
  </section>;
}

export function Moodboard({details,onChange,initialDay,onDayChange,onShop}:{details:TripDetails;onChange:(patch:Partial<TripDetails>)=>void;initialDay:string;onDayChange:(key:string)=>void;onShop:(key:string)=>void}){
  const days=tripDays(details);
  const [focused,setFocused]=useState(initialDay);
  const day=days.find(item=>item.key===focused)||days[0];
  const chosen=day?lookForDay(details,day):undefined;
  const style:DayStyle=day?(details.dayStyles?.[day.key]||chosen?.style||'Easy'):'Easy';
  const options=day?looksForDestination(day.destination).filter(look=>look.style===style):[];
  const count=days.filter(item=>lookForDay(details,item)).length;
  const chooseDay=(key:string)=>{setFocused(key);onDayChange(key)};
  const fillUnstyledDays=()=>{
    const dayStyles={...details.dayStyles};
    const dayLooks={...details.dayLooks};
    const outfits=[...details.outfits];
    for(const item of days){
      if(lookForDay(details,item))continue;
      const preferred=dayStyles[item.key]||styles[(item.number-1)%styles.length];
      const options=looksForDestination(item.destination);
      const look=options.find(option=>option.style===preferred)||options[0];
      if(!look)continue;
      dayStyles[item.key]=look.style;
      dayLooks[item.key]=look.id;
      const existing=outfits.findIndex(outfit=>outfit.label===item.label);
      const outfit={id:existing>=0?outfits[existing].id:crypto.randomUUID(),label:item.label,items:look.pieces,packed:false};
      if(existing>=0)outfits[existing]=outfit;else outfits.push(outfit);
    }
    onChange({dayStyles,dayLooks,outfits});
  };
  const chooseStyle=(next:DayStyle)=>{
    if(!day)return;
    onChange({dayStyles:{...details.dayStyles,[day.key]:next}});
  };
  const chooseLook=(look:MoodLook)=>{
    if(!day)return;
    if(chosen?.id===look.id&&style===look.style)return;
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
    <p>Choose a day and a mood, then pick from four real Pinterest Pins shown here. Find similar clothing in Shop.</p>
    <div className="fft-day-progress"><strong>{count} of {days.length} days styled</strong><span>{days.length>1?'Select a day on your board to style it ✦':'Add travel dates in Trip plan to see every day ✦'}</span></div>
    <div className="fft-board-toolbar"><h3>Your trip board</h3>{count<days.length&&<button className="fft-outline" onClick={fillUnstyledDays}>Fill {days.length-count} empty {days.length-count===1?'day':'days'} ✳</button>}</div>
    <TripBoard days={days} details={details} active={day?.key||''} onPick={chooseDay}/>
    {day&&<><div className="fft-day-heading"><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} · STOP {String(day.stopNumber).padStart(2,'0')}</span><h3>{day.label}</h3></div><span>{chosen?'Outfit chosen ♡':'Choose an outfit'}</span></div>
      <div className="fft-day-style"><strong>What’s the mood for this day?</strong><div>{styles.map(item=><button key={item} className={style===item?'active':''} aria-pressed={style===item} onClick={()=>chooseStyle(item)}>{item}</button>)}</div></div>
      {chosen&&chosen.style!==style&&<p className="fft-style-note">Your chosen outfit is {chosen.style.toLowerCase()}. Select a {style.toLowerCase()} look below to change it.</p>}
      <div className="fft-board-grid fft-day-options">{options.map(look=><article key={look.id} className={'fft-pin-card '+(chosen?.id===look.id?'active':'')}>
        <PinterestPin url={look.pinUrl}/>
        <div className="fft-pin-card-details"><small>{look.style.toUpperCase()} · {look.occasion.toUpperCase()}</small><strong>{look.title}</strong><button onClick={()=>chooseLook(look)} aria-pressed={chosen?.id===look.id}>{chosen?.id===look.id?'Chosen for this day ♡':'Choose for this day ↗'}</button></div>
      </article>)}</div>
      {chosen&&<button className="fft-outline fft-shop-selected" onClick={()=>onShop(day.key)}>Shop Day {day.number}’s chosen look ↗</button>}
      {day.number<days.length&&<button className="fft-next-day" onClick={()=>chooseDay(days[day.number].key)}>Plan Day {day.number+1} →</button>}
    </>}
    <p className="fft-hint">Save your trip to keep each day’s outfit. Pin images load from Pinterest with original attribution and may become unavailable if their creator removes them.</p>
    <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" data-pin-build="buildPinterest" onReady={()=>window.buildPinterest?.()}/>
  </div>;
}

export function ShopMoodboard({details,onInspiration,initialDay}:{details:TripDetails;onInspiration:(key:string)=>void;initialDay:string}){
  const days=tripDays(details);
  const [focused,setFocused]=useState(initialDay);
  const day=days.find(item=>item.key===focused)||days[0];
  const chosen=day?lookForDay(details,day):undefined;
  const count=days.filter(item=>lookForDay(details,item)).length;
  return <div className="fft-panel fft-wide fft-moodboard">
    <span className="fft-kicker">07 / SHOP YOUR DAILY LOOKS</span><h2>Find pieces for each day.</h2>
    <p>Select a day to see the outfit you chose and shopping links for every piece. Start with what you already own.</p>
    <div className="fft-day-progress"><strong>{count} of {days.length} days styled</strong><span>Direct retailer searches · no commission links</span></div>
    <DayPicker days={days} details={details} active={day?.key||''} onPick={setFocused}/>
    {day&&(chosen?<><div className="fft-shop-day-hero"><PinterestPin url={chosen.pinUrl}/><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} · {day.label.toUpperCase()}</span><h3>{chosen.title}</h3><button onClick={()=>onInspiration(day.key)}>Change this outfit ↗</button></div></div><ShopLook key={`${day.key}-${chosen.id}`} look={chosen} day={day} pieces={details.dayLooks?.[day.key]===chosen.id?details.outfits.find(outfit=>outfit.label===day.label)?.items||chosen.pieces:chosen.pieces}/></>:<div className="fft-empty fft-day-empty"><p>No outfit chosen for Day {day.number} yet.</p><button className="fft-primary" onClick={()=>onInspiration(day.key)}>Choose a look for this day ↗</button></div>)}
    <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" data-pin-build="buildPinterest" onReady={()=>window.buildPinterest?.()}/>
  </div>;
}

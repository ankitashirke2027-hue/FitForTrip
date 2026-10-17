'use client';

import {useEffect,useRef,useState} from 'react';
import Script from 'next/script';
import {lookForDay,looksForDestination,retailers,type MoodLook} from '../../lib/moodboard';
import {supabase} from '../../lib/supabase-browser';
import {tripDays,type DayStyle,type TripDay,type TripDetails} from '../../lib/trip';

const styles:DayStyle[]=['Easy','Polished','Evening'];
declare global {interface Window {buildPinterest?:()=>void}}

function PinterestPin({url,onImage}:{url:string;onImage?:(imageUrl:string)=>void}){
  const mount=useRef<HTMLDivElement>(null);
  const onImageRef=useRef(onImage);
  useEffect(()=>{onImageRef.current=onImage},[onImage]);
  useEffect(()=>{
    if(!mount.current)return;
    mount.current.replaceChildren();
    const link=document.createElement('a');
    link.href=url;
    link.textContent='View original Pin on Pinterest';
    link.setAttribute('data-pin-do','embedPin');
    mount.current.appendChild(link);
    const observer=new MutationObserver(()=>{
      const image=mount.current?.querySelector<HTMLElement>('[class*="_image"][style*="background-image"]');
      const source=image?.style.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1];
      if(source?.startsWith('https://i.pinimg.com/'))onImageRef.current?.(source);
    });
    observer.observe(mount.current,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
    window.buildPinterest?.();
    return()=>observer.disconnect();
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

function ShopLook({look,day,pieces,imageUrl}:{look:MoodLook;day:TripDay;pieces:string[];imageUrl:string}){
  type Product={title:string;source:string;price:string;image:string;url:string};
  const [pieceIndex,setPieceIndex]=useState(0);
  const [products,setProducts]=useState<Product[]>([]);
  const [searching,setSearching]=useState(false);
  const [searchMessage,setSearchMessage]=useState('');
  const [searchConnected,setSearchConnected]=useState(false);
  useEffect(()=>{let live=true;fetch('/api/shop').then(response=>response.json()).then(result=>{if(live)setSearchConnected(!!(result as {connected?:boolean}).connected)}).catch(()=>{});return()=>{live=false}},[]);
  const activePiece=look.pieces[pieceIndex];
  const googleShoppingUrl=`https://www.google.com/search?udm=28&gl=in&hl=en&q=${encodeURIComponent(`women ${activePiece} ${look.style==='Evening'?'evening':'daywear'}`)}`;
  async function searchProducts(){
    if(!imageUrl){setSearchMessage('The selected Pin image is still loading. Wait a moment, then try again.');return}
    setSearching(true);setSearchMessage('');setProducts([]);
    try{
      const {data:{session}}=await supabase.auth.getSession();
      if(!session)throw new Error('Please sign in again to search for products.');
      const response=await fetch('/api/shop',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({lookId:look.id,pieceIndex,imageUrl})});
      const result=await response.json() as {products?:Product[];error?:string};
      if(!response.ok)throw new Error(result.error||'Product search is unavailable.');
      setProducts(result.products||[]);
      if(!result.products?.length)setSearchMessage('No close shopping matches for this piece yet. Try another piece or the store links below.');
    }catch(error){setSearchMessage(error instanceof Error?error.message:'Product search is unavailable.')}finally{setSearching(false)}
  }
  return <section className="fft-match-panel" aria-label={`Shopping links for day ${day.number}`}>
    <div className="fft-match-head"><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} / SHOP THE LOOK</span><h3>{look.title}</h3><p>Pieces for {day.label}. Explore similar styles at each store.</p></div><span className="fft-match-star">✳</span></div>
    <div className="fft-product-search"><h4>Find pieces that match this Pin</h4><p>Choose a piece. We search using the selected Pinterest image, then show visual matches for that garment. Compare each result with the Pin before buying.</p>
      <div className="fft-piece-row" aria-label="Choose a piece to shop">{look.pieces.map((piece,index)=><button key={`${piece}-${index}`} className={pieceIndex===index?'active':''} aria-pressed={pieceIndex===index} onClick={()=>{setPieceIndex(index);setProducts([]);setSearchMessage('')}}>{piece}</button>)}</div>
      <div className="fft-search-actions">{searchConnected&&<button className="fft-primary" onClick={searchProducts} disabled={searching||!imageUrl}>{searching?'Matching the Pin…':imageUrl?`Match ${activePiece} to this Pin ↗`:'Loading Pin image…'}</button>}<a href={googleShoppingUrl} target="_blank" rel="noopener noreferrer">Browse Google Shopping ↗</a></div>
      <p className="fft-search-message" role="status">{searchMessage}</p>
      {products.length>0&&<div className="fft-product-grid">{products.map((product,index)=><a className="fft-product-card" key={`${product.url}-${index}`} href={product.url} target="_blank" rel="noopener noreferrer">{product.image?<img src={product.image} alt="" loading="lazy"/>:<div className="fft-product-placeholder">✳</div>}<span><small>{product.source||'Google Shopping'}</small><strong>{product.title}</strong><b>{product.price}</b></span><em>View product ↗</em></a>)}</div>}
    </div>
    <h4 className="fft-store-heading">Search your favourite stores</h4>
    <div className="fft-piece-list">{pieces.filter(Boolean).map((piece,index)=><div className="fft-piece-shop" key={`${piece}-${index}`}>
      <strong>{piece}</strong>
      <div className="fft-store-links">{retailers.map(store=><a key={store.name} href={store.url(piece)} target="_blank" rel="noopener noreferrer" aria-label={`Find ${piece} at ${store.name}`}>{store.name} <span>↗</span></a>)}</div>
    </div>)}</div>
    <p className="fft-hint">Visual matches and store links are suggestions, not exact matches to the Pin. Prices and availability are set by each store. No commission links.</p>
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
  const [pinImage,setPinImage]=useState<{lookId:string;url:string}|null>(null);
  const day=days.find(item=>item.key===focused)||days[0];
  const chosen=day?lookForDay(details,day):undefined;
  const imageUrl=pinImage&&chosen?.id===pinImage.lookId?pinImage.url:'';
  const count=days.filter(item=>lookForDay(details,item)).length;
  return <div className="fft-panel fft-wide fft-moodboard">
    <span className="fft-kicker">07 / SHOP YOUR DAILY LOOKS</span><h2>Find pieces for each day.</h2>
    <p>Select a day to see the outfit you chose and shopping links for every piece. Start with what you already own.</p>
    <div className="fft-day-progress"><strong>{count} of {days.length} days styled</strong><span>Direct retailer searches · no commission links</span></div>
    <DayPicker days={days} details={details} active={day?.key||''} onPick={setFocused}/>
    {day&&(chosen?<><div className="fft-shop-day-hero"><PinterestPin url={chosen.pinUrl} onImage={url=>setPinImage(previous=>previous?.lookId===chosen.id&&previous.url===url?previous:{lookId:chosen.id,url})}/><div><span className="fft-kicker">DAY {String(day.number).padStart(2,'0')} · {day.label.toUpperCase()}</span><h3>{chosen.title}</h3><button onClick={()=>onInspiration(day.key)}>Change this outfit ↗</button></div></div><ShopLook key={`${day.key}-${chosen.id}`} look={chosen} day={day} imageUrl={imageUrl} pieces={details.dayLooks?.[day.key]===chosen.id?details.outfits.find(outfit=>outfit.label===day.label)?.items||chosen.pieces:chosen.pieces}/></>:<div className="fft-empty fft-day-empty"><p>No outfit chosen for Day {day.number} yet.</p><button className="fft-primary" onClick={()=>onInspiration(day.key)}>Choose a look for this day ↗</button></div>)}
    <Script src="https://assets.pinterest.com/js/pinit.js" strategy="afterInteractive" data-pin-build="buildPinterest" onReady={()=>window.buildPinterest?.()}/>
  </div>;
}

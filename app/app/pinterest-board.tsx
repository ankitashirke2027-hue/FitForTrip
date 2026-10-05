'use client';
import {useEffect} from 'react';

type PinterestWindow=Window & {PinUtils?:{build?:()=>void};fitfortripPinterestBuild?:()=>void};

export function PinterestBoard({url,place}:{url:string;place:string}){
  useEffect(()=>{
    const pinterest=window as PinterestWindow;
    const build=()=>{
      if(pinterest.fitfortripPinterestBuild)pinterest.fitfortripPinterestBuild();
      else pinterest.PinUtils?.build?.();
    };
    if(document.getElementById('fitfortrip-pinterest-widget')){build();return}
    const script=document.createElement('script');
    script.id='fitfortrip-pinterest-widget';
    script.src='https://assets.pinterest.com/js/pinit.js';
    script.async=true;
    script.dataset.pinBuild='fitfortripPinterestBuild';
    script.onload=build;
    document.body.appendChild(script);
  },[url]);
  return <div className="fft-pinterest-board"><a href={url} data-pin-do="embedBoard" data-pin-scale-height="320" data-pin-scale-width="110" target="_blank" rel="noopener noreferrer">See {place} outfit pictures on Pinterest ↗</a></div>;
}

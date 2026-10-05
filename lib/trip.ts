export const destinations = [
  {name:'Bangkok',country:'Thailand',climate:'tropical',tip:'Breathable layers and temple-ready coverage.'},
  {name:'Phuket',country:'Thailand',climate:'tropical',tip:'Light layers, swimwear, and rain-ready extras.'},
  {name:'Pattaya',country:'Thailand',climate:'tropical',tip:'Easy coastal pieces and sun protection.'},
  {name:'Chiang Mai',country:'Thailand',climate:'tropical',tip:'Comfortable walking looks and a light layer.'},
  {name:'Krabi',country:'Thailand',climate:'tropical',tip:'Beach-to-town pieces and practical sandals.'},
  {name:'Paris',country:'France',climate:'temperate',tip:'Walkable shoes and adaptable layers.'},
  {name:'London',country:'United Kingdom',climate:'temperate',tip:'A light rain layer and comfortable shoes.'},
  {name:'New York City',country:'United States',climate:'temperate',tip:'Versatile layers and all-day walking shoes.'},
] as const;
export type DestinationName=(typeof destinations)[number]['name'];
export type Stop={id:string;destination:DestinationName;start:string;end:string};
export type ClosetItem={id:string;name:string;category:'Top'|'Bottom'|'Dress'|'Layer'|'Shoes'|'Accessory'};
export type Outfit={id:string;label:string;items:string[];packed:boolean};
export type TripDetails={stops:Stop[];style:string;activities:string[];closet:ClosetItem[];inspiration:string[];selectedLooks?:string[];outfits:Outfit[];notes:string};
export type Trip={id:string;title:string;details:TripDetails;created_at:string;updated_at:string};
export const newTrip=():TripDetails=>({stops:[{id:crypto.randomUUID(),destination:'Paris',start:'',end:''}],style:'Easy chic',activities:['Sightseeing'],closet:[],inspiration:[],selectedLooks:[],outfits:[],notes:''});
export const shops=[
  {name:'Myntra',url:'https://www.myntra.com/'},
  {name:'AJIO',url:'https://www.ajio.com/'},
  {name:'Nykaa Fashion',url:'https://www.nykaafashion.com/'},
  {name:'Zara',url:'https://www.zara.com/in/'},
  {name:'H&M',url:'https://www2.hm.com/en_in/'},
];
export function daysForStop(stop:Stop){if(!stop.start||!stop.end)return 1;const n=Math.floor((Date.parse(stop.end)-Date.parse(stop.start))/86400000)+1;return Number.isFinite(n)?Math.min(Math.max(n,1),14):1}
export function planOutfits(details:TripDetails):Outfit[]{
  const by=(category:ClosetItem['category'])=>details.closet.filter(item=>item.category===category);
  const pick=(category:ClosetItem['category'],i:number)=>{const list=by(category);return list.length?list[i%list.length].name:undefined};
  const result:Outfit[]=[];
  details.stops.forEach(stop=>{
    const destination=destinations.find(d=>d.name===stop.destination)!;
    for(let i=0;i<daysForStop(stop);i++){
      const day=stop.start?new Date(`${stop.start}T12:00:00`):null;
      if(day)day.setDate(day.getDate()+i);
      const label=`${stop.destination} · ${day?day.toLocaleDateString('en-IN',{day:'numeric',month:'short'}):`Day ${i+1}`}`;
      const items=[pick('Dress',i) || [pick('Top',i)|| (destination.climate==='tropical'?'Breathable top':'Versatile top'),pick('Bottom',i)||'Comfortable bottom'].join(' + '),pick('Shoes',i)||'Walkable shoes'];
      const layer=pick('Layer',i)|| (destination.climate==='temperate'?'Light layer':undefined);
      if(layer)items.push(layer);
      if(by('Accessory').length)items.push(pick('Accessory',i)!);
      result.push({id:crypto.randomUUID(),label,items,packed:false});
    }
  });
  return result;
}

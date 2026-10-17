import type {DayStyle,DestinationName,TripDay,TripDetails} from './trip';

export type MoodLook={id:string;title:string;place:DestinationName;pinUrl:string;occasion:string;style:DayStyle;pieces:string[]};

// Public Pins are rendered by Pinterest's official widget. Images are never copied or proxied.
// Each style has four distinct Pins per destination. Thai stops rotate through a larger pool.
type PinIdea={pin:string;title:string;pieces:string[]};
const pin=(id:string,title:string,a:string,b:string):PinIdea=>({pin:id,title,pieces:[a,b]});
const thailand:Record<DayStyle,PinIdea[]>={
  Easy:[
    pin('125889752071619947','Chiang Mai cotton dress','White cotton dress','Flat sandals'),
    pin('518336238385150504','Phuket beach day','Beach cover-up','Raffia tote'),
    pin('248190629448687366','Temple day in Phuket','Summer dress','Comfortable sandals'),
    pin('157063105750853790','Krabi shore walk','Beach dress','Flat sandals'),
    pin('401805597982281656','Island floral dress','Floral summer dress','Woven bag'),
    pin('1024709721506701886','Bangkok linen dress','Linen dress','Walking sandals'),
    pin('600738037818291755','Bangkok skywalk day','Casual summer outfit','Flat sandals'),
    pin('829999406344478834','Chiang Mai outfit idea','Summer day outfit','Comfortable shoes'),
    pin('557320522636663906','Sunshine in Chiang Mai','Light cotton outfit','Woven bag'),
    pin('524317581637885802','Phuket beach club','Beach cover-up','Beach sandals'),
  ],
  Polished:[
    pin('624241198849278130','The white linen set','White linen shirt','White linen shorts'),
    pin('876161302494199648','Relaxed resort linen','Linen shirt','Linen trousers'),
    pin('20758848276249841','City-ready linen','Linen shirt','Tailored shorts'),
    pin('4596416114456742912','Bangkok co-ord','Matching summer set','Flat sandals'),
    pin('4607393595924883712','Chiang Mai floral set','Floral matching set','Minimal sandals'),
    pin('910571619380716823','Easy linen maxi','Linen maxi dress','Woven tote'),
    pin('4599653054355581952','Bangkok matching set','Summer matching set','Flat sandals'),
    pin('314900198962566341','Chiang Mai travel look','Lightweight dress','Walking sandals'),
    pin('711357703640341556','Chiang Mai feminine look','Summer blouse','Midi skirt'),
    pin('4590856949911922688','Bangkok linen blouse','Loose linen blouse','Tailored trousers'),
  ],
  Evening:[
    pin('422916221239107166','Resort dinner dress','One-shoulder dress','Metallic sandals'),
    pin('934215516456413408','Tropical print night','Tropical print dress','Clutch bag'),
    pin('12666442696128829','Beach dinner look','Resort maxi dress','Gold sandals'),
    pin('228205906113830560','Ruffle by the sea','Ruffle dress','Flat evening sandals'),
    pin('1049268413182917978','Fancy island dinner','Evening maxi dress','Small clutch'),
    pin('482870391315553997','Bangkok night market','Colorful summer outfit','Comfortable sandals'),
    pin('450922981453824504','Phuket sunset dress','Long summer dress','Evening sandals'),
    pin('120330621285973167','Silk by the beach','Silk halter dress','Metallic sandals'),
    pin('513128951311909305','Tropical sunset','Tropical evening outfit','Small clutch'),
    pin('946248571721856463','Vacation dinner','Dinner dress','Evening shoes'),
  ],
};
const cities:Record<'Paris'|'London'|'New York City',Record<DayStyle,PinIdea[]>>={
  Paris:{
    Easy:[
      pin('309692911898623269','Sunny Paris sneakers','Brown leather-effect bomber jacket','Yellow sneakers'),
      pin('95771929569808303','Jeans in Paris','Straight-leg jeans','Everyday flats'),
      pin('151503974962664920','A denim café day','Denim jeans','Casual shirt'),
      pin('919156605217566105','Parisian street style','Relaxed top','Walking shoes'),
    ],
    Polished:[
      pin('1058205243694297959','Trench and ballet flats','Classic trench coat','Ballet flats'),
      pin('589760513733141737','Tweed two-piece','Tweed jacket','Tweed skirt'),
      pin('1152428992147100211','The French jacket','Tweed blazer','Tailored trousers'),
      pin('946881890406914753','Pleated Paris set','Short tweed jacket','Pleated skirt'),
    ],
    Evening:[
      pin('290271138498097890','Satin skirt dinner','Black satin skirt','Evening top'),
      pin('1002402829563768473','Little black dress','Black evening dress','Kitten heels'),
      pin('168392473554122534','Black and white after dark','Black dinner outfit','Silver accessories'),
      pin('315533517615572276','Parisian slip dress','Slip dress','Evening shoes'),
    ],
  },
  London:{
    Easy:[
      pin('449797081553520897','Sunny London day','Casual day outfit','Walking sneakers'),
      pin('558587160054246035','Spring city walk','Spring top','Comfortable shoes'),
      pin('220746819229166963','Street-style weekend','Relaxed jacket','Straight jeans'),
      pin('976014550492174662','Autumn in London','Casual autumn coat','Ankle boots'),
    ],
    Polished:[
      pin('12877548907743324','Oxford Street layers','Tailored jacket','Structured bag'),
      pin('445434219405844264','Winter walk','Long coat','Ankle boots'),
      pin('543528248793989874','Black and white layers','Striped top','Black outerwear'),
      pin('449797081554283165','Comfortable tailoring','Blazer','Relaxed trousers'),
    ],
    Evening:[
      pin('471470654759567162','London dinner outfit','Dinner top','Evening trousers'),
      pin('533254412146618372','London girl after dark','Going-out outfit','Shoulder bag'),
      pin('49187820922973531','Date night in the city','Evening dress','Kitten heels'),
      pin('922323198778449391','Summer evening dress','Summer evening dress','Light jacket'),
    ],
  },
  'New York City':{
    Easy:[
      pin('327496204150375889','Summer street style','Summer top','Walking shoes'),
      pin('470485492342188365','NYC mornings','Trucker jacket','Casual trousers'),
      pin('317222367500942960','Soho in sneakers','Everyday sneakers','Straight jeans'),
      pin('667729082275610361','Downtown casual','Relaxed top','Denim jeans'),
    ],
    Polished:[
      pin('297870962873869110','Blazer and skirt','Tailored blazer','Midi skirt'),
      pin('530158187405356805','City-girl blazer','Oversized blazer','Tailored trousers'),
      pin('27092035257357140','Blazer and vintage denim','Oversized blazer','Straight jeans'),
      pin('106890191149907002','Leather skirt and boots','Leather-look skirt','Black boots'),
    ],
    Evening:[
      pin('295900638039466236','Pink Manhattan night','Pink evening dress','Dressy heels'),
      pin('107523509847637209','Lace after dark','Night-out dress','Lace tights'),
      pin('859835753864284699','The maxi moment','Evening maxi dress','Clutch bag'),
      pin('364650901094801388','NYC night style','Black evening dress','Statement earrings'),
    ],
  },
};
const thaiStops:DestinationName[]=['Bangkok','Phuket','Pattaya','Chiang Mai','Krabi'];
const styles:DayStyle[]=['Easy','Polished','Evening'];
const makeLook=(place:DestinationName,style:DayStyle,item:PinIdea,index:number):MoodLook=>({
  id:`${place.toLowerCase().replace(/\W+/g,'-')}-${style.toLowerCase()}-${index+1}`,
  title:item.title,place,pinUrl:`https://www.pinterest.com/pin/${item.pin}/`,
  occasion:style==='Evening'?'Evening':'Daytime',style,pieces:item.pieces,
});
export const looks:MoodLook[]=[
  ...(Object.keys(cities) as Array<keyof typeof cities>).flatMap(place=>styles.flatMap(style=>cities[place][style].map((item,index)=>makeLook(place,style,item,index)))),
  ...thaiStops.flatMap((place,stop)=>styles.flatMap(style=>Array.from({length:4},(_,index)=>makeLook(place,style,thailand[style][(stop*2+index)%10],index)))),
];
const legacyStyle:Record<string,DayStyle>={
  'thailand-city':'Polished','thailand-coast':'Easy','thailand-evening':'Evening',
  'paris-day':'Polished','paris-evening':'Evening','paris-easy':'Easy',
  'london-day':'Easy','london-autumn':'Polished','london-evening':'Evening',
  'new-york-day':'Easy','new-york-weekend':'Polished','new-york-evening':'Evening',
  'easy-morning':'Easy','easy-evening':'Easy','polished-morning':'Polished','polished-evening':'Polished',
  'evening-burgundy':'Evening','evening-blush':'Evening',
};
export function lookForDay(details:TripDetails,day:TripDay){
  const explicit=details.dayLooks?.[day.key];
  const match=looks.find(look=>look.id===explicit&&look.place===day.destination);
  if(match)return match;
  if(explicit&&legacyStyle[explicit])return looks.find(look=>look.place===day.destination&&look.style===legacyStyle[explicit]);
  if(day.dayInStop!==1)return undefined;
  return looks.find(look=>look.place===day.destination&&(details.selectedLooks||[]).includes(look.id));
}
export function looksForDestination(destination:DestinationName){
  return looks.filter(look=>look.place===destination);
}

export const retailers=[
  {name:'Myntra',url:(query:string)=>`https://www.myntra.com/${query.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim().replace(/\s+/g,'-')}-women`},
  {name:'AJIO',url:(query:string)=>`https://www.ajio.com/search/?text=${encodeURIComponent(query)}`},
  {name:'Nykaa Fashion',url:(query:string)=>`https://www.nykaafashion.com/catalogsearch/result/?q=${encodeURIComponent(query)}`},
  {name:'Zara',url:(query:string)=>`https://www.zara.com/in/en/search?searchTerm=${encodeURIComponent(query)}`},
  {name:'H&M',url:(query:string)=>`https://www2.hm.com/en_in/search-results.html?q=${encodeURIComponent(query)}`},
];

import type {DayStyle,DestinationName,TripDay,TripDetails} from './trip';

export type MoodLook={id:string;title:string;place:DestinationName;pinUrl:string;occasion:string;style:DayStyle;pieces:string[]};

// Public Pins are rendered by Pinterest's official widget. Images are never copied or proxied.
// Each style has eight distinct Pins per destination. Keep the first four in
// their original order so saved dayLooks continue pointing to the same Pin.
type PinIdea={pin:string;title:string;pieces:string[]};
const pin=(id:string,title:string,a:string,b:string):PinIdea=>({pin:id,title,pieces:[a,b]});
const thailand:Record<DayStyle,PinIdea[]>={
  Easy:[
    pin('125889752071619947','Chiang Mai cotton dress','White cotton dress','Flat sandals'),
    pin('518336238385150504','Phuket beach day','Beach cover-up','Raffia tote'),
    pin('248190629448687366','Temple day in Phuket','Summer dress','Comfortable sandals'),
    pin('157063105750853790','Krabi shore walk','Beach dress','Flat sandals'),
    pin('401805597982281656','Island floral dress','Floral summer dress','Woven bag'),
    pin('518336238385150504','Phuket beach day','Beach cover-up','Raffia tote'),
    pin('600738037818291755','Bangkok skywalk day','Casual summer outfit','Flat sandals'),
    pin('829999406344478834','Chiang Mai outfit idea','Summer day outfit','Comfortable shoes'),
    pin('557320522636663906','Sunshine in Chiang Mai','Light cotton outfit','Woven bag'),
    pin('524317581637885802','Phuket beach club','Beach cover-up','Beach sandals'),
    pin('33988172170763592','Bangkok streets','Light day dress','Walking sandals'),
    pin('509540145318817010','Thailand holiday sandals','Relaxed summer dress','Gladiator sandals'),
    pin('783907878926545175','Pattaya skort day','Summer skort','Lightweight top'),
    pin('30821578692084958','Beach dress and straw bag','Summer beach dress','Straw bag'),
    pin('31454897377242591','Seaside cotton dress','Cotton dress','Flat sandals'),
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
    pin('903464375228120948','Resort linen trousers','Linen trousers','Relaxed shirt'),
    pin('562950022188266876','Linen beach co-ord','Linen co-ord set','Minimal sandals'),
    pin('571394272120213953','Wide-leg summer set','Linen crop shirt','Wide-leg trousers'),
    pin('240872280066310078','Cotton linen shirt dress','Linen shirt dress','Structured tote'),
    pin('589197563788489659','Pattaya slip dress','Slip dress','Flat sandals'),
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
    pin('640566746988574565','Bangkok skyline dinner','Evening dress','Dressy sandals'),
    pin('1013661828628063624','Phuket sunset black dress','Black strapless midi dress','Evening sandals'),
    pin('592504894757979939','Thailand dinner dress','Summer dinner dress','Small bag'),
    pin('654640495857445730','Phuket white maxi','White maxi dress','Metallic sandals'),
    pin('952300283715615661','Bangkok satin skirt','Satin skirt','Backless top'),
  ],
};
const cities:Record<'Paris'|'London'|'New York City',Record<DayStyle,PinIdea[]>>={
  Paris:{
    Easy:[
      pin('309692911898623269','Sunny Paris sneakers','Brown leather-effect bomber jacket','Yellow sneakers'),
      pin('95771929569808303','Jeans in Paris','Straight-leg jeans','Everyday flats'),
      pin('151503974962664920','A denim café day','Denim jeans','Casual shirt'),
      pin('919156605217566105','Parisian street style','Relaxed top','Walking shoes'),
      pin('489273947001728510','Sneakers on Paris streets','Everyday sneakers','Relaxed trousers'),
      pin('413416440794750770','Paris city-trip layers','Classic trench coat','Jeans and sneakers'),
      pin('427490189629668312','Purple dress in Paris','Purple day dress','White sneakers'),
      pin('803611127294725775','Versailles in linen','Linen trousers','Light summer top'),
    ],
    Polished:[
      pin('1058205243694297959','Trench and ballet flats','Classic trench coat','Ballet flats'),
      pin('589760513733141737','Tweed two-piece','Tweed jacket','Tweed skirt'),
      pin('1152428992147100211','The French jacket','Tweed blazer','Tailored trousers'),
      pin('946881890406914753','Pleated Paris set','Short tweed jacket','Pleated skirt'),
      pin('336784878396833945','Paris trench moment','Classic trench coat','Tailored trousers'),
      pin('834503005992064968','Spring trench layers','Spring trench coat','Straight-leg jeans'),
      pin('730920214560572541','Ritz Paris tweed','Tweed jacket','Tweed skirt'),
      pin('68739622547','Paris linen dinner','Linen trousers','Chic evening top'),
    ],
    Evening:[
      pin('290271138498097890','Satin skirt dinner','Black satin skirt','Evening top'),
      pin('1002402829563768473','Little black dress','Black evening dress','Kitten heels'),
      pin('168392473554122534','Black and white after dark','Black dinner outfit','Silver accessories'),
      pin('315533517615572276','Parisian slip dress','Slip dress','Evening shoes'),
      pin('697846904788458709','Romantic dinner dress','Evening dress','Kitten heels'),
      pin('823525481883433455','Paris night-out dress','Party dress','Small shoulder bag'),
      pin('357473289191118416','Little black dress in Paris','Black mini dress','Evening heels'),
      pin('296252481755474851','Parisian evening chic','Evening dress','Dressy handbag'),
    ],
  },
  London:{
    Easy:[
      pin('449797081553520897','Sunny London day','Casual day outfit','Walking sneakers'),
      pin('558587160054246035','Spring city walk','Spring top','Comfortable shoes'),
      pin('220746819229166963','Street-style weekend','Relaxed jacket','Straight jeans'),
      pin('976014550492174662','Autumn in London','Casual autumn coat','Ankle boots'),
      pin('425660602301274642','London spring jeans','White shirt','Striped knit'),
      pin('566186984412453170','Spring denim and flats','Relaxed jeans','Flat shoes'),
      pin('282249101641339946','Colourful London spring','Colourful top','Dark denim'),
      pin('232216924519263816','London graphic tee day','Graphic T-shirt','Ripped jeans'),
    ],
    Polished:[
      pin('12877548907743324','Oxford Street layers','Tailored jacket','Structured bag'),
      pin('445434219405844264','Winter walk','Long coat','Ankle boots'),
      pin('543528248793989874','Black and white layers','Striped top','Black outerwear'),
      pin('449797081554283165','Comfortable tailoring','Blazer','Relaxed trousers'),
      pin('181269954743782857','London trench two ways','Long trench coat','Tailored trousers'),
      pin('276830708332215170','Checked blazer street style','Checked blazer','Straight-leg trousers'),
      pin('314829830196283401','Fashion-week trench','Classic trench coat','Structured bag'),
      pin('1130403575204537959','Sleeveless blazer and skirt','Sleeveless blazer','Midi skirt'),
    ],
    Evening:[
      pin('471470654759567162','London dinner outfit','Dinner top','Evening trousers'),
      pin('533254412146618372','London girl after dark','Going-out outfit','Shoulder bag'),
      pin('49187820922973531','Date night in the city','Evening dress','Kitten heels'),
      pin('922323198778449391','Summer evening dress','Summer evening dress','Light jacket'),
      pin('790874384597660730','London after-hours look','Evening outfit','Small shoulder bag'),
      pin('611293349457230803','Drinks in London','Going-out dress','Dressy heels'),
      pin('300122762678030487','London little black dress','Black mini dress','Evening bag'),
      pin('118078821474363101','Sparkle dinner dress','Sparkle black dress','Evening heels'),
    ],
  },
  'New York City':{
    Easy:[
      pin('327496204150375889','Summer street style','Summer top','Walking shoes'),
      pin('470485492342188365','NYC mornings','Trucker jacket','Casual trousers'),
      pin('317222367500942960','Soho in sneakers','Everyday sneakers','Straight jeans'),
      pin('667729082275610361','Downtown casual','Relaxed top','Denim jeans'),
      pin('1477812366005323','Purple skirt in the city','Purple pleated midi skirt','Denim shirt'),
      pin('20477373297100355','Bowery sneakers','Ripped jeans','Everyday sneakers'),
      pin('518476975862422775','Crop jeans downtown','Crop top','Cropped jeans'),
      pin('129408189288612617','Summer dress and sneakers','Long summer dress','White sneakers'),
    ],
    Polished:[
      pin('297870962873869110','Blazer and skirt','Tailored blazer','Midi skirt'),
      pin('530158187405356805','City-girl blazer','Oversized blazer','Tailored trousers'),
      pin('27092035257357140','Blazer and vintage denim','Oversized blazer','Straight jeans'),
      pin('106890191149907002','Leather skirt and boots','Leather-look skirt','Black boots'),
      pin('875105771340896040','Blazer and distressed denim','Polished blazer','Distressed jeans'),
      pin('587367976388956631','New York pink tailoring','Pink blazer','Tailored trousers'),
      pin('433893745367284173','Neutral city chic','Neutral top','Tailored trousers'),
      pin('55450639164186919','Scrunched-sleeve blazer','Tailored blazer','Crisp shirt'),
    ],
    Evening:[
      pin('295900638039466236','Pink Manhattan night','Pink evening dress','Dressy heels'),
      pin('107523509847637209','Lace after dark','Night-out dress','Lace tights'),
      pin('859835753864284699','The maxi moment','Evening maxi dress','Clutch bag'),
      pin('364650901094801388','NYC night style','Black evening dress','Statement earrings'),
      pin('4590575492289294336','New York two-piece night','Matching evening set','Dressy heels'),
      pin('56365432822228961','Lace mini in the city','Lace mini dress','Evening bag'),
      pin('891431319985585941','Effortless New York night','Night-out top','Tailored trousers'),
      pin('315885361380553385','Rooftop after dark','Rooftop party outfit','Small clutch'),
    ],
  },
};
const thaiStops:DestinationName[]=['Bangkok','Phuket','Pattaya','Chiang Mai','Krabi'];
const styles:DayStyle[]=['Easy','Polished','Evening'];
// Four additional pool positions per stop, in thaiStops order. These keep
// neighbouring Thai destinations from showing nearly identical eight-Pin sets.
const thaiExtras:Record<DayStyle,number[][]>={
  Easy:[[6,10,12,13],[7,9,10,14],[2,8,11,12],[0,10,13,14],[3,4,11,13]],
  Polished:[[6,7,11,12],[1,9,10,14],[3,11,13,14],[2,5,10,13],[4,11,12,14]],
  Evening:[[10,11,13,14],[6,10,11,12],[9,12,13,14],[0,2,10,13],[5,7,11,14]],
};
const makeLook=(place:DestinationName,style:DayStyle,item:PinIdea,index:number):MoodLook=>({
  id:`${place.toLowerCase().replace(/\W+/g,'-')}-${style.toLowerCase()}-${index+1}`,
  title:item.title,place,pinUrl:`https://www.pinterest.com/pin/${item.pin}/`,
  occasion:style==='Evening'?'Evening':'Daytime',style,pieces:item.pieces,
});
export const looks:MoodLook[]=[
  ...(Object.keys(cities) as Array<keyof typeof cities>).flatMap(place=>styles.flatMap(style=>cities[place][style].map((item,index)=>makeLook(place,style,item,index)))),
  ...thaiStops.flatMap((place,stop)=>styles.flatMap(style=>{
    const pool=thailand[style];
    const original=Array.from({length:4},(_,index)=>pool[(stop*2+index)%10]);
    const extras=thaiExtras[style][stop].map(index=>pool[index]);
    return [...original,...extras].map((item,index)=>makeLook(place,style,item,index));
  })),
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

import type {DestinationName, TripDetails} from './trip';

export type MoodLook={id:string;title:string;place:string;image:string;alt:string;occasion:string;season:'warm'|'cool'|'any';pieces:string[];tags:string[]};

export const looks:MoodLook[]=[
  {id:'thailand-city',title:'Linen in the city',place:'Thailand',image:'/moodboard/thailand-city.jpg',alt:'Ivory linen shirt and relaxed sand trousers in a Thai old town',occasion:'Sightseeing',season:'warm',pieces:['Ivory linen shirt','Beige linen trousers','Flat leather sandals','Woven tote'],tags:['easy','chic','minimal','linen','sightseeing']},
  {id:'thailand-coast',title:'Soft sun days',place:'Thailand',image:'/moodboard/thailand-coast.jpg',alt:'Butter yellow summer dress and woven tote at a Thai beach',occasion:'Beach',season:'warm',pieces:['Yellow cotton sundress','Tan flat sandals','Raffia tote'],tags:['colourful','colorful','romantic','beach','dining']},
  {id:'paris-day',title:'The café walk',place:'Paris',image:'/moodboard/paris-day.jpg',alt:'Beige trench, ivory shirt, dark jeans and ballet flats in Paris',occasion:'Sightseeing',season:'cool',pieces:['Beige trench coat','Ivory blouse','Dark straight jeans','Black ballet flats'],tags:['classic','chic','minimal','sightseeing']},
  {id:'paris-evening',title:'After dark in Paris',place:'Paris',image:'/moodboard/paris-evening.jpg',alt:'Black midi dress, cream blazer and heels at a Paris café',occasion:'Dining',season:'any',pieces:['Black midi dress','Cream blazer','Black kitten heels','Gold earrings'],tags:['dressy','romantic','dining','nightlife','chic']},
  {id:'london-day',title:'A London layer',place:'London',image:'/moodboard/london-day.jpg',alt:'Charcoal blazer, cream knit, dark jeans and ankle boots in London',occasion:'Sightseeing',season:'cool',pieces:['Charcoal blazer','Cream knit sweater','Dark straight jeans','Black ankle boots'],tags:['classic','minimal','sightseeing','work']},
  {id:'london-autumn',title:'Bookshop afternoon',place:'London',image:'/moodboard/london-autumn.jpg',alt:'Camel coat, ivory sweater, black midi skirt and tall boots in London',occasion:'Sightseeing',season:'cool',pieces:['Camel wool coat','Ivory knit sweater','Black midi skirt','Black knee-high boots'],tags:['classic','romantic','sightseeing']},
  {id:'new-york-day',title:'Soho in sneakers',place:'New York City',image:'/moodboard/new-york-day.jpg',alt:'White shirt, black tailored trousers and white sneakers in New York',occasion:'Sightseeing',season:'any',pieces:['White button-up shirt','Black tailored trousers','White sneakers','Tan shoulder bag'],tags:['easy','minimal','sightseeing','work']},
  {id:'new-york-weekend',title:'West Village weekend',place:'New York City',image:'/moodboard/new-york-weekend.jpg',alt:'Black blazer, striped top, blue jeans and loafers in New York',occasion:'Dining',season:'any',pieces:['Black blazer','Striped top','Blue straight jeans','Black loafers'],tags:['chic','classic','dining','sightseeing']},
];

export function looksForDestination(destination:DestinationName,details:TripDetails,start:string){
  const place=['Bangkok','Phuket','Pattaya','Chiang Mai','Krabi'].includes(destination)?'Thailand':destination;
  const month=start?Number(start.slice(5,7)):0;
  const cool=place==='Thailand'?false:month>=10||month<=3&&month>0;
  const preferences=`${details.style} ${details.activities.join(' ')}`.toLowerCase();
  return looks.filter(look=>look.place===place).sort((a,b)=>{
    const score=(look:MoodLook)=>look.tags.reduce((n,tag)=>n+(preferences.includes(tag)?2:0),0)+(look.season==='any'?1:look.season===(cool?'cool':'warm')?2:0);
    return score(b)-score(a);
  });
}

export const retailers=[
  {name:'Myntra',url:(query:string)=>`https://www.myntra.com/${query.toLowerCase().replace(/[^a-z0-9 ]/g,'').trim().replace(/\s+/g,'-')}-women`},
  {name:'AJIO',url:(query:string)=>`https://www.ajio.com/search/?text=${encodeURIComponent(query)}`},
  {name:'Nykaa Fashion',url:(query:string)=>`https://www.nykaafashion.com/catalogsearch/result/?q=${encodeURIComponent(query)}`},
  {name:'Zara',url:(query:string)=>`https://www.zara.com/in/en/search?searchTerm=${encodeURIComponent(query)}`},
  {name:'H&M',url:(query:string)=>`https://www2.hm.com/en_in/search-results.html?q=${encodeURIComponent(query)}`},
];

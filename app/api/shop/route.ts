import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {looks} from '../../../lib/moodboard';

export const runtime='nodejs';
export const maxDuration=45;

export async function GET(){return NextResponse.json({connected:!!process.env.SERPAPI_API_KEY})}

type VisualMatch={title?:unknown;source?:unknown;price?:unknown;thumbnail?:unknown;image?:unknown;link?:unknown};
const safeUrl=(value:unknown)=>{
  if(typeof value!=='string')return '';
  try{const url=new URL(value);return url.protocol==='https:'?url.href:''}catch{return ''}
};
const pinImageUrl=(value:unknown)=>{
  const href=safeUrl(value);
  if(!href)return '';
  const url=new URL(href);
  if(url.hostname!=='i.pinimg.com'||!/\.(jpe?g|png|webp)$/i.test(url.pathname))return '';
  url.pathname=url.pathname.replace(/^\/236x\//,'/736x/');
  return url.href;
};
const piecePattern=(piece:string)=>{
  if(/top|shirt|blouse|tee|sweater|jacket|blazer|coat|cover-up/i.test(piece))return /\b(top|shirt|blouse|tee|t-shirt|tank|camisole|sweater|jumper|jacket|blazer|coat|cover-up|cardigan)\b/i;
  if(/dress|gown/i.test(piece))return /\b(dress|gown|sundress|maxi|midi|mini)\b/i;
  if(/jeans|trousers|shorts|skirt|pants/i.test(piece))return /\b(jeans|denim|trousers|pants|shorts|skirt)\b/i;
  if(/shoe|sneaker|flat|sandal|boot|heel/i.test(piece))return /\b(shoe|sneaker|flat|sandal|boot|heel|loafer|pump|trainer|footwear)\b/i;
  if(/bag|tote|clutch/i.test(piece))return /\b(bag|tote|clutch|purse|handbag)\b/i;
  return null;
};
const excludedHost=/^(?:www\.)?(?:pinterest\.|instagram\.|facebook\.|youtube\.|tiktok\.|reddit\.|google\.|serpapi\.)/i;
const knownStore=/\b(myntra|ajio|nykaa|zara|h&m|asos|amazon|flipkart|shop|fashion|store|boutique)\b/i;

export async function POST(request:NextRequest){
  const key=process.env.SERPAPI_API_KEY;
  if(!key)return NextResponse.json({error:'Product search is not connected yet. Use the store links below in the meantime.',code:'not_configured'},{status:503});

  const token=request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if(!token)return NextResponse.json({error:'Please sign in to search for products.'},{status:401});
  const supabaseUrl=process.env.SUPABASE_URL;
  const supabaseKey=process.env.SUPABASE_SECRET_KEY;
  if(!supabaseUrl||!supabaseKey)return NextResponse.json({error:'Product search is temporarily unavailable.'},{status:503});
  const auth=createClient(supabaseUrl,supabaseKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:{user},error:authError}=await auth.auth.getUser(token);
  if(authError||!user)return NextResponse.json({error:'Please sign in again to search for products.'},{status:401});

  let input:unknown;
  try{input=await request.json()}catch{return NextResponse.json({error:'Choose a look and a piece first.'},{status:400})}
  if(!input||typeof input!=='object'||!('lookId' in input)||!('pieceIndex' in input))return NextResponse.json({error:'Choose a look and a piece first.'},{status:400});
  const {lookId,pieceIndex,imageUrl}=input as {lookId:unknown;pieceIndex:unknown;imageUrl?:unknown};
  const look=looks.find(item=>item.id===lookId);
  if(!look||!Number.isInteger(pieceIndex)||!look.pieces[pieceIndex as number])return NextResponse.json({error:'This outfit piece is unavailable.'},{status:400});
  const image=pinImageUrl(imageUrl);
  if(!image)return NextResponse.json({error:'This Pin image has not loaded yet. Wait a moment, then try again.'},{status:400});
  const piece=look.pieces[pieceIndex as number];
  const endpoint=new URL('https://serpapi.com/search.json');
  endpoint.search=new URLSearchParams({engine:'google_lens',type:'visual_matches',url:image,country:'in',hl:'en',api_key:key}).toString();
  try{
    const response=await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(35000)});
    if(!response.ok)throw new Error(`Search provider returned ${response.status}`);
    const payload=await response.json() as {error?:string;visual_matches?:VisualMatch[]};
    if(payload.error)throw new Error(payload.error);
    const pattern=piecePattern(piece);
    const products=(payload.visual_matches||[]).map(item=>({
      title:typeof item.title==='string'?item.title.slice(0,160):'',
      source:typeof item.source==='string'?item.source.slice(0,80):'',
      price:typeof item.price==='string'?item.price.slice(0,60):item.price&&typeof item.price==='object'&&'value' in item.price&&typeof item.price.value==='string'?item.price.value.slice(0,60):'',
      image:safeUrl(item.thumbnail)||safeUrl(item.image),
      url:safeUrl(item.link),
    })).filter(item=>{
      if(!item.title||!item.url||!item.image)return false;
      const host=new URL(item.url).hostname;
      return !excludedHost.test(host)&&(!pattern||pattern.test(item.title))&&(!!item.price||knownStore.test(`${item.source} ${host}`));
    }).slice(0,8);
    return NextResponse.json({piece,products});
  }catch(error){
    console.error('Product search failed:',error instanceof Error?error.message:error);
    return NextResponse.json({error:'We could not load products right now. Try a store link below.'},{status:502});
  }
}

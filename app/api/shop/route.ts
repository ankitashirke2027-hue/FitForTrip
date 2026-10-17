import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {looks} from '../../../lib/moodboard';

export const runtime='nodejs';
export const maxDuration=45;

export async function GET(){return NextResponse.json({connected:!!process.env.SERPAPI_API_KEY})}

type VisualMatch={title?:unknown;source?:unknown;price?:unknown;thumbnail?:unknown;image?:unknown;link?:unknown};
type ShoppingResult={title?:unknown;source?:unknown;price?:unknown;thumbnail?:unknown;link?:unknown;product_link?:unknown};
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
  if(/jacket|blazer|coat|cover-up/i.test(piece))return /\b(jacket|blazer|coat|bomber|outerwear|cover-up)\b/i;
  if(/top|shirt|blouse|tee|sweater/i.test(piece))return /\b(top|shirt|blouse|tee|t-shirt|tank|camisole|sweater|jumper|cardigan)\b/i;
  if(/dress|gown/i.test(piece))return /\b(dress|gown|sundress|maxi|midi|mini)\b/i;
  if(/jeans|trousers|shorts|skirt|pants/i.test(piece))return /\b(jeans|denim|trousers|pants|shorts|skirt)\b/i;
  if(/shoe|sneaker|flat|sandal|boot|heel/i.test(piece))return /\b(shoes?|sneakers?|flats?|sandals?|boots?|heels?|loafers?|pumps?|trainers?|footwear)\b/i;
  if(/bag|tote|clutch/i.test(piece))return /\b(bag|tote|clutch|purse|handbag)\b/i;
  return null;
};
const excludedHost=/^(?:www\.)?(?:pinterest\.|instagram\.|facebook\.|youtube\.|tiktok\.|reddit\.|google\.|serpapi\.)/i;
const knownStore=/\b(myntra|ajio|nykaa|zara|h&m|asos|amazon|flipkart|shop|fashion|store|boutique)\b/i;
const visualDescriptor=/\b(yellow|red|blue|green|pink|black|white|brown|beige|cream|gold|silver|metallic|floral|striped|tweed|linen|leather|silk|satin|denim|cotton|pleated|ruffle|one-shoulder|halter|straight-leg|wide-leg)\b/i;

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
  const {lookId,pieceIndex,imageUrl,mode}=input as {lookId:unknown;pieceIndex:unknown;imageUrl?:unknown;mode?:unknown};
  const look=looks.find(item=>item.id===lookId);
  if(!look||!Number.isInteger(pieceIndex)||!look.pieces[pieceIndex as number])return NextResponse.json({error:'This outfit piece is unavailable.'},{status:400});
  const piece=look.pieces[pieceIndex as number];
  const method=mode==='description'?'description':'image';
  if(method==='description'&&!visualDescriptor.test(piece))return NextResponse.json({error:'This piece needs a more specific description before we can search by text.'},{status:400});
  const image=pinImageUrl(imageUrl);
  if(method==='image'&&!image)return NextResponse.json({error:'This Pin image has not loaded yet. Wait a moment, then try again.'},{status:400});
  const endpoint=new URL('https://serpapi.com/search.json');
  endpoint.search=new URLSearchParams(method==='image'?{engine:'google_lens',type:'visual_matches',url:image,country:'in',hl:'en',api_key:key}:{engine:'google_shopping',q:`women ${piece}`,gl:'in',hl:'en',api_key:key}).toString();
  try{
    const response=await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(35000)});
    if(!response.ok)throw new Error(`Search provider returned ${response.status}`);
    const payload=await response.json() as {error?:string;visual_matches?:VisualMatch[];shopping_results?:ShoppingResult[]};
    if(payload.error)throw new Error(payload.error);
    const pattern=piecePattern(piece);
    const matches=method==='image'?(payload.visual_matches||[]):(payload.shopping_results||[]);
    const seenImages=new Set<string>();
    const products=matches.map(item=>({
      title:typeof item.title==='string'?item.title.slice(0,160):'',
      source:typeof item.source==='string'?item.source.slice(0,80):'',
      price:typeof item.price==='string'?item.price.slice(0,60):item.price&&typeof item.price==='object'&&'value' in item.price&&typeof item.price.value==='string'?item.price.value.slice(0,60):'',
      image:safeUrl(item.thumbnail)||(method==='image'?safeUrl((item as VisualMatch).image):''),
      url:safeUrl(item.link)||(method==='description'?safeUrl((item as ShoppingResult).product_link):''),
    })).filter(item=>{
      if(!item.title||!item.url||!item.image)return false;
      const host=new URL(item.url).hostname;
      if(host==='www.zara.com'&&!new URL(item.url).pathname.startsWith('/in/'))return false;
      const color=piece.match(/\b(yellow|red|blue|green|pink|black|white|brown|beige|cream|gold|silver)\b/i)?.[0];
      if(method==='image'&&excludedHost.test(host))return false;
      if(method==='description'&&host!=='www.google.com'&&excludedHost.test(host))return false;
      if(pattern&&!pattern.test(item.title))return false;
      if(color&&method==='description'&&!item.title.toLowerCase().includes(color.toLowerCase()))return false;
      if(method==='image'&&!item.price&&!knownStore.test(`${item.source} ${host}`))return false;
      if(seenImages.has(item.image))return false;
      seenImages.add(item.image);
      return true;
    }).slice(0,8);
    return NextResponse.json({piece,products,method});
  }catch(error){
    console.error('Product search failed:',error instanceof Error?error.message:error);
    return NextResponse.json({error:'We could not load products right now. Try a store link below.'},{status:502});
  }
}

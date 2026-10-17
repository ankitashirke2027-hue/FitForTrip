import {createClient} from '@supabase/supabase-js';
import {NextRequest,NextResponse} from 'next/server';
import {looks} from '../../../lib/moodboard';

export const runtime='nodejs';

export async function GET(){return NextResponse.json({connected:!!process.env.SERPAPI_API_KEY})}

type ShoppingResult={title?:unknown;source?:unknown;price?:unknown;thumbnail?:unknown;link?:unknown;product_link?:unknown};
const safeUrl=(value:unknown)=>{
  if(typeof value!=='string')return '';
  try{const url=new URL(value);return url.protocol==='https:'?url.href:''}catch{return ''}
};

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
  const {lookId,pieceIndex}=input as {lookId:unknown;pieceIndex:unknown};
  const look=looks.find(item=>item.id===lookId);
  if(!look||!Number.isInteger(pieceIndex)||!look.pieces[pieceIndex as number])return NextResponse.json({error:'This outfit piece is unavailable.'},{status:400});
  const piece=look.pieces[pieceIndex as number];
  const query=`women ${piece} ${look.style==='Evening'?'evening':'daywear'}`;
  const endpoint=new URL('https://serpapi.com/search.json');
  endpoint.search=new URLSearchParams({engine:'google_shopping',q:query,gl:'in',hl:'en',api_key:key}).toString();
  try{
    const response=await fetch(endpoint,{cache:'no-store',signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw new Error(`Search provider returned ${response.status}`);
    const payload=await response.json() as {error?:string;shopping_results?:ShoppingResult[]};
    if(payload.error)throw new Error(payload.error);
    const products=(payload.shopping_results||[]).map(item=>({
      title:typeof item.title==='string'?item.title.slice(0,160):'',
      source:typeof item.source==='string'?item.source.slice(0,80):'',
      price:typeof item.price==='string'?item.price.slice(0,60):'',
      image:safeUrl(item.thumbnail),
      url:safeUrl(item.link)||safeUrl(item.product_link),
    })).filter(item=>item.title&&item.url).slice(0,8);
    return NextResponse.json({piece,products});
  }catch(error){
    console.error('Product search failed:',error instanceof Error?error.message:error);
    return NextResponse.json({error:'We could not load products right now. Try a store link below.'},{status:502});
  }
}

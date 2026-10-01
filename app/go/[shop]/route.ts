import {NextResponse} from 'next/server';

const retailers = {
  myntra: {fallback:'https://www.myntra.com/', affiliate:process.env.MYNTRA_AFFILIATE_URL},
  ajio: {fallback:'https://www.ajio.com/', affiliate:process.env.AJIO_AFFILIATE_URL},
  'nykaa-fashion': {fallback:'https://www.nykaafashion.com/', affiliate:process.env.NYKAA_FASHION_AFFILIATE_URL},
  zara: {fallback:'https://www.zara.com/in/', affiliate:process.env.ZARA_AFFILIATE_URL},
  hm: {fallback:'https://www2.hm.com/en_in/', affiliate:process.env.HM_AFFILIATE_URL},
} as const;

export async function GET(_request:Request,{params}:{params:Promise<{shop:string}>}){
  const {shop}=await params;
  const retailer=retailers[shop as keyof typeof retailers];
  if(!retailer)return new Response('Shop not found',{status:404});
  let destination:string=retailer.fallback;
  if(retailer.affiliate){
    try{
      const parsed=new URL(retailer.affiliate);
      if(parsed.protocol==='https:')destination=parsed.href;
    }catch{/* An invalid affiliate URL safely falls back to the store. */}
  }
  return NextResponse.redirect(destination,{status:302,headers:{'Cache-Control':'no-store'}});
}

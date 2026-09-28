import { services } from '@/lib/services';
import { validateQuote, quoteText } from '@/lib/quote';
import { site } from '@/lib/site';
export const runtime='nodejs';
const reply=(error:string,status:number)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const origin=request.headers.get('origin');const allowed=new Set([site.url,'https://www.saeedcontracting.ca','https://saeed-contracting.vercel.app']);
 if(process.env.VERCEL_URL)allowed.add(`https://${process.env.VERCEL_URL}`);
 if(process.env.NODE_ENV!=='production')allowed.add('http://localhost:3000');
 if(!origin||!allowed.has(origin))return reply('Request origin is not allowed.',403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply('Unsupported request format.',415);
 if(Number(request.headers.get('content-length')||0)>16384)return reply('Request is too large.',413);
 let body:Record<string,unknown>;
 try{if(!request.body)return reply('Empty request.',400);const reader=request.body.getReader();const chunks:Uint8Array[]=[];let length=0;while(true){const{done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>16384){await reader.cancel();return reply('Request is too large.',413);}chunks.push(value);}const parsed=JSON.parse(Buffer.concat(chunks).toString('utf8'));if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return reply('Invalid request.',400);body=parsed;}catch{return reply('Invalid request.',400);}
 if(body.website)return reply('Unable to accept this request. Please contact us directly.',400);
 const checked=validateQuote(body,services.map(s=>s.slug));if(!checked.value)return reply(checked.error||'Check the form fields.',400);
 const key=process.env.RESEND_API_KEY;const from=process.env.QUOTE_FROM_EMAIL;const secret=process.env.TURNSTILE_SECRET_KEY;
 if(!key||!from||!secret||!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)return reply('Online sending is unavailable. Please email info@saeedcontracting.ca or call 604-627-0166.',503);
 if(typeof body.startedAt!=='number'||Date.now()-body.startedAt<2500||Date.now()-body.startedAt>86400000)return reply('Please take a moment to check the form, then try again.',400);
 if(typeof body.token!=='string'||body.token.length>2048||!body.token)return reply('Please complete the security check.',400);
 try{
 const challenge=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret,response:body.token}),signal:AbortSignal.timeout(8000)});
 if(!challenge.ok)return reply('Security verification is unavailable. Please email or call us.',503);
 const verified=await challenge.json();const hosts=new Set([...allowed].map(u=>new URL(u).hostname));
 if(!verified.success||verified.action!=='quote'||!hosts.has(verified.hostname))return reply('Security check expired or failed. Please try again.',400);
 const q=checked.value;const service=services.find(s=>s.slug===q.service)?.name||'Multiple services / not sure';
 const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':`quote-${await digest(body.token)}`},body:JSON.stringify({from,to:[site.email],reply_to:q.email,subject:`Website quote request — ${service}`,text:quoteText(q,service)}),signal:AbortSignal.timeout(10000)});
 if(!result.ok)return reply('Your request could not be sent. Please email or call us directly.',502);
 const sent=await result.json();if(!sent.id)return reply('We could not confirm delivery. Please contact us directly.',502);
 return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return reply('We could not confirm that your request was sent. Please email or call us directly.',503);}
}
async function digest(value:string){const buffer=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Buffer.from(buffer).toString('hex');}

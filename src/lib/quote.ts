export type Quote={name:string;phone:string;email:string;city:string;service:string;description:string;timing:string;consent:boolean};
export const timings=['Flexible','As soon as available','Within 2 weeks','Within a month','Planning ahead'];
export function validateQuote(input:unknown,serviceSlugs:string[]):{value?:Quote;error?:string}{
 if(!input||typeof input!=='object'||Array.isArray(input))return{error:'Please complete the project details.'};
 const data=input as Record<string,unknown>;
 const limits:Record<string,number>={name:100,phone:32,email:254,city:100,service:80,description:1200,timing:40};
 const fields:Record<string,string>={};
 for(const [key,max]of Object.entries(limits)){if(typeof data[key]!=='string')return{error:'Please complete all required fields.'};const value=(data[key] as string).trim();if(!value||value.length>max||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)||(key!=='description'&&/[\r\n]/.test(value)))return{error:`Please check the ${key} field.`};fields[key]=value;}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))return{error:'Please enter a valid email address.'};
 const digits=fields.phone.replace(/\D/g,'');if(digits.length<10||digits.length>15||!/^\+?[0-9 ()\-.]+$/.test(fields.phone))return{error:'Please enter a valid phone number with area code.'};
 if(![...serviceSlugs,'not-sure'].includes(fields.service))return{error:'Please choose a current service.'};
 if(!timings.includes(fields.timing))return{error:'Please choose your preferred timing.'};
 if(fields.description.length<20)return{error:'Please describe your project in at least 20 characters.'};
 if(data.consent!==true)return{error:'Please agree to be contacted about this request.'};
 return{value:{...fields,consent:true}as Quote};
}
export function quoteText(q:Quote,serviceName:string){return `Quote request — Saeed Contracting\n\nName: ${q.name}\nPhone: ${q.phone}\nEmail: ${q.email}\nCity / neighbourhood: ${q.city}\nService: ${serviceName}\nTiming: ${q.timing}\n\nProject details:\n${q.description}\n\nI agree to be contacted about this project.`;}

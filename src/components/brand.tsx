import Image from 'next/image';
export function Brand({large=false}:{large?:boolean}){return <Image src="/brand/logo-horizontal.svg" width={260} height={72} alt="Saeed Contracting" className={large?'brand brand-large':'brand'} priority/>;}
export function Arrow({diagonal=false}:{diagonal?:boolean}){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal?'M6 18 18 6M6 6h12v12':'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5"/></svg>;}

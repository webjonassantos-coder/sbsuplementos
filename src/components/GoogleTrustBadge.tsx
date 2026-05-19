import React from 'react';
import { Star } from 'lucide-react';

export function GoogleTrustBadge() {
  return (
    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-lg border border-slate-100 ring-4 ring-slate-50">
      <img 
        src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
        alt="Google" 
        className="h-5 object-contain"
      />
      <div className="w-[1px] h-6 bg-slate-200" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-black text-slate-800">4.9</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Certificado Google</span>
      </div>
    </div>
  );
}

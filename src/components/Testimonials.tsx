import { TESTIMONIALS } from '../data';
import { Star, Quote, Heart } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-blue-950 text-white relative overflow-hidden">
      {/* Visual background grids */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Warm glow decorators */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-emerald-400 tracking-widest uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 inline-flex items-center gap-1.5">
            <Heart size={12} className="text-emerald-400" />
            Patient Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted By Families In Dera Ismail Khan
          </h2>
          <p className="text-base text-blue-200">
            Read professional patient experiences detailing the quality of care, detailed clinical consultations, and reliable therapeutic results under Dr. Abdullah's supervision.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-xl"
              id={`testimonial-card-${test.id}`}
            >
              {/* Quote icon & Rating stars */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-emerald-400 opacity-60">
                    <Quote size={24} />
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                </div>

                {/* Review Message */}
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic font-medium">
                  "{test.review}"
                </p>
              </div>

              {/* Patient details */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold text-white tracking-tight">{test.name}</h4>
                <p className="text-xs text-blue-300 font-semibold mt-0.5">{test.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary metric banner */}
        <div className="mt-16 text-center max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center space-x-3 text-sm">
          <span className="text-emerald-400 font-extrabold text-base">★ 4.9 out of 5</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200 font-medium">Average Patient Rating across 1,200+ local clinical logs</span>
        </div>

      </div>
    </section>
  );
}

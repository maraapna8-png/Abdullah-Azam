import { FEATURES } from '../data';
import LucideIcon from './LucideIcon';
import { ShieldCheck, Plus, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 -ml-40 z-0" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-40 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            Patient-Centered Medicine Rooted In Trust & Care
          </h2>
          <p className="text-base text-slate-600 font-medium">
            We are dedicated to elevating healthcare standards in Dera Ismail Khan, combining modern therapeutic insights with an environment of warmth and respect.
          </p>
        </div>

        {/* Bento/Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="relative overflow-hidden bg-slate-50/50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300"
              id={`why-choose-us-card-${feat.id}`}
            >
              {/* Card top badge accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-550 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-100">
                <LucideIcon name={feat.iconName} size={22} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {feat.description}
              </p>

              {/* Subtle design details */}
              <div className="absolute bottom-4 right-4 text-slate-200 pointer-events-none">
                <Plus size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Assurance Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="text-emerald-400 font-bold text-xs tracking-wider uppercase flex items-center justify-center md:justify-start gap-1">
                <Sparkles size={12} />
                Strict Medical Quality Standards
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Are You Experiencing Urgent General Health Issues?
              </h3>
              <p className="text-sm text-blue-200 max-w-xl">
                Get direct consulting support, detailed evaluations, and accurate prescriptions. We are dedicated to providing the attention you deserve.
              </p>
            </div>

            <button
              onClick={() => {
                document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-7 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm tracking-wide"
              id="why-us-cta-btn"
            >
              Book My Slot Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

import { CLINIC_INFO } from '../data';
import { ShieldCheck, UserCheck2, Clock, MapPin, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  // Use the generated medical background image path
  const heroImageSrc = '/src/assets/images/hero_clinic_bg_1784609750809.jpg';

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageSrc}
          alt="Dr. Abdullah Medical Clinic"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Modern multi-layer gradient overlay to ensure excellent text contrast and brand integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent md:bg-gradient-to-r md:from-white md:via-white/90 md:to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Tagline / Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm shadow-blue-50">
            <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
            <span>PMC Registered General Physician & Consultant</span>
          </div>

          {/* Large Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-950 tracking-tight leading-none mb-4">
            <span className="block text-emerald-600 font-medium text-lg sm:text-xl tracking-wider uppercase mb-1">
              Welcome to the Medical Practice of
            </span>
            Dr. Abdullah
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed mb-8">
            {CLINIC_INFO.tagline}
          </p>

          {/* Doctor Info Highlights */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 border-y border-slate-100 py-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</h4>
                <p className="text-sm font-semibold text-slate-800">Dera Ismail Khan</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Hours</h4>
                <p className="text-sm font-semibold text-slate-800">Mon - Sat (Two Sessions)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onBookClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
              id="hero-book-btn"
            >
              Book Appointment
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base px-8 py-4 rounded-xl transition-all hover:border-slate-300 text-center cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Floating Trust Indicator (Desktop) */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 items-center space-x-3.5 max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-100 shrink-0">
          ✓
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Prompt Healthcare Access</h4>
          <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
            Receive personalized diagnostic evaluations directly from Dr. Abdullah.
          </p>
        </div>
      </div>
    </section>
  );
}

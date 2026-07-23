import { CLINIC_INFO } from '../data';
import { ShieldCheck, UserCheck2, Clock, MapPin, ArrowRight } from 'lucide-react';
import doctorImageSrc from '../assets/images/user_abdullah_photo_1784796792971.jpg';
import heroBgSrc from '../assets/images/hero_clinic_bg_1784609750809.jpg';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgSrc}
          alt="Dr. Abdullah Medical Clinic"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Modern multi-layer gradient overlay to ensure excellent text contrast and brand integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 md:bg-gradient-to-r md:from-white md:via-white/90 md:to-slate-50/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline / Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
              <span>PMC Registered General Physician & Consultant</span>
            </div>

            {/* Large Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-950 tracking-tight leading-tight">
              <span className="block text-emerald-600 font-bold text-lg sm:text-xl tracking-wider uppercase mb-1">
                Welcome to the Medical Practice of
              </span>
              Dr. Abdullah
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
              {CLINIC_INFO.tagline}
            </p>

            {/* Doctor Info Highlights */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 border-y border-slate-200/80 py-5 my-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-bold text-slate-800">Dera Ismail Khan</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Practice Hours</h4>
                  <p className="text-sm font-bold text-slate-800">Mon - Sat (2 Sessions)</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onBookClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
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
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base px-8 py-4 rounded-xl transition-all hover:border-slate-300 text-center cursor-pointer shadow-sm"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Column: Featured Doctor Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-3xl blur-md opacity-20" />
              
              {/* Doctor Card */}
              <div className="relative bg-white border border-slate-200 rounded-3xl p-5 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-100 shadow-inner group">
                  <img
                    src={doctorImageSrc}
                    alt="Dr. Abdullah - General Physician"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Available For Consultation</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-600 text-[10px] font-extrabold uppercase tracking-widest rounded-md mb-1">
                      Certified Practitioner
                    </span>
                    <h3 className="text-xl font-extrabold leading-tight">Dr. Abdullah</h3>
                    <p className="text-xs text-blue-200 font-medium">{CLINIC_INFO.title}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <UserCheck2 size={16} className="text-blue-600" />
                    <span>PMC Verified Medical Officer</span>
                  </div>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    DI Khan Clinic
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

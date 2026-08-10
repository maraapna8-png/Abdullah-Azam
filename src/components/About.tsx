import { CLINIC_INFO } from '../data';
import { Heart, ShieldCheck, Award, ThumbsUp } from 'lucide-react';
import doctorImageSrc from '../assets/images/dr_abdullah_photo_v6.jpg';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -ml-20 -mb-20 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Medical Card / Profile Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative">
              {/* Doctor Graphic Card Frame */}
              <div className="relative z-10 bg-gradient-to-tr from-blue-900 to-blue-800 text-white rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden max-w-md mx-auto">
                {/* Background decorative grid */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Badge */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-white/10">
                  Senior Consultant
                </div>

                {/* Doctor Portrait Image */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-lg mb-6 shrink-0">
                  <img
                    src={doctorImageSrc}
                    alt={CLINIC_INFO.doctorName}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.failed) {
                        target.dataset.failed = 'true';
                        target.src = '/dr-abdullah-photo.jpg';
                      }
                    }}
                  />
                </div>

                {/* Title & Name */}
                <h3 className="text-2xl font-extrabold tracking-tight">{CLINIC_INFO.doctorName}</h3>
                <p className="text-blue-200 font-medium text-sm mt-1">{CLINIC_INFO.title}</p>
                
                {/* Core philosophy quote */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="italic text-blue-100 text-sm leading-relaxed">
                    "My mission is to deliver comprehensive, high-quality healthcare that is accessible, empathetic, and tailored to the unique narrative of every patient."
                  </p>
                </div>

                {/* Medical Practice Highlights */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2.5 text-xs text-blue-100">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>Accurate Diagnostic Methodology</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-blue-100">
                    <Heart size={16} className="text-emerald-400 shrink-0" />
                    <span>Compassionate Patient-Centered Treatment</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-blue-100">
                    <Award size={16} className="text-emerald-400 shrink-0" />
                    <span>Preventive Wellness Advocacy</span>
                  </div>
                </div>
              </div>

              {/* Decorative behind card shadow */}
              <div className="absolute inset-4 -bottom-4 bg-emerald-500/20 rounded-3xl blur-xl z-0 max-w-md mx-auto" />
            </div>
          </div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase">
                About the Doctor
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
                Dedicated to Patient Care, Guided by Professional Excellence
              </h2>
            </div>

            {/* Introductory bio */}
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              {CLINIC_INFO.aboutShort}
            </p>

            {/* Extended biography loops */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {CLINIC_INFO.aboutLong.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
              {CLINIC_INFO.stats.map((stat, i) => (
                <div key={i} className="bg-slate-50/60 border border-slate-100 p-4 rounded-2xl text-center shadow-sm">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="block text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

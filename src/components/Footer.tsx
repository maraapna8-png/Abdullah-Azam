import { CLINIC_INFO } from '../data';
import { Phone, MapPin, Mail, ShieldAlert, Heart, ArrowUp, Lock, UserCheck } from 'lucide-react';

interface FooterProps {
  onViewPortal: () => void;
  onOpenPatientPortal?: () => void;
}

export default function Footer({ onViewPortal, onOpenPatientPortal }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Main Info Block */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {CLINIC_INFO.doctorName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing modern clinical consultation, family checkups, accurate diagnosis, and personalized medical wellness therapies directly in Dera Ismail Khan, Pakistan.
            </p>
            <div className="flex space-x-3.5 pt-2">
              {/* Fake but clean responsive social anchors */}
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors text-xs font-bold" aria-label="Facebook">F</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-400 text-white flex items-center justify-center transition-colors text-xs font-bold" aria-label="Twitter">T</a>
              <a href="#appointment" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors text-xs font-bold" aria-label="WhatsApp" title="Book Appointment First">W</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-500 text-white flex items-center justify-center transition-colors text-xs font-bold" aria-label="Youtube">Y</a>
            </div>
          </div>

          {/* Quick Sitemap */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Practice sections</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Dr. Abdullah</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Clinical Services</a></li>
              <li><a href="#why-choose-us" className="hover:text-emerald-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#appointment" className="hover:text-emerald-400 transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Core Contacts */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Clinic Helpline</h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start space-x-2.5">
                <Phone size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="text-white hover:text-emerald-400 font-bold block">
                    {CLINIC_INFO.phone}
                  </a>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Call & Helpline</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <a
                  href="#appointment"
                  className="flex items-start space-x-2.5 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">W</span>
                  <div>
                    <span className="text-white hover:text-emerald-400 font-bold block">{CLINIC_INFO.whatsapp}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold uppercase block">WhatsApp (Book Appointment First)</span>
                  </div>
                </a>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">{CLINIC_INFO.address}</span>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase block">Dera Ismail Khan, Pakistan</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} {CLINIC_INFO.doctorName} Clinic. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-1">
              PMC Accredited general physician practice
            </span>
          </div>

          {/* Bottom Action row */}
          <div className="flex items-center space-x-3">
            {onOpenPatientPortal && (
              <button
                onClick={onOpenPatientPortal}
                className="text-slate-400 hover:text-blue-400 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer font-semibold text-xs"
                id="btn-footer-patient-portal"
              >
                <UserCheck size={12} />
                <span>Patient Login</span>
              </button>
            )}
            <button
              onClick={onViewPortal}
              className="text-slate-500 hover:text-emerald-400 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer text-xs"
              id="btn-footer-portal"
            >
              <Lock size={12} />
              <span>Doctor Access</span>
            </button>
            <button
              onClick={handleScrollToTop}
              className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Scroll to Top"
              id="btn-footer-scroll-top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

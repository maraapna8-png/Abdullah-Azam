import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface NavbarProps {
  onBookClick: () => void;
  onViewPortal: () => void;
  viewMode: 'public' | 'doctor';
  onSetViewMode: (mode: 'public' | 'doctor') => void;
}

export default function Navbar({ onBookClick, onViewPortal, viewMode, onSetViewMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (viewMode === 'doctor') {
      onSetViewMode('public');
      // Delay slightly to allow transition and DOM rendering
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || viewMode === 'doctor'
          ? 'bg-white shadow-md py-3'
          : 'bg-white/95 backdrop-blur-md md:bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Branding */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              A
            </div>
            <div>
              <span className="text-xl font-bold text-blue-900 block tracking-tight">
                {CLINIC_INFO.doctorName}
              </span>
              <span className="text-xs font-semibold text-emerald-600 block -mt-1 tracking-wider uppercase">
                Clinic & Consultant
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {viewMode === 'public' ? (
              <>
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  About Dr. Abdullah
                </a>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Services
                </a>
                <a
                  href="#why-choose-us"
                  onClick={(e) => handleNavClick(e, 'why-choose-us')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Why Us
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNavClick(e, 'testimonials')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Reviews
                </a>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, 'faq')}
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  FAQs
                </a>
              </>
            ) : (
              <button
                onClick={() => onSetViewMode('public')}
                className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors flex items-center gap-1"
              >
                ← Back to Main Website
              </button>
            )}

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onViewPortal}
                className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 ${
                  viewMode === 'doctor'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
                title="Secure Doctor's Portal"
                id="btn-portal-desktop"
              >
                <Lock size={14} className={viewMode === 'doctor' ? 'text-emerald-500' : 'text-slate-400'} />
                {viewMode === 'doctor' ? "Portal Active" : "Doctor Portal"}
              </button>

              <button
                onClick={onBookClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                id="btn-book-desktop"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onViewPortal}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 ${
                viewMode === 'doctor'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
              id="btn-portal-mobile"
            >
              <Lock size={13} />
              <span>Doctor</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600 p-1.5 rounded-lg border border-slate-200 bg-slate-50"
              id="btn-mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl px-4 pt-4 pb-6 space-y-3">
          {viewMode === 'public' ? (
            <div className="flex flex-col space-y-3">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                About Dr. Abdullah
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                Services
              </a>
              <a
                href="#why-choose-us"
                onClick={(e) => handleNavClick(e, 'why-choose-us')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                Why Choose Us
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, 'testimonials')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                Reviews
              </a>
              <a
                href="#faq"
                onClick={(e) => handleNavClick(e, 'faq')}
                className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
              >
                FAQs
              </a>
            </div>
          ) : (
            <button
              onClick={() => {
                onSetViewMode('public');
                setIsOpen(false);
              }}
              className="w-full text-left text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium text-base transition-colors"
            >
              ← Back to Main Website
            </button>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2.5 rounded-xl shadow-sm cursor-pointer"
              id="btn-book-mobile"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

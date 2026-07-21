/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DoctorDashboard from './components/DoctorDashboard';
import { Megaphone, X, Clock, HelpCircle, Phone } from 'lucide-react';
import { CLINIC_INFO } from './data';

export default function App() {
  const [viewMode, setViewMode] = useState<'public' | 'doctor'>('public');
  const [preselectedService, setPreselectedService] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Sync announcements from localStorage when entering public view or on initial load
  useEffect(() => {
    const loadedAnnouncement = localStorage.getItem('dr_abdullah_announcement') || '';
    setAnnouncement(loadedAnnouncement);
    setShowAnnouncement(!!loadedAnnouncement);
  }, [viewMode]);

  const handleBookClick = () => {
    setViewMode('public');
    setTimeout(() => {
      document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setViewMode('public');
    setTimeout(() => {
      document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleDoctorPortal = () => {
    setViewMode(viewMode === 'doctor' ? 'public' : 'doctor');
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Notification Announcement Bar (Public view only) */}
      {viewMode === 'public' && announcement && showAnnouncement && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs sm:text-sm font-bold py-2.5 px-4 relative z-50 text-center shadow-md animate-in slide-in-from-top duration-300 flex items-center justify-center gap-2">
          <Megaphone size={16} className="animate-bounce shrink-0" />
          <span className="max-w-4xl truncate">
            {announcement}
          </span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0 ml-2"
            aria-label="Dismiss announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sticky Navigation */}
      <Navbar
        onBookClick={handleBookClick}
        onViewPortal={toggleDoctorPortal}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {viewMode === 'doctor' ? (
          <DoctorDashboard onClose={() => setViewMode('public')} />
        ) : (
          <div className="space-y-0">
            {/* Hero Banner */}
            <Hero onBookClick={handleBookClick} />

            {/* About Doctor */}
            <About />

            {/* Services Grid & Accordion */}
            <Services onBookService={handleServiceSelect} />

            {/* Value Highlights */}
            <WhyChooseUs />

            {/* Interactive Registration Form */}
            <BookingForm
              preselectedService={preselectedService}
              onBookingSuccess={() => {
                // Clear preselected service on success
                setPreselectedService('');
              }}
            />

            {/* Reviews Carousel */}
            <Testimonials />

            {/* Support Center Accordion */}
            <FAQ />

            {/* Coordinates & Embed Frame */}
            <Contact />
          </div>
        )}
      </main>

      {/* Shared Footer */}
      <Footer onViewPortal={toggleDoctorPortal} />
    </div>
  );
}


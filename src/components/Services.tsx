import React, { useState } from 'react';
import { SERVICES } from '../data';
import LucideIcon from './LucideIcon';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onBookService: (serviceTitle: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] [background-size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            Comprehensive Healthcare Tailored To Your Needs
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Dr. Abdullah provides a complete spectrum of general medical practice and specialty wellness solutions designed to support your family's lasting recovery and health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Icon Wrapper */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <LucideIcon name={service.iconName} size={28} />
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Service Short Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {service.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-blue-600 group-hover:text-emerald-600 flex items-center gap-1 transition-colors cursor-pointer"
                  id={`btn-learn-service-${service.id}`}
                >
                  View Details
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3.5 py-2 rounded-xl transition-all border border-slate-100 hover:border-blue-100 cursor-pointer"
                  id={`btn-book-service-${service.id}`}
                >
                  Book This
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal / Drawer for Services */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header banner */}
            <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 sm:p-8">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close details"
                  id="btn-close-service-modal"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <LucideIcon name={selectedService.iconName} size={24} className="text-emerald-300" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">{selectedService.title}</h3>
              <p className="text-blue-200 text-xs font-semibold tracking-wider uppercase mt-1">Clinical Overview</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Description</h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {selectedService.description}
                </p>
              </div>

              {selectedService.fullDetails && (
                <div className="space-y-3 bg-blue-50/50 border border-blue-50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="text-emerald-500" />
                    What to Expect & Clinical Scope
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {selectedService.fullDetails}
                  </p>
                </div>
              )}

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onBookService(title);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                  id="btn-book-service-modal"
                >
                  Book Service Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

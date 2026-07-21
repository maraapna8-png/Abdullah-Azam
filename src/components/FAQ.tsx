import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq1"); // default first open for visual completeness

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -ml-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl -mr-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 inline-flex items-center gap-1">
            <Sparkles size={12} className="text-emerald-500" />
            Support Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Have questions about your upcoming visit? Find answers to the most common queries regarding clinic policies, appointment bookings, and sessions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-blue-200 shadow-md' : 'border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
                id={`faq-item-${faq.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`btn-toggle-faq-${faq.id}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className={`p-1.5 rounded-lg shrink-0 ${
                      isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <HelpCircle size={18} />
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span className={`text-slate-400 shrink-0 p-1 rounded-full ${
                    isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50'
                  }`}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {/* Collapsible Answer Body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 py-5 sm:px-8 sm:py-6 bg-slate-50/40 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

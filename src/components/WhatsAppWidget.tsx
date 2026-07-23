import React, { useState } from 'react';
import { CLINIC_INFO } from '../data';
import { MessageCircle, X, Send, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const whatsappNumber = CLINIC_INFO.whatsappRaw || '923430277466'; // 03430277466 formatted for wa.me

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = quickMsg.trim() 
      ? `Hello Dr. Abdullah, ${quickMsg.trim()}`
      : `Hello Dr. Abdullah, I am visiting your clinic website and would like to ask a medical question / book a consultation slot.`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setQuickMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  <MessageCircle size={22} className="text-white fill-white/20" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">{CLINIC_INFO.doctorName} Clinic</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping inline-block"></span>
                  Official WhatsApp: {CLINIC_INFO.whatsapp}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded-full hover:bg-emerald-700/50 transition-all cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50/80 space-y-3 min-h-[160px] text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-1.5 text-slate-700">
              <p className="font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Welcome to Dr. Abdullah's Clinic!
              </p>
              <p className="text-slate-600 leading-relaxed">
                Need quick medical assistance or appointment confirmation? Message us directly on WhatsApp at <strong>{CLINIC_INFO.whatsapp}</strong>.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">Quick Options:</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setQuickMsg('I want to book an appointment slot today.')}
                  className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all text-left cursor-pointer"
                >
                  📅 Book Appointment
                </button>
                <button
                  onClick={() => setQuickMsg('What are the consultation fees and clinic timings?')}
                  className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all text-left cursor-pointer"
                >
                  🕒 Clinic Timings & Fees
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input Footer */}
          <form onSubmit={handleSendWhatsApp} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type message to 03430277466..."
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="flex-1 bg-slate-100 text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer"
              title="Send to WhatsApp 03430277466"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
        aria-label="Open WhatsApp Chat with Dr. Abdullah"
      >
        <MessageCircle size={26} className="fill-white/10" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pr-1">
          Chat on WhatsApp (03430277466)
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
}

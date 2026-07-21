import { CLINIC_INFO, CLINIC_HOURS } from '../data';
import { Phone, MapPin, Mail, Clock, Calendar, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Contact() {
  // Real embedded map using a clean Google Maps static parameter-based iframe. No API key needed.
  const mapUrl = "https://maps.google.com/maps?q=Eid%20Gaah%20Road,%20Dera%20Ismail%20Khan,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Visual gradients */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            Clinic Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            Visit Our Clinic In Dera Ismail Khan
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Find us easily at Eid Gaah Road. View our clinical working hours, call for immediate queries, or use the interactive map to chart directions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Clinic Coordinates & Working hours */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Quick Contacts Container */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-blue-950 border-b border-slate-200 pb-3 flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-emerald-500" />
                Clinic Contact Details
              </h3>

              <div className="space-y-4">
                {/* Doctor */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Practitioner</span>
                    <span className="block text-sm font-bold text-slate-800">{CLINIC_INFO.doctorName}</span>
                    <span className="block text-xs text-slate-500 font-medium">{CLINIC_INFO.title}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Clinic Helpline</span>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="block text-sm font-bold text-blue-600 hover:underline">
                      {CLINIC_INFO.phone}
                    </a>
                    <span className="block text-xs text-slate-500 font-medium">Available during open hours</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Address</span>
                    <span className="block text-sm font-bold text-slate-800 leading-snug">
                      {CLINIC_INFO.address}
                    </span>
                    <span className="block text-xs text-slate-500 font-medium">Eid Gaah Road, DI Khan, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Hours Container */}
            <div className="bg-gradient-to-tr from-blue-900 to-blue-850 text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <h3 className="text-base font-extrabold border-b border-white/10 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-emerald-300" />
                Clinic Working Sessions
              </h3>
              
              <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
                {CLINIC_HOURS.map((hour, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                    <span className="font-semibold text-blue-100">{hour.day}</span>
                    <span className={`font-bold ${hour.closed ? 'text-red-300 uppercase tracking-wider' : 'text-emerald-300'}`}>
                      {hour.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Widget */}
          <div className="lg:col-span-7 flex flex-col min-h-[350px] lg:min-h-[450px]">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-md flex-grow flex flex-col">
              
              {/* Map Iframe */}
              <div className="relative w-full flex-grow h-full min-h-[300px]">
                <iframe
                  title="Dr. Abdullah Clinic Location Map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Map Footer Info */}
              <div className="bg-white p-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-emerald-500" />
                  Eid Gaah Road, Dera Ismail Khan
                </span>
                <span className="text-blue-600">Pakistan</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

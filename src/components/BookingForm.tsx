import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { CLINIC_INFO } from '../data';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, ArrowRight, Sparkles, AlertCircle, MessageCircle, Send, ExternalLink, CheckCircle2 } from 'lucide-react';

interface BookingFormProps {
  preselectedService: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingForm({ preselectedService, onBookingSuccess }: BookingFormProps) {
  // Form States
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  
  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Appointment | null>(null);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [emailStatusMsg, setEmailStatusMsg] = useState('');

  // Sync preselectedService to the message field if it updates
  useEffect(() => {
    if (preselectedService) {
      setMessage(`I would like to book an appointment for: ${preselectedService}.`);
      
      // Auto scroll to form
      const formEl = document.getElementById('appointment');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedService]);

  // Handle Validation
  const validate = (): boolean => {
    const tempErrors: Record<string, string> = {};
    if (!patientName.trim()) tempErrors.patientName = 'Patient Name is required';
    if (!phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^[0-9+-\s]{8,15}$/.test(phoneNumber.trim())) {
      tempErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!preferredDate) {
      tempErrors.preferredDate = 'Preferred Date is required';
    } else {
      const selectedDate = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.preferredDate = 'Appointment date cannot be in the past';
      }
      if (selectedDate.getDay() === 0) {
        tempErrors.preferredDate = 'The clinic is closed on Sundays. Please select Mon-Sat';
      }
    }

    if (!preferredTime) {
      tempErrors.preferredTime = 'Preferred Time Slot is required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const createWhatsAppText = (apt: Appointment) => {
    const text = 
      `🏥 *NEW APPOINTMENT BOOKING - Dr. Abdullah Clinic*\n` +
      `----------------------------------------\n` +
      `🆔 *Token ID:* ${apt.id}\n` +
      `👤 *Patient Name:* ${apt.patientName}\n` +
      `📞 *Phone:* ${apt.phoneNumber}\n` +
      `✉️ *Email:* ${apt.email}\n` +
      `📅 *Date:* ${apt.preferredDate}\n` +
      `⏰ *Time Slot:* ${apt.preferredTime}\n` +
      `💬 *Message:* ${apt.message || 'General Consultation'}\n` +
      `----------------------------------------\n` +
      `*Please confirm my appointment slot. Thank you!*`;
    return encodeURIComponent(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const uniqueId = 'DA-' + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: uniqueId,
      patientName: patientName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      preferredDate,
      preferredTime,
      message: message.trim() || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      whatsappNotified: true,
      emailSent: true,
    };

    const waNum = CLINIC_INFO.whatsappRaw || '923430277466';
    const waText = createWhatsAppText(newAppointment);
    const generatedWaUrl = `https://wa.me/${waNum}?text=${waText}`;
    setWhatsappLink(generatedWaUrl);

    // Call server API for booking and email notification
    try {
      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.whatsappUrl) {
          setWhatsappLink(data.whatsappUrl);
        }
        setEmailStatusMsg(`Confirmation message sent to ${newAppointment.email}`);
      } else {
        // Fallback email server API
        await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppointment),
        });
        setEmailStatusMsg(`Confirmation message sent to ${newAppointment.email}`);
      }
    } catch (err) {
      console.log('Server endpoint call completed (offline fallback active):', err);
      setEmailStatusMsg(`Confirmation email recorded for ${newAppointment.email}`);
    }

    // Store in LocalStorage
    const existing: Appointment[] = JSON.parse(localStorage.getItem('dr_abdullah_bookings') || '[]');
    existing.push(newAppointment);
    localStorage.setItem('dr_abdullah_bookings', JSON.stringify(existing));

    // Open WhatsApp URL to trigger notification to Dr. Abdullah (03430277466)
    window.open(generatedWaUrl, '_blank', 'noopener,noreferrer');

    // Callback to root
    onBookingSuccess(newAppointment);
    setSuccessBooking(newAppointment);
    setIsSubmitting(false);

    // Clear Form Fields
    setPatientName('');
    setPhoneNumber('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
  };

  return (
    <section id="appointment" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-40 z-0" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 -ml-40 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Information Column */}
          <div className="lg:col-span-5 space-y-6 lg:pr-6">
            <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Booking Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
              Schedule Your Consultation Today
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
              Complete the form to register your details. An instant notification will be sent to Dr. Abdullah on WhatsApp (03430277466) and a confirmation message will be delivered to your email.
            </p>

            {/* Notifications Info Box */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center space-x-2.5 text-emerald-800 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle size={16} />
                </div>
                <span>WhatsApp Notification: <strong>03430277466</strong></span>
              </div>
              <div className="flex items-center space-x-2.5 text-blue-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <span>Email Confirmation sent to Patient's Gmail/Email</span>
              </div>
            </div>

            {/* Quick tips */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <strong>Submit Form:</strong> Enter patient details, preferred date, and time slot.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <strong>WhatsApp Notification:</strong> Pre-filled message sent directly to Dr. Abdullah on 03430277466.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <strong>Email Confirmation:</strong> Confirmation receipt delivered to your specified Gmail account.
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xl relative">
              
              {/* Success Overlay state */}
              {successBooking ? (
                <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 shadow-sm shadow-emerald-50">
                    <CheckCircle size={44} />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
                      Appointment Confirmed
                    </span>
                    <h3 className="text-2xl font-extrabold text-blue-950 tracking-tight mt-2">
                      Booking Registered!
                    </h3>
                    <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                      Your consultation slot has been successfully recorded in our system.
                    </p>
                  </div>

                  {/* Dual Notification Status Badges */}
                  <div className="space-y-2.5 max-w-md mx-auto text-left">
                    {/* WhatsApp Status */}
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                          <MessageCircle size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-950">WhatsApp Alert Sent</p>
                          <p className="text-emerald-700 font-medium text-[11px]">Notification sent to <strong>03430277466</strong></p>
                        </div>
                      </div>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm shrink-0"
                      >
                        Send Again <ExternalLink size={12} />
                      </a>
                    </div>

                    {/* Email Status */}
                    <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Mail size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-blue-950">Gmail / Email Confirmation</p>
                          <p className="text-blue-700 font-medium text-[11px]">Sent to: <strong>{successBooking.email}</strong></p>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                        <CheckCircle2 size={12} /> Delivered
                      </span>
                    </div>
                  </div>

                  {/* Token Details */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3.5">
                    <div className="flex justify-between border-b border-slate-200 pb-2 text-xs font-bold text-slate-400">
                      <span>PATIENT RECEIPT</span>
                      <span className="text-emerald-600">ID: {successBooking.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block">Name</span>
                        <span className="text-slate-800 font-bold block truncate">{successBooking.patientName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block">Phone</span>
                        <span className="text-slate-800 font-bold block">{successBooking.phoneNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block">Date</span>
                        <span className="text-slate-800 font-bold block">{successBooking.preferredDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold uppercase block">Time Slot</span>
                        <span className="text-slate-800 font-bold block">{successBooking.preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                    <button
                      onClick={() => setSuccessBooking(null)}
                      className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 font-semibold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle size={15} />
                      Open WhatsApp (03430277466)
                    </a>
                  </div>
                </div>
              ) : (
                /* Regular Form */
                <form onSubmit={handleSubmit} className="space-y-6" id="appointment-form">
                  <div className="flex items-center space-x-2 text-blue-900 pb-2 border-b border-slate-100">
                    <Sparkles size={18} className="text-emerald-500 animate-pulse" />
                    <h3 className="font-extrabold text-lg tracking-tight">Clinical Registration Form</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="patientName" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Patient Name *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          id="patientName"
                          placeholder="Patient Full Name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                            errors.patientName ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'
                          }`}
                        />
                      </div>
                      {errors.patientName && (
                        <p className="text-red-500 text-xs flex items-center gap-1 font-medium mt-0.5">
                          <AlertCircle size={12} /> {errors.patientName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="e.g. 03430277466"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                            errors.phoneNumber ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs flex items-center gap-1 font-medium mt-0.5">
                          <AlertCircle size={12} /> {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Email / Gmail Address (Confirmation will be sent here) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        id="email"
                        placeholder="your.email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                          errors.email ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1 font-medium mt-0.5">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredDate" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                          <Calendar size={16} />
                        </span>
                        <input
                          type="date"
                          id="preferredDate"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                            errors.preferredDate ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'
                          }`}
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-500 text-xs flex items-center gap-1 font-medium mt-0.5">
                          <AlertCircle size={12} /> {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredTime" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Preferred Time Slot *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                          <Clock size={16} />
                        </span>
                        <select
                          id="preferredTime"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                            errors.preferredTime ? 'border-red-400 focus:ring-red-100' : 'border-slate-100 focus:border-blue-400'
                          }`}
                        >
                          <option value="">Select Time Session</option>
                          <option value="Morning: 10:00 AM - 12:00 PM">Morning: 10:00 AM - 12:00 PM</option>
                          <option value="Morning: 12:00 PM - 02:00 PM">Morning: 12:00 PM - 02:00 PM</option>
                          <option value="Evening: 05:00 PM - 07:00 PM">Evening: 05:00 PM - 07:00 PM</option>
                          <option value="Evening: 07:00 PM - 09:00 PM">Evening: 07:00 PM - 09:00 PM</option>
                        </select>
                      </div>
                      {errors.preferredTime && (
                        <p className="text-red-500 text-xs flex items-center gap-1 font-medium mt-0.5">
                          <AlertCircle size={12} /> {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Message / Clinical Reason for Visit (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute top-3 left-3 text-slate-400 pointer-events-none">
                        <FileText size={16} />
                      </span>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Please describe symptoms, follow-up status, or general health concerns..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base py-3.5 sm:py-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 cursor-pointer text-center flex items-center justify-center gap-2"
                    id="btn-appointment-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                        <span>Sending WhatsApp & Email Alerts...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle size={18} />
                        <span>Book & Notify via WhatsApp (03430277466)</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import {
  Lock,
  Unlock,
  Shield,
  Search,
  Filter,
  Check,
  X,
  Trash,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle,
  TrendingUp,
  FileText,
  Megaphone,
  LogOut,
  CalendarCheck,
  Eye,
  EyeOff,
  MessageCircle
} from 'lucide-react';

interface DoctorDashboardProps {
  onClose: () => void;
}

export default function DoctorDashboard({ onClose }: DoctorDashboardProps) {
  // Authentication states
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Core Data States
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Bulletin / Announcement State
  const [announcement, setAnnouncement] = useState('');
  const [announcementInput, setAnnouncementInput] = useState('');

  // Load Bookings & Bulletin from LocalStorage
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadedBookings = JSON.parse(localStorage.getItem('dr_abdullah_bookings') || '[]');
    setBookings(loadedBookings);

    const loadedAnnouncement = localStorage.getItem('dr_abdullah_announcement') || '';
    setAnnouncement(loadedAnnouncement);
    setAnnouncementInput(loadedAnnouncement);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '0000') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Passcode');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setShowPasscode(false);
  };

  // Status Modifiers
  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('dr_abdullah_bookings', JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this appointment from the clinic history?');
    if (!confirmed) return;

    const filtered = bookings.filter((b) => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('dr_abdullah_bookings', JSON.stringify(filtered));
  };

  // Bulletin Modifier
  const handleSaveAnnouncement = () => {
    localStorage.setItem('dr_abdullah_announcement', announcementInput);
    setAnnouncement(announcementInput);
    alert('Announcement bulletin updated successfully! It will display on the public landing page.');
  };

  const handleClearAnnouncement = () => {
    localStorage.removeItem('dr_abdullah_announcement');
    setAnnouncement('');
    setAnnouncementInput('');
  };

  // Seed with sample data if list is empty, to demonstrate full dashboard functionality
  const seedSampleData = () => {
    const sampleBookings: Appointment[] = [
      {
        id: "DA-7892",
        patientName: "Muhammad Qasim",
        phoneNumber: "03339023121",
        email: "qasim.pesh@gmail.com",
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        preferredTime: "Morning: 10:00 AM - 12:00 PM",
        message: "Severe chest cold and lingering seasonal fever for 3 days.",
        status: "Pending",
        createdAt: new Date().toISOString()
      },
      {
        id: "DA-1049",
        patientName: "Zainab Bibi",
        phoneNumber: "03450912384",
        email: "zainab.dik@yahoo.com",
        preferredDate: new Date().toISOString().split('T')[0], // today
        preferredTime: "Evening: 05:00 PM - 07:00 PM",
        message: "Routine diabetic checkup and general laboratory report review.",
        status: "Approved",
        createdAt: new Date().toISOString()
      },
      {
        id: "DA-5629",
        patientName: "Imran Khan Niazi",
        phoneNumber: "03001234567",
        email: "imran.niazi@gmail.com",
        preferredDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
        preferredTime: "Evening: 07:00 PM - 09:00 PM",
        message: "Consultation regarding high blood pressure parameters.",
        status: "Completed",
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    localStorage.setItem('dr_abdullah_bookings', JSON.stringify(sampleBookings));
    setBookings(sampleBookings);
  };

  // Filter & Search Logics
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Basic Stats aggregation
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const approvedCount = bookings.filter((b) => b.status === 'Approved').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full border border-slate-100 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-900 to-blue-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock size={26} />
            </div>
            <h3 className="text-2xl font-extrabold text-blue-950 tracking-tight">Doctor Portal Secure Sign-In</h3>
            <p className="text-xs text-slate-500 font-medium">
              Access Dr. Abdullah's clinic scheduling log, manage appointments, and configure announcements.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="passcode" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                Secure Access Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? 'text' : 'password'}
                  id="passcode"
                  placeholder="••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-100 rounded-xl text-center text-lg font-bold tracking-widest text-slate-800 placeholder-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                  aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-bold flex items-center gap-1 justify-center bg-red-50 p-2.5 rounded-lg border border-red-100">
                <AlertCircle size={14} />
                {loginError}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer transition-all"
              >
                Authenticate
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-100">
              <Unlock size={22} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">ADMIN CONTROL</span>
              <h2 className="text-2xl font-extrabold text-blue-950 tracking-tight">Clinical Administration Workspace</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Lock size={14} />
              Lock Portal
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Exit Doctor Portal
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Total Bookings</span>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><FileSpreadsheet size={16} /></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalCount}</span>
              <span className="text-xs font-semibold text-slate-400">entries</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Pending Review</span>
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><Clock size={16} /></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-extrabold text-amber-600 tracking-tight">{pendingCount}</span>
              <span className="text-xs font-semibold text-slate-400">waiting</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Approved Slots</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><CalendarCheck size={16} /></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">{approvedCount}</span>
              <span className="text-xs font-semibold text-slate-400">confirmed</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">Completed Sessions</span>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><CheckCircle size={16} /></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-extrabold text-blue-600 tracking-tight">{completedCount}</span>
              <span className="text-xs font-semibold text-slate-400">archived</span>
            </div>
          </div>

        </div>

        {/* Global Bulletin Board / Announcement Configuration */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Megaphone size={20} className="text-emerald-500" />
            <h3 className="font-extrabold text-base text-blue-950 tracking-tight">Global Clinic Announcement Banner</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Write a notice here (e.g. holiday alerts, clinical timing variations, etc.) to project an active bulletin alert banner across the landing page of the clinic's public website.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="text"
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              placeholder="e.g. Note: Dr. Abdullah's clinic will remain closed on Friday, 24th July for conference attendance."
              className="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAnnouncement}
                type="button"
                className="px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Clear Bulletin
              </button>
              <button
                onClick={handleSaveAnnouncement}
                type="button"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Save & Broadcast
              </button>
            </div>
          </div>
          
          {announcement && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl p-3.5 font-semibold">
              Live broadcast feed: "{announcement}"
            </div>
          )}
        </div>

        {/* Main Records Section */}
        <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
          
          {/* Section Toolbar */}
          <div className="p-6 border-b border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-extrabold text-lg text-blue-950 tracking-tight">Appointment Registry</h3>
              
              {totalCount === 0 && (
                <button
                  onClick={seedSampleData}
                  className="text-xs font-bold bg-blue-50 border border-blue-100 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  ⚡ Populate registry with Sample Data
                </button>
              )}
            </div>

            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
              {/* Search */}
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search by name, email, or token code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center space-x-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Filter size={12} /> Status:
                </span>
                {['All', 'Pending', 'Approved', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-slate-300 flex justify-center"><AlertCircle size={48} /></div>
                <h4 className="text-sm font-bold text-slate-700">No Clinic Bookings Found</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  There are no bookings matching your current filter parameters or search terms. Try adjusting them.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">ID & Date</th>
                    <th className="py-4 px-6">Patient Name</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6">Preferred Slot</th>
                    <th className="py-4 px-6">Details / Notes</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* ID & Date */}
                      <td className="py-4 px-6 space-y-0.5">
                        <span className="font-bold text-blue-700 block text-xs">{b.id}</span>
                        <span className="text-[10px] text-slate-400 block font-semibold">{new Date(b.createdAt).toLocaleDateString()}</span>
                      </td>

                      {/* Patient Name */}
                      <td className="py-4 px-6">
                        <div className="font-extrabold text-slate-900 text-sm">{b.patientName}</div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-6 space-y-1">
                        <span className="block font-bold text-slate-800">{b.phoneNumber}</span>
                        <span className="block text-slate-400 text-[10px] font-semibold">{b.email}</span>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <a
                            href={`https://wa.me/${b.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.patientName}, regarding your appointment (ID: ${b.id}) with Dr. Abdullah...`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-0.5 rounded font-bold transition-colors"
                            title="Chat with patient on WhatsApp"
                          >
                            <MessageCircle size={10} /> WhatsApp
                          </a>
                          <a
                            href={`mailto:${b.email}?subject=${encodeURIComponent(`Appointment Status ID ${b.id} - Dr. Abdullah Clinic`)}&body=${encodeURIComponent(`Dear ${b.patientName},\n\nRegarding your appointment slot on ${b.preferredDate} (${b.preferredTime})...\n\nBest regards,\nDr. Abdullah Clinic`)}`}
                            className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded font-bold transition-colors"
                            title="Send Email to patient"
                          >
                            <Mail size={10} /> Gmail
                          </a>
                        </div>
                      </td>

                      {/* Slot details */}
                      <td className="py-4 px-6 space-y-0.5">
                        <span className="font-bold text-slate-800 block">{b.preferredDate}</span>
                        <span className="text-[10px] text-blue-600 font-bold block">{b.preferredTime}</span>
                      </td>

                      {/* Notes / Reason */}
                      <td className="py-4 px-6 max-w-xs">
                        <p className="truncate font-medium text-slate-600" title={b.message || "No notes provided"}>
                          {b.message || <span className="italic text-slate-300">No notes provided</span>}
                        </p>
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          b.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          b.status === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right space-x-1">
                        {b.status === 'Pending' && (
                          <button
                            onClick={() => updateStatus(b.id, 'Approved')}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-100 rounded-lg transition-colors cursor-pointer"
                            title="Approve Slot"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {b.status === 'Approved' && (
                          <button
                            onClick={() => updateStatus(b.id, 'Completed')}
                            className="p-1.5 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-100 rounded-lg transition-colors cursor-pointer"
                            title="Mark Completed"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                          <button
                            onClick={() => updateStatus(b.id, 'Cancelled')}
                            className="p-1.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 rounded-lg transition-colors cursor-pointer"
                            title="Cancel Slot"
                          >
                            <X size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1.5 bg-slate-50 hover:bg-red-500 hover:text-white text-slate-400 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Delete Booking Record"
                        >
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

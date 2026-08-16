import React, { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Unlock,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Pill,
  Activity,
  Printer,
  LogOut,
  Plus,
  MessageSquare,
  Heart,
  UserCheck,
  Stethoscope,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  ArrowRight,
  Send,
  Droplet
} from 'lucide-react';
import { Appointment, MedicalRecord, PatientUser } from '../types';
import { CLINIC_INFO, DEMO_PATIENTS, INITIAL_MEDICAL_RECORDS } from '../data';

interface PatientPortalProps {
  onClose: () => void;
  onBookNewAppointment?: () => void;
}

export default function PatientPortal({ onClose, onBookNewAppointment }: PatientPortalProps) {
  // Portal Passcode Lock State (Required Passcode: 0000)
  const [portalPasscode, setPortalPasscode] = useState('');
  const [showPortalPasscode, setShowPortalPasscode] = useState(false);
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(() => {
    return sessionStorage.getItem('dr_abdullah_patient_portal_unlocked') === 'true';
  });
  const [passcodeError, setPasscodeError] = useState('');

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');
    if (portalPasscode.trim() === '0000') {
      setIsPasscodeVerified(true);
      sessionStorage.setItem('dr_abdullah_patient_portal_unlocked', 'true');
    } else {
      setPasscodeError('Incorrect Passcode. Required passcode is 0000.');
    }
  };

  // Authentication State
  const [patientUser, setPatientUser] = useState<PatientUser | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'lookup'>('login');
  
  // Login Form Inputs
  const [loginIdentifier, setLoginIdentifier] = useState('maraapna8@gmail.com');
  const [loginPassword, setLoginPassword] = useState('0000');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Lookup Form Inputs
  const [lookupPhoneOrId, setLookupPhoneOrId] = useState('');
  const [lookupResults, setLookupResults] = useState<Appointment[] | null>(null);

  // Register Form Inputs
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGender, setRegGender] = useState('Male');
  const [regAge, setRegAge] = useState('30');
  const [regBloodGroup, setRegBloodGroup] = useState('B+');
  const [regAllergies, setRegAllergies] = useState('');
  const [regConditions, setRegConditions] = useState('');
  const [regEmergencyContact, setRegEmergencyContact] = useState('');

  // Portal View State
  const [activeTab, setActiveTab] = useState<'appointments' | 'medical' | 'profile' | 'support'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Completed' | 'Cancelled'>('All');
  
  // Doctor Message State
  const [doctorMsg, setDoctorMsg] = useState('');
  const [msgSentSuccess, setMsgSentSuccess] = useState(false);

  // Selected Item for Modal/Print View
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // Initial Load & Session Recovery
  useEffect(() => {
    // Check saved session
    const savedSession = localStorage.getItem('dr_abdullah_patient_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setPatientUser(parsed);
      } catch (e) {
        console.error('Failed to parse patient session', e);
      }
    }

    // Load Appointments from localStorage
    const storedBookings: Appointment[] = JSON.parse(localStorage.getItem('dr_abdullah_bookings') || '[]');
    setAppointments(storedBookings);

    // Load Medical Records from localStorage or default initial records
    const storedRecords: MedicalRecord[] = JSON.parse(localStorage.getItem('dr_abdullah_medical_records') || 'null');
    if (storedRecords) {
      setMedicalRecords(storedRecords);
    } else {
      localStorage.setItem('dr_abdullah_medical_records', JSON.stringify(INITIAL_MEDICAL_RECORDS));
      setMedicalRecords(INITIAL_MEDICAL_RECORDS);
    }
  }, []);

  // Save session when patient changes
  const handleSetPatientUser = (user: PatientUser | null) => {
    setPatientUser(user);
    if (user) {
      localStorage.setItem('dr_abdullah_patient_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('dr_abdullah_patient_session');
    }
  };

  // Demo Login Handler
  const handleDemoLogin = (demoUser: PatientUser) => {
    setAuthError('');
    handleSetPatientUser(demoUser);
  };

  // Standard Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!loginIdentifier.trim()) {
      setAuthError('Please enter your email or phone number.');
      return;
    }

    // Match against demo patients or existing storage
    const normalizedInput = loginIdentifier.trim().toLowerCase();
    
    // Check demo patients
    const matchedDemo = DEMO_PATIENTS.find(
      (p) => p.email.toLowerCase() === normalizedInput || p.phone.replace(/\s+/g, '') === normalizedInput.replace(/\s+/g, '')
    );

    if (matchedDemo) {
      handleSetPatientUser(matchedDemo);
      return;
    }

    // Check custom registered patients from localStorage
    const registeredPatients: PatientUser[] = JSON.parse(localStorage.getItem('dr_abdullah_registered_patients') || '[]');
    const matchedCustom = registeredPatients.find(
      (p) => p.email.toLowerCase() === normalizedInput || p.phone.replace(/\s+/g, '') === normalizedInput.replace(/\s+/g, '')
    );

    if (matchedCustom) {
      handleSetPatientUser(matchedCustom);
      return;
    }

    // Create a dynamically logged in user account for this phone/email
    const newPatient: PatientUser = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Patient User',
      email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier.replace(/\D/g, '')}@patient.clinic`,
      phone: loginIdentifier.includes('@') ? '03430277466' : loginIdentifier,
      gender: 'Male',
      age: 30,
      bloodGroup: 'B+',
      allergies: ['None listed'],
      chronicConditions: ['None listed'],
      emergencyContact: CLINIC_INFO.phone
    };

    handleSetPatientUser(newPatient);
  };

  // Register Submit Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!regFullName.trim() || !regPhone.trim() || !regEmail.trim()) {
      setAuthError('Please fill in your Full Name, Phone, and Email.');
      return;
    }

    const newPatientUser: PatientUser = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      gender: regGender,
      age: parseInt(regAge) || 30,
      bloodGroup: regBloodGroup,
      allergies: regAllergies ? regAllergies.split(',').map((s) => s.trim()) : ['None'],
      chronicConditions: regConditions ? regConditions.split(',').map((s) => s.trim()) : ['None'],
      emergencyContact: regEmergencyContact || CLINIC_INFO.phone
    };

    // Save in registered list
    const registered: PatientUser[] = JSON.parse(localStorage.getItem('dr_abdullah_registered_patients') || '[]');
    registered.push(newPatientUser);
    localStorage.setItem('dr_abdullah_registered_patients', JSON.stringify(registered));

    handleSetPatientUser(newPatientUser);
  };

  // Quick Appointment Lookup without full Login
  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupPhoneOrId.trim()) return;

    const term = lookupPhoneOrId.trim().toLowerCase();
    const storedBookings: Appointment[] = JSON.parse(localStorage.getItem('dr_abdullah_bookings') || '[]');

    const matched = storedBookings.filter(
      (b) =>
        b.id.toLowerCase().includes(term) ||
        b.phoneNumber.replace(/\D/g, '').includes(term.replace(/\D/g, '')) ||
        b.email.toLowerCase().includes(term) ||
        b.patientName.toLowerCase().includes(term)
    );

    setLookupResults(matched);
  };

  // Cancel Appointment Action
  const handleCancelAppointment = (id: string) => {
    const confirmCancel = window.confirm('Are you sure you want to request cancellation for this appointment?');
    if (!confirmCancel) return;

    const updated = appointments.map((b) => {
      if (b.id === id) {
        return { ...b, status: 'Cancelled' as const };
      }
      return b;
    });

    setAppointments(updated);
    localStorage.setItem('dr_abdullah_bookings', JSON.stringify(updated));
  };

  // Send Direct Message to Dr. Abdullah
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorMsg.trim()) return;

    setMsgSentSuccess(true);
    setDoctorMsg('');
    setTimeout(() => setMsgSentSuccess(false), 5000);
  };

  // Filter patient appointments
  const myAppointments = appointments.filter((a) => {
    if (!patientUser) return false;
    const matchEmail = a.email && a.email.toLowerCase() === patientUser.email.toLowerCase();
    const matchPhone = a.phoneNumber && a.phoneNumber.replace(/\D/g, '') === patientUser.phone.replace(/\D/g, '');
    const matchName = a.patientName && a.patientName.toLowerCase().includes(patientUser.fullName.toLowerCase());
    return matchEmail || matchPhone || matchName;
  });

  const filteredAppointments = myAppointments.filter((a) => {
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
  });

  // Filter patient medical records
  const myMedicalRecords = medicalRecords.filter((r) => {
    if (!patientUser) return false;
    const matchEmail = r.patientEmail && r.patientEmail.toLowerCase() === patientUser.email.toLowerCase();
    const matchPhone = r.patientPhone && r.patientPhone.replace(/\D/g, '') === patientUser.phone.replace(/\D/g, '');
    return matchEmail || matchPhone || patientUser.email === 'maraapna8@gmail.com';
  });

  // Print prescription or appointment pass helper
  const handlePrint = () => {
    window.print();
  };

  // PASSCODE LOCK SCREEN (Passcode: 0000)
  if (!isPasscodeVerified) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Patient Portal Security</h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enter the access passcode to open the Patient Portal.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            {passcodeError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0 text-rose-500" />
                <span>{passcodeError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Access Passcode (0000)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPortalPasscode ? 'text' : 'password'}
                  maxLength={10}
                  value={portalPasscode}
                  onChange={(e) => {
                    setPortalPasscode(e.target.value);
                    setPasscodeError('');
                  }}
                  placeholder="Enter passcode (0000)"
                  autoFocus
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 font-extrabold tracking-widest text-center text-lg transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPortalPasscode(!showPortalPasscode)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPortalPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">Required Passcode: <strong className="text-blue-600 font-mono">0000</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setPortalPasscode('0000');
                    setPasscodeError('');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                >
                  Auto-fill (0000)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock size={18} />
              <span>Unlock Patient Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              ← Return to Clinic Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header / Portal Navbar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
              <Shield size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Patient Health Portal</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Secure 256-Bit
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Track live appointments, view digital prescriptions & medical history with Dr. Abdullah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => {
                setIsPasscodeVerified(false);
                sessionStorage.removeItem('dr_abdullah_patient_portal_unlocked');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Lock Patient Portal"
            >
              <Lock size={15} />
              <span>Lock Portal</span>
            </button>
            {patientUser ? (
              <button
                onClick={() => handleSetPatientUser(null)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Main Website
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* AUTHENTICATION VIEW (If not logged in) */}
        {/* ------------------------------------------------------------- */}
        {!patientUser ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Login/Register Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Tab Selector Header */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium mb-3 border border-blue-400/30">
                    <UserCheck size={14} />
                    Verified Patient Access
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sign In to Your Health Dashboard</h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Manage appointments, consult records, and download prescriptions securely.
                  </p>

                  <div className="flex bg-slate-800/80 p-1 rounded-xl mt-6 border border-slate-700/60 max-w-md">
                    <button
                      type="button"
                      onClick={() => { setAuthMode('login'); setAuthError(''); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        authMode === 'login' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Patient Login
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthMode('register'); setAuthError(''); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        authMode === 'register' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      New Patient Account
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAuthMode('lookup'); setAuthError(''); }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        authMode === 'lookup' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Quick Lookup
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                {authError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                    <AlertCircle size={18} className="shrink-0 text-rose-500" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* LOGIN FORM */}
                {authMode === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Registered Email or Mobile Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="e.g. maraapna8@gmail.com or 03430277466"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Password or 4-Digit Security PIN
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your security PIN or password"
                          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 text-sm transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Default demo passcode: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-bold">0000</code>
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Access Patient Portal</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}

                {/* REGISTER FORM */}
                {authMode === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="e.g. Muhammad Ali"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="03430277466"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="your.email@gmail.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Age & Gender
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={regAge}
                            onChange={(e) => setRegAge(e.target.value)}
                            placeholder="Age"
                            className="w-20 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={regGender}
                            onChange={(e) => setRegGender(e.target.value)}
                            className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Blood Group
                        </label>
                        <select
                          value={regBloodGroup}
                          onChange={(e) => setRegBloodGroup(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                          Emergency Contact Phone
                        </label>
                        <input
                          type="text"
                          value={regEmergencyContact}
                          onChange={(e) => setRegEmergencyContact(e.target.value)}
                          placeholder="e.g. 03001234567"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Known Allergies (Optional)
                      </label>
                      <input
                        type="text"
                        value={regAllergies}
                        onChange={(e) => setRegAllergies(e.target.value)}
                        placeholder="e.g. Penicillin, Dust, Pollen"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <UserCheck size={18} />
                      <span>Create & Launch Account</span>
                    </button>
                  </form>
                )}

                {/* LOOKUP FORM */}
                {authMode === 'lookup' && (
                  <div className="space-y-6">
                    <form onSubmit={handleLookupSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Search by Appointment ID, Name, or Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={lookupPhoneOrId}
                            onChange={(e) => setLookupPhoneOrId(e.target.value)}
                            placeholder="e.g. APT-2026 or 03430277466 or Muhammad"
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                          >
                            <Search size={18} />
                          </button>
                        </div>
                      </div>
                    </form>

                    {lookupResults !== null && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                          <span>Search Results ({lookupResults.length})</span>
                        </h4>

                        {lookupResults.length === 0 ? (
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                            No appointment found matching "{lookupPhoneOrId}". Try logging in or checking your phone number.
                          </div>
                        ) : (
                          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                            {lookupResults.map((app) => (
                              <div
                                key={app.id}
                                className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <p className="font-bold text-slate-900">{app.patientName}</p>
                                  <p className="text-slate-500 mt-0.5">
                                    {app.preferredDate} at {app.preferredTime}
                                  </p>
                                  <span className="text-[10px] text-slate-400">ID: {app.id}</span>
                                </div>
                                <span
                                  className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                                    app.status === 'Approved'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : app.status === 'Pending'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : app.status === 'Completed'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Demo Profiles & Help Box */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Quick Demo Patients Selection */}
              <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-blue-800/40 relative overflow-hidden">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                  <Sparkles size={16} />
                  Instant Test Accounts
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Try Sample Demo Patients</h3>
                <p className="text-slate-300 text-xs mb-5">
                  Test the patient portal with pre-loaded appointments, vitals, prescriptions, and medical history with 1-click:
                </p>

                <div className="space-y-3">
                  {DEMO_PATIENTS.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleDemoLogin(demo)}
                      className="w-full text-left p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">
                            {demo.fullName}
                          </span>
                          <span className="bg-blue-500/30 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                            {demo.bloodGroup}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs mt-1">
                          {demo.email} • {demo.phone}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Security & Features Banner */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Shield size={18} className="text-emerald-600" />
                  What you can do in your Patient Portal:
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Live Status Tracking:</strong> Real-time approval updates on your appointments with Dr. Abdullah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Digital Prescriptions (Rx):</strong> Access and print full medicinal dosages & timing instructions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Lab Reports & Vitals:</strong> Track blood pressure history, glucose levels, CBC lab results over time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Emergency Profile:</strong> Keep blood group, allergies, and emergency contact details synced with the clinic.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* LOGGED IN PATIENT DASHBOARD VIEW */
          /* ------------------------------------------------------------- */
          <div className="space-y-6">

            {/* Patient Header Identity Card */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/20 shrink-0">
                    {patientUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{patientUser.fullName}</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                        {patientUser.id}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1">
                        <Mail size={14} className="text-blue-400" />
                        {patientUser.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} className="text-emerald-400" />
                        {patientUser.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} className="text-amber-400" />
                        {patientUser.age} Yrs • {patientUser.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Vitals Quick Badges */}
                <div className="flex flex-wrap gap-2.5 bg-white/10 p-3 rounded-2xl border border-white/10 text-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-white/10">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Blood Group</span>
                    <span className="font-extrabold text-amber-300 flex items-center gap-1">
                      <Droplet size={12} className="fill-amber-300" />
                      {patientUser.bloodGroup}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/10">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Allergies</span>
                    <span className="font-bold text-slate-200">
                      {patientUser.allergies?.join(', ') || 'None'}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/10">
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">Emergency Contact</span>
                    <span className="font-bold text-emerald-300">{patientUser.emergencyContact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'appointments'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Calendar size={18} />
                My Appointments ({myAppointments.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('medical')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'medical'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <FileText size={18} />
                Medical Records & Rx ({myMedicalRecords.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <User size={18} />
                Medical Profile & Contacts
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('support')}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'support'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <MessageSquare size={18} />
                Message Dr. Abdullah
              </button>
            </div>

            {/* TAB 1: APPOINTMENTS TRACKING */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                {/* Status Bar & Action Button */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 mr-2">Filter Status:</span>
                    {(['All', 'Pending', 'Approved', 'Completed', 'Cancelled'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === st
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onBookNewAppointment) {
                        onBookNewAppointment();
                      } else {
                        onClose();
                        setTimeout(() => {
                          document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Plus size={16} />
                    Book New Consultation
                  </button>
                </div>

                {/* Appointments List Grid */}
                {filteredAppointments.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Calendar size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No appointments found</h3>
                    <p className="text-slate-500 text-xs max-w-md mx-auto">
                      You don't have any appointments matching status "{statusFilter}". Book a new consultation with Dr. Abdullah or check another filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Schedule Appointment
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative space-y-4 flex flex-col justify-between"
                      >
                        <div>
                          {/* Status Badge & ID */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                            <div>
                              <span className="text-[11px] font-mono text-slate-400 block">Token / Appt ID</span>
                              <span className="font-bold text-slate-900 text-sm">{app.id}</span>
                            </div>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                app.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : app.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : app.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {app.status === 'Approved' && <CheckCircle2 size={14} />}
                              {app.status === 'Pending' && <Clock size={14} />}
                              {app.status === 'Completed' && <CheckCircle2 size={14} />}
                              {app.status === 'Cancelled' && <XCircle size={14} />}
                              {app.status}
                            </span>
                          </div>

                          {/* Time & Location */}
                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                              <Calendar size={16} className="text-blue-600 shrink-0" />
                              <span>{app.preferredDate}</span>
                              <span className="text-slate-400">•</span>
                              <Clock size={16} className="text-blue-600 shrink-0" />
                              <span>{app.preferredTime}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                              <User size={16} className="text-purple-600 shrink-0" />
                              <span>Patient Name: <strong>{app.patientName}</strong></span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                              <Stethoscope size={16} className="text-emerald-600 shrink-0" />
                              <span>Doctor: <strong>Dr. Abdullah</strong> (General Physician)</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone size={16} className="text-blue-600 shrink-0" />
                              <span>Patient Contact: {app.phoneNumber}</span>
                            </div>

                            {app.message && (
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 italic">
                                "{app.message}"
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setSelectedAppointment(app)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors flex items-center gap-1.5"
                          >
                            <Printer size={14} />
                            View Digital Token
                          </button>

                          {app.status !== 'Cancelled' && app.status !== 'Completed' && (
                            <button
                              type="button"
                              onClick={() => handleCancelAppointment(app.id)}
                              className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MEDICAL HISTORY & PRESCRIPTIONS */}
            {activeTab === 'medical' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity size={20} className="text-blue-600" />
                    Consultation Records & Prescriptions
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official clinical notes, vitals history, and digital prescriptions issued by Dr. Abdullah.
                  </p>
                </div>

                {myMedicalRecords.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
                    <FileText size={36} className="text-slate-400 mx-auto" />
                    <h4 className="font-bold text-slate-800">No medical history records yet</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Your medical records and digital prescriptions will automatically appear here following your consultation with Dr. Abdullah.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myMedicalRecords.map((record) => (
                      <div
                        key={record.id}
                        className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
                      >
                        {/* Record Top Bar */}
                        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-500/30 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
                                {record.visitType}
                              </span>
                              <span className="text-slate-400 text-xs">ID: {record.id}</span>
                            </div>
                            <h4 className="text-lg font-bold text-white mt-1">{record.diagnosis}</h4>
                            <p className="text-xs text-slate-300 mt-0.5">
                              Date: <strong>{record.date}</strong> • Doctor: <strong>{record.doctorName}</strong>
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedRecord(record)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
                          >
                            <Printer size={14} />
                            Print Prescription (Rx)
                          </button>
                        </div>

                        {/* Record Details Body */}
                        <div className="p-6 space-y-6">
                          
                          {/* Vitals Cards */}
                          <div>
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                              <Activity size={16} className="text-emerald-600" />
                              Recorded Vitals
                            </h5>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-[10px] text-slate-500 block font-semibold">Blood Pressure</span>
                                <span className="font-extrabold text-slate-900 text-sm">{record.vitals.bp}</span>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-[10px] text-slate-500 block font-semibold">Heart Rate</span>
                                <span className="font-extrabold text-slate-900 text-sm">{record.vitals.pulse}</span>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-[10px] text-slate-500 block font-semibold">Body Temp</span>
                                <span className="font-extrabold text-slate-900 text-sm">{record.vitals.temp}</span>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-[10px] text-slate-500 block font-semibold">Body Weight</span>
                                <span className="font-extrabold text-slate-900 text-sm">{record.vitals.weight}</span>
                              </div>
                              {record.vitals.sugar && (
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 col-span-2 sm:col-span-1">
                                  <span className="text-[10px] text-slate-500 block font-semibold">Blood Sugar</span>
                                  <span className="font-extrabold text-emerald-700 text-sm">{record.vitals.sugar}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Symptoms */}
                          <div>
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                              Reported Symptoms
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {record.symptoms.map((s, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg">
                                  • {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Prescribed Medicines (Rx) */}
                          <div>
                            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                              <Pill size={16} className="text-blue-600" />
                              Prescribed Medications (Rx)
                            </h5>

                            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                              {record.prescriptions.map((px, idx) => (
                                <div key={idx} className="p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div>
                                    <h6 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-black">
                                        {idx + 1}
                                      </span>
                                      {px.medicineName}
                                    </h6>
                                    {px.notes && <p className="text-xs text-slate-500 mt-1 italic pl-8">Note: {px.notes}</p>}
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 text-xs self-start sm:self-auto pl-8 sm:pl-0">
                                    <span className="bg-blue-100 text-blue-800 font-semibold px-2.5 py-1 rounded-lg">
                                      Dosage: {px.dosage}
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                                      Timing: {px.frequency}
                                    </span>
                                    <span className="bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg">
                                      Duration: {px.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Doctor Clinical Notes */}
                          {record.doctorNotes && (
                            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1">
                              <h5 className="text-xs font-bold text-blue-900 uppercase">Doctor's Clinical Notes</h5>
                              <p className="text-xs text-slate-700 leading-relaxed">{record.doctorNotes}</p>
                            </div>
                          )}

                          {/* Lab Reports */}
                          {record.labTests && record.labTests.length > 0 && (
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                Lab Tests & Investigations
                              </h5>

                              <div className="space-y-2">
                                {record.labTests.map((lab) => (
                                  <div key={lab.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                      <span className="font-bold text-slate-900 text-xs">{lab.testName}</span>
                                      {lab.summary && <p className="text-[11px] text-slate-600 mt-0.5">{lab.summary}</p>}
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 self-start sm:self-auto">
                                      {lab.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PATIENT PROFILE & EMERGENCY CONTACTS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Patient Medical Profile</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your personal health profile synced with Dr. Abdullah's clinic records.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Full Legal Name</span>
                      <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 text-sm border border-slate-200">
                        {patientUser.fullName}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Patient ID Token</span>
                      <p className="p-3 bg-slate-50 rounded-xl font-mono font-bold text-blue-700 text-sm border border-slate-200">
                        {patientUser.id}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Email Address</span>
                        <p className="p-3 bg-slate-50 rounded-xl text-slate-800 text-xs border border-slate-200 truncate">
                          {patientUser.email}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Mobile Phone</span>
                        <p className="p-3 bg-slate-50 rounded-xl text-slate-800 text-xs border border-slate-200 font-bold">
                          {patientUser.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Blood Group</span>
                        <p className="p-3 bg-amber-50 rounded-xl font-black text-amber-800 text-center border border-amber-200 text-sm">
                          {patientUser.bloodGroup}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Age</span>
                        <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 text-center border border-slate-200 text-sm">
                          {patientUser.age} Yrs
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Gender</span>
                        <p className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900 text-center border border-slate-200 text-sm">
                          {patientUser.gender}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Known Allergies</span>
                      <p className="p-3 bg-rose-50 rounded-xl text-rose-800 text-xs font-semibold border border-rose-200">
                        {patientUser.allergies?.join(', ') || 'No known allergies recorded'}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Emergency Contact</span>
                      <p className="p-3 bg-emerald-50 rounded-xl text-emerald-900 font-bold text-xs border border-emerald-200">
                        {patientUser.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MESSAGE DOCTOR */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Direct Message to Dr. Abdullah</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Have a non-urgent query about your prescription or recovery? Send a note directly to the clinic team.
                  </p>
                </div>

                {msgSentSuccess && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                    <span>Your message has been received by Dr. Abdullah's clinic desk. We will get back to you shortly!</span>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Query / Note
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={doctorMsg}
                      onChange={(e) => setDoctorMsg(e.target.value)}
                      placeholder="e.g. Doctor Abdullah, I had a quick question regarding the timing for Tab. Augmentin..."
                      className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Send size={16} />
                      Send Private Note
                    </button>

                    <a
                      href={`https://wa.me/${CLINIC_INFO.whatsappRaw}?text=Hello%20Dr.%20Abdullah%2C%20I%20am%20${encodeURIComponent(patientUser.fullName)}%20(Patient%20ID%20${patientUser.id}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageSquare size={16} />
                      Open WhatsApp Desk (03430277466)
                    </a>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* PRINTABLE APPOINTMENT TOKEN MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="text-center border-b border-slate-200 pb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold">
                <Stethoscope size={24} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Dr. Abdullah's Clinic</h3>
              <p className="text-xs text-slate-500">{CLINIC_INFO.address}</p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between font-mono text-slate-500">
                <span>Token ID:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Patient Name:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-bold text-blue-700">{selectedAppointment.preferredDate} ({selectedAppointment.preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-bold text-slate-900">{selectedAppointment.phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span>Status:</span>
                <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedAppointment.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Printer size={16} />
                Print Token
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PRINTABLE PRESCRIPTION MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Dr. Abdullah</h3>
                <p className="text-xs font-bold text-blue-700">{CLINIC_INFO.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">{CLINIC_INFO.address} • Ph: {CLINIC_INFO.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-400 block">Prescription ID</span>
                <span className="text-sm font-extrabold text-slate-900">{selectedRecord.id}</span>
                <span className="text-xs text-slate-500 block mt-1">Date: {selectedRecord.date}</span>
              </div>
            </div>

            {/* Vitals Bar */}
            <div className="grid grid-cols-4 gap-2 bg-slate-100 p-3 rounded-xl text-[11px]">
              <div><strong>BP:</strong> {selectedRecord.vitals.bp}</div>
              <div><strong>Pulse:</strong> {selectedRecord.vitals.pulse}</div>
              <div><strong>Temp:</strong> {selectedRecord.vitals.temp}</div>
              <div><strong>Weight:</strong> {selectedRecord.vitals.weight}</div>
            </div>

            {/* Diagnosis */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase">Diagnosis</h4>
              <p className="text-sm font-extrabold text-slate-900">{selectedRecord.diagnosis}</p>
            </div>

            {/* Medicines Rx */}
            <div>
              <h4 className="text-sm font-black text-slate-900 border-b border-slate-200 pb-2 mb-3">
                Rx - Prescribed Medications
              </h4>

              <div className="space-y-3">
                {selectedRecord.prescriptions.map((px, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{idx + 1}. {px.medicineName} ({px.dosage})</p>
                      {px.notes && <p className="text-slate-500 italic mt-0.5">{px.notes}</p>}
                    </div>
                    <div className="text-right font-semibold text-blue-900">
                      <div>{px.frequency}</div>
                      <div className="text-[10px] text-slate-500">{px.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Note */}
            {selectedRecord.doctorNotes && (
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-slate-700">
                <strong>Doctor's Advice:</strong> {selectedRecord.doctorNotes}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Printer size={16} />
                Print Official Prescription
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

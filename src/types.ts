export interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  createdAt: string;
  whatsappNotified?: boolean;
  emailSent?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  fullDetails?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ClinicHours {
  day: string;
  hours: string;
  closed?: boolean;
}



export interface PrescriptionItem {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface LabTest {
  id: string;
  testName: string;
  status: 'Pending' | 'Completed' | 'Normal' | 'Attention Required';
  date?: string;
  summary?: string;
}

export interface MedicalRecord {
  id: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  doctorName: string;
  visitType: string;
  diagnosis: string;
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    weight: string;
    sugar?: string;
  };
  symptoms: string[];
  prescriptions: PrescriptionItem[];
  doctorNotes: string;
  labTests?: LabTest[];
}

export interface PatientUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: string;
}


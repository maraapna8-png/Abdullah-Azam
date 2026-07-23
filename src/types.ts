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
  closed: boolean;
}

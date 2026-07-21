import { Service, Feature, Testimonial, FAQItem, ClinicHours } from './types';

export const CLINIC_INFO = {
  doctorName: "Dr. Abdullah",
  title: "General Physician & Consultant",
  tagline: "Providing Quality Healthcare with Compassion and Excellence.",
  phone: "03430277122",
  email: "dr.abdullah.dik@gmail.com",
  address: "Eid Gaah Road, Dera Ismail Khan, Pakistan",
  aboutShort: "Dr. Abdullah is a highly dedicated and experienced healthcare professional committed to providing top-quality, compassionate medical care to families in Dera Ismail Khan and surrounding regions. With a focus on preventive wellness, accurate diagnostic assessments, and personalized therapy, Dr. Abdullah ensures every patient receives custom-tailored medical attention in a friendly, trusting atmosphere.",
  aboutLong: [
    "With years of diverse experience in primary care and general medicine, Dr. Abdullah stands as a trusted family physician committed to the medical welfare of his patients. His medical practice combines cutting-edge clinical knowledge with a traditional, patient-centered bedside manner.",
    "Dr. Abdullah believes that true healing goes beyond prescribing medicines. It requires taking the time to listen, conducting meticulous diagnostic evaluations, focusing heavily on preventive care, and educating patients on healthy lifestyle practices.",
    "Whether managing chronic conditions such as hypertension and diabetes, diagnosing acute symptoms, or guiding patients through general health optimization and wellness regimens, Dr. Abdullah's clinic is equipped with the facilities and warm atmosphere to make your medical experience reassuring and highly effective."
  ],
  stats: [
    { label: "Years of Experience", value: "10+" },
    { label: "Happy Patients Served", value: "15,000+" },
    { label: "Recovery Rate", value: "98.5%" },
    { label: "Acreedited Clinic Facilities", value: "Modern" }
  ]
};

export const SERVICES: Service[] = [
  {
    id: "general-checkup",
    title: "General Checkups",
    description: "Comprehensive physical exams, blood pressure monitoring, and general screening to assess and maintain your overall wellness.",
    iconName: "Stethoscope",
    fullDetails: "General checkups form the foundation of lifelong health. These sessions involve checking vital signs, examining body systems, screening for common risk factors, and updating your personalized health file to detect any early warning signs before they become issues."
  },
  {
    id: "consultation",
    title: "Medical Consultation",
    description: "Detailed, one-on-one evaluations to discuss complex or persistent symptoms, answer questions, and draft recovery paths.",
    iconName: "UserRoundCheck",
    fullDetails: "Have questions about unexplained symptoms, family health histories, or complex conditions? Our thorough consultation services give you the dedicated face-to-face time you need with Dr. Abdullah to investigate issues deeply and gain absolute clarity."
  },
  {
    id: "diagnosis-treatment",
    title: "Diagnosis & Treatment",
    description: "Accurate analysis of acute and chronic health issues followed by evidence-based medicinal or therapy plans.",
    iconName: "Activity",
    fullDetails: "Using clinical diagnostics, we accurately trace symptoms to their root causes. From seasonal influenza and infections to long-term chronic illness like diabetes, asthma, or hypertension, we create highly effective medical plans tailored to your physiology."
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description: "Lifestyle guidance, screening tests, and immunizations designed to protect you and your family against common illnesses.",
    iconName: "ShieldAlert",
    fullDetails: "An ounce of prevention is worth a pound of cure. We focus on vaccination schedules, nutritional counselling, weight management, and screening parameters to strengthen your immune system and protect your future vitality."
  },
  {
    id: "health-advice",
    title: "Health Advice",
    description: "Professional medical advice, mental wellness guidance, dietary recommendations, and long-term health education.",
    iconName: "HeartPulse",
    fullDetails: "Medical science is as much about teaching as it is about treating. Dr. Abdullah provides evidence-backed, easily understandable advice regarding cardiac care, high-stress management, nutrition, sleep optimization, and age-specific wellbeing."
  },
  {
    id: "follow-up",
    title: "Follow-up Visits",
    description: "Regular evaluations to track progress after initial treatments, adjust medications, and ensure optimal recovery.",
    iconName: "CalendarClock",
    fullDetails: "We stay with you until you are completely recovered. Follow-up visits monitor your healing progression, review lab outcomes, fine-tune medication dosages, and answer any ongoing questions to guarantee safe, lasting health improvements."
  }
];

export const FEATURES: Feature[] = [
  {
    id: "exp-care",
    title: "Experienced Care",
    description: "Years of professional general medicine practice with a track record of reliable treatments and successful clinical recoveries.",
    iconName: "Award"
  },
  {
    id: "friendly-env",
    title: "Friendly Environment",
    description: "A welcoming, clean, and compassionate clinic setting that prioritizes patient comfort and reduces clinical anxiety.",
    iconName: "Smile"
  },
  {
    id: "personalized",
    title: "Personalized Treatment",
    description: "We do not believe in one-size-fits-all. Every patient receives a customized diagnostic and therapeutic regimen tailored to their specific lifestyle.",
    iconName: "Sliders"
  },
  {
    id: "modern-practice",
    title: "Modern Medical Practice",
    description: "Equipped with state-of-the-art diagnostic aids, electronic medical records, and contemporary healthcare standards.",
    iconName: "Cpu"
  },
  {
    id: "satisfaction",
    title: "Patient Satisfaction",
    description: "Consistently rated exceptionally high by families in Dera Ismail Khan for our clear communication, care quality, and clinical reliability.",
    iconName: "Heart"
  },
  {
    id: "affordable",
    title: "Affordable Healthcare",
    description: "High-quality professional healthcare priced fairly. We believe premium healthcare should be accessible to all segments of society.",
    iconName: "Banknote"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Muhammad Rizwan",
    role: "Local Business Owner",
    review: "Dr. Abdullah is hands down the best general physician in Dera Ismail Khan. He listens with utmost patience, never rushes the appointment, and explains the diagnosis so clearly. His treatment for my high blood pressure worked miracles.",
    rating: 5
  },
  {
    id: "t2",
    name: "Ayesha Bibi",
    role: "School Teacher",
    review: "The clinic atmosphere is incredibly comforting and clean. Dr. Abdullah diagnosed my father's chest infection accurately when other clinics kept prescribing heavy antibiotics. Truly a compassionate and brilliant medical doctor.",
    rating: 5
  },
  {
    id: "t3",
    name: "Sajid Khan",
    role: "Government Officer",
    review: "Extremely professional doctor with a wealth of medical knowledge. Scheduling an appointment was seamless through his online portal, and the clinic staff is very welcoming. His preventive care advice changed my lifestyle for the better.",
    rating: 5
  },
  {
    id: "t4",
    name: "Dr. Maria Fatima",
    role: "Resident Medical Officer",
    review: "As a fellow healthcare professional, I highly respect Dr. Abdullah's diagnostic precision and clinical methodology. He practices evidence-based medicine with excellent empathy. Highly recommended for family medical needs.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Do I need an appointment?",
    answer: "While we do accept walk-in patients during clinic hours, we highly recommend booking an appointment online or via phone in advance. An appointment secures your specific slot and drastically reduces your waiting room time."
  },
  {
    id: "faq2",
    question: "What are the clinic timings?",
    answer: "Dr. Abdullah's clinic is open Monday through Saturday. The timings are from 10:00 AM to 2:00 PM (Morning session) and 5:00 PM to 9:00 PM (Evening session). The clinic remains closed on Sundays."
  },
  {
    id: "faq3",
    question: "Do you accept emergency patients?",
    answer: "Yes, we handle urgent primary care and non-life-threatening emergencies such as high fever, acute pain, minor injuries, or high blood pressure distress. However, for major, life-threatening traumas or critical surgical emergencies, please go directly to the nearest tertiary care hospital emergency ward."
  },
  {
    id: "faq4",
    question: "How can I contact the clinic?",
    answer: "You can call us directly at 03430277122 or visit the clinic at Eid Gaah Road, Dera Ismail Khan, Pakistan. You can also book appointments directly using the interactive booking form on this website!"
  }
];

export const CLINIC_HOURS: ClinicHours[] = [
  { day: "Monday", hours: "10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM", closed: false },
  { day: "Tuesday", hours: "10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM", closed: false },
  { day: "Wednesday", hours: "10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM", closed: false },
  { day: "Thursday", hours: "10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM", closed: false },
  { day: "Friday", hours: "10:00 AM - 01:00 PM, 05:30 PM - 09:00 PM", closed: false },
  { day: "Saturday", hours: "10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM", closed: false },
  { day: "Sunday", hours: "Closed", closed: true }
];

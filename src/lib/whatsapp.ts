export interface ContactFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
}

export interface AppointmentFormData {
    patientName: string;
    phoneNumber: string;
    email: string;
    selectedServices: string;
    date: string;
    timeSlot: string;
    urgency: string;
    message: string;
}

const WHATSAPP_NUMBER = '923336070227';
const BASE_URL = 'https://wa.me/';

export const generateContactMessage = (data: ContactFormData): string => {
    return `🦷 NMDC Dental — New Contact Inquiry

👤 Full Name:
${data.fullName}

📞 Phone Number:
${data.phoneNumber}

📧 Email Address:
${data.email}

📌 Subject:
${data.subject}

💬 Message:
${data.message}

━━━━━━━━━━━━━━━
Sent from NMDC Dental Website`.trim();
};

export const generateAppointmentMessage = (data: AppointmentFormData): string => {
    return `🦷 NMDC Dental — Appointment Request

👤 Patient Name:
${data.patientName}

📞 Phone Number:
${data.phoneNumber}

📧 Email Address:
${data.email}

🩺 Selected Services:
${data.selectedServices}

📅 Preferred Date:
${data.date}

⏰ Preferred Time:
${data.timeSlot}

⚡ Urgency Level:
${data.urgency}

💬 Additional Notes:
${data.message}

━━━━━━━━━━━━━━━
Sent from NMDC Dental Website`.trim();
};

export const openWhatsApp = (message: string) => {
    const whatsappUrl = `${BASE_URL}${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

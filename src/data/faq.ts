export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'implant-duration',
    question: 'How long do dental implants typically take?',
    answer: 'The full dental implant process typically ranges from 3 to 6 months. This allows for osseointegration, where the implant fuses with the jawbone, ensuring a strong, permanent foundation for your new tooth.'
  },
  {
    id: 'maxillofacial-sedation',
    question: 'Is maxillofacial surgery performed under sedation?',
    answer: 'Yes, most maxillofacial procedures are performed under intravenous sedation or general anesthesia to ensure complete patient comfort and safety during the treatment.'
  },
  {
    id: 'root-canal-recovery',
    question: 'What is the recovery time for a root canal?',
    answer: 'Most patients experience mild sensitivity for 1-2 days following a root canal. Normal activities can usually be resumed immediately, though we recommend waiting until numbness wears off before eating.'
  }
];

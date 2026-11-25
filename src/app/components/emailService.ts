import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_itqb10k'; // Your EmailJS service ID
const EMAILJS_LEAD_TEMPLATE_ID = 'template_7s05plz'; // Lead Capture - Portfolio
const EMAILJS_THANKYOU_TEMPLATE_ID = 'template_h8gycou'; // Thank You - Portfolio
const EMAILJS_PUBLIC_KEY = 'skfwjahRszGhBPfZN'; // Your EmailJS public key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailSubmission {
  name?: string;
  email: string;
  phone?: string;
  contactNumber?: string;
  message?: string;
  note?: string;
  service?: string;
  subject?: string;
  formType: 'lead' | 'support' | 'verification' | 'account' | 'transfer' | 'newsletter' | 'contact' | 'secret' | 'manage';
  additionalInfo?: Record<string, any>;
}

/**
 * Sends a lead notification email to Muneez Ahmed
 */
export async function sendLeadEmail(submission: EmailSubmission): Promise<boolean> {
  try {
    const templateParams = {
      to_email: 'hello@muneezahmed.com', // Your email
      from_name: submission.name || 'Anonymous',
      from_email: submission.email,
      phone: submission.phone || submission.contactNumber || 'Not provided',
      message: submission.message || submission.note || 'No message provided',
      service: submission.service || 'General Inquiry',
      form_type: getFormTypeLabel(submission.formType),
      submission_date: new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Dubai',
        dateStyle: 'full',
        timeStyle: 'short'
      }),
      additional_info: submission.additionalInfo 
        ? Object.entries(submission.additionalInfo)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')
        : 'None',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_LEAD_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Failed to send lead email:', error);
    return false;
  }
}

/**
 * Sends a thank you email to the client
 */
export async function sendThankYouEmail(submission: EmailSubmission): Promise<boolean> {
  try {
    // SIMPLIFIED VERSION - Only send essential params to avoid EmailJS template errors
    const templateParams = {
      to_email: submission.email,
      to_name: submission.name || 'there',
      service: submission.service || 'your inquiry',
      website_url: 'https://www.muneezahmed.com',
      linkedin_url: 'https://www.linkedin.com/in/mrmnz/',
      instagram_url: 'https://www.instagram.com/mr_mnz/',
      current_year: String(new Date().getFullYear()),
    };

    console.log('Sending thank you email with params:', templateParams);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_THANKYOU_TEMPLATE_ID,
      templateParams
    );

    console.log('Thank you email response:', response);

    return response.status === 200;
  } catch (error) {
    console.error('Failed to send thank you email:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return false;
  }
}

/**
 * Sends both lead and thank you emails
 */
export async function sendFormEmails(submission: EmailSubmission): Promise<{
  leadSent: boolean;
  thankYouSent: boolean;
}> {
  const [leadSent, thankYouSent] = await Promise.all([
    sendLeadEmail(submission),
    sendThankYouEmail(submission),
  ]);

  return { leadSent, thankYouSent };
}

/**
 * Helper function to get human-readable form type labels
 */
function getFormTypeLabel(formType: EmailSubmission['formType']): string {
  const labels: Record<EmailSubmission['formType'], string> = {
    lead: 'Business Inquiry / Lead',
    contact: 'Contact Form',
    support: 'Support Request',
    verification: 'Email Verification Request',
    account: 'Account Action',
    transfer: 'Profile Transfer Request',
    newsletter: 'Newsletter Subscription',
    secret: 'Secret Form',
    manage: 'Manage Form',
  };
  
  return labels[formType] || 'General Submission';
}

/**
 * Update EmailJS configuration (call this when user provides credentials)
 */
export function updateEmailJSConfig(config: {
  serviceId: string;
  leadTemplateId: string;
  thankYouTemplateId: string;
  publicKey: string;
}) {
  // This is a placeholder - in a real app, you'd want to store these securely
  // For now, these will need to be updated directly in the code
  console.log('EmailJS config updated. Please update the constants in emailService.ts');
  console.log(config);
}
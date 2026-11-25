# EmailJS Setup Guide for Muneez Ahmed Portfolio

This guide will help you set up EmailJS to send lead capture and thank you emails from your portfolio website.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Office 365**
   - Or any other SMTP service
4. Connect your email account (hello@muneezahmed.com)
5. Copy the **Service ID** - you'll need this later

## Step 3: Create Email Templates

### Template 1: Lead Capture Email (to you)

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it: "Lead Capture - Portfolio"
4. Copy the HTML from `/email-templates/lead-capture-template.html`
5. Paste it into the **Content** tab
6. In the **Settings** tab:
   - **From Name**: Portfolio Lead System
   - **From Email**: (use your verified email)
   - **To Email**: {{to_email}}
   - **Subject**: 🎯 New Lead: {{from_name}} - {{form_type}}
   - **Reply To**: {{from_email}}
7. Copy the **Template ID** - you'll need this later

### Template 2: Thank You Email (to client)

1. Click **Create New Template** again
2. Name it: "Thank You - Portfolio"
3. Copy the HTML from `/email-templates/thank-you-template.html`
4. Paste it into the **Content** tab
5. In the **Settings** tab:
   - **From Name**: Muneez Ahmed
   - **From Email**: (use your verified email)
   - **To Email**: {{to_email}}
   - **Subject**: Thanks for reaching out, {{to_name}}!
   - **Reply To**: hello@muneezahmed.com
7. Copy the **Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update Your Website Code

Open `/components/emailService.ts` and update these values at the top:

```typescript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Your Service ID from Step 2
const EMAILJS_LEAD_TEMPLATE_ID = 'template_xxxxxxx'; // Your Lead Template ID from Step 3.1
const EMAILJS_THANKYOU_TEMPLATE_ID = 'template_xxxxxxx'; // Your Thank You Template ID from Step 3.2
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxxx'; // Your Public Key from Step 4
```

## Step 6: Test the Integration

1. Go to your portfolio website
2. Navigate to the Prospect profile (Business Owner)
3. Fill out the contact form with test data
4. Submit the form
5. Check:
   - You should receive a lead email at hello@muneezahmed.com
   - The test email address should receive a thank you email

## Email Template Variables

### Lead Capture Template Variables:
- `{{to_email}}` - Your email (hello@muneezahmed.com)
- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email
- `{{phone}}` - Client's phone number
- `{{message}}` - Client's message
- `{{service}}` - Service requested
- `{{form_type}}` - Type of form submitted
- `{{submission_date}}` - Date and time of submission
- `{{additional_info}}` - Any additional information

### Thank You Template Variables:
- `{{to_email}}` - Client's email
- `{{to_name}}` - Client's name
- `{{form_type}}` - Type of form (used for conditional content)
- `{{is_verification}}` - Boolean for verification/account forms
- `{{is_lead}}` - Boolean for lead/contact forms
- `{{is_support}}` - Boolean for support forms
- `{{service}}` - Service requested (for leads)
- `{{website_url}}` - https://www.muneezahmed.com
- `{{linkedin_url}}` - https://www.linkedin.com/in/mrmnz/
- `{{instagram_url}}` - https://www.instagram.com/mr_mnz/
- `{{current_year}}` - Current year

## Understanding Form Types

The email system handles different scenarios intelligently:

1. **lead / contact** - Actual business inquiries (professional thank you)
2. **verification / account** - Funny message explaining it's just a portfolio
3. **support** - Humorous message about the Netflix design
4. **transfer** - Profile transfer requests
5. **newsletter** - Newsletter signups

## Important Notes

### EmailJS Free Tier Limits:
- 200 emails per month
- 2 email templates
- 1 email service

### For Production:
If you exceed the free tier, consider:
- EmailJS Pro: $15/month (1,000 emails)
- EmailJS Pro Plus: $35/month (10,000 emails)

### Gmail Specific Setup:
If using Gmail:
1. Enable 2-factor authentication
2. Create an App Password for EmailJS
3. Use the App Password instead of your regular password

### Testing Tips:
1. Use your own email for testing first
2. Check spam folders if emails don't arrive
3. Verify all template variables are working
4. Test different form types (lead, verification, support)

### Privacy & Security:
- Never commit your EmailJS credentials to version control
- Consider using environment variables in production
- EmailJS credentials are currently hardcoded but can be moved to a config file

## Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify all IDs and keys are correct
3. Check EmailJS dashboard for error logs
4. Ensure email service is properly connected

### Thank you emails going to spam?
1. Add your domain to SPF/DKIM records
2. Ask users to whitelist hello@muneezahmed.com
3. Ensure "From" email matches your verified email

### Template not rendering correctly?
1. Test templates in EmailJS dashboard first
2. Check that all variables are properly wrapped in {{}}
3. Ensure conditional blocks use correct Mustache syntax

## Additional Forms to Integrate

Currently, EmailJS is integrated with:
- Business Owner Profile contact form

You may want to integrate with other forms in:
- NavBar (Transfer Profile, Account, Support forms)
- Other profile contact sections

To integrate additional forms, use the `sendFormEmails` function with the appropriate `formType`:

```typescript
import { sendFormEmails } from './emailService';

await sendFormEmails({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+971501234567',
  message: 'Message content',
  service: 'Service type',
  formType: 'lead', // or 'verification', 'support', etc.
});
```

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Test your templates: https://dashboard.emailjs.com/

---

**Ready to go?** Follow the steps above and your portfolio will be sending professional emails in no time!

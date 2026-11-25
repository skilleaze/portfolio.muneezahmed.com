# EmailJS Template Setup Instructions

## IMPORTANT: How to Fix "Corrupted Dynamic Variables" Error

The error you're seeing happens because EmailJS expects **all variables** referenced in conditional blocks to be defined, even if they're false.

### Solution: Update Your EmailJS Template

In your EmailJS dashboard (https://dashboard.emailjs.com), go to the "Thank You - Portfolio" template and make these changes:

## Option 1: Use Inverted Conditionals (RECOMMENDED)

Instead of using `{{#is_verification}}`, use `{{#is_lead}}` and make it the default, or restructure to only show ONE section.

Replace the conditional sections with this structure:

```html
<!-- Main Content - Changes based on form type -->
<tr>
    <td style="padding: 40px;">
        
        <!-- For Lead/Contact Forms - Professional Message -->
        {{#is_lead}}
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #E50914;">
            <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Your Message Has Been Received
            </h2>
            <p style="margin: 0 0 15px 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I've received your inquiry about <strong style="color: #E50914;">{{service}}</strong> and I'm excited to learn more about your project.
            </p>
            <p style="margin: 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I'll review your message and get back to you within 24 hours. In the meantime, feel free to explore more of my work on the portfolio.
            </p>
        </div>
        {{/is_lead}}
        
        {{^is_lead}}
        <!-- For Verification/Account Forms - Funny Message -->
        {{#is_verification}}
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #E50914;">
            <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Quick Reality Check
            </h2>
            <p style="margin: 0 0 15px 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                Just so we're clear: there's nothing to verify or activate here. This is my Netflix-inspired portfolio, 
                not the actual Netflix platform, though I appreciate the confusion and I'll take it as a compliment on the design.
            </p>
            <p style="margin: 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                You won't be creating any accounts, changing passwords, or binge-watching anything here. 
                But hey, thanks for the email. I've received it and might reach out if it's relevant to my actual digital marketing services.
            </p>
        </div>
        {{/is_verification}}
        
        <!-- For Support Forms -->
        {{#is_support}}
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #E50914;">
            <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Thank You for Your Support
            </h2>
            <p style="margin: 0 0 15px 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I'm genuinely grateful that you took the time to reach out and show your support. 
                Messages like yours mean the world to me and motivate me to keep pushing boundaries in my work.
            </p>
            <p style="margin: 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                Your encouragement and feedback are incredibly valuable. If there's anything specific you'd like to discuss 
                or if you have any questions about my work, feel free to reply to this email. I'd love to connect.
            </p>
        </div>
        {{/is_support}}
        
        <!-- For Secret/Newsletter Forms (Marketers) -->
        {{#is_secret}}
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #E50914;">
            <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Welcome to the Inner Circle
            </h2>
            <p style="margin: 0 0 15px 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                Thank you for your interest in my marketing insights. As a fellow marketer, you know the value of staying ahead of the curve.
            </p>
            <p style="margin: 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I'll be sharing exclusive strategies, case studies, and performance insights that have generated over 7M+ AED in revenue for my clients. 
                Keep an eye on your inbox for premium content that actually moves the needle.
            </p>
        </div>
        {{/is_secret}}
        {{/is_lead}}

        <!-- Rest of template continues... -->
    </td>
</tr>
```

## Option 2: Simpler Approach - Use form_type Instead (EASIEST)

Replace all the conditional blocks with a single switch based on `form_type`:

```html
<tr>
    <td style="padding: 40px;">
        <div style="background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%); border-radius: 8px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #E50914;">
            <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Thanks for Reaching Out
            </h2>
            <p style="margin: 0 0 15px 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I've received your message about <strong style="color: #E50914;">{{service}}</strong>.
            </p>
            <p style="margin: 0; color: #B3B3B3; font-size: 15px; line-height: 1.7;">
                I'll review your submission and get back to you within 24 hours. Thank you for your interest!
            </p>
        </div>
        
        <!-- Rest of template... -->
    </td>
</tr>
```

## What Variables to Keep

Make sure these variables are in your EmailJS template settings under "Template Parameters":

### Required Variables (always sent):
- `to_email` - Recipient email
- `to_name` - Recipient name
- `form_type` - Type of form submission
- `service` - Service inquiry
- `website_url` - Portfolio URL
- `linkedin_url` - LinkedIn URL
- `instagram_url` - Instagram URL
- `current_year` - Current year

### Optional Variables (only sent when true):
- `is_verification` - Only exists when form is verification/account/manage
- `is_lead` - Only exists when form is lead/contact
- `is_support` - Only exists when form is support
- `is_secret` - Only exists when form is secret/newsletter

## The Problem

EmailJS gets confused when you use `{{#is_verification}}` but the variable doesn't exist in the parameters. Even though Mustache is supposed to handle missing variables, EmailJS's implementation is stricter.

## Quick Test

After updating your template, test it by going to your EmailJS dashboard:
1. Click on "Thank You - Portfolio" template
2. Click "Test Template"
3. Enter these test values:
   ```
   to_email: test@example.com
   to_name: Test User
   form_type: secret
   service: testing
   website_url: https://www.muneezahmed.com
   linkedin_url: https://www.linkedin.com/in/mrmnz/
   instagram_url: https://www.instagram.com/mr_mnz/
   current_year: 2025
   is_secret: true
   ```
4. Leave the other `is_*` fields empty or omit them
5. Click "Test Send"

If it works in the test, it will work on your website!

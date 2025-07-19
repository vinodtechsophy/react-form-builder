// Example: Simple form integration
import React, { useState } from 'react';
import { FormRenderer } from '../src/components/FormRenderer'; // Local import for this project

// This JSON would come from your form builder export
const contactFormConfig = {
  "metadata": {
    "title": "Contact Us",
    "description": "Get in touch with our team"
  },
  "fields": [
    {
      "id": "name",
      "type": "text",
      "name": "full_name",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true
    },
    {
      "id": "email",
      "type": "email", 
      "name": "email",
      "label": "Email Address",
      "placeholder": "your@email.com",
      "required": true
    },
    {
      "id": "message",
      "type": "textarea",
      "name": "message",
      "label": "Message",
      "placeholder": "Tell us how we can help...",
      "required": true,
      "properties": {
        "rows": 4
      }
    }
  ],
  "settings": {
    "submitButtonText": "Send Message",
    "theme": "light"
  }
};

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleFormSubmit = async (formData: Record<string, any>) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send to your backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        console.log('Form submitted successfully:', formData);
        // Form data will be: { full_name: "John", email: "john@email.com", message: "Hello..." }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Form title and description from JSON */}
      <h1 className="text-3xl font-bold mb-2">{contactFormConfig.metadata.title}</h1>
      <p className="text-gray-600 mb-8">{contactFormConfig.metadata.description}</p>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Sorry, there was an error sending your message. Please try again.
        </div>
      )}

      {/* The actual form - completely generated from JSON */}
      <FormRenderer 
        form={contactFormConfig as any}
        onSubmit={handleFormSubmit}
        onFieldChange={(fieldName, value) => {
          // Optional: track field changes
          console.log(`Field ${fieldName} changed to:`, value);
        }}
        className="space-y-6"
      />

      {isSubmitting && (
        <div className="text-center text-gray-500 mt-4">
          Sending your message...
        </div>
      )}
    </div>
  );
}

/*
// Backend API example (Next.js API route)
// pages/api/contact.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { full_name, email, message } = req.body;
    
    // Validate required fields
    if (!full_name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Save to database
      // await saveContactToDatabase({ full_name, email, message });
      
      // Send email notification
      // await sendEmailNotification({ full_name, email, message });
      
      console.log('Contact form submission:', { full_name, email, message });
      
      res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
*/

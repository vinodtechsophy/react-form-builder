import React from 'react';
import { 
  FormRenderer, 
  JsonFormRenderer,
  FormBuilderSuite,
  type FormExportData 
} from '@flowcsolutions/react-form-builder';

// Example 1: Simple Form Renderer
const sampleFormConfig: FormExportData = {
  metadata: {
    id: 'example-form',
    title: 'Contact Form',
    description: 'Please fill out this contact form',
    version: '1.0.0',
    createdAt: '2025-07-19T00:00:00.000Z',
    exportedAt: '2025-07-19T00:00:00.000Z',
    builderVersion: '1.0.0'
  },
  settings: {
    submitButtonText: 'Send Message',
    allowMultipleSubmissions: true,
    requireAuth: false,
    captchaEnabled: false,
    theme: 'auto'
  },
  layout: {
    rows: [
      {
        id: 'row-1',
        fields: ['name', 'email'],
        columns: 12
      },
      {
        id: 'row-2',
        fields: ['message'],
        columns: 12
      }
    ],
    totalFields: 3
  },
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      name: 'full_name',
      required: true,
      placeholder: 'Enter your full name',
      properties: {
        width: 'full',
        helpText: 'Please enter your complete name'
      },
      layout: {
        columnSpan: 6,
        rowId: 'row-1',
        gridClass: 'col-span-6'
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      name: 'email',
      required: true,
      placeholder: 'Enter your email',
      properties: {
        width: 'full',
        helpText: 'We will use this to contact you'
      },
      layout: {
        columnSpan: 6,
        rowId: 'row-1',
        gridClass: 'col-span-6'
      }
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      name: 'message',
      required: false,
      placeholder: 'Enter your message',
      properties: {
        width: 'full',
        rows: 4,
        helpText: 'Tell us how we can help you'
      },
      layout: {
        columnSpan: 12,
        rowId: 'row-2',
        gridClass: 'col-span-12'
      }
    }
  ],
  fieldMap: {
    name: {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      name: 'full_name',
      required: true,
      placeholder: 'Enter your full name',
      properties: {
        width: 'full',
        helpText: 'Please enter your complete name'
      },
      layout: {
        columnSpan: 6,
        rowId: 'row-1',
        gridClass: 'col-span-6'
      }
    },
    email: {
      id: 'email',
      type: 'email',
      label: 'Email',
      name: 'email',
      required: true,
      placeholder: 'Enter your email',
      properties: {
        width: 'full',
        helpText: 'We will use this to contact you'
      },
      layout: {
        columnSpan: 6,
        rowId: 'row-1',
        gridClass: 'col-span-6'
      }
    },
    message: {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      name: 'message',
      required: false,
      placeholder: 'Enter your message',
      properties: {
        width: 'full',
        rows: 4,
        helpText: 'Tell us how we can help you'
      },
      layout: {
        columnSpan: 12,
        rowId: 'row-2',
        gridClass: 'col-span-12'
      }
    }
  },
  validation: {
    requiredFields: ['name', 'email'],
    fieldsWithValidation: ['email']
  }
};

// Example usage components
export function SimpleFormExample() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Form Example</h1>
      <FormRenderer 
        formConfig={sampleFormConfig}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export function JsonRendererExample() {
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold p-6">JSON Form Renderer Example</h1>
      <JsonFormRenderer />
    </div>
  );
}

export function FullBuilderExample() {
  return (
    <div className="min-h-screen">
      <FormBuilderSuite />
    </div>
  );
}

// Main example app
export default function ExampleApp() {
  const [currentExample, setCurrentExample] = React.useState<'simple' | 'json' | 'builder'>('simple');

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gray-100 p-4 border-b">
        <div className="max-w-7xl mx-auto flex gap-4">
          <button
            onClick={() => setCurrentExample('simple')}
            className={`px-4 py-2 rounded ${currentExample === 'simple' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Simple Form
          </button>
          <button
            onClick={() => setCurrentExample('json')}
            className={`px-4 py-2 rounded ${currentExample === 'json' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            JSON Renderer
          </button>
          <button
            onClick={() => setCurrentExample('builder')}
            className={`px-4 py-2 rounded ${currentExample === 'builder' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            Form Builder
          </button>
        </div>
      </nav>

      {/* Content */}
      {currentExample === 'simple' && <SimpleFormExample />}
      {currentExample === 'json' && <JsonRendererExample />}
      {currentExample === 'builder' && <FullBuilderExample />}
    </div>
  );
}

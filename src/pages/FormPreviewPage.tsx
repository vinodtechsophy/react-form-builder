import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Upload, FileJson, Play } from 'lucide-react';
import { FormRenderer } from '../components/FormRenderer';
import type { FormExportData } from '../utils/formExport';

export function FormPreviewPage() {
  const [formConfig, setFormConfig] = useState<FormExportData | null>(null);
  const [submissionData, setSubmissionData] = useState<Record<string, any> | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setFormConfig(jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Invalid JSON file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJsonInput = (jsonString: string) => {
    try {
      const jsonData = JSON.parse(jsonString);
      setFormConfig(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Invalid JSON format. Please check the syntax.');
    }
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setSubmissionData(data);
    onOpen();
    console.log('Form submitted with data:', data);
  };

  const loadSampleForm = () => {
    // Sample form configuration for testing
    const sampleConfig: FormExportData = {
      metadata: {
        id: 'sample-form',
        title: 'Sample Contact Form',
        description: 'A sample form to demonstrate the JSON form renderer',
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        exportedAt: new Date().toISOString(),
        builderVersion: '1.0.0',
      },
      settings: {
        submitButtonText: 'Send Message',
        allowMultipleSubmissions: true,
        requireAuth: false,
        captchaEnabled: false,
        theme: 'auto',
      },
      layout: {
        rows: [
          { id: 'row-0', fields: ['name', 'email'], columns: 12 },
          { id: 'row-1', fields: ['subject'], columns: 12 },
          { id: 'row-2', fields: ['message'], columns: 12 },
          { id: 'row-3', fields: ['subscribe'], columns: 12 },
        ],
        totalFields: 4,
      },
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          name: 'full_name',
          placeholder: 'Enter your full name',
          required: true,
          properties: {},
          layout: { columnSpan: 6, rowId: 'row-0', gridClass: 'col-span-6' },
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          name: 'email',
          placeholder: 'Enter your email',
          required: true,
          validation: [{ type: 'email', message: 'Please enter a valid email address' }],
          properties: {},
          layout: { columnSpan: 6, rowId: 'row-0', gridClass: 'col-span-6' },
        },
        {
          id: 'subject',
          type: 'text',
          label: 'Subject',
          name: 'subject',
          placeholder: 'Enter the subject',
          required: true,
          properties: {},
          layout: { columnSpan: 12, rowId: 'row-1', gridClass: 'col-span-12' },
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          name: 'message',
          placeholder: 'Enter your message',
          required: true,
          properties: { rows: 5 },
          layout: { columnSpan: 12, rowId: 'row-2', gridClass: 'col-span-12' },
        },
        {
          id: 'subscribe',
          type: 'checkbox',
          label: 'Subscribe to newsletter',
          name: 'subscribe_newsletter',
          required: false,
          properties: { helpText: 'Get updates about our products and services' },
          layout: { columnSpan: 12, rowId: 'row-3', gridClass: 'col-span-12' },
        },
      ],
      fieldMap: {},
      validation: {
        requiredFields: ['name', 'email', 'subject', 'message'],
        fieldsWithValidation: ['email'],
      },
    };

    // Populate fieldMap
    sampleConfig.fields.forEach(field => {
      sampleConfig.fieldMap[field.id] = field;
    });

    setFormConfig(sampleConfig);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Form Renderer</h1>
          <p className="text-default-600">
            Load a form configuration JSON file to render a functional form
          </p>
        </div>

        {!formConfig ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload JSON File
                </h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-sm text-default-600">
                    Upload a form configuration JSON file exported from the Form Builder
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="w-full p-3 border border-default-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Manual JSON Input */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileJson className="w-5 h-5" />
                  Paste JSON
                </h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-sm text-default-600">
                    Paste your form configuration JSON directly
                  </p>
                  <JsonInputModal onSubmit={handleJsonInput} />
                </div>
              </CardBody>
            </Card>

            {/* Sample Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Try Sample Form
                </h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-sm text-default-600">
                    Load a sample contact form to see how the renderer works
                  </p>
                  <Button color="primary" onPress={loadSampleForm}>
                    Load Sample Form
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Form Info */}
            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{formConfig.metadata.title}</h2>
                    <p className="text-sm text-default-600">
                      {formConfig.layout.totalFields} fields • Exported: {new Date(formConfig.metadata.exportedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="flat"
                    onPress={() => setFormConfig(null)}
                  >
                    Load Different Form
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Rendered Form */}
            <FormRenderer
              formConfig={formConfig}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {/* Submission Result Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Form Submission</ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <p>Form submitted successfully! Here's the data:</p>
                    <div className="bg-default-100 p-4 rounded-lg">
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(submissionData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

function JsonInputModal({ onSubmit }: { onSubmit: (json: string) => void }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = () => {
    if (jsonInput.trim()) {
      onSubmit(jsonInput);
      setJsonInput('');
      onOpenChange();
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Paste JSON</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Paste Form Configuration JSON</ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Paste your form configuration JSON here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Load Form
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Chip, 
  Spacer,
  Code,
  Button,
  Link
} from '@heroui/react';
import { 
  BookOpen, 
  Github, 
  Package, 
  Zap, 
  Code as CodeIcon,
  ExternalLink,
  Terminal,
  Settings,
  Palette,
  Shield,
  Users,
  Rocket
} from 'lucide-react';

const DocumentationPage = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Drag & Drop Interface",
      description: "Intuitive form building with drag-and-drop functionality"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "HeroUI Components",
      description: "Beautiful, accessible components with modern design"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "TypeScript Support",
      description: "Full type safety and excellent developer experience"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Responsive Design",
      description: "Mobile-first design that works on all devices"
    },
    {
      icon: <CodeIcon className="w-5 h-5" />,
      title: "JSON Export/Import",
      description: "Export forms as JSON and import them back seamlessly"
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Extensive Field Types",
      description: "20+ field types including advanced components"
    }
  ];

  const fieldTypes = [
    "Text Input", "Email", "Password", "Number", "Date", "Time", "Textarea",
    "Select", "Autocomplete", "Multi-select", "Radio", "Checkbox", "Switch",
    "File Upload", "Rating", "Signature", "Phone", "URL", "Range", "Button"
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Chip 
            color="primary" 
            variant="flat" 
            startContent={<BookOpen className="w-4 h-4" />}
            size="lg"
          >
            Documentation
          </Chip>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4">
          📚 Complete Guide
        </h1>
        
        <p className="text-xl text-default-600 max-w-3xl mx-auto mb-8">
          Everything you need to know about React Form Builder - installation, usage, customization, and more.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary-500" />
            Quick Start
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Installation</h3>
              <div className="bg-default-100 p-4 rounded-lg relative">
                <Code className="block">npm install @flowcsolutions/react-form-builder</Code>
                <Button
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={() => copyToClipboard('npm install @flowcsolutions/react-form-builder')}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Usage</h3>
              <div className="bg-default-100 p-4 rounded-lg relative">
                <Code className="block text-sm">
{`import { ReactFormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

function App() {
  return <ReactFormBuilderSuite />;
}`}
                </Code>
                <Button
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={() => copyToClipboard(`import { ReactFormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

function App() {
  return <ReactFormBuilderSuite />;
}`)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Features Overview */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-primary-500" />
          Key Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-50 text-primary-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Field Types */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-secondary-500" />
            Supported Field Types
          </h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {fieldTypes.map((type) => (
              <Chip
                key={type}
                variant="flat"
                color="secondary"
                size="sm"
              >
                {type}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Advanced Usage */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CodeIcon className="w-6 h-6 text-warning-500" />
            Advanced Usage
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Custom Form Renderer</h3>
              <div className="bg-default-100 p-4 rounded-lg relative">
                <Code className="block text-sm">
{`import { FormRenderer } from '@flowcsolutions/react-form-builder';

const MyForm = () => {
  const formConfig = {
    title: "Contact Form",
    fields: [
      {
        id: "1",
        type: "text",
        label: "Name",
        required: true
      }
    ]
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer 
      form={formConfig} 
      onSubmit={handleSubmit}
    />
  );
};`}
                </Code>
                <Button
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={() => copyToClipboard(`import { FormRenderer } from '@flowcsolutions/react-form-builder';

const MyForm = () => {
  const formConfig = {
    title: "Contact Form",
    fields: [
      {
        id: "1",
        type: "text",
        label: "Name",
        required: true
      }
    ]
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer 
      form={formConfig} 
      onSubmit={handleSubmit}
    />
  );
};`)}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Custom Form Builder</h3>
              <div className="bg-default-100 p-4 rounded-lg relative">
                <Code className="block text-sm">
{`import { 
  FormBuilderProvider, 
  FormBuilder 
} from '@flowcsolutions/react-form-builder';

const MyFormBuilder = () => {
  return (
    <FormBuilderProvider>
      <FormBuilder 
        onFormChange={(form) => {
          console.log('Form updated:', form);
        }}
      />
    </FormBuilderProvider>
  );
};`}
                </Code>
                <Button
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={() => copyToClipboard(`import { 
  FormBuilderProvider, 
  FormBuilder 
} from '@flowcsolutions/react-form-builder';

const MyFormBuilder = () => {
  return (
    <FormBuilderProvider>
      <FormBuilder 
        onFormChange={(form) => {
          console.log('Form updated:', form);
        }}
      />
    </FormBuilderProvider>
  );
};`)}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Configuration */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6 text-success-500" />
            Configuration
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Form Settings</h3>
              <div className="bg-default-100 p-4 rounded-lg">
                <Code className="block text-sm">
{`{
  "submitButtonText": "Submit Form",
  "allowMultipleSubmissions": true,
  "requireAuth": false,
  "captchaEnabled": false,
  "theme": "auto"
}`}
                </Code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Field Properties</h3>
              <div className="bg-default-100 p-4 rounded-lg">
                <Code className="block text-sm">
{`{
  "label": "Field Label",
  "placeholder": "Enter value...",
  "required": true,
  "properties": {
    "size": "md",
    "colorVariant": "primary",
    "borderRadius": "md",
    "width": "full"
  }
}`}
                </Code>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* API Reference */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Terminal className="w-6 h-6 text-danger-500" />
            API Reference
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Components</h3>
              <ul className="list-disc list-inside space-y-1 text-default-600">
                <li><Code>ReactFormBuilderSuite</Code> - Complete form builder with preview</li>
                <li><Code>FormBuilder</Code> - Form builder interface only</li>
                <li><Code>FormRenderer</Code> - Render forms from JSON configuration</li>
                <li><Code>FormBuilderProvider</Code> - Context provider for state management</li>
                <li><Code>FieldSidebar</Code> - Draggable field components panel</li>
                <li><Code>PropertiesPanel</Code> - Field properties editor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Props</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-default-200">
                      <th className="text-left p-2">Component</th>
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-default-600">
                    <tr className="border-b border-default-100">
                      <td className="p-2"><Code>FormRenderer</Code></td>
                      <td className="p-2">form</td>
                      <td className="p-2">FormConfig</td>
                      <td className="p-2">Form configuration object</td>
                    </tr>
                    <tr className="border-b border-default-100">
                      <td className="p-2"><Code>FormRenderer</Code></td>
                      <td className="p-2">onSubmit</td>
                      <td className="p-2">Function</td>
                      <td className="p-2">Form submission handler</td>
                    </tr>
                    <tr className="border-b border-default-100">
                      <td className="p-2"><Code>FormBuilder</Code></td>
                      <td className="p-2">onFormChange</td>
                      <td className="p-2">Function</td>
                      <td className="p-2">Form change handler</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Contributing */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-500" />
            Contributing
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <p className="text-default-600">
              We welcome contributions! Please feel free to submit a Pull Request.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                color="primary"
                variant="flat"
                startContent={<Github className="w-4 h-4" />}
                as={Link}
                href="https://github.com/zenpou21/react-form-builder"
                isExternal
              >
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
              
              <Button
                color="secondary"
                variant="flat"
                startContent={<Package className="w-4 h-4" />}
                as={Link}
                href="https://www.npmjs.com/package/@flowcsolutions/react-form-builder"
                isExternal
              >
                View on NPM
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* License */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-success-500" />
            License
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-default-600">
            This project is licensed under the MIT License - see the LICENSE file for details.
          </p>
        </CardBody>
      </Card>

      <Spacer y={8} />

      {/* Footer */}
      <div className="text-center text-sm text-default-500">
        <p>React Form Builder v1.1.3 • Built with ❤️ by FlowC Solutions</p>
      </div>
    </div>
  );
};

export default DocumentationPage;

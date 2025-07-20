import { 
  Card, 
  CardBody, 
  CardHeader, 
  Chip, 
  Progress,
  Spacer
} from '@heroui/react';
import { 
  Sparkles, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle,
  Gift,
  Rocket,
} from 'lucide-react';

const AnnouncementPage = () => {
  const newFeatures = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Unified Field Alignment",
      description: "Radio, checkbox, switch, and rating fields now have consistent label and component alignment controls.",
      status: "released"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Auto-Generated Field Names",
      description: "Fields without custom names automatically get unique identifiers (e.g., text_input, text_input2).",
      status: "released"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Autocomplete Field Support",
      description: "Full HeroUI Autocomplete field with searchable dropdown options and validation.",
      status: "released"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Coming Soon Indicators",
      description: "Static content and structure elements now show 'Coming Soon' chips in the sidebar.",
      status: "released"
    }
  ];

  const improvements = [
    "Cleaner Properties Panel with context-aware controls",
    "Hidden text alignment for field types that don't need it",
    "Better drag-and-drop experience with disabled state handling",
    "Enhanced form export with auto-naming logic",
    "Improved accessibility and user experience"
  ];

  const upcomingFeatures = [
    {
      title: "Static Content Elements",
      description: "Rich text, images, dividers, and spacers",
      eta: "Next Release"
    },
    {
      title: "Advanced Layout Controls",
      description: "Sections, tabs, and multi-step wizards",
      eta: "Q2 2024"
    },
    {
      title: "Conditional Logic",
      description: "Show/hide fields based on other field values",
      eta: "Q2 2024"
    },
    {
      title: "Custom Validation Rules",
      description: "Advanced validation with custom error messages",
      eta: "Q3 2024"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Chip 
            color="primary" 
            variant="flat" 
            startContent={<Gift className="w-4 h-4" />}
            size="lg"
          >
            Version 1.1 - New Features
          </Chip>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-5">
          🎉 Major Updates Available!
        </h1>
        
        <p className="text-xl text-default-600 max-w-3xl mx-auto mb-8">
          We've been working hard to bring you exciting new features, improvements, and a better overall experience. 
          Here's everything new in React Form Builder!
        </p>

      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Release Progress</span>
            <span className="text-sm text-default-600">4/4 Features Completed</span>
          </div>
          <Progress value={100} color="success" className="mb-2" />
          <p className="text-xs text-default-600">All planned features for v1.1 have been successfully implemented!</p>
        </CardBody>
      </Card>

      {/* New Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Rocket className="w-8 h-8 text-primary-500" />
          New Features & Enhancements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-x-3 justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-50 text-primary-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <Chip 
                    color="success" 
                    variant="flat" 
                    size="sm"
                    startContent={<CheckCircle className="w-3 h-3" />}
                  >
                    Released
                  </Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Improvements Section */}
      <Card className="mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-warning-500" />
            Quality Improvements
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {improvements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                <span className="text-default-700">{improvement}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Upcoming Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Clock className="w-8 h-8 text-secondary-500" />
          What's Coming Next
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <Card key={index} className="border-dashed border-2 border-default-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-x-3 justify-between">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <Chip color="secondary" variant="flat" size="sm">
                    {feature.eta}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-default-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Changelog Section */}
      <Card className="mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📋 Version 1.1 Changelog
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary-600 mb-2">🆕 New Features</h4>
              <ul className="space-y-2 text-sm text-default-600 ml-4">
                <li>• Added Autocomplete field type with HeroUI integration</li>
                <li>• Implemented auto-generated field naming system</li>
                <li>• Added unified alignment controls for radio, checkbox, switch, and rating fields</li>
                <li>• Introduced "Coming Soon" indicators for upcoming features</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-warning-600 mb-2">🛠️ Improvements</h4>
              <ul className="space-y-2 text-sm text-default-600 ml-4">
                <li>• Enhanced Properties Panel with context-aware controls</li>
                <li>• Hidden text alignment for irrelevant field types</li>
                <li>• Improved drag-and-drop experience with disabled states</li>
                <li>• Better form export logic with intelligent naming</li>
                <li>• Enhanced accessibility and user experience</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-success-600 mb-2">🐛 Bug Fixes</h4>
              <ul className="space-y-2 text-sm text-default-600 ml-4">
                <li>• Fixed alignment inconsistencies across different field types</li>
                <li>• Resolved field naming conflicts in form exports</li>
                <li>• Improved error handling for invalid field configurations</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Thank You Section */}
      {/* <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-none">
        <CardBody className="text-center py-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-danger-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-default-600 max-w-2xl mx-auto mb-6">
            Your feedback and support drive our development. We're committed to making React Form Builder 
            the best form building solution for React developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              color="primary" 
              variant="flat"
              endContent={<ExternalLink className="w-4 h-4" />}
              onPress={() => window.open('https://github.com/flowcsolutions/react-form-builder/issues/new', '_blank')}
            >
              Share Feedback
            </Button>
            <Button 
              variant="light"
              endContent={<ExternalLink className="w-4 h-4" />}
              onPress={() => window.open('https://github.com/flowcsolutions/react-form-builder/discussions', '_blank')}
            >
              Join Community
            </Button>
          </div>
        </CardBody>
      </Card> */}

      <Spacer y={8} />

      {/* Footer */}
      <div className="text-center text-sm text-default-500">
        <p>React Form Builder v1.1 • Built with ❤️ by FlowC Solutions</p>
      </div>
    </div>
  );
};

export default AnnouncementPage;

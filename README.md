# React Form Builder

A powerful, responsive form builder built with React, TypeScript, HeroUI, and TailwindCSS. Create dynamic forms with drag-and-drop functionality, export to JSON, and render forms anywhere.

## 🎉 What's New in v1.1.0

We've just released major improvements to React Form Builder! Here's what's new:

### ✨ New Features
- **🎯 Unified Field Alignment**: Radio, checkbox, switch, and rating fields now have consistent label and component alignment controls
- **⚡ Auto-Generated Field Names**: Fields without custom names automatically get unique identifiers (e.g., `text_input`, `text_input2`)
- **🔍 Autocomplete Field**: Full HeroUI Autocomplete support with searchable dropdown options and validation
- **⏳ Coming Soon Indicators**: Static content and structure elements show "Coming Soon" chips in the sidebar

### 🛠️ Improvements
- Cleaner Properties Panel with context-aware controls
- Hidden text alignment for field types that don't need it (select, radio, checkbox, switch, date, time, file, rating, autocomplete)
- Better drag-and-drop experience with disabled state handling
- Enhanced form export with auto-naming logic
- Improved accessibility and user experience

### 🔮 Coming Soon
- **Static Content Elements**: Rich text, images, dividers, and spacers
- **Advanced Layout Controls**: Sections, tabs, and multi-step wizards
- **Conditional Logic**: Show/hide fields based on other field values
- **Custom Validation Rules**: Advanced validation with custom error messages

> 📖 **[View Full Announcement](./src/pages/AnnouncementPage.tsx)** for detailed information about all new features and improvements.

## 📦 Installation

### As a Package (Recommended)

```bash
npm install @flowcsolutions/react-form-builder
```

**Important**: Since this package uses TailwindCSS for styling, you need to set up TailwindCSS in your project for the styles to work properly.

#### Quick Setup for TailwindCSS & HeroUI (Required)

1. **Install TailwindCSS in your project**:
```bash
npm install -D tailwindcss @tailwindcss/vite
```

2. **Add TailwindCSS to your `vite.config.js`**:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

3. **Create `tailwind.config.js` with HeroUI configuration**:
```js
// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@flowcsolutions/react-form-builder/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  plugins: [heroui()],
};
```

4. **Add TailwindCSS to your main CSS file** (e.g., `src/index.css`):
```css
@import "tailwindcss";
@plugin '../hero.ts';
@source '../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}';
@custom-variant dark (&:is(.dark *));
```

**Create `hero.ts` file.**
```js
import { heroui } from "@heroui/react";
export default heroui();
```

#### Basic Usage
```tsx
import { FormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

function App() {
  return <FormBuilderSuite />;
}
```

### Local Development

```bash
git clone https://github.com/yourusername/react-form-builder.git
cd react-form-builder
npm install
npm run dev
```

## ✨ Features

- 🎨 **Visual Form Builder**: Drag and drop interface for building forms
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔧 **Rich Field Types**: Text, email, select, radio, checkbox, file upload, autocomplete, rating, and more
- 🎯 **Smart Field Alignment**: Unified alignment controls for radio, checkbox, switch, and rating fields
- ⚡ **Auto-Generated Names**: Automatic unique naming for fields without custom names
- 🎯 **Grid Layout**: Multi-column layouts with customizable spans
- 🎨 **Custom Styling**: Support for custom CSS classes and Tailwind utilities
- 📤 **JSON Export/Import**: Portable form configurations with intelligent field naming
- 🔄 **Form Renderer**: Standalone form rendering component
- ⚡ **Live Preview**: Real-time form preview with multiple device views
- 🔧 **Validation**: Built-in validation rules and custom validation support
- 🎪 **Modern UI**: Clean, accessible interface built with HeroUI
- ⏳ **Future-Ready**: Coming soon indicators for upcoming features

## 🚀 Quick Start

### Installation

```bash
# Install the package (includes all dependencies)
npm install @flowcsolutions/react-form-builder
```

### Basic Usage

#### Complete Form Builder Suite (Recommended)

```tsx
import { FormBuilderSuite } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

function App() {
  return <FormBuilderSuite />;
}
```

#### Custom Form Builder Layout

#### Form Renderer (Standalone)

```tsx
import { FormRenderer, type FormExportData } from '@flowcsolutions/react-form-builder';
import '@flowcsolutions/react-form-builder/style.css';

const formConfig: FormExportData = {
  //The JSON Structure generated by FormBuilder
};

function MyForm() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer 
      formConfig={formConfig} 
      onSubmit={handleSubmit}
    />
  );
}


function MyForm() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
  };

  // Convert FormConfig to FormExportData
  const exportData: FormExportData = generateFormExportData(simpleFormConfig);

  return (
    <FormRenderer 
      formConfig={exportData} 
      onSubmit={handleSubmit}
    />
  );
}
```

### Local Development (For Contributors)

```bash
# Clone the repository
git clone https://github.com/flowcsolutions/react-form-builder.git
cd react-form-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Dependencies

### Core Dependencies
- React 18+
- TypeScript
- @heroui/react v2.8.1+
- @dnd-kit/core v6.3.1+
- TailwindCSS v4.1.11
- Lucide React (icons)
- UUID

### Development Dependencies
- Vite
- ESLint
- TypeScript compiler

## 📖 Documentation

- [**🎉 What's New**](./src/pages/AnnouncementPage.tsx) - Latest features and improvements in v1.1.0
- [Field Types](./docs/FIELD_TYPES.md) - Available form field types and properties
- [JSON Export Format](./docs/JSON_EXPORT.md) - Structure of exported form configurations
- [Custom Styling](./docs/STYLING.md) - How to customize form appearance
- [API Reference](./docs/API.md) - Component props and methods

### 🆕 New Field Types & Features

#### Autocomplete Field
```tsx
// Autocomplete field with searchable options
{
  "type": "autocomplete",
  "label": "Select Country",
  "options": [
    {"label": "United States", "value": "us"},
    {"label": "Canada", "value": "ca"},
    {"label": "United Kingdom", "value": "uk"}
  ],
  "placeholder": "Search countries...",
  "allowsCustomValue": false
}
```

#### Unified Field Alignment
All form fields now support consistent alignment controls:
- `componentAlignment`: "horizontal" | "vertical" (for radio, checkbox, switch, rating)
- Context-aware properties panel that shows only relevant alignment options
- Automatic field naming for improved form export consistency

## 🎯 Use Cases

- **Customer Feedback Forms**: Surveys with rating fields, reviews, contact forms
- **Application Forms**: Job applications with autocomplete fields, registrations, onboarding
- **Data Collection**: Research forms with smart field alignment, lead generation, event registration
- **Dynamic Forms**: Multi-step wizards, conditional logic forms (coming soon)
- **Embedded Forms**: Integrate forms into existing applications with consistent styling
- **E-commerce**: Product reviews with rating fields, checkout forms with autocomplete
- **Professional Services**: Client intake forms, service requests, appointment booking

## 🔧 Customization

### Adding Custom Field Types

```tsx
import { createFormField, FIELD_TEMPLATES } from '@flowcsolutions/react-form-builder';

// Add custom field configuration
export const CUSTOM_FIELDS = {
  signature: {
    type: 'signature',
    label: 'Signature',
    icon: 'PenTool',
    category: 'advanced'
  }
};
```

### Custom Styling

The form builder now includes smarter styling controls based on field types:

```tsx
import { FormRenderer, type FormExportData } from '@flowcsolutions/react-form-builder';

// Enhanced field configuration with unified alignment
const enhancedFieldConfig = {
  id: "rating-field",
  type: "rating",
  label: "Rate this product",
  componentAlignment: "horizontal", // New unified alignment
  maxRating: 5,
  customClasses: "border-blue-500 bg-blue-50",
  validation: [{ type: "required", message: "Please provide a rating" }]
};

// Autocomplete field with search functionality
const autocompleteField = {
  id: "country-select",
  type: "autocomplete",
  label: "Select Country",
  options: [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" }
  ],
  placeholder: "Search countries...",
  allowsCustomValue: false
};
```

#### Automatic Field Naming
Fields without custom names now get automatic unique identifiers:
- `text_input`, `text_input2`, `text_input3`
- `email_field`, `email_field2`
- `select_dropdown`, `select_dropdown2`

#### Smart Properties Panel
The properties panel now intelligently shows only relevant controls:
- Text alignment hidden for: select, radio, checkbox, switch, date, time, file, rating, autocomplete
- Unified alignment controls for radio, checkbox, switch, and rating fields
- Context-aware validation options based on field type
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [HeroUI](https://heroui.com/) for the component library
- [dnd-kit](https://dndkit.com/) for drag and drop functionality
- [Lucide](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling utilities

## 🔗 Links

- [**🎉 What's New in v1.1.0**](./src/pages/AnnouncementPage.tsx) - See all the latest features and improvements
- [Live Demo](https://flowcsolutions.github.io/react-form-builder)
- [NPM Package](https://www.npmjs.com/package/@flowcsolutions/react-form-builder)
- [GitHub Repository](https://github.com/zenpou21/react-form-builder)
- [GitHub Issues](https://github.com/zenpou21/react-form-builder/issues)

---

**🚀 Enjoying React Form Builder?** Star us on GitHub and share your feedback!
```

# Custom Styling Guide

React Form Builder supports extensive styling customization through multiple approaches.

## 🎨 Styling Methods

### 1. Custom CSS Classes

Add custom CSS classes directly to form fields:

```tsx
const styledField = {
  type: 'text',
  label: 'Custom Input',
  properties: {
    customClasses: 'border-2 border-blue-500 bg-blue-50 text-blue-900'
  }
};
```

### 2. Tailwind Utilities

Use Tailwind CSS classes for rapid styling:

```tsx
const tailwindField = {
  type: 'textarea',
  label: 'Comment',
  properties: {
    customClasses: 'rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-200'
  }
};
```

### 3. HeroUI Theme Customization

Customize the overall theme through HeroUI configuration:

```tsx
// tailwind.config.js
import { heroui } from "@heroui/react";

export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#eff6ff",
              500: "#3b82f6",
              900: "#1e3a8a",
              DEFAULT: "#3b82f6",
            }
          }
        }
      }
    })
  ],
}
```

## 🎯 Field-Specific Styling

### Input Fields

```tsx
const inputStyles = {
  customClasses: 'placeholder-gray-400 text-gray-900 border-gray-200 focus:border-blue-500'
};
```

### Select Dropdowns

```tsx
const selectStyles = {
  customClasses: 'border-gray-300 rounded-md shadow-sm focus:ring-indigo-500'
};
```

### Buttons

```tsx
const buttonStyles = {
  customClasses: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
};
```

### Checkboxes & Radio Buttons

```tsx
const checkboxStyles = {
  customClasses: 'text-blue-600 focus:ring-blue-500 border-gray-300'
};
```

## 📱 Responsive Styling

Use responsive Tailwind classes:

```tsx
const responsiveField = {
  type: 'text',
  label: 'Responsive Input',
  properties: {
    customClasses: 'w-full sm:w-1/2 lg:w-1/3 p-2 sm:p-3 lg:p-4'
  }
};
```

## 🌈 Color Schemes

### Primary Color Scheme
```css
.form-primary {
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
}
```

### Success Color Scheme
```css
.form-success {
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-900: #14532d;
}
```

### Warning Color Scheme
```css
.form-warning {
  --warning-50: #fefce8;
  --warning-500: #eab308;
  --warning-900: #713f12;
}
```

## 🔧 Advanced Customization

### Custom CSS Properties

```css
.custom-form {
  --form-bg: #f8fafc;
  --form-border: #e2e8f0;
  --form-radius: 0.5rem;
  --form-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.custom-form .form-field {
  background: var(--form-bg);
  border: 1px solid var(--form-border);
  border-radius: var(--form-radius);
  box-shadow: var(--form-shadow);
}
```

### Dark Mode Support

```tsx
const darkModeField = {
  type: 'text',
  label: 'Dark Mode Input',
  properties: {
    customClasses: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 dark:bg-gray-900 dark:border-gray-700'
  }
};
```

### Animation & Transitions

```tsx
const animatedField = {
  type: 'text',
  label: 'Animated Input',
  properties: {
    customClasses: 'transition-all duration-200 ease-in-out hover:shadow-md focus:scale-105'
  }
};
```

## 📐 Layout Styling

### Grid Layout

```tsx
const gridField = {
  type: 'text',
  label: 'Grid Item',
  properties: {
    width: 'half', // Built-in width options
    customClasses: 'col-span-6 md:col-span-4 lg:col-span-3' // Custom grid spanning
  }
};
```

### Flexbox Layout

```tsx
const flexField = {
  type: 'radio',
  label: 'Flex Options',
  properties: {
    customClasses: 'flex flex-wrap gap-4 items-center justify-between'
  }
};
```

## 🎭 Style Presets

### Modern Style
```tsx
const modernPreset = {
  customClasses: 'border-0 border-b-2 border-gray-200 bg-transparent focus:border-blue-500 focus:ring-0 rounded-none'
};
```

### Rounded Style
```tsx
const roundedPreset = {
  customClasses: 'rounded-full border-2 border-gray-200 px-6 py-3 focus:border-purple-500'
};
```

### Minimal Style
```tsx
const minimalPreset = {
  customClasses: 'border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-400 shadow-none'
};
```

### Bold Style
```tsx
const boldPreset = {
  customClasses: 'border-4 border-black bg-yellow-100 font-bold text-lg focus:bg-yellow-200'
};
```

## 🔍 Debugging Styles

### Inspect Applied Classes

Use browser dev tools to inspect the applied classes:

1. Right-click on form field
2. Select "Inspect Element"
3. Check the `class` attribute
4. Verify custom classes are applied

### Class Priority

CSS class priority (highest to lowest):
1. Inline styles
2. Custom classes from `customClasses`
3. HeroUI component classes
4. Tailwind utility classes
5. Default browser styles

## 💡 Best Practices

1. **Use Semantic Class Names**: `form-input-primary` instead of `text-blue-500`
2. **Maintain Consistency**: Create a style guide for your forms
3. **Test Responsiveness**: Check styles on different screen sizes
4. **Accessibility**: Ensure sufficient color contrast and focus indicators
5. **Performance**: Avoid excessive custom CSS; prefer Tailwind utilities

## 🚀 Examples

### Complete Form Styling

```tsx
const styledForm = {
  id: 'styled-form',
  title: 'Beautifully Styled Form',
  fields: [
    {
      type: 'text',
      label: 'Full Name',
      properties: {
        customClasses: 'border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-200'
      }
    },
    {
      type: 'email',
      label: 'Email Address',
      properties: {
        customClasses: 'border-green-200 bg-green-50 focus:border-green-500 focus:bg-white'
      }
    },
    {
      type: 'select',
      label: 'Country',
      properties: {
        customClasses: 'border-purple-200 focus:border-purple-500 focus:ring-purple-200'
      }
    }
  ]
};
```

This styling system gives you complete control over the appearance of your forms while maintaining the functionality and accessibility of the underlying components.

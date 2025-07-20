import type { FormField } from '../types/form';

// Build HeroUI-specific classNames object for components
export function buildHeroUIClasses(field: FormField, isEditor: boolean = false) {
  const borderRadius = getBorderRadiusClass(field.properties?.borderRadius);
  const spacing = getSpacingClasses(field);
  const responsive = getResponsiveClasses(field, isEditor);
  
  // Get custom CSS classes from both legacy (properties) and new (custom) locations
  const legacyClasses = field.properties?.customClasses || '';
  const newClasses = field.custom?.cssClasses?.join(' ') || '';
  const allCustomClasses = [legacyClasses, newClasses].filter(Boolean).join(' ');
  
  // Parse custom classes and categorize them for appropriate HeroUI slots
  const customClasses = parseCustomClasses(allCustomClasses);
  
  // Get user-defined classNames from properties
  const userClassNames = field.properties?.classNames || {};

  // Helper function to ensure Tailwind classes have proper specificity
  const ensureTailwindPrecedence = (userClass: string) => {
    if (!userClass) return '';
    // For color classes, ensure they override HeroUI defaults
    if (userClass.includes('text-') || userClass.includes('bg-') || userClass.includes('border-')) {
      return userClass;
    }
    return userClass;
  };

  const result = {
    // Base wrapper/container classes - for outer spacing and visibility
    base: [
      spacing.margin,
      spacing.padding,
      !isEditor ? responsive.visibility : '', // Only apply responsive hiding in preview/renderer
      customClasses.wrapper,
      userClassNames.base || ''
    ].filter(Boolean).join(' '),
    
    // Label classes - ensure custom classes take precedence
    label: [
      'text-left', // Ensure labels are left-aligned by default
      customClasses.label,
      ensureTailwindPrecedence(userClassNames.label || '')
    ].filter(Boolean).join(' '),
    
    // Input wrapper classes - for border, shadow, background, etc.
    inputWrapper: [
      borderRadius,
      customClasses.inputWrapper,
      ensureTailwindPrecedence(userClassNames.inputWrapper || '')
    ].filter(Boolean).join(' '),
    
    // Inner wrapper classes
    innerWrapper: [
      ensureTailwindPrecedence(userClassNames.innerWrapper || '')
    ].filter(Boolean).join(' '),
    
    // Main wrapper classes
    mainWrapper: [
      ensureTailwindPrecedence(userClassNames.mainWrapper || '')
    ].filter(Boolean).join(' '),
    
    // Input field classes - ensure custom text styles take precedence
    input: [
      field.properties?.alignment || '',
      customClasses.input,
      ensureTailwindPrecedence(userClassNames.input || '')
    ].filter(Boolean).join(' '),
    
    // Clear button classes
    clearButton: [
      ensureTailwindPrecedence(userClassNames.clearButton || '')
    ].filter(Boolean).join(' '),
    
    // Helper wrapper classes
    helperWrapper: [
      ensureTailwindPrecedence(userClassNames.helperWrapper || '')
    ].filter(Boolean).join(' '),
    
    // Description classes
    description: [
      'text-left', // Ensure description text is left-aligned
      customClasses.description,
      ensureTailwindPrecedence(userClassNames.description || '')
    ].filter(Boolean).join(' '),
    
    // Error message classes
    errorMessage: [
      ensureTailwindPrecedence(userClassNames.errorMessage || '')
    ].filter(Boolean).join(' ')
  };

  return result;
}

// Parse custom CSS classes and categorize them for appropriate HeroUI component slots
function parseCustomClasses(customClasses: string) {
  if (!customClasses.trim()) {
    return {
      wrapper: '',
      inputWrapper: '',
      input: '',
      label: '',
      description: ''
    };
  }

  const classes = customClasses.trim().split(/\s+/);
  const result = {
    wrapper: [] as string[],
    inputWrapper: [] as string[],
    input: [] as string[],
    label: [] as string[],
    description: [] as string[]
  };

  classes.forEach(className => {
    // Input wrapper styles (border, shadow, background, rounded, etc.)
    if (className.match(/^(border|shadow|bg-|rounded|ring)/)) {
      result.inputWrapper.push(className);
    }
    // Text and font styling for input content
    else if (className.match(/^(text-|font-|placeholder|italic|underline)/)) {
      result.input.push(className);
    }
    // Layout and spacing classes go to wrapper
    else if (className.match(/^(m[tlrb]?-|p[tlrb]?-|w-|h-|max-|min-|flex|grid|col-|row-|gap-|space-|justify-|items-|self-)/)) {
      result.wrapper.push(className);
    }
    // Everything else goes to input wrapper by default
    else {
      result.inputWrapper.push(className);
    }
  });

  return {
    wrapper: result.wrapper.join(' '),
    inputWrapper: result.inputWrapper.join(' '),
    input: result.input.join(' '),
    label: result.label.join(' '),
    description: result.description.join(' ')
  };
}

function getBorderRadiusClass(borderRadius?: string): string {
  switch (borderRadius) {
    case 'none':
      return 'rounded-none';
    case 'small':
      return 'rounded-sm';
    case 'default':
      return 'rounded-md';
    case 'large':
      return 'rounded-lg';
    case 'full':
      return 'rounded-full';
    default:
      return '';
  }
}

function getSpacingClasses(field: FormField) {
  const marginTop = field.properties?.marginTop;
  const marginBottom = field.properties?.marginBottom;
  const padding = field.properties?.padding;

  return {
    margin: [
      marginTop || '',
      marginBottom || ''
    ].filter(Boolean).join(' '),
    
    padding: padding || ''
  };
}

function getResponsiveClasses(field: FormField, isEditor: boolean = false) {
  const classes: string[] = [];
  
  // Only apply responsive hiding classes in preview/renderer, not in editor
  if (!isEditor) {
    if (field.properties?.hideOnMobile) {
      classes.push('hidden sm:block');
    }
    if (field.properties?.hideOnTablet) {
      classes.push('sm:hidden lg:block');
    }
    if (field.properties?.hideOnDesktop) {
      classes.push('lg:hidden');
    }
  }

  return {
    visibility: classes.join(' ')
  };
}

// Legacy function for backward compatibility
export function buildFieldClasses(field: FormField): string {
  const heroUIClasses = buildHeroUIClasses(field);
  return heroUIClasses.base;
}

export function buildFieldWrapperClasses(field: FormField, isEditor: boolean = false): string {
  const classes: string[] = [];

  // Grid span classes
  if (field.layout?.gridClass) {
    classes.push(field.layout.gridClass);
  }

  // Add responsive visibility only for preview/renderer, not editor
  const responsive = getResponsiveClasses(field, isEditor);
  if (responsive.visibility) {
    classes.push(responsive.visibility);
  }

  return classes.join(' ');
}

import type { FormField } from '../types/form';

// Build HeroUI-specific classNames object for components
export function buildHeroUIClasses(field: FormField) {
  const borderRadius = getBorderRadiusClass(field.properties?.borderRadius);
  const spacing = getSpacingClasses(field);
  const responsive = getResponsiveClasses(field);
  const customClasses = field.properties?.customClasses || '';

  return {
    // Base wrapper/container classes
    base: [
      spacing.margin,
      spacing.padding,
      responsive.visibility,
      customClasses
    ].filter(Boolean).join(' '),
    
    // Input-specific classes
    inputWrapper: [
      borderRadius,
      spacing.padding
    ].filter(Boolean).join(' '),
    
    // Input field classes
    input: [
      borderRadius,
      field.properties?.alignment ? `text-${field.properties.alignment}` : ''
    ].filter(Boolean).join(' '),
    
    // Label classes
    label: [
      'text-left', // Force left alignment for all labels
      field.properties?.alignment ? `text-${field.properties.alignment}` : ''
    ].filter(Boolean).join(' '),
    
    // Description classes
    description: [
      field.properties?.alignment ? `text-${field.properties.alignment}` : ''
    ].filter(Boolean).join(' ')
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
      marginTop ? getMarginClass('mt', marginTop) : '',
      marginBottom ? getMarginClass('mb', marginBottom) : ''
    ].filter(Boolean).join(' '),
    
    padding: padding ? getPaddingClass(padding) : ''
  };
}

function getMarginClass(type: 'mt' | 'mb', size: string): string {
  switch (size) {
    case 'none':
      return `${type}-0`;
    case 'small':
      return `${type}-2`;
    case 'default':
      return `${type}-4`;
    case 'large':
      return `${type}-8`;
    default:
      return '';
  }
}

function getPaddingClass(size: string): string {
  switch (size) {
    case 'none':
      return 'p-0';
    case 'small':
      return 'p-2';
    case 'default':
      return 'p-4';
    case 'large':
      return 'p-8';
    default:
      return '';
  }
}

function getResponsiveClasses(field: FormField) {
  const classes: string[] = [];
  
  if (field.properties?.hideOnMobile) {
    classes.push('hidden sm:block');
  }
  if (field.properties?.hideOnTablet) {
    classes.push('sm:hidden lg:block');
  }
  if (field.properties?.hideOnDesktop) {
    classes.push('lg:hidden');
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

export function buildFieldWrapperClasses(field: FormField): string {
  const classes: string[] = [];

  // Grid span classes
  if (field.layout?.gridClass) {
    classes.push(field.layout.gridClass);
  }

  // Add responsive visibility
  const responsive = getResponsiveClasses(field);
  if (responsive.visibility) {
    classes.push(responsive.visibility);
  }

  return classes.join(' ');
}

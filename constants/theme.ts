// Modern Zen Color Palette
export const Colors = {
  primary: '#5A8B6F',        // Sage Green - for focus and action
  background: '#E8DCC4',      // Warm Sand - eye-comfortable background
  text: '#2C2C2C',            // Charcoal Grey - sharp, readable contrast
  white: '#FFFFFF',           // White - for contrast
  lightSand: '#F5F1E8',       // Light Sand - for card backgrounds
  
  // Semantic colors
  success: '#5A8B6F',
  error: '#C85A54',
  warning: '#D4A574',
  
  // Opacity variants
  primaryOpacity: (opacity: number) => `rgba(90, 139, 111, ${opacity})`,
  textOpacity: (opacity: number) => `rgba(44, 44, 44, ${opacity})`,
};

// Typography
export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Glassmorphism effect
export const Glassmorphism = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Glassmorphism,
  Shadows,
};

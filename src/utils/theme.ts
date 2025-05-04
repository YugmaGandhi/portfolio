export interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string; // Added this property
  secondaryColor: string; // Ensure other properties like this exist
  accentColor: string;
  fontStyle: string;
  animeCharacter: string;
}

// Function to generate CSS variables from theme
export const generateCSSVariables = (theme: ThemeState): Record<string, string> => {
  return {
    '--primary-color': theme.primaryColor,
    '--secondary-color': theme.secondaryColor,
    '--accent-color': theme.accentColor,
    '--background-color': theme.isDarkMode ? '#0a0a0b' : '#f8f9fa',
    '--text-color': theme.isDarkMode ? '#f8f9fa' : '#212529',
    '--card-bg': theme.isDarkMode ? '#1f1f35' : '#ffffff',
    '--font-family': theme.fontStyle === 'futuristic' 
      ? '"Orbitron", "Exo 2", sans-serif' 
      : '"Nunito", "Roboto", sans-serif',
  };
};

// Function to apply theme variables to document root
export const applyTheme = (theme: any): void => {
  // Safely cast the theme to ThemeState
  const safeTheme: ThemeState = {
    isDarkMode: theme?.isDarkMode ?? true,
    primaryColor: theme?.primaryColor ?? '#2c0e37',
    secondaryColor: theme?.secondaryColor ?? '#f72585',
    accentColor: theme?.accentColor ?? '#4cc9f0',
    fontStyle: theme?.fontStyle ?? 'futuristic',
    animeCharacter: theme?.animeCharacter ?? 'samurai',
  };
  
  const cssVariables = generateCSSVariables(safeTheme);
  const root = document.documentElement;
  
  Object.entries(cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Add any theme-specific class names to body
  document.body.className = safeTheme.isDarkMode ? 'dark-mode' : 'light-mode';
  document.body.dataset.animeCharacter = safeTheme.animeCharacter;
};

// Function to get appropriate text color based on background
export const getTextColorForBackground = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance - standard formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
}; 
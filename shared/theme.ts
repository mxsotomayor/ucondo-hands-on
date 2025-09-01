// theme.ts

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  success: string;
  card: string;
  border: string;
}

export interface AppTheme {
  dark: boolean;
  colors: ThemeColors;
}

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    background: '#f0edf5',
    text: '#161016',
    primary: '#622490',
    success: '#1ba803',
    secondary: '#ff6680',
    card: '#f2f2f2',
    border: '#dcdcdc',
  },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    background: '#000000',
    text: '#ffffff',
    primary: '#0a84ff',
    success: '#0a84ff',
    secondary: '#64d2ff',
    card: '#1c1c1e',
    border: '#3a3a3c',
  },
};

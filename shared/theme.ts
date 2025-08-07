// theme.ts

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
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
    background: '#ffffff',
    text: '#000000',
    primary: '#007aff',
    secondary: '#5ac8fa',
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
    secondary: '#64d2ff',
    card: '#1c1c1e',
    border: '#3a3a3c',
  },
};

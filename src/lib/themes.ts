export interface Theme {
  name: string
  primary: string
  secondary: string
  background: string
  surface: string
  border: string
  text: string
  textSecondary: string
  accent: string
  gradient: string
}

export const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    primary: '#3b82f6',
    secondary: '#1e40af',
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    accent: '#60a5fa',
    gradient: 'from-slate-900 via-purple-900 to-slate-900'
  },
  purple: {
    name: 'Purple',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    background: '#1e1b2e',
    surface: '#2d2747',
    border: '#4a3f6b',
    text: '#f3e8ff',
    textSecondary: '#c4b5fd',
    accent: '#a78bfa',
    gradient: 'from-purple-900 via-violet-900 to-purple-900'
  },
  green: {
    name: 'Green',
    primary: '#10b981',
    secondary: '#059669',
    background: '#0f2e1f',
    surface: '#1a3d2e',
    border: '#2d5a47',
    text: '#ecfdf5',
    textSecondary: '#a7f3d0',
    accent: '#34d399',
    gradient: 'from-green-900 via-emerald-900 to-green-900'
  },
  red: {
    name: 'Red',
    primary: '#ef4444',
    secondary: '#dc2626',
    background: '#2e0f0f',
    surface: '#3d1a1a',
    border: '#5a2d2d',
    text: '#fef2f2',
    textSecondary: '#fca5a5',
    accent: '#f87171',
    gradient: 'from-red-900 via-rose-900 to-red-900'
  },
  blue: {
    name: 'Blue',
    primary: '#0ea5e9',
    secondary: '#0284c7',
    background: '#0c1e2e',
    surface: '#1a2f44',
    border: '#2d4a6b',
    text: '#f0f9ff',
    textSecondary: '#bae6fd',
    accent: '#38bdf8',
    gradient: 'from-blue-900 via-sky-900 to-blue-900'
  },
  orange: {
    name: 'Orange',
    primary: '#f97316',
    secondary: '#ea580c',
    background: '#2e1f0f',
    surface: '#442f1a',
    border: '#6b4d2d',
    text: '#fff7ed',
    textSecondary: '#fed7aa',
    accent: '#fb923c',
    gradient: 'from-orange-900 via-amber-900 to-orange-900'
  },
  pink: {
    name: 'Pink',
    primary: '#ec4899',
    secondary: '#db2777',
    background: '#2e1a2e',
    surface: '#3d1f3d',
    border: '#5a2d4a',
    text: '#fdf2f8',
    textSecondary: '#f9a8d4',
    accent: '#f472b6',
    gradient: 'from-pink-900 via-rose-900 to-pink-900'
  },
  cyan: {
    name: 'Cyan',
    primary: '#06b6d4',
    secondary: '#0891b2',
    background: '#0e2e2e',
    surface: '#1a3d3d',
    border: '#2d5a5a',
    text: '#f0fdfa',
    textSecondary: '#a7f3d0',
    accent: '#22d3ee',
    gradient: 'from-cyan-900 via-teal-900 to-cyan-900'
  }
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.style.setProperty('--theme-primary', theme.primary)
  root.style.setProperty('--theme-secondary', theme.secondary)
  root.style.setProperty('--theme-background', theme.background)
  root.style.setProperty('--theme-surface', theme.surface)
  root.style.setProperty('--theme-border', theme.border)
  root.style.setProperty('--theme-text', theme.text)
  root.style.setProperty('--theme-text-secondary', theme.textSecondary)
  root.style.setProperty('--theme-accent', theme.accent)
  root.style.setProperty('--theme-gradient', theme.gradient)
  
  // Update background gradient
  const body = document.querySelector('body') as HTMLElement
  if (body) {
    body.className = body.className.replace(/from-\S+\s+via-\S+\s+to-\S+/, theme.gradient)
  }
}

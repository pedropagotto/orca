import { useAppStore } from '@/store'
import { useSystemPrefersDark } from '@/components/terminal-pane/use-system-prefers-dark'
import { MONACO_VSCODE_DARK_THEME_ID } from '@/lib/monaco-vscode-dark-theme'

export type MonacoEditorThemeId = 'vs' | 'vs-dark' | typeof MONACO_VSCODE_DARK_THEME_ID

/** Resolved app theme that re-renders when a `system` theme flips with the OS. */
export function useDocumentDarkTheme(): boolean {
  const theme = useAppStore((s) => s.settings?.theme ?? 'system')
  const systemPrefersDark = useSystemPrefersDark()
  return theme === 'system' ? systemPrefersDark : theme === 'dark'
}

/** Resolved Monaco editor theme that honors `colorTheme: 'vscode-dark'` while preserving `vs-dark`. */
export function useMonacoEditorTheme(): MonacoEditorThemeId {
  const isDark = useDocumentDarkTheme()
  const colorTheme = useAppStore((s) => s.settings?.colorTheme)
  if (!isDark) {
    return 'vs'
  }
  return colorTheme === 'vscode-dark' ? MONACO_VSCODE_DARK_THEME_ID : 'vs-dark'
}

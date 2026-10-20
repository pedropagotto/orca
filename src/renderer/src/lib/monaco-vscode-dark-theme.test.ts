import { describe, expect, it, vi } from 'vitest'
import {
  MONACO_VSCODE_DARK_COLORS,
  MONACO_VSCODE_DARK_RULES,
  MONACO_VSCODE_DARK_THEME_ID,
  registerMonacoVscodeDarkTheme
} from './monaco-vscode-dark-theme'

describe('registerMonacoVscodeDarkTheme', () => {
  it('registers vscode-dark without overwriting built-in vs-dark', () => {
    const defineTheme = vi.fn()
    registerMonacoVscodeDarkTheme({
      editor: { defineTheme } as never
    })

    expect(defineTheme).toHaveBeenCalledTimes(1)
    expect(defineTheme).toHaveBeenCalledWith(MONACO_VSCODE_DARK_THEME_ID, {
      base: 'vs-dark',
      inherit: true,
      rules: MONACO_VSCODE_DARK_RULES,
      colors: MONACO_VSCODE_DARK_COLORS
    })
  })

  it('includes the VS Code Dark editor surface and token palette', () => {
    expect(MONACO_VSCODE_DARK_COLORS['editor.background']).toBe('#121314')
    expect(MONACO_VSCODE_DARK_COLORS['editor.foreground']).toBe('#BBBEBF')
    expect(MONACO_VSCODE_DARK_COLORS['editor.lineHighlightBackground']).toBe('#242526')
    expect(MONACO_VSCODE_DARK_COLORS['editor.selectionBackground']).toBe('#276782dd')

    const byToken = new Map(MONACO_VSCODE_DARK_RULES.map((rule) => [rule.token, rule]))
    expect(byToken.get('keyword')?.foreground).toBe('ff7b72')
    expect(byToken.get('string')?.foreground).toBe('a5d6ff')
    expect(byToken.get('constant')?.foreground).toBe('79c0ff')
    expect(byToken.get('entity.name.function')?.foreground).toBe('d2a8ff')
    expect(byToken.get('variable')?.foreground).toBe('ffa657')
    expect(byToken.get('tag')?.foreground).toBe('7ee787')
    expect(byToken.get('type')?.foreground).toBe('4EC9B0')
  })
})

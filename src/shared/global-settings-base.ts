import type { ClaudeAccountSwitchSettings } from './claude-account-switch-settings'
import type { NativeChatGlobalSettings } from './native-chat-appearance-settings'
import type { WorktreeDeletionPreferences } from './worktree-deletion-preferences'

/** Settings groups owned by their feature modules and composed into GlobalSettings. */
export type GlobalSettingsBase = NativeChatGlobalSettings &
  WorktreeDeletionPreferences &
  ClaudeAccountSwitchSettings & {
    /** Optional dark color theme variant that coexists with the default Orca dark palette. */
    colorTheme?: 'default' | 'vscode-dark'
  }

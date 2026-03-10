import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;
type KeyCombination = 'ctrl' | 'shift' | 'alt' | 'meta';

interface KeyboardShortcut {
  key: string;
  modifiers?: KeyCombination[];
  handler: KeyHandler;
  description?: string;
}

/**
 * Hook for managing keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown: KeyHandler = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const modifiersMatch =
          !shortcut.modifiers ||
          shortcut.modifiers.every((mod) => {
            switch (mod) {
              case 'ctrl':
                return event.ctrlKey || event.metaKey;
              case 'shift':
                return event.shiftKey;
              case 'alt':
                return event.altKey;
              case 'meta':
                return event.metaKey;
              default:
                return false;
            }
          });

        if (keyMatches && modifiersMatch) {
          event.preventDefault();
          shortcut.handler(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

/**
 * Common keyboard shortcuts
 */
export const CommonShortcuts = {
  SUBMIT: { key: 'Enter', modifiers: ['ctrl'] as const, description: 'Submit form' },
  CLOSE_MODAL: { key: 'Escape', description: 'Close modal/dialog' },
  FOCUS_SEARCH: { key: '/', description: 'Focus search input' },
  SAVE: { key: 's', modifiers: ['ctrl'] as const, description: 'Save changes' },
  DELETE: { key: 'Delete', description: 'Delete item' },
  NEXT: { key: 'ArrowRight', description: 'Next item' },
  PREV: { key: 'ArrowLeft', description: 'Previous item' },
};

/**
 * Convert keyboard shortcut to readable format
 */
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const modifierMap = {
    ctrl: process.platform === 'darwin' ? '⌘' : 'Ctrl+',
    shift: 'Shift+',
    alt: 'Alt+',
    meta: '⌘',
  };

  let result = '';
  if (shortcut.modifiers) {
    result += shortcut.modifiers.map((m) => modifierMap[m]).join('');
  }
  result += shortcut.key.length === 1 ? shortcut.key.toUpperCase() : shortcut.key;

  return result;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Hook for managing focus on elements
 */
export function useFocusManagement() {
  const focusElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  }, []);

  const focusFirstError = useCallback((errors: Record<string, string>) => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
        announceToScreenReader(
          `Error: ${errors[firstErrorField]}. Please fix this field.`,
          'assertive'
        );
      }
    }
  }, []);

  return { focusElement, focusFirstError };
}

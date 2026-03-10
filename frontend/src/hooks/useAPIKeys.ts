import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'drishtii_api_keys';

export interface StoredAPIKeys {
  backend?: string;
  ocr?: string;
  aiEngine?: string;
  lastUpdated?: string;
}

export function useAPIKeys() {
  const [apiKeys, setApiKeys] = useState<StoredAPIKeys>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setApiKeys(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load API keys from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save API key
  const saveAPIKey = useCallback(
    (name: keyof StoredAPIKeys, value: string): boolean => {
      try {
        const updated = {
          ...apiKeys,
          [name]: value,
          lastUpdated: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setApiKeys(updated);
        return true;
      } catch (error) {
        console.error('Failed to save API key:', error);
        return false;
      }
    },
    [apiKeys]
  );

  // Delete API key
  const deleteAPIKey = useCallback(
    (name: keyof StoredAPIKeys): boolean => {
      try {
        const updated = { ...apiKeys };
        delete updated[name];
        updated.lastUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setApiKeys(updated);
        return true;
      } catch (error) {
        console.error('Failed to delete API key:', error);
        return false;
      }
    },
    [apiKeys]
  );

  // Get API key
  const getAPIKey = useCallback(
    (name: keyof StoredAPIKeys): string => {
      return apiKeys[name] || '';
    },
    [apiKeys]
  );

  // Check if API key exists
  const hasAPIKey = useCallback(
    (name: keyof StoredAPIKeys): boolean => {
      return !!apiKeys[name];
    },
    [apiKeys]
  );

  return {
    apiKeys,
    isLoading,
    saveAPIKey,
    deleteAPIKey,
    getAPIKey,
    hasAPIKey,
  };
}

/**
 * Validate API key format
 */
export function validateAPIKey(key: string, type?: string): { valid: boolean; error?: string } {
  if (!key || typeof key !== 'string') {
    return { valid: false, error: 'API key is required' };
  }

  const trimmed = key.trim();
  if (trimmed.length < 10) {
    return { valid: false, error: 'API key must be at least 10 characters' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'API key is too long (max 500 characters)' };
  }

  // Check for valid characters (alphanumeric, hyphens, underscores, dots)
  if (!/^[a-zA-Z0-9\-_.]+$/.test(trimmed)) {
    return { valid: false, error: 'API key contains invalid characters' };
  }

  return { valid: true };
}

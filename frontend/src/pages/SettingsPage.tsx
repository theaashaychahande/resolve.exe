import { useState } from 'react';
import {
  User,
  Key,
  Globe,
  Save,
  Copy,
  Eye,
  EyeOff,
  CheckCircle2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useAPIKeys, validateAPIKey } from '@/hooks/useAPIKeys';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [language, setLanguage] = useState('en');

  // API Keys management
  const { apiKeys, saveAPIKey, deleteAPIKey, hasAPIKey } = useAPIKeys();
  const [showBackendKey, setShowBackendKey] = useState(false);
  const [backendKeyInput, setBackendKeyInput] = useState(apiKeys.backend || '');
  const [keyError, setKeyError] = useState('');
  const [keySaved, setKeySaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveAPIKey = () => {
    setKeyError('');
    const validation = validateAPIKey(backendKeyInput);

    if (!validation.valid) {
      setKeyError(validation.error || 'Invalid API key');
      return;
    }

    const success = saveAPIKey('backend', backendKeyInput.trim());
    if (success) {
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    } else {
      setKeyError('Failed to save API key');
    }
  };

  const handleDeleteAPIKey = () => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      const success = deleteAPIKey('backend');
      if (success) {
        setBackendKeyInput('');
        setKeySaved(true);
        setTimeout(() => setKeySaved(false), 2000);
      }
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(backendKeyInput);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 1500);
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <p className="text-sm text-gray mt-1">Manage your account preferences and configurations.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">User Profile</h3>

              <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 text-xl font-bold">
                  AK
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">Admin User</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">admin@drishti.ai</p>
                </div>
                <button className="ml-auto text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition">
                  Change Photo
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@drishti.ai"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5">
                    Organization
                  </label>
                  <input
                    type="text"
                    defaultValue="DRISHTI Inc."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-900 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue="Administrator"
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-primary hover:bg-[#1ea34e] text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm shadow-primary/20 transition-all flex items-center gap-2"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Backend API Key</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Store your backend API key for secure authentication. This key will be used for all API
                  requests.
                </p>
              </div>

              {/* API Key Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-dark">
                  Backend API Key
                  {hasAPIKey('backend') && (
                    <span className="ml-2 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      ✓ Configured
                    </span>
                  )}
                </label>

                <div className="relative">
                  <input
                    type={showBackendKey ? 'text' : 'password'}
                    value={backendKeyInput}
                    onChange={(e) => {
                      setBackendKeyInput(e.target.value);
                      keyError && setKeyError('');
                    }}
                    placeholder="Enter your backend API key (e.g., drishti_pk_...)"
                    className={`w-full px-4 py-2.5 pr-32 bg-white dark:bg-gray-700 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 transition text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 ${keyError
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-200 dark:border-gray-600 focus:ring-green-500 focus:border-green-500'
                      }`}
                  />

                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {backendKeyInput && (
                      <>
                        <button
                          onClick={() => setShowBackendKey(!showBackendKey)}
                          className="p-2 text-gray dark:text-gray-400 hover:text-dark dark:hover:text-gray-200 transition"
                          title={showBackendKey ? 'Hide key' : 'Show key'}
                        >
                          {showBackendKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={handleCopyKey}
                          className="p-2 text-gray dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary-light transition"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {keyError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {keyError}
                  </p>
                )}

                {hasAPIKey('backend') && (
                  <p className="text-xs text-gray dark:text-gray-400">
                    Last updated: {apiKeys.lastUpdated ? new Date(apiKeys.lastUpdated).toLocaleDateString() : 'Unknown'}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveAPIKey}
                    disabled={!backendKeyInput.trim()}
                    className="bg-primary hover:bg-[#1ea34e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm shadow-primary/20 transition-all flex items-center gap-2"
                  >
                    {keySaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> {hasAPIKey('backend') ? 'Updated!' : 'Saved!'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> {hasAPIKey('backend') ? 'Update Key' : 'Save Key'}
                      </>
                    )}
                  </button>
                </div>

                {hasAPIKey('backend') && (
                  <button
                    onClick={handleDeleteAPIKey}
                    className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <strong>🔒 Security Note:</strong> Your API key is stored securely in your browser's
                  local storage and is never transmitted to our servers. You can delete it anytime from
                  your browser settings. Never share your API key with anyone.
                </p>
              </div>
            </div>
          )}

          {/* Language */}
          {activeTab === 'language' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-border dark:border-gray-700 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-dark dark:text-gray-200">Language Preferences</h3>
              <p className="text-sm text-gray dark:text-gray-400">Configure interface and OCR language settings.</p>

              <div>
                <label className="block text-sm font-medium text-dark mb-3">
                  Interface Language
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
                    { code: 'mr', label: 'Marathi', flag: '🇮🇳' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${language === l.code
                        ? 'border-primary-dark bg-primary-deep/5'
                        : 'border-border hover:border-gray-300'
                        }`}
                    >
                      <span className="text-2xl">{l.flag}</span>
                      <div className="text-left">
                        <p className="font-medium text-dark text-sm">{l.label}</p>
                        <p className="text-xs text-gray">{l.code.toUpperCase()}</p>
                      </div>
                      {language === l.code && (
                        <CheckCircle2 className="w-4 h-4 text-primary-dark ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-3">OCR Languages</label>
                <p className="text-xs text-gray mb-3">
                  Select which languages the AI should detect in documents.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Gujarati'].map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-2 bg-primary-soft rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-200 transition"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={['English', 'Hindi', 'Marathi'].includes(lang)}
                        className="w-4 h-4 rounded border-gray-300 text-primary-dark focus:ring-primary-dark/30"
                      />
                      <span className="text-sm text-dark">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-primary hover:bg-[#1ea34e] text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-sm shadow-primary/20 transition-all flex items-center gap-2"
                >
                  {saved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Preferences
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

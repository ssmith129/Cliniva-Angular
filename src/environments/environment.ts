export const environment = {
  production: true,
  apiUrl: 'http://localhost:4200',
  // Default AI provider configuration applied out-of-the-box.
  // NOTE: Do not commit a real API key here — it would be exposed in git
  // history and shipped in the browser bundle. Paste your Gemini API key
  // below for local/self-hosted builds, or leave blank and configure it
  // once from any AI Settings page (it is persisted to local storage).
  ai: {
    provider: 'gemini' as 'openai' | 'gemini' | 'claude' | 'none',
    apiKey: '',
    model: 'gemini-flash-latest',
  },
};

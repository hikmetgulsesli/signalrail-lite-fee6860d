import { SignalRailSettings } from './signalrail-lite.store';

const SETTINGS_KEY = 'signalrail-lite:settings';

export function loadSettings(): SignalRailSettings | null {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SignalRailSettings;
  } catch {
    return null;
  }
}

export function saveSettings(settings: SignalRailSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

export function clearSettings(): void {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    // ignore
  }
}

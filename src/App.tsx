import { useEffect, useRef } from 'react';
import { useSignalRailLiteStore } from './features/signalrail-lite/signalrail-lite.store';
import { loadSettings, saveSettings } from './features/signalrail-lite/signalrail-lite.repo';
import { GameplaySignalrailLite } from './screens/GameplaySignalrailLite';
import { GameSettingsSignalrailLite } from './screens/GameSettingsSignalrailLite';

export default function App() {
  const { runtime, settings, screen, actions } = useSignalRailLiteStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load persisted settings on mount
  useEffect(() => {
    const saved = loadSettings();
    if (saved) {
      actions.savePreferences(saved);
    }
  }, []);

  // Game tick loop
  useEffect(() => {
    if (!runtime.paused && !runtime.gameOver) {
      intervalRef.current = setInterval(() => {
        actions.tick();
      }, 50);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [runtime.paused, runtime.gameOver, actions]);

  // Expose runtime state and actions for external verification
  useEffect(() => {
    (window as any).app = {
      state: { runtime, settings, screen },
      actions,
    };
  }, [runtime, settings, screen, actions]);

  const gameplayActions = {
    'pause-game-1': () => actions.pauseGame(),
    'settings-2': () => actions.settings(),
    'start-drive-3': () => actions.startDrive(),
    'restart-sequence-4': () => actions.restartSequence(),
  };

  const settingsActions = {
    'back-to-system-1': () => actions.backToSystem(),
    'reset-preferences-2': () => {
      actions.resetPreferences();
    },
    'return-to-gameplay-3': () => actions.returnToGameplay(),
    'save-preferences-4': () => {
      saveSettings(settings);
      actions.returnToGameplay();
    },
    'protocol-1': () => actions.protocol(),
    'recovery-2': () => actions.recovery(),
    'manual-3': () => actions.manual(),
  };

  return (
    <div
      data-setfarm-root="signalrail-lite"
      data-testid="setfarm-app-root"
      className="relative h-screen w-screen overflow-hidden"
    >
      {screen === 'gameplay' && (
        <GameplaySignalrailLite actions={gameplayActions} runtime={runtime} />
      )}
      {screen === 'settings' && (
        <GameSettingsSignalrailLite actions={settingsActions} />
      )}
    </div>
  );
}

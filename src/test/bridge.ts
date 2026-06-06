import { useSignalRailLiteStore, SignalRailLiteStore } from '../features/signalrail-lite/signalrail-lite.store';

export interface TestBridge {
  getState: () => SignalRailLiteStore;
  setState: (partial: Partial<SignalRailLiteStore>) => void;
  actions: SignalRailLiteStore['actions'];
}

export function createTestBridge(): TestBridge {
  const store = useSignalRailLiteStore;
  return {
    getState: () => store.getState(),
    setState: (partial) => {
      const current = store.getState();
      const next = { ...current, ...partial };
      Object.assign(current, next);
    },
    actions: store.getState().actions,
  };
}

// Expose for external test runners / browser automation
if (typeof window !== 'undefined') {
  (window as any).signalRailTestBridge = createTestBridge;
}

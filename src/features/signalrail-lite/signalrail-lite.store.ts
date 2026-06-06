import {
  createInitialState,
  tick,
  movePlayer,
  restartSequence,
  GameRuntimeState,
} from '../../game/game-runtime';

export interface SignalRailSettings {
  difficulty: 'easy' | 'normal' | 'hard';
  soundEnabled: boolean;
  musicEnabled: boolean;
  sensitivity: number;
}

export interface SignalRailLiteStore {
  runtime: GameRuntimeState;
  settings: SignalRailSettings;
  screen: 'gameplay' | 'settings';
  actions: {
    startDrive: () => void;
    pauseGame: () => void;
    resumeGame: () => void;
    settings: () => void;
    returnToGameplay: () => void;
    restartSequence: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    savePreferences: (s: SignalRailSettings) => void;
    resetPreferences: () => void;
    backToSystem: () => void;
    tick: () => void;
    protocol: () => void;
    recovery: () => void;
    manual: () => void;
  };
}

type SetFn = (
  partial:
    | Partial<SignalRailLiteStore>
    | ((state: SignalRailLiteStore) => Partial<SignalRailLiteStore>)
) => void;
type GetFn = () => SignalRailLiteStore;

const defaultSettings: SignalRailSettings = {
  difficulty: 'normal',
  soundEnabled: true,
  musicEnabled: true,
  sensitivity: 50,
};

function createStore(set: SetFn, get: GetFn): SignalRailLiteStore {
  return {
    runtime: createInitialState(),
    settings: { ...defaultSettings },
    screen: 'gameplay',

    actions: {
      startDrive: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: { ...state.runtime, paused: false, gameOver: false },
        })),

      pauseGame: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: { ...state.runtime, paused: true },
        })),

      resumeGame: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: { ...state.runtime, paused: false },
        })),

      settings: () => set({ screen: 'settings' }),

      returnToGameplay: () => set({ screen: 'gameplay' }),

      restartSequence: () =>
        set({
          runtime: restartSequence(),
          screen: 'gameplay',
        }),

      moveLeft: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: movePlayer(state.runtime, -1),
        })),

      moveRight: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: movePlayer(state.runtime, 1),
        })),

      savePreferences: (s: SignalRailSettings) => set({ settings: { ...s } }),

      resetPreferences: () => set({ settings: { ...defaultSettings } }),

      backToSystem: () =>
        set({
          runtime: restartSequence(),
          screen: 'gameplay',
        }),

      tick: () =>
        set((state: SignalRailLiteStore) => ({
          runtime: tick(state.runtime),
        })),

      protocol: () => {
        /* no-op link action */
      },
      recovery: () => {
        /* no-op link action */
      },
      manual: () => {
        /* no-op link action */
      },
    },
  };
}

let storeState: SignalRailLiteStore | null = null;

function getStore(): SignalRailLiteStore {
  if (!storeState) {
    const set: SetFn = (partial) => {
      const next =
        typeof partial === 'function'
          ? { ...storeState!, ...partial(storeState!) }
          : { ...storeState!, ...partial };
      storeState = next as SignalRailLiteStore;
    };
    storeState = createStore(set, () => storeState!);
  }
  return storeState;
}

export function useSignalRailLiteStore(): SignalRailLiteStore {
  return getStore();
}

useSignalRailLiteStore.getState = getStore;

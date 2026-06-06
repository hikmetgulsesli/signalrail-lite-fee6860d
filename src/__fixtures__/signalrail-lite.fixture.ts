import { GameRuntimeState, createInitialState } from '../game/game-runtime';
import { SignalRailSettings } from '../features/signalrail-lite/signalrail-lite.store';

export function makeFixtureRuntime(overrides?: Partial<GameRuntimeState>): GameRuntimeState {
  return {
    ...createInitialState(),
    ...overrides,
    player: { ...createInitialState().player, ...(overrides?.player || {}) },
    obstacles: overrides?.obstacles ? overrides.obstacles.map((o) => ({ ...o })) : [],
    shards: overrides?.shards ? overrides.shards.map((s) => ({ ...s })) : [],
  };
}

export function makeFixtureSettings(overrides?: Partial<SignalRailSettings>): SignalRailSettings {
  return {
    difficulty: 'normal',
    soundEnabled: true,
    musicEnabled: true,
    sensitivity: 50,
    ...overrides,
  };
}

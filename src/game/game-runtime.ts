export interface GameEntity {
  lane: number;
  position: number;
}

export interface GameRuntimeState {
  player: GameEntity;
  obstacles: GameEntity[];
  shards: GameEntity[];
  score: number;
  energy: number;
  lives: number;
  paused: boolean;
  gameOver: boolean;
  speed: number;
  distance: number;
}

export const INITIAL_LANE = 1;
export const LANE_COUNT = 3;
export const TRACK_LENGTH = 1000;

export function createInitialState(): GameRuntimeState {
  return {
    player: { lane: INITIAL_LANE, position: 0 },
    obstacles: [],
    shards: [],
    score: 0,
    energy: 100,
    lives: 3,
    paused: true,
    gameOver: false,
    speed: 2,
    distance: 0,
  };
}

function randLane(): number {
  return Math.floor(Math.random() * LANE_COUNT);
}

function spawnEntity(position: number): GameEntity {
  return { lane: randLane(), position };
}

export function tick(state: GameRuntimeState): GameRuntimeState {
  if (state.paused || state.gameOver) return state;

  const next: GameRuntimeState = {
    ...state,
    player: { ...state.player },
    obstacles: state.obstacles.map((o) => ({ ...o })),
    shards: state.shards.map((s) => ({ ...s })),
  };

  // Advance distance and score
  next.distance += next.speed;
  next.score += 1;

  // Move obstacles toward player
  next.obstacles = next.obstacles
    .map((o) => ({ ...o, position: o.position - next.speed }))
    .filter((o) => o.position > -50);

  // Move shards toward player
  next.shards = next.shards
    .map((s) => ({ ...s, position: s.position - next.speed }))
    .filter((s) => s.position > -50);

  // Spawn new obstacles/shards based on distance thresholds
  if (next.distance % 120 < next.speed) {
    next.obstacles.push(spawnEntity(TRACK_LENGTH));
  }
  if (next.distance % 200 < next.speed) {
    next.shards.push(spawnEntity(TRACK_LENGTH));
  }

  // Collision detection with player (player at position ~0)
  const hitObstacle = next.obstacles.some(
    (o) => o.lane === next.player.lane && o.position <= 10 && o.position >= -10
  );
  if (hitObstacle) {
    next.lives -= 1;
    next.energy = Math.max(0, next.energy - 20);
    // Remove collided obstacle to avoid multi-hit
    next.obstacles = next.obstacles.filter(
      (o) => !(o.lane === next.player.lane && o.position <= 10 && o.position >= -10)
    );
    if (next.lives <= 0) {
      next.gameOver = true;
      next.paused = true;
    }
  }

  const hitShard = next.shards.some(
    (s) => s.lane === next.player.lane && s.position <= 10 && s.position >= -10
  );
  if (hitShard) {
    next.score += 50;
    next.energy = Math.min(100, next.energy + 10);
    next.shards = next.shards.filter(
      (s) => !(s.lane === next.player.lane && s.position <= 10 && s.position >= -10)
    );
  }

  return next;
}

export function movePlayer(state: GameRuntimeState, direction: -1 | 1): GameRuntimeState {
  const newLane = Math.max(0, Math.min(LANE_COUNT - 1, state.player.lane + direction));
  return {
    ...state,
    player: { ...state.player, lane: newLane },
  };
}

export function restartSequence(): GameRuntimeState {
  return createInitialState();
}

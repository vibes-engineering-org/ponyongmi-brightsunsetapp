export interface Goobie {
  id: string;
  name: string;
  description: string;
  health: number;
  maxHealth: number;
  damage: number;
  speed: number;
  ability: string;
  color: string;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  damage: number;
  speed: number;
  type: 'blob' | 'boss';
  size: number;
  color: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  effect: {
    type: 'damage' | 'health' | 'speed' | 'ability';
    value: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

export interface GameState {
  mode: 'free' | 'paid';
  status: 'menu' | 'character-select' | 'playing' | 'paused' | 'game-over' | 'victory';
  selectedGoobie: Goobie | null;
  wave: number;
  score: number;
  coins: number;
  enemies: Enemy[];
  items: Item[];
  inventory: Item[];
  timeElapsed: number;
  playerPosition: { x: number; y: number };
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  maxEnemies: number;
  baseSpawnRate: number;
  waveMultiplier: number;
  freeModeLimits: {
    maxWaves: number;
    maxItems: number;
  };
}
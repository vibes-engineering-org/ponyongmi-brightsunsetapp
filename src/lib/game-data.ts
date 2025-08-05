import type { Goobie, Item } from './game-types';

export const GOOBIES: Goobie[] = [
  {
    id: 'warrior',
    name: 'Warrior Goobie',
    description: 'High damage and health, slower movement',
    health: 150,
    maxHealth: 150,
    damage: 25,
    speed: 3,
    ability: 'Rage: Double damage for 5 seconds',
    color: '#ff4444'
  },
  {
    id: 'scout',
    name: 'Scout Goobie',
    description: 'Fast movement and attack speed',
    health: 80,
    maxHealth: 80,
    damage: 15,
    speed: 6,
    ability: 'Dash: Teleport through enemies',
    color: '#44ff44'
  },
  {
    id: 'tank',
    name: 'Tank Goobie',
    description: 'Maximum health and defense',
    health: 200,
    maxHealth: 200,
    damage: 12,
    speed: 2,
    ability: 'Shield: Absorb all damage for 3 seconds',
    color: '#4444ff'
  },
  {
    id: 'mage',
    name: 'Mage Goobie',
    description: 'Magical attacks with area damage',
    health: 100,
    maxHealth: 100,
    damage: 20,
    speed: 4,
    ability: 'Fireball: Area damage explosion',
    color: '#ff44ff'
  },
  {
    id: 'ninja',
    name: 'Ninja Goobie',
    description: 'Balanced stats with stealth ability',
    health: 120,
    maxHealth: 120,
    damage: 18,
    speed: 5,
    ability: 'Stealth: Become invisible for 4 seconds',
    color: '#444444'
  }
];

export const ITEMS: Item[] = [
  {
    id: 'health-boost',
    name: 'Health Potion',
    description: 'Increases maximum health by 25',
    effect: { type: 'health', value: 25 },
    rarity: 'common',
    icon: '💚'
  },
  {
    id: 'damage-boost',
    name: 'Power Crystal',
    description: 'Increases damage by 10',
    effect: { type: 'damage', value: 10 },
    rarity: 'common',
    icon: '⚡'
  },
  {
    id: 'speed-boost',
    name: 'Swift Boots',
    description: 'Increases movement speed by 2',
    effect: { type: 'speed', value: 2 },
    rarity: 'common',
    icon: '🏃'
  },
  {
    id: 'mega-health',
    name: 'Mega Health Pack',
    description: 'Increases maximum health by 75',
    effect: { type: 'health', value: 75 },
    rarity: 'rare',
    icon: '💪'
  },
  {
    id: 'super-damage',
    name: 'Super Crystal',
    description: 'Increases damage by 25',
    effect: { type: 'damage', value: 25 },
    rarity: 'rare',
    icon: '💥'
  },
  {
    id: 'ultra-speed',
    name: 'Ultra Boots',
    description: 'Increases movement speed by 4',
    effect: { type: 'speed', value: 4 },
    rarity: 'epic',
    icon: '🚀'
  },
  {
    id: 'legendary-power',
    name: 'Legendary Artifact',
    description: 'Massively boosts all stats',
    effect: { type: 'ability', value: 50 },
    rarity: 'legendary',
    icon: '👑'
  }
];

export const GAME_CONFIG = {
  canvasWidth: 400,
  canvasHeight: 300,
  maxEnemies: 20,
  baseSpawnRate: 2000,
  waveMultiplier: 1.2,
  freeModeLimits: {
    maxWaves: 5,
    maxItems: 3
  }
};
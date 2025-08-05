'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, Enemy, Item, Goobie } from '~/lib/game-types';
import { GOOBIES, ITEMS, GAME_CONFIG } from '~/lib/game-data';

const initialGameState: GameState = {
  mode: 'free',
  status: 'menu',
  selectedGoobie: null,
  wave: 1,
  score: 0,
  coins: 0,
  enemies: [],
  items: [],
  inventory: [],
  timeElapsed: 0,
  playerPosition: { x: 200, y: 150 }
};

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const gameLoopRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const spawnEnemy = useCallback(() => {
    const edge = Math.random() * 4; // 0: top, 1: right, 2: bottom, 3: left
    let x, y;
    
    switch (Math.floor(edge)) {
      case 0: // top
        x = Math.random() * GAME_CONFIG.canvasWidth;
        y = -20;
        break;
      case 1: // right
        x = GAME_CONFIG.canvasWidth + 20;
        y = Math.random() * GAME_CONFIG.canvasHeight;
        break;
      case 2: // bottom
        x = Math.random() * GAME_CONFIG.canvasWidth;
        y = GAME_CONFIG.canvasHeight + 20;
        break;
      default: // left
        x = -20;
        y = Math.random() * GAME_CONFIG.canvasHeight;
    }

    const isBoss = Math.random() < 0.1; // 10% chance for boss
    
    const enemy: Enemy = {
      id: `enemy-${Date.now()}-${Math.random()}`,
      x,
      y,
      health: isBoss ? 100 : 20,
      maxHealth: isBoss ? 100 : 20,
      damage: isBoss ? 30 : 10,
      speed: isBoss ? 1 : 2,
      type: isBoss ? 'boss' : 'blob',
      size: isBoss ? 30 : 15,
      color: isBoss ? '#ff0000' : `hsl(${Math.random() * 360}, 70%, 50%)`
    };

    return enemy;
  }, []);

  const spawnItem = useCallback(() => {
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    return {
      ...item,
      id: `item-${Date.now()}-${Math.random()}`
    };
  }, []);

  const updateEnemies = useCallback((enemies: Enemy[], playerPos: { x: number; y: number }, deltaTime: number) => {
    return enemies.map(enemy => {
      const dx = playerPos.x - enemy.x;
      const dy = playerPos.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const moveX = (dx / distance) * enemy.speed * (deltaTime / 16);
        const moveY = (dy / distance) * enemy.speed * (deltaTime / 16);
        
        return {
          ...enemy,
          x: enemy.x + moveX,
          y: enemy.y + moveY
        };
      }
      
      return enemy;
    }).filter(enemy => {
      // Remove enemies that are too far away or dead
      const dx = playerPos.x - enemy.x;
      const dy = playerPos.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 1000 && enemy.health > 0;
    });
  }, []);

  const gameLoop = useCallback((currentTime: number) => {
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    setGameState(prevState => {
      if (prevState.status !== 'playing') return prevState;

      let newState = { ...prevState };
      
      // Update time
      newState.timeElapsed += deltaTime;
      
      // Spawn enemies
      if (newState.enemies.length < GAME_CONFIG.maxEnemies && Math.random() < 0.02) {
        newState.enemies = [...newState.enemies, spawnEnemy()];
      }
      
      // Update enemy positions
      newState.enemies = updateEnemies(newState.enemies, newState.playerPosition, deltaTime);
      
      // Check wave completion
      if (newState.timeElapsed > 30000) { // 30 seconds per wave
        newState.wave += 1;
        newState.timeElapsed = 0;
        newState.score += 100;
        
        // Check free mode limits
        if (newState.mode === 'free' && newState.wave > GAME_CONFIG.freeModeLimits.maxWaves) {
          newState.status = 'game-over';
          return newState;
        }
        
        // Spawn item on wave completion
        if (Math.random() < 0.7) {
          const canCollectMore = newState.mode === 'paid' || 
            newState.inventory.length < GAME_CONFIG.freeModeLimits.maxItems;
          
          if (canCollectMore) {
            newState.items = [...newState.items, spawnItem()];
          }
        }
      }
      
      return newState;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [spawnEnemy, updateEnemies, spawnItem]);

  const startGame = useCallback((goobie: Goobie, mode: 'free' | 'paid') => {
    setGameState({
      ...initialGameState,
      mode,
      status: 'playing',
      selectedGoobie: { ...goobie }
    });
    lastTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'paused' }));
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'playing' }));
    lastTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, status: 'game-over' }));
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  }, []);

  const collectItem = useCallback((itemId: string) => {
    setGameState(prev => {
      const item = prev.items.find(i => i.id === itemId);
      if (!item) return prev;
      
      const newInventory = [...prev.inventory, item];
      const newItems = prev.items.filter(i => i.id !== itemId);
      
      // Apply item effect to selected goobie
      let updatedGoobie = prev.selectedGoobie;
      if (updatedGoobie && item.effect.type !== 'ability') {
        updatedGoobie = {
          ...updatedGoobie,
          [item.effect.type]: (updatedGoobie[item.effect.type as keyof Goobie] as number) + item.effect.value
        };
      }
      
      return {
        ...prev,
        inventory: newInventory,
        items: newItems,
        selectedGoobie: updatedGoobie,
        score: prev.score + 50
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return {
    gameState,
    goobies: GOOBIES,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    collectItem
  };
}
'use client';

import { useEffect, useRef } from 'react';
import type { GameState } from '~/lib/game-types';
import { GAME_CONFIG } from '~/lib/game-data';

interface GameCanvasProps {
  gameState: GameState;
  onPlayerMove?: (position: { x: number; y: number }) => void;
}

export default function GameCanvas({ gameState, onPlayerMove }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPlayer = (ctx: CanvasRenderingContext2D, goobie: any, position: { x: number; y: number }) => {
    ctx.fillStyle = goobie.color;
    ctx.beginPath();
    ctx.arc(position.x, position.y, 12, 0, 2 * Math.PI);
    ctx.fill();
    
    // Health bar
    const barWidth = 24;
    const barHeight = 4;
    const healthPercent = goobie.health / goobie.maxHealth;
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(position.x - barWidth/2, position.y - 20, barWidth, barHeight);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(position.x - barWidth/2, position.y - 20, barWidth * healthPercent, barHeight);
  };

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: any) => {
    ctx.fillStyle = enemy.color;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.size, 0, 2 * Math.PI);
    ctx.fill();
    
    if (enemy.type === 'boss') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Health bar for bosses
    if (enemy.type === 'boss') {
      const barWidth = enemy.size * 2;
      const barHeight = 4;
      const healthPercent = enemy.health / enemy.maxHealth;
      
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(enemy.x - barWidth/2, enemy.y - enemy.size - 10, barWidth, barHeight);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(enemy.x - barWidth/2, enemy.y - enemy.size - 10, barWidth * healthPercent, barHeight);
    }
  };

  const drawItem = (ctx: CanvasRenderingContext2D, item: any, index: number) => {
    const x = 50 + (index * 60);
    const y = 50;
    
    // Rarity colors
    const rarityColors = {
      common: '#ffffff',
      rare: '#0066ff',
      epic: '#9900ff',
      legendary: '#ffaa00'
    };
    
    ctx.fillStyle = rarityColors[item.rarity as keyof typeof rarityColors];
    ctx.fillRect(x - 15, y - 15, 30, 30);
    
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.icon, x, y + 5);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);
    
    // Background
    ctx.fillStyle = '#001122';
    ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

    if (gameState.status === 'playing' && gameState.selectedGoobie) {
      // Draw enemies
      gameState.enemies.forEach(enemy => drawEnemy(ctx, enemy));
      
      // Draw player
      drawPlayer(ctx, gameState.selectedGoobie, gameState.playerPosition);
      
      // Draw items
      gameState.items.forEach((item, index) => drawItem(ctx, item, index));
      
      // Draw UI text
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Wave: ${gameState.wave}`, 10, 20);
      ctx.fillText(`Score: ${gameState.score}`, 10, 35);
      ctx.fillText(`Mode: ${gameState.mode}`, 10, GAME_CONFIG.canvasHeight - 10);
      
      if (gameState.mode === 'free') {
        const wavesLeft = GAME_CONFIG.freeModeLimits.maxWaves - gameState.wave + 1;
        ctx.fillText(`Waves left: ${Math.max(0, wavesLeft)}`, 10, GAME_CONFIG.canvasHeight - 25);
      }
    }
  }, [gameState]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState.status !== 'playing') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    
    onPlayerMove?.({ x, y });
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.canvasWidth}
        height={GAME_CONFIG.canvasHeight}
        onClick={handleCanvasClick}
        className="border border-gray-300 rounded-lg cursor-crosshair bg-gray-900"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          imageRendering: 'pixelated'
        }}
      />
      
      {gameState.status === 'playing' && (
        <div className="absolute top-2 right-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          Click to move
        </div>
      )}
    </div>
  );
}
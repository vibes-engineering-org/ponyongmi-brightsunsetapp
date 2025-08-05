'use client';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { GameState } from '~/lib/game-types';

interface GameUIProps {
  gameState: GameState;
  onPause: () => void;
  onResume: () => void;
  onEndGame: () => void;
  onCollectItem: (itemId: string) => void;
}

export default function GameUI({ 
  gameState, 
  onPause, 
  onResume, 
  onEndGame, 
  onCollectItem 
}: GameUIProps) {
  if (gameState.status === 'paused') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Game Paused</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={onResume}>
              Resume Game
            </Button>
            <Button variant="outline" className="w-full" onClick={onEndGame}>
              End Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState.status === 'game-over') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {gameState.mode === 'free' && gameState.wave > 5 ? 'Free Mode Complete!' : 'Game Over'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold">Final Score: {gameState.score}</div>
            <div className="text-gray-600">Wave Reached: {gameState.wave}</div>
            <div className="text-gray-600">Items Collected: {gameState.inventory.length}</div>
          </div>
          
          {gameState.mode === 'free' && gameState.wave > 5 && (
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-center">
              <p className="text-sm font-medium">Unlock the full experience!</p>
              <p className="text-xs text-gray-600">Play unlimited waves with all features</p>
            </div>
          )}
          
          <Button className="w-full" onClick={onEndGame}>
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Game Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onPause}>
            Pause
          </Button>
          <Button size="sm" variant="destructive" onClick={onEndGame}>
            Quit
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          Time: {Math.floor(gameState.timeElapsed / 1000)}s
        </div>
      </div>

      {/* Player Stats */}
      {gameState.selectedGoobie && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: gameState.selectedGoobie.color }}
              />
              {gameState.selectedGoobie.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="font-medium">Health</div>
                <div>{gameState.selectedGoobie.health}/{gameState.selectedGoobie.maxHealth}</div>
              </div>
              <div>
                <div className="font-medium">Damage</div>
                <div>{gameState.selectedGoobie.damage}</div>
              </div>
              <div>
                <div className="font-medium">Speed</div>
                <div>{gameState.selectedGoobie.speed}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Items */}
      {gameState.items.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Available Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gameState.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-600">{item.description}</div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => onCollectItem(item.id)}>
                    Collect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory */}
      {gameState.inventory.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {gameState.inventory.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm"
                  title={item.name}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
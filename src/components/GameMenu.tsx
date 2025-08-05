'use client';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

interface GameMenuProps {
  onStartGame: () => void;
  onShowInstructions?: () => void;
}

export default function GameMenu({ onStartGame, onShowInstructions }: GameMenuProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">G</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Goobie Game
          </h1>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          Battle endless waves of blob enemies in this action-packed auto-shooter!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Game Features</CardTitle>
          <CardDescription>What you can expect in the Goobie Game</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">5 unique Goobie characters with special abilities</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">Wave-based gameplay with increasing difficulty</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm">Collectible items and power-ups</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm">Boss enemies and special challenges</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button 
          className="w-full text-lg py-6" 
          onClick={onStartGame}
        >
          Start Game
        </Button>
        
        {onShowInstructions && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onShowInstructions}
          >
            How to Play
          </Button>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Choose between Free Mode or unlock the Full Game experience</p>
      </div>
    </div>
  );
}
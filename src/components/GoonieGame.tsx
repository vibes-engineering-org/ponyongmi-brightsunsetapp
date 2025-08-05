'use client';

import { useState } from 'react';
import { useGameEngine } from '~/hooks/useGameEngine';
import GameMenu from './GameMenu';
import CharacterSelect from './CharacterSelect';
import GameCanvas from './GameCanvas';
import GameUI from './GameUI';
import { DaimoPayTransferButton } from '~/components/daimo-pay-transfer-button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import type { Goobie } from '~/lib/game-types';

export default function GoonieGame() {
  const {
    gameState,
    goobies,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    collectItem
  } = useGameEngine();

  const [showPayment, setShowPayment] = useState(false);
  const [pendingGoobie, setPendingGoobie] = useState<Goobie | null>(null);

  const handleCharacterSelect = (goobie: Goobie, mode: 'free' | 'paid') => {
    if (mode === 'paid') {
      setPendingGoobie(goobie);
      setShowPayment(true);
    } else {
      startGame(goobie, mode);
    }
  };

  const handlePaymentSuccess = () => {
    if (pendingGoobie) {
      startGame(pendingGoobie, 'paid');
      setShowPayment(false);
      setPendingGoobie(null);
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setPendingGoobie(null);
  };

  const handlePlayerMove = (position: { x: number; y: number }) => {
    // This would be handled by the game engine in a real implementation
    // For now, we'll just update the position in the game state
  };

  // Payment screen
  if (showPayment && pendingGoobie) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Unlock Full Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: pendingGoobie.color }}
                />
                <span className="font-medium">{pendingGoobie.name}</span>
              </div>
              <p className="text-sm text-gray-600">
                Unlock unlimited waves, all items, and premium features
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Full Game Features</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Unlimited waves and progression</li>
                <li>• All power-up items unlocked</li>
                <li>• Boss battles and special events</li>
                <li>• Leaderboard and achievements</li>
                <li>• Enhanced visual effects</li>
              </ul>
            </div>

            <div className="text-center">
              <DaimoPayTransferButton
                text="Pay 0.01 ETH to Unlock"
                toAddress="0x742d35Cc6634C0532925a3b8D7389d5B6a3c01e6"
                amount="0.01"
                onPaymentCompleted={handlePaymentSuccess}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={handlePaymentCancel}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Game screens
  if (gameState.status === 'menu') {
    return <GameMenu onStartGame={() => resetGame()} />;
  }

  if (gameState.status === 'character-select') {
    return (
      <CharacterSelect
        goobies={goobies}
        onSelect={handleCharacterSelect}
        onBack={() => resetGame()}
      />
    );
  }

  // Playing states
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <GameCanvas 
            gameState={gameState}
            onPlayerMove={handlePlayerMove}
          />
        </div>
        
        <div className="space-y-4">
          <GameUI
            gameState={gameState}
            onPause={pauseGame}
            onResume={resumeGame}
            onEndGame={resetGame}
            onCollectItem={collectItem}
          />
        </div>
      </div>
    </div>
  );
}
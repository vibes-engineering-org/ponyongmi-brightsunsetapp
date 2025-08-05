'use client';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Goobie } from '~/lib/game-types';

interface CharacterSelectProps {
  goobies: Goobie[];
  onSelect: (goobie: Goobie, mode: 'free' | 'paid') => void;
  onBack: () => void;
}

export default function CharacterSelect({ goobies, onSelect, onBack }: CharacterSelectProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Goobie</h2>
        <p className="text-gray-600">Each Goobie has unique stats and abilities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goobies.map((goobie) => (
          <Card key={goobie.id} className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: goobie.color }}
                />
                <div>
                  <CardTitle className="text-lg">{goobie.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {goobie.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded">
                  <div className="font-medium">Health</div>
                  <div>{goobie.health}</div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded">
                  <div className="font-medium">Damage</div>
                  <div>{goobie.damage}</div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                  <div className="font-medium">Speed</div>
                  <div>{goobie.speed}</div>
                </div>
              </div>
              
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                <div className="font-medium text-sm">Special Ability</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {goobie.ability}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onSelect(goobie, 'free')}
                >
                  Free Mode
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onSelect(goobie, 'paid')}
                >
                  Full Game
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center space-y-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Game Modes</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-green-600">Free Mode</div>
              <div className="text-gray-600">
                • Limited to 5 waves
                • Maximum 3 items
                • Basic gameplay
              </div>
            </div>
            <div>
              <div className="font-medium text-blue-600">Full Game</div>
              <div className="text-gray-600">
                • Unlimited waves
                • All items unlocked
                • Premium features
              </div>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" onClick={onBack}>
          Back to Menu
        </Button>
      </div>
    </div>
  );
}
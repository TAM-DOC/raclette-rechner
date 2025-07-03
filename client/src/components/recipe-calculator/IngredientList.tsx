import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Minus } from 'lucide-react';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  onUpdateIngredient: (index: number, field: keyof Ingredient, value: string | number) => void;
  onRemoveIngredient: (index: number) => void;
}

export function IngredientList({ ingredients, onUpdateIngredient, onRemoveIngredient }: IngredientListProps) {
  return (
    <div className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-end">
          <div className="col-span-5">
            <Input
              placeholder="Zutat"
              value={ingredient.name}
              onChange={(e) => onUpdateIngredient(index, 'name', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input
              type="number"
              placeholder="Menge"
              value={ingredient.amount}
              onChange={(e) => onUpdateIngredient(index, 'amount', Number(e.target.value))}
            />
          </div>
          <div className="col-span-3">
            <Input
              placeholder="Einheit"
              value={ingredient.unit}
              onChange={(e) => onUpdateIngredient(index, 'unit', e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onRemoveIngredient(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
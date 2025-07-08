import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ingredient } from '@/lib/api';

interface IngredientListProps {
  ingredients: Ingredient[];
  participants: number;
}

export function IngredientList({ ingredients, participants }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No ingredients configured yet.</p>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    if (amount % 1 === 0) {
      return amount.toString();
    }
    return amount.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Ingredients for {participants} participant{participants !== 1 ? 's' : ''}</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ingredients.map((ingredient, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{ingredient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{formatAmount(ingredient.amount)}</span>
                <Badge variant="secondary">{ingredient.unit}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

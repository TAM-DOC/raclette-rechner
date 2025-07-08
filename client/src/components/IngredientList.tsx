import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ingredient } from '@/lib/api';

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No ingredients yet. Add your first ingredient!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ingredients.map((ingredient) => (
        <Card key={ingredient.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{ingredient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{ingredient.amount}</span>
              <Badge variant="secondary">{ingredient.unit}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Added {new Date(ingredient.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

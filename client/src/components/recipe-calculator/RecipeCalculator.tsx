import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Users, ChefHat } from 'lucide-react';
import { useRecipeCalculator } from './useRecipeCalculator';

export function RecipeCalculator() {
  const {
    ingredients,
    originalServings,
    newServings,
    calculatedIngredients,
    loading,
    error,
    setNewServings,
    calculateRecipe
  } = useRecipeCalculator();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Lade Zutaten...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <p>Fehler beim Laden der Zutaten: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Portionen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="original-servings">Original Portionen</Label>
            <Input
              id="original-servings"
              type="number"
              value={originalServings}
              disabled
              className="mt-1 bg-muted"
            />
          </div>
          <div>
            <Label htmlFor="new-servings">Gewünschte Portionen</Label>
            <Input
              id="new-servings"
              type="number"
              min="1"
              value={newServings}
              onChange={(e) => setNewServings(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Original Zutaten (für {originalServings} Personen)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="font-medium">{ingredient.name}</span>
                <span>{ingredient.amount} {ingredient.unit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {calculatedIngredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Berechnet für {newServings} {newServings === 1 ? 'Person' : 'Personen'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {calculatedIngredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="font-semibold text-primary">{ingredient.name}</span>
                  <span className="font-bold text-primary">{ingredient.amount} {ingredient.unit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

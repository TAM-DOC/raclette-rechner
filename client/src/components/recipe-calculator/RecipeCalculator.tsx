import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Calculator } from 'lucide-react';
import { IngredientList } from './IngredientList';
import { useRecipeCalculator } from './useRecipeCalculator';

export function RecipeCalculator() {
  const {
    ingredients,
    originalServings,
    newServings,
    calculatedIngredients,
    setOriginalServings,
    setNewServings,
    addIngredient,
    removeIngredient,
    updateIngredient,
    calculateRecipe
  } = useRecipeCalculator();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Portionen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="original-servings">Original Portionen</Label>
            <Input
              id="original-servings"
              type="number"
              min="1"
              value={originalServings}
              onChange={(e) => setOriginalServings(Number(e.target.value))}
              className="mt-1"
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
          <CardTitle>Zutaten</CardTitle>
        </CardHeader>
        <CardContent>
          <IngredientList
            ingredients={ingredients}
            onUpdateIngredient={updateIngredient}
            onRemoveIngredient={removeIngredient}
          />
          <Button 
            onClick={addIngredient}
            className="w-full mt-4"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Zutat hinzufügen
          </Button>
        </CardContent>
      </Card>

      <Button 
        onClick={calculateRecipe}
        className="w-full"
        size="lg"
      >
        Rezept berechnen
      </Button>

      {calculatedIngredients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Berechnet für {newServings} {newServings === 1 ? 'Person' : 'Personen'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {calculatedIngredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="font-medium">{ingredient.name}</span>
                  <span>{ingredient.amount} {ingredient.unit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
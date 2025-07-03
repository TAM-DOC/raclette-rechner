import * as React from 'react';
import { Ingredient } from './IngredientList';

interface CalculatedIngredient {
  name: string;
  amount: string;
  unit: string;
}

export function useRecipeCalculator() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([
    { name: '', amount: 0, unit: '' }
  ]);
  const [originalServings, setOriginalServings] = React.useState<number>(4);
  const [newServings, setNewServings] = React.useState<number>(6);
  const [calculatedIngredients, setCalculatedIngredients] = React.useState<CalculatedIngredient[]>([]);

  const addIngredient = React.useCallback(() => {
    setIngredients(prev => [...prev, { name: '', amount: 0, unit: '' }]);
  }, []);

  const removeIngredient = React.useCallback((index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateIngredient = React.useCallback((index: number, field: keyof Ingredient, value: string | number) => {
    setIngredients(prev => prev.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    ));
  }, []);

  const formatAmount = React.useCallback((amount: number): string => {
    if (amount === Math.floor(amount)) {
      return amount.toString();
    }
    
    const rounded = Math.round(amount * 100) / 100;
    
    // Convert to fraction for common values
    if (rounded === 0.25) return '1/4';
    if (rounded === 0.33) return '1/3';
    if (rounded === 0.5) return '1/2';
    if (rounded === 0.67) return '2/3';
    if (rounded === 0.75) return '3/4';
    
    return rounded.toString();
  }, []);

  const calculateRecipe = React.useCallback(() => {
    if (originalServings === 0) return;
    
    const multiplier = newServings / originalServings;
    
    const calculated = ingredients
      .filter(ingredient => ingredient.name.trim() !== '' && ingredient.amount > 0)
      .map(ingredient => ({
        name: ingredient.name,
        amount: formatAmount(ingredient.amount * multiplier),
        unit: ingredient.unit
      }));
    
    setCalculatedIngredients(calculated);
  }, [ingredients, originalServings, newServings, formatAmount]);

  return {
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
  };
}
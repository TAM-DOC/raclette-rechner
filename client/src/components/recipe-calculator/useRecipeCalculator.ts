import * as React from 'react';
import { useIngredients, Ingredient } from '@/hooks/useIngredients';

interface CalculatedIngredient {
  name: string;
  amount: string;
  unit: string;
}

export function useRecipeCalculator() {
  const { ingredients, loading, error } = useIngredients();
  const [originalServings] = React.useState<number>(4); // Fixed value
  const [newServings, setNewServings] = React.useState<number>(6);
  const [calculatedIngredients, setCalculatedIngredients] = React.useState<CalculatedIngredient[]>([]);

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
    
    const calculated = ingredients.map(ingredient => ({
      name: ingredient.name,
      amount: formatAmount(ingredient.amount * multiplier),
      unit: ingredient.unit
    }));
    
    setCalculatedIngredients(calculated);
  }, [ingredients, originalServings, newServings, formatAmount]);

  // Auto-calculate when ingredients are loaded or servings change
  React.useEffect(() => {
    if (ingredients.length > 0) {
      calculateRecipe();
    }
  }, [ingredients, newServings, calculateRecipe]);

  return {
    ingredients,
    originalServings,
    newServings,
    calculatedIngredients,
    loading,
    error,
    setNewServings,
    calculateRecipe
  };
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface BaseIngredient {
  name: string;
  baseAmount: number;
  unit: string;
  servings: number;
}

export async function fetchIngredientsForParticipants(participants: number): Promise<Ingredient[]> {
  const response = await fetch(`/api/ingredients/${participants}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
}

export async function fetchBaseIngredients(): Promise<BaseIngredient[]> {
  const response = await fetch('/api/ingredients');
  if (!response.ok) {
    throw new Error('Failed to fetch base ingredients');
  }
  return response.json();
}

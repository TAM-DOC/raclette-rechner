export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  created_at: string;
}

export async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch('/api/ingredients');
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
}

export async function addIngredient(ingredient: Omit<Ingredient, 'id' | 'created_at'>): Promise<Ingredient> {
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add ingredient');
  }
  
  return response.json();
}

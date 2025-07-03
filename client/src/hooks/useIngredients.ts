import * as React from 'react';

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export function useIngredients() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        console.log('Fetching ingredients...');
        const response = await fetch('/api/ingredients');
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        console.log('Received ingredients:', data);
        setIngredients(data);
      } catch (err) {
        console.error('Error fetching ingredients:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, loading, error };
}

import * as React from 'react';
import { IngredientList } from '@/components/IngredientList';
import { AddIngredientForm } from '@/components/AddIngredientForm';
import { fetchIngredients, addIngredient, Ingredient } from '@/lib/api';

function App() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddingIngredient, setIsAddingIngredient] = React.useState(false);

  React.useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setIsLoading(true);
      const data = await fetchIngredients();
      setIngredients(data);
    } catch (error) {
      console.error('Failed to load ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIngredient = async (ingredient: { name: string; amount: number; unit: string }) => {
    try {
      setIsAddingIngredient(true);
      const newIngredient = await addIngredient(ingredient);
      setIngredients(prev => [...prev, newIngredient]);
    } catch (error) {
      console.error('Failed to add ingredient:', error);
    } finally {
      setIsAddingIngredient(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Ingredients Manager</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AddIngredientForm 
              onSubmit={handleAddIngredient}
              isLoading={isAddingIngredient}
            />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Your Ingredients</h2>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading ingredients...</p>
              </div>
            ) : (
              <IngredientList ingredients={ingredients} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

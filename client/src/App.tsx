import * as React from 'react';
import { RecipeCalculator } from '@/components/recipe-calculator/RecipeCalculator';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Rezept Rechner</h1>
        <RecipeCalculator />
      </div>
    </div>
  );
}

export default App;
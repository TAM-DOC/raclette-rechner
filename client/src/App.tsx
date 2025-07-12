import * as React from 'react';
import { IngredientList } from '@/components/IngredientList';
import { ParticipantInput } from '@/components/ParticipantInput';
import { fetchIngredientsForParticipants, Ingredient } from '@/lib/api';

function App() {
  const [participants, setParticipants] = React.useState(4);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    loadIngredients();
  }, [participants]);

  const loadIngredients = async () => {
    try {
      setIsLoading(true);
      const data = await fetchIngredientsForParticipants(participants);
      setIngredients(data);
    } catch (error) {
      console.error('Failed to load ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleParticipantsChange = (newParticipants: number) => {
    setParticipants(newParticipants);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Raclette-Rechner</h1>
        
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <ParticipantInput 
                participants={participants}
                onParticipantsChange={handleParticipantsChange}
              />
            </div>
          </div>
          
          <div>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Calculating ingredients...</p>
              </div>
            ) : (
              <IngredientList ingredients={ingredients} participants={participants} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

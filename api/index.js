// Simple static API for Vercel
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle ingredient requests
  if (req.url.startsWith('/api/ingredients/')) {
    const participants = parseInt(req.url.split('/')[3]);
    
    if (isNaN(participants) || participants <= 0) {
      res.status(400).json({ error: 'Invalid number of participants' });
      return;
    }

    const ingredientsData = getIngredientsData();
    const calculatedIngredients = calculateIngredients(ingredientsData, participants);
    
    res.json(calculatedIngredients);
    return;
  }

  if (req.url === '/api/ingredients') {
    const ingredientsData = getIngredientsData();
    res.json(ingredientsData);
    return;
  }

  res.status(404).json({ error: 'Not found' });
}

function getIngredientsData() {
  return {
    "originalServings": 12,
    "ingredients": [
      { "id": 1, "name": "Schweinefilet", "amount": 200, "unit": "g" },
      { "id": 2, "name": "Rinderfilet", "amount": 1000, "unit": "g" },
      { "id": 3, "name": "Hühnerfilet", "amount": 500, "unit": "g" },
      { "id": 4, "name": "Putenfilet", "amount": 800, "unit": "g" },
      { "id": 5, "name": "Speckwürfel", "amount": 2, "unit": "Packungen" },
      { "id": 6, "name": "Speck", "amount": 6, "unit": "Packungen" },
      { "id": 7, "name": "Shrimps", "amount": 2, "unit": "Packungen" },
      { "id": 8, "name": "Raclette-Käse", "amount": 7, "unit": "Packungen" },
      { "id": 9, "name": "Bohnen", "amount": 800, "unit": "g" },
      { "id": 10, "name": "Brot", "amount": 5, "unit": "Stück" },
      { "id": 11, "name": "Erdäpfel", "amount": 1500, "unit": "g" },
      { "id": 12, "name": "Sauerrahm für Souce", "amount": 4, "unit": "Packungen" },
      { "id": 13, "name": "Joghurt für Souce", "amount": 4, "unit": "Packungen" },
      { "id": 14, "name": "Mais", "amount": 2, "unit": "Packungen" },
      { "id": 15, "name": "Österkron", "amount": 1, "unit": "Packungen" },
      { "id": 16, "name": "Steirerkäse", "amount": 1, "unit": "Packungen" },
      { "id": 17, "name": "Champignons", "amount": 1, "unit": "Packungen" },
      { "id": 18, "name": "Lauch", "amount": 1, "unit": "Stück" },
      { "id": 19, "name": "Zuccini", "amount": 1, "unit": "Stück" },
      { "id": 20, "name": "Paprika", "amount": 1, "unit": "Stück" }
    ]
  };
}

function calculateIngredients(data, participants) {
  const originalServings = data.originalServings;
  const ingredients = data.ingredients;
  
  return ingredients.map(ingredient => ({
    name: ingredient.name,
    amount: (ingredient.amount * participants) / originalServings,
    unit: ingredient.unit
  }));
}

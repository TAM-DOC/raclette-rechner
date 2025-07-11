export default function handler(req, res) {
  const { participants } = req.query;
  
  try {
    const participantsNum = parseInt(participants);
    
    if (isNaN(participantsNum) || participantsNum <= 0) {
      return res.status(400).json({ error: 'Invalid number of participants' });
    }

    const ingredientsData = {
      "originalServings": 12,
      "ingredients": [
        {
          "id": 1,
          "name": "Schweinefilet",
          "amount": 200,
          "unit": "g"
        },
        {
          "id": 2,
          "name": "Rinderfilet",
          "amount": 1000,
          "unit": "g"
        },
        {
          "id": 3,
          "name": "Hühnerfilet",
          "amount": 500,
          "unit": "g"
        },
        {
          "id": 4,
          "name": "Putenfilet",
          "amount": 800,
          "unit": "g"
        },
        {
          "id": 5,
          "name": "Speckwürfel",
          "amount": 2,
          "unit": "Packungen"
        },
        {
          "id": 6,
          "name": "Speck",
          "amount": 6,
          "unit": "Packungen"
        },
        {
          "id": 7,
          "name": "Shrimps",
          "amount": 2,
          "unit": "Packungen"
        },
        {
          "id": 8,
          "name": "Raclette-Käse",
          "amount": 7,
          "unit": "Packungen"
        },
        {
          "id": 9,
          "name": "Bohnen",
          "amount": 800,
          "unit": "g"
        },
        {
          "id": 10,
          "name": "Brot",
          "amount": 5,
          "unit": "Stück"
        },
        {
          "id": 11,
          "name": "Erdäpfel",
          "amount": 1500,
          "unit": "g"
        },
        {
          "id": 12,
          "name": "Sauerrahm für Souce",
          "amount": 4,
          "unit": "Packungen"
        },
        {
          "id": 13,
          "name": "Joghurt für Souce",
          "amount": 4,
          "unit": "Packungen"
        },
        {
          "id": 14,
          "name": "Mais",
          "amount": 2,
          "unit": "Packungen"
        },
        {
          "id": 15,
          "name": "Österkron",
          "amount": 1,
          "unit": "Packungen"
        },
        {
          "id": 16,
          "name": "Steirerkäse",
          "amount": 1,
          "unit": "Packungen"
        },
        {
          "id": 17,
          "name": "Champignons",
          "amount": 1,
          "unit": "Packungen"
        },
        {
          "id": 18,
          "name": "Lauch",
          "amount": 1,
          "unit": "Stück"
        },
        {
          "id": 19,
          "name": "Zuccini",
          "amount": 1,
          "unit": "Stück"
        },
        {
          "id": 20,
          "name": "Paprika",
          "amount": 1,
          "unit": "Stück"
        }
      ]
    };

    const originalServings = ingredientsData.originalServings;
    const ingredients = ingredientsData.ingredients;
    
    const calculatedIngredients = ingredients.map(ingredient => ({
      name: ingredient.name,
      amount: (ingredient.amount * participantsNum) / originalServings,
      unit: ingredient.unit
    }));

    console.log(`Calculated ingredients for ${participantsNum} participants:`, calculatedIngredients);
    res.json(calculatedIngredients);
  } catch (error) {
    console.error('Error calculating ingredients:', error);
    res.status(500).json({ error: 'Failed to calculate ingredients' });
  }
}

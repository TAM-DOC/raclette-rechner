export default function handler(req, res) {
  try {
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

    console.log('Base ingredients configuration:', ingredientsData);
    res.json(ingredientsData);
  } catch (error) {
    console.error('Error reading ingredients:', error);
    res.status(500).json({ error: 'Failed to read ingredients' });
  }
}

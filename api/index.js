const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware for production
const publicPath = path.join(__dirname, '../dist/public');
console.log('Public path:', publicPath);

// Serve static files
app.use(express.static(publicPath));

// API Routes
app.get('/api/ingredients/:participants', (req, res) => {
  try {
    const participants = parseInt(req.params.participants);
    
    if (isNaN(participants) || participants <= 0) {
      return res.status(400).json({ error: 'Invalid number of participants' });
    }

    // Hardcoded ingredients data for Vercel (since data directory access is limited)
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
      amount: (ingredient.amount * participants) / originalServings,
      unit: ingredient.unit
    }));

    console.log(`Calculated ingredients for ${participants} participants:`, calculatedIngredients);
    res.json(calculatedIngredients);
  } catch (error) {
    console.error('Error calculating ingredients:', error);
    res.status(500).json({ error: 'Failed to calculate ingredients' });
  }
});

app.get('/api/ingredients', (req, res) => {
  try {
    // Hardcoded ingredients data for Vercel
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
});

// Handle all other routes with index.html
app.get('*', (req, res) => {
  try {
    console.log('Serving index.html for path:', req.path);
    const indexPath = path.join(publicPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('index.html not found at:', indexPath);
      // Send a basic HTML response if index.html is not found
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Raclette-Rechner</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div id="root">
            <h1>Raclette-Rechner</h1>
            <p>Loading...</p>
          </div>
        </body>
        </html>
      `);
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;

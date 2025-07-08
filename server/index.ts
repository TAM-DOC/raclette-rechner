import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { setupStaticServing } from './static-serve.js';

dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get ingredients with calculated amounts for participants
app.get('/api/ingredients/:participants', (req, res) => {
  try {
    const participants = parseInt(req.params.participants);
    
    if (isNaN(participants) || participants <= 0) {
      res.status(400).json({ error: 'Invalid number of participants' });
      return;
    }

    const dataDirectory = process.env.DATA_DIRECTORY || './data';
    const ingredientsPath = path.join(dataDirectory, 'ingredients.json');
    
    if (!fs.existsSync(ingredientsPath)) {
      res.status(404).json({ error: 'Ingredients configuration not found' });
      return;
    }

    const ingredientsData = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
    
    const calculatedIngredients = ingredientsData.map(ingredient => ({
      name: ingredient.name,
      amount: (ingredient.baseAmount * participants) / ingredient.servings,
      unit: ingredient.unit
    }));

    console.log(`Calculated ingredients for ${participants} participants:`, calculatedIngredients);
    res.json(calculatedIngredients);
  } catch (error) {
    console.error('Error calculating ingredients:', error);
    res.status(500).json({ error: 'Failed to calculate ingredients' });
  }
});

// Get base ingredients configuration
app.get('/api/ingredients', (req, res) => {
  try {
    const dataDirectory = process.env.DATA_DIRECTORY || './data';
    const ingredientsPath = path.join(dataDirectory, 'ingredients.json');
    
    if (!fs.existsSync(ingredientsPath)) {
      res.status(404).json({ error: 'Ingredients configuration not found' });
      return;
    }

    const ingredientsData = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
    console.log('Base ingredients configuration:', ingredientsData);
    res.json(ingredientsData);
  } catch (error) {
    console.error('Error reading ingredients:', error);
    res.status(500).json({ error: 'Failed to read ingredients' });
  }
});

// Export a function to start the server
export async function startServer(port) {
  try {
    if (process.env.NODE_ENV === 'production') {
      setupStaticServing(app);
    }
    
    app.listen(port, () => {
      console.log(`API Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || 3001);
}

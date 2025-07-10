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

    const configData = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
    const originalServings = configData.originalServings;
    const ingredients = configData.ingredients;
    
    const calculatedIngredients = ingredients.map(ingredient => ({
      name: ingredient.name,
      amount: (ingredient.amount * participants) / originalServings,
      unit: ingredient.unit
    }));

    console.log(`Calculated ingredients for ${participants} participants (original: ${originalServings}):`, calculatedIngredients);
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

    const configData = JSON.parse(fs.readFileSync(ingredientsPath, 'utf8'));
    console.log('Base ingredients configuration:', configData);
    res.json(configData);
  } catch (error) {
    console.error('Error reading ingredients:', error);
    res.status(500).json({ error: 'Failed to read ingredients' });
  }
});

// Export a function to start the server
export async function startServer(port) {
  try {
    // Always setup static serving (for both dev and production)
    if (process.env.NODE_ENV === 'production') {
      console.log('Setting up static file serving for production');
      setupStaticServing(app);
    }
    
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Data directory: ${process.env.DATA_DIRECTORY || './data'}`);
      console.log(`Current working directory: ${process.cwd()}`);
    });
    
    return server;
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

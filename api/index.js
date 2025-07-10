import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware for production
console.log('Setting up static file serving for Vercel');
const publicPath = path.join(__dirname, '../dist/public');
console.log('Public path:', publicPath);

// Serve static files
app.use(express.static(publicPath));

// API Routes
app.get('/api/ingredients/:participants', (req, res) => {
  try {
    const participants = parseInt(req.params.participants);
    
    if (isNaN(participants) || participants <= 0) {
      res.status(400).json({ error: 'Invalid number of participants' });
      return;
    }

    // For Vercel, use a relative path to the data directory
    const dataDirectory = path.join(__dirname, '../data');
    const ingredientsPath = path.join(dataDirectory, 'ingredients.json');
    
    console.log('Looking for ingredients at:', ingredientsPath);
    
    if (!fs.existsSync(ingredientsPath)) {
      console.error('Ingredients file not found at:', ingredientsPath);
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

    console.log(`Calculated ingredients for ${participants} participants:`, calculatedIngredients);
    res.json(calculatedIngredients);
  } catch (error) {
    console.error('Error calculating ingredients:', error);
    res.status(500).json({ error: 'Failed to calculate ingredients' });
  }
});

app.get('/api/ingredients', (req, res) => {
  try {
    const dataDirectory = path.join(__dirname, '../data');
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

// Handle all other routes with index.html
app.get('/*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  const indexPath = path.join(publicPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    res.status(404).send('App not found');
  }
});

export default app;

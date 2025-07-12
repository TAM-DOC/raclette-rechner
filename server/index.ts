import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initializeDatabase, getDatabase } from './database.js';

dotenv.config();

const app = express();

// Initialize database
initializeDatabase();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware - serve from dist/public in production
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static file serving for production');
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  console.log('Public path:', publicPath);
  
  // Serve static files
  app.use(express.static(publicPath));
  
  // Handle all non-API routes with index.html
  app.get('/*splat', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    console.log('Serving index.html for path:', req.path);
    const indexPath = path.join(publicPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('index.html not found at:', indexPath);
      res.status(404).send('App not found');
    }
  });
}

// Get ingredients with calculated amounts for participants
app.get('/api/ingredients/:participants', async (req, res) => {
  try {
    const participants = parseInt(req.params.participants);
    
    if (isNaN(participants) || participants <= 0) {
      res.status(400).json({ error: 'Invalid number of participants' });
      return;
    }

    const db = getDatabase();
    const ingredients = await db.selectFrom('ingredients').selectAll().execute();
    
    console.log(`Found ${ingredients.length} ingredients in database`);
    
    const originalServings = 12; // Base serving size
    
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
app.get('/api/ingredients', async (req, res) => {
  try {
    const db = getDatabase();
    const ingredients = await db.selectFrom('ingredients').selectAll().execute();
    
    console.log(`Found ${ingredients.length} base ingredients in database`);
    
    const configData = {
      originalServings: 12,
      ingredients: ingredients.map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit
      }))
    };
    
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

// For Vercel, export the app directly
export default app;

// Start the server directly if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || 3001);
}

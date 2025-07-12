import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

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

// Function to read ingredients configuration
function getIngredientsConfig() {
  const dataDirectory = process.env.DATA_DIRECTORY || './data';
  const configPath = path.join(dataDirectory, 'ingredients.json');
  
  console.log('Reading ingredients from:', configPath);
  
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading ingredients config:', error);
    // Fallback to default configuration
    return {
      originalServings: 12,
      ingredients: [
        { id: 1, name: "Schweinefilet", amount: 200, unit: "g" },
        { id: 2, name: "Rinderfilet", amount: 1000, unit: "g" },
        { id: 3, name: "Hühnerfilet", amount: 500, unit: "g" },
        { id: 4, name: "Putenfilet", amount: 800, unit: "g" },
        { id: 5, name: "Speckwürfel", amount: 2, unit: "Packungen" },
        { id: 6, name: "Speck", amount: 6, unit: "Packungen" },
        { id: 7, name: "Shrimps", amount: 2, unit: "Packungen" },
        { id: 8, name: "Raclette-Käse", amount: 7, unit: "Packungen" },
        { id: 9, name: "Bohnen", amount: 800, unit: "g" },
        { id: 10, name: "Brot", amount: 5, unit: "Stück" },
        { id: 11, name: "Erdäpfel", amount: 1500, unit: "g" },
        { id: 12, name: "Sauerrahm für Souce", amount: 4, unit: "Packungen" },
        { id: 13, name: "Joghurt für Souce", amount: 4, unit: "Packungen" },
        { id: 14, name: "Mais", amount: 2, unit: "Packungen" },
        { id: 15, name: "Österkron", amount: 1, unit: "Packungen" },
        { id: 16, name: "Steirerkäse", amount: 1, unit: "Packungen" },
        { id: 17, name: "Champignons", amount: 1, unit: "Packungen" },
        { id: 18, name: "Lauch", amount: 1, unit: "Stück" },
        { id: 19, name: "Zuccini", amount: 1, unit: "Stück" },
        { id: 20, name: "Paprika", amount: 1, unit: "Stück" }
      ]
    };
  }
}

// Get ingredients with calculated amounts for participants
app.get('/api/ingredients/:participants', (req, res) => {
  try {
    const participants = parseInt(req.params.participants);
    
    if (isNaN(participants) || participants <= 0) {
      res.status(400).json({ error: 'Invalid number of participants' });
      return;
    }

    const config = getIngredientsConfig();
    const originalServings = config.originalServings;
    const ingredients = config.ingredients;
    
    console.log(`Found ${ingredients.length} ingredients in configuration`);
    
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
    const config = getIngredientsConfig();
    
    console.log(`Found ${config.ingredients.length} base ingredients in configuration`);
    console.log('Base ingredients configuration:', config);
    
    res.json(config);
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

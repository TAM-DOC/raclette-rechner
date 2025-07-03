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

// Get all ingredients from config file
app.get('/api/ingredients', async (req: express.Request, res: express.Response) => {
  try {
    console.log('Loading ingredients from config file...');
    const configPath = path.join(process.cwd(), 'config', 'ingredients.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    console.log('Found ingredients:', config.ingredients);
    res.json(config);
  } catch (error) {
    console.error('Error loading ingredients:', error);
    res.status(500).json({ error: 'Failed to load ingredients' });
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

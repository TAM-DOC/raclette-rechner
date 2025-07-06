import express from 'express';
import dotenv from 'dotenv';
import { setupStaticServing } from './static-serve.js';
import { db } from './database/database.js';

dotenv.config();

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const ingredients = await db.selectFrom('ingredients').selectAll().execute();
    console.log('Database test successful, ingredients:', ingredients);
    res.json({ message: 'Database connection successful', ingredients });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Get all ingredients
app.get('/api/ingredients', async (req, res) => {
  try {
    const ingredients = await db.selectFrom('ingredients').selectAll().execute();
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

// Add new ingredient
app.post('/api/ingredients', async (req, res) => {
  try {
    const { name, amount, unit } = req.body;
    
    if (!name || !amount || !unit) {
      res.status(400).json({ error: 'Name, amount, and unit are required' });
      return;
    }

    const result = await db
      .insertInto('ingredients')
      .values({
        name,
        amount: parseFloat(amount),
        unit
      })
      .returningAll()
      .executeTakeFirst();

    console.log('Added ingredient:', result);
    res.json(result);
  } catch (error) {
    console.error('Error adding ingredient:', error);
    res.status(500).json({ error: 'Failed to add ingredient' });
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

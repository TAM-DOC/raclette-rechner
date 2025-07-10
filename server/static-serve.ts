import path from 'path';
import express from 'express';

/**
 * Sets up static file serving for the Express app
 * @param app Express application instance
 */
export function setupStaticServing(app: express.Application) {
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  // For any other routes, serve the index.html file
  app.get('/*splat', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    // Log the request for debugging
    console.log('Serving index.html for path:', req.path);
    
    const indexPath = path.join(process.cwd(), 'public', 'index.html');
    console.log('Index file path:', indexPath);
    
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });
}

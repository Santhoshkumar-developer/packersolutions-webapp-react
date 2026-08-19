/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-memory data store for API prototyping (persists until process restart)
const database = {
  bookings: [] as any[],
  contacts: [] as any[],
  partners: [] as any[]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middlewares
  app.use(express.json());

  // ==================== SEO OPTIMIZATIONS (ROBOTS & SITEMAP) ====================

  /**
   * Serve a dynamic robots.txt file to guide Googlebot and other indexers
   */
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(
      `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: http://localhost:${PORT}/sitemap.xml`
    );
  });

  /**
   * Serve a dynamic XML Sitemap listing all primary landing, service, and blog routes
   */
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    
    const staticRoutes = [
      '',
      'about',
      'services',
      'blog',
      'contact',
      'locations',
      'faq',
      'privacy-policy',
      'terms-of-service',
      'refund-policy'
    ];

    const services = [
      'household-shifting',
      'domestic-relocation',
      'office-relocation',
      'vehicle-transportation',
      'packing-unpacking',
      'loading-unloading',
      'warehousing-storage'
    ];

    const blogPosts = [
      'safe-household-shifting-guide-packers-movers',
      'it-office-relocation-checklist-corporate-shifting',
      'packing-fragile-items-expert-methodology-packersolution',
      'vehicle-transportation-safety-guide-cars-bikes',
      'secure-warehousing-storage-solutions-shifting'
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. App Static Pages
    staticRoutes.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>https://packersolution.com/${route}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // 2. Service Pages
    services.forEach(svc => {
      xml += `  <url>\n`;
      xml += `    <loc>https://packersolution.com/#service/${svc}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. Blog posts
    blogPosts.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>https://packersolution.com/#blog/${post}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    res.send(xml);
  });

  // ==================== REST API ENDPOINTS (FOR API INTEGRATION LATER) ====================

  /**
   * Health Check Route
   */
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  /**
   * POST /api/bookings
   * Creates a new shifting quote estimate booking
   */
  app.post('/api/bookings', (req, res) => {
    const { serviceId, serviceName, customerName, customerEmail, customerPhone, date, details, estimatedCost } = req.body;
    
    if (!customerName || !customerPhone || !serviceId) {
       res.status(400).json({ error: 'Missing required shifting credentials.' });
       return;
    }

    const booking = {
      id: req.body.id || 'PS-' + Math.floor(100000 + Math.random() * 900000),
      serviceId,
      serviceName,
      customerName,
      customerEmail,
      customerPhone,
      date,
      details: details || {},
      estimatedCost: estimatedCost || 5000,
      status: req.body.status || 'Pending',
      createdAt: req.body.createdAt || new Date().toISOString()
    };

    database.bookings.unshift(booking);
    res.status(201).json(booking);
  });

  /**
   * GET /api/bookings
   * Retrieves all bookings (Used in admin panel)
   */
  app.get('/api/bookings', (req, res) => {
    res.json(database.bookings);
  });

  /**
   * POST /api/contact
   * Submit client customer support inquiries
   */
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, city, message } = req.body;

    if (!name || !phone || !message) {
       res.status(400).json({ error: 'Please provide name, phone, and inquiry message.' });
       return;
    }

    const inquiry = {
      id: req.body.id || 'CON-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone,
      city,
      message,
      createdAt: req.body.createdAt || new Date().toISOString()
    };

    database.contacts.unshift(inquiry);
    res.status(201).json(inquiry);
  });

  /**
   * POST /api/partners
   * Registers a fleet or logistics shifting crew partner
   */
  app.post('/api/partners', (req, res) => {
    const { name, phone, city, vehicle } = req.body;

    if (!name || !phone || !city) {
       res.status(400).json({ error: 'Missing necessary partner credentials (name, phone, active city).' });
       return;
    }

    const partner = {
      id: req.body.id || 'PRT-' + Math.floor(1000 + Math.random() * 9000),
      name,
      phone,
      city,
      vehicle,
      createdAt: req.body.createdAt || new Date().toISOString()
    };

    database.partners.unshift(partner);
    res.status(201).json(partner);
  });

  // ==================== VITE ENGINE AND ASSET PIPELINE ====================

  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite dev server middleware in non-production environments
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite Hot-Reload Development Middleware mounted successfully.');
  } else {
    // Serve production built assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================`);
    console.log(`Packersolution Logistics Engine running`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`========================================`);
  });
}

startServer().catch(err => {
  console.error('Failed to initialize Packersolution core server:', err);
});

// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api', routes);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'blood-compatibility', time: new Date().toISOString() });
});

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Handler global de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;

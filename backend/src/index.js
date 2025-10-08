import express from 'express';
import os from 'os';
import {Queue, Worker} from 'bullmq';
import redisConnection from './config/redis.js';

const port = 3000;
const id = process.env.BACKEND_ID || 'backend-unknown';

// code di BullMQ tramite Redis
const mainQueue = new Queue('main-queue', {connection: redisConnection});

const mainWorker = new Worker(
  'main-queue', 
  async (job) => {
    console.log(`Start job ${job.id} on backend ${id}`)
  }, 
  {connection: redisConnection}
);

mainWorker.on('completed', (job) => {
  console.log(`COMPLETED job ${job.id} on backend ${id}`)
});
mainWorker.on('failed', (job, err) => {
  console.log(`FAILED job ${job.id} on backend ${id} with error ${err.message}`)
});

// creo app express
const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Backend-ID', id);
  next();
});

// creo endpoint ping
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/prodotti', (req, res) => {
  const prodotti = [
    { id: 1, nome: 'Prodotto 1', prezzo: 10.0 },
    { id: 2, nome: 'Prodotto 2', prezzo: 20.0 },
    { id: 3, nome: 'Prodotto 3', prezzo: 30.0 },
  ];
  res.json(prodotti);
});

app.get('/prodotti/:id', (req, res) => {
    res.json({ id: 1, nome: 'Prodotto 1', prezzo: 10.0 });
});

app.get('/heavy', (req, res) => {
  let count = 0;
  for (let i = 0; i < 500_000; i++) {
    count += i;
  }
  res.send(`Count: ${count}`);
});

// endpoint per le code
app.post('/job-for-all', async (req, res) => {
  const job = await mainQueue.add('job', {name: req.body?.name || 'default'});
  res.json({jobId: job.id});
});

// avvio server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} - PID: ${process.pid} - CPUs: ${os.cpus().length}`);
});
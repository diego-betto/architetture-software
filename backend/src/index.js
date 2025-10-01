import express from 'express';
import os from 'os';

const port = 3000;
const id = process.env.BACKEND_ID || 'backend-unknown'

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

// avvio server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} - PID: ${process.pid} - CPUs: ${os.cpus().length}`);
});
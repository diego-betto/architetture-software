# Front end

- [ ] creare cartella `frontend`
- [ ] Pagina HTML della pizzeria
- [ ] bottone per elenco ordini
- [ ] bottone per creare un nuovo ordine
- [ ] ad ogni bottone abbinare funzione che fa il `console.log`

# Back end

- [ ] creare cartella `backend` (o spostare l'eventuale già fatto)
- [ ] creare server express
- [ ] creare rotta `/ping`
- [ ] creare rotte `/prodotti` e `/prodotti/<id>`

# Steps

## Step 1
Avvio di un cluster con PM2 (va installato globalmente con `npm i -g pm2`)
- script `npm run start:pm2` per avviare il backend tramite PM2
- script `npm run start:pm2cluster` per avviare N istanze del backend in base a quanti core ha il mio pc.
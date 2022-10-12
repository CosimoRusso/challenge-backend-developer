# challenge-backend-developer

Per valutare meglio le capacità di un candidato, vorremmo sottoporre il seguente test.

Questo dovrebbe essere sviluppato in una sessione di programmazione condivisa in circa un'ora di tempo.

È consentito utilizzare documentazione online.

## Prerequisiti

- [GIT](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/) >= v14
- Node.js framework of your choice (i.e. [Fastify](https://www.fastify.io/))
- [Postman](https://www.postman.com/)

## Preparazione

Forkare questo repository ed generare un progetto Node.js.

È consentito aggiungere le librerie a scelta, ma bisogna eventualmente descriverne le funzionalità.

## Descrizione

**Pizzeria online**

L'applicazione avrà lo scopo di permettere l'ordinazione di pizze online.

Le entità che saranno da creare (incluse relazioni):

- _product_ - nome e prezzo (esempio: Margherita 5€, Marinara 6€, ...)
- _order_ - cliente, indirizzo di consegna, totale ordine, stato ordine
- _order product_ - righe ordine

Gli endpoint dovranno essere descritti in una collection Postman comprensivi di payload:

- _creazione nuovo ordine_
- _dettaglio ordine_
- _cambio di stato ordine_

In aggiunta, entrambe paginate:

- _lista prodotti_
- _lista ordini_

_**Funzionalità aggiuntive:**_

- validazione payload (esempio product amount > 0).
- sconto ordine (esempio: 5% di sconto se il totale >= 50€, ...).
- autenticazione (sufficiente la verifica dell'header Authorization testando la validità di un token JWT).
- unit test.
- quello che si ritiene interessante aggiungere.

## Valutazione

A causa del tempo limitato, è utile considerare che non è importante completare tutto il test: l'importante è descrivere esaustivamente i passaggi che si sarebbero seguiti nel realizzare le funzionalità mancanti.

Livello di funzionalità:

- **sufficiente** - completare il test con le funzionalità base.
- **buono** - completare anche le funzionalità opzionali.
- **ottimo** - implementare unit test, Dockerizzare l'applicazione ed, utilizzando docker-compose, orchestrare applicazione / servizi.

> Nel caso questo test sia svolto in autonomia e non in una sessione condivisa, è sufficiente comunicare il link al repository nella email ricevuta per il test.

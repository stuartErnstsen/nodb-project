const express = require('express'),
    app = express(),
    contenderCtrl = require('./controllers/contendersCtrl'),
    battleCtrl = require('./controllers/battleCtrl'),
    resultsCtrl = require('./controllers/resultsCtrl')
port = 4444

// app.use(express.json())

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// ======CONTENDER CONTROLLER===================================================

app.get('/api/contenders', contenderCtrl.getAllContenders)
app.put('/api/contenders/:id', contenderCtrl.editName)
app.delete('/api/contenders/:id', contenderCtrl.deleteContender)
app.post('/api/contenders', contenderCtrl.addContender)
app.get('/api/pokedex/', contenderCtrl.getPokedexItem)

// ======BATTLE CONTROLLER======================================================

app.post('/api/battle', battleCtrl.createPair)
app.delete('/api/battle', battleCtrl.deletePair)

// ======RESULTS CONTROLLER=====================================================

app.post('/api/results', resultsCtrl.addResults)


app.listen(port, () => console.log(`App is running on port:${port}`))
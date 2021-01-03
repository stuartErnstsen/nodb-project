const   express = require('express'),
        app = express(),
        contenderCtrl = require('./controllers/contendersCtrl'),
        battleCtrl = require('./controllers/battleCtrl'),
        port = 4444

// app.use(express.json())
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

// ======CONTENDER CONTROLLER===================================================

app.get('/api/contenders', contenderCtrl.getAllContenders)
app.put('/api/contenders/:id', contenderCtrl.editName)
app.delete('/api/contenders/:id', contenderCtrl.deleteContender)
app.post('/api/contenders', contenderCtrl.addContender)

// ======BATTLE CONTROLLER======================================================

app.post('/api/battle', battleCtrl.createPair)

app.listen(port, () => console.log(`App is running on port:${port}`))
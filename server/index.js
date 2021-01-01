const   express = require('express'),
        app = express(),
        contenderCtrl = require('./controllers/contendersCtrl')
        port = 4444

app.use(express.json())

app.get('/api/contenders', contenderCtrl.getAllContenders)
app.put('/api/contenders/:id', contenderCtrl.editName)
app.delete('/api/contenders/:id', contenderCtrl.deleteContender)

app.listen(port, () => console.log(`App is running on port:${port}`))
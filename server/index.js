const   express = require('express'),
        app = express(),
        contenderCtrl = require('./controllers/contendersCtrl')
        port = 4444

app.use(express.json())

app.get('/api/contenders', contenderCtrl.getAllContenders)

app.listen(port, () => console.log(`App is running on port:${port}`))
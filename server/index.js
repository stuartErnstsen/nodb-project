const   express = require('express'),
        app = express(),
        port = 4444

app.use(express.json())


app.listen(port, () => console.log(`App is running on port:${port}`))
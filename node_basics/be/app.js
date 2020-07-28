const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
 
app.get('/students/create', function (req, res) {
  res.code(201).send('Hello World from server')
})

app.get('/students/delete', function (req, res) {
    res.send('Hello World 2 from server')
})

app.listen(8080)
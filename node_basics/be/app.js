const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
 
app.get('/students/create', function (req, res) {
  // insert student in database
  res.code(201).send('Student created')
})

app.get('/students/delete', function (req, res) {
    // delete student from database
    res.send('Student delete')
})

app.listen(8080)
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = 3000

app.use(cookieParser('my-secret'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
curl -b c.jar -c c.jar -X POST localhost:3000/login -H "Content-Type: application/json" -d '{"user":"smith","password":"secret"}'
curl -b c.jar -c c.jar localhost:3000/
*/

const users = [
    {
        'user': 'smith',
        'password': 'secret',
    }
]

app.post('/login', (req, res) => {
    let user = users.find(
        e => (e.user === req.body.user && e.password === req.body.password)
    )
    if (user) {
        res.cookie('user', user, {signed: true})
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.use((req, res, next) => {
    let user = req.signedCookies.user
    if (! user) {
        res.sendStatus(401)
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    let user = req.signedCookies.user
    res.send(`Welcome back, ${user.user}\n`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
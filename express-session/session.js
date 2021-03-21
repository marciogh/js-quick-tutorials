const express = require('express')
const session = require('express-session')
const port = 3000

const app = express()

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
}))
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
        req.session.user = user
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})

app.use((req, res, next) => {
    let user = req.session.user
    if (typeof user == 'undefined') {
        res.sendStatus(401)
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    let user = req.session.user
    res.send(`Welcome back, ${user.user}\n`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const path = require("node:path")

const express = require("express")
const session = require('express-session')
const {response} = require("express");

const app = express()

app.set("view engine", "ejs")
app.set('trust proxy', 1)
app.set("views", path.join(__dirname, "/views"))

app.use("/assets", express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require("./middlewares/flash"))

app.get('/', (req, res) => {
    res.render("pages/index", { message: "Hello world!" })
})

app.post('/',  (req, res) => {
    if(req.body.message === undefined || req.body.message === '') {
        req.flash("error", "You must enter a message :(")
        res.redirect('/')
    }
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})
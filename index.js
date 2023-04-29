const path = require("node:path")

const express = require("express")
const session = require('express-session')

const Message = require("./models/message")

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
    Message.all((messages) => {
        res.render("index", { messages: messages })
    })
})

app.post('/',  (req, res) => {
    if(req.body.message === undefined || req.body.message === '') {
        req.flash("error", "You must enter a message :(")
        res.redirect('/')
    } else {
        Message.create(req.body.message, () => {
            req.flash("success", "Thank you for your message :)")
            res.redirect('/')
        })
    }
})

app.get("/messages/:id", (req, res) => {
    Message.findById(req.params.id, message => {
        res.render("messages/show", { message: message })
    })
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})
const path = require("node:path")

const express = require("express")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use("/assets", express.static("public"))

app.get("/", (req, res) => {
    res.render("pages/index", {message: "Hello world!"})
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})
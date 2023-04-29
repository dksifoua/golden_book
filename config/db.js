const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passwd",
    database: "golden_book"
})

connection.connect(err => {
    if(err) {
        throw err
    }

    console.log(`Connected to MySQL database with id: ${connection.threadId}`)
})

module.exports = connection
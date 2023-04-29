const moment = require("moment")

const connection = require("../config/db")

class Message {

    constructor(row) {
        this.row = row
    }

    get content() {
        return this.row.content
    }

    get created_at() {
        return moment(this.row.created_at)
    }

    static create(content, callback) {
        const query = connection.query(
            "insert into messages set content = ?, created_at = ?",
            [content, new Date()],
            (err, result) => {
                if(err) throw err

                callback(result)
            }
        )
    }

    static all(callback) {
        const query = connection.query(
            "select * from messages",
            (err, rows) => {
                if(err) throw err

                callback(rows.map(row => new Message(row)))
            }
        )
    }
}

module.exports = Message
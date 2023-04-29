const moment = require("moment")

const connection = require("../config/db")

class Message {

    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
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
            "select * from messages order by created_at desc",
            (err, rows) => {
                if(err) throw err

                callback(rows.map(row => new Message(row)))
            }
        )
    }

    static findById(id, callback) {
        const query = connection.query(
            "select * from messages where id = ? limit 1",
            [id],
            (err, rows) => {
                if(err) throw err

                callback(new Message(rows[0]))
            }
        )
    }
}

module.exports = Message
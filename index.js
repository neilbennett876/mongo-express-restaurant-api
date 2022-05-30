require('dotenv/config')
const express = require("express")
const mongo = require("mongodb").MongoClient
const cors = require("cors")
const res = require("express/lib/response")

const app = express()
app.use(cors())
app.use(express.json())

const url = process.env.MONGO_URL

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let menudb, customersdb

mongo.connect(url, options, (err, mongoClient) => {
    if(err) {
        console.error(err)
        return
    }
    console.log("we are connected!")


app.listen(3000, () => console.log("app is listening on port 3000"))

    const db = mongoClient.db("restaurant")
    customersdb = db.collection("customers")
    menudb = db.collection("menu")
    
});

//get
app.get("/", (req, res) => res.status(200).send("Hey class!"))

//post
app.post("/", (req, res) => {
    console.log("this is the req", req.body)
    const dish1 = {name: "leche de tigre",}
    menudb.insertOne(req.body)
    res.status(201).send("Item was added")
})

//patch
app.patch("/", (req, res) => {
    menudb.updateOne(req.body, {$set: {name: "rum", cost: 40, stock: false}})
    .then(() => res.status(200).send("Item was updated"))
})

//delete

app.delete("/", (req, res) => {
    menudb.deleteOne({name: "Pizza"} ).then(() => res.send("Item was deleted"))
})
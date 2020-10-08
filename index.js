const express = require("express")
const db = require("./data/db")
const postRouter = require("./data/post-router")

const server = express()
const port = 9000

server.use(express.json())
server.use("/", postRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
const express = require("express")
const db = require("./db")

const router = express.Router()

router.post("/api/posts", (req, res) =>{
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.update(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

router.post("/api/posts/:id/comments", (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    })
    
    if(!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }
    
    db.insertComment(req.params.id, req.body)
    .then((comment) => {
        res.status(201).json(comment)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })
})

router.get("/api/posts", (res, req) => {
    const options = {
        sortBy: req.query.sortBy,
        limit: req.query.limit,
    }
    db.find(options)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

module.exports = router
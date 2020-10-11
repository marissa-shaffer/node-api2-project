const { Router } = require("express")
const express = require("express")
const db = require("./db")

const router = express.Router()

router.post("/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: "Please provide title and contents for the post.",
		})
	}

	db.insert(req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: "There was an error while saving the post to the database",
			})
		})
})

router.post("/posts/:id/comments", (req, res) => {
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

	db.insertComment(req.params.id, req.body)
		.then((comment) => {
			res.status(201).json(comment)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: "There was an error while saving the comment to the database",
			})
		})
})

module.exports = router
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

router.post()

module.exports = router
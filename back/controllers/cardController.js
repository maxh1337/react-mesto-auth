import asyncHandler from 'express-async-handler'
import Card from '../models/cardModel.js'


export const createCard = asyncHandler(async (req, res) => {
	const user = req.user._id
	const { name, url } = req.body
	console.log(req.body)

	if (!name) {
		res.status(500)
		throw new Error('You must set name')
	}

	const card = await Card.create({
		user,
		name,
		url
	})

	res.json(card)
})



export const getAllCardsByUserId = asyncHandler(async (req, res) => {
	const user = req.user._id
	const cards = await Card.find({ user: user }).lean()

	res.json(cards)
})




export const deleteCard = asyncHandler(async (req, res) => {
	const cardId = req.params.id

	const card = await Card.findById(cardId)

	if (!card) {
		res.status(404)
		throw new Error('This card not found')
	}

	await card.remove()

	res.json({ message: 'Card deleted' })
})

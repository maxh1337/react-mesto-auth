import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const cardSchema = mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
})

const Card = mongoose.model('Card', cardSchema)
export default Card

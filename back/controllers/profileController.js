import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const getUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password').lean()

	res.json({
		...user,
	})
})

export const changeUserData = expressAsyncHandler(async (req, res) => {
	const {avatar, name, description} = req.body

	const user = await User.findById(req.user._id)
	if(!user) {
		res.status(400)
		throw new Error('User not found')
	}

	if(avatar){
		user.avatar = avatar
	}
	if(name){
		user.name = name
	}
	if(description){
		user.description = description
	}

	
	await user.save()
	res.json(user)
})


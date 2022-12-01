import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../helpers/generateToken.js'
import User from '../models/userModel.js'


export const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const isHaveUser = await User.findOne({ email })

	if (isHaveUser) {
		res.status(400)
		throw new Error('Данный пользователь уже зарегистрирован')
	}

	if(password.length < 6) {
		res.status(400)
		throw new Error('Пароль не соответствует установленым требованиям')
	}
	const user = await User.create({
		name,
		email,
		password,
	})

	const token = generateToken(user._id)
	res.json({ user, token })
})

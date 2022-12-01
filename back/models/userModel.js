import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
	name: {
		type: String,
		default: 'Введите имя',
	},
	description: {
		type: String,
		default: 'Введите описание',
	},
	avatar: {
		type: String,
		default: 'https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg',
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
})

userSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

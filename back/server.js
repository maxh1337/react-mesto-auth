import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'

import userRoutes from './routes/userRoutes.js'
import cardRoutes from './routes/cardRoutes.js'


import { connectDB } from './config/db.js'


import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)


app.use('/api/users', userRoutes)
app.use('/api/cards', cardRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)

import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
	createCard,
	deleteCard,
	getAllCardsByUserId,
} from '../controllers/cardController.js'

const router = express.Router()
router
	.route('/')
	.get(protect, getAllCardsByUserId)
	.post(protect, createCard)

router.route('/:id').delete(protect, deleteCard)

export default router

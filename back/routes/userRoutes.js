import express from 'express'
import { authUser } from '../controllers/authController.js'
import { changeUserData, getUserProfile } from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'
import { registerUser } from '../controllers/regController.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile).put(protect, changeUserData)
router.route('/login').post(authUser)
router.route('/register').post(registerUser)


export default router

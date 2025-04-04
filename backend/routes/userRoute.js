import { getProfile, login, logout, signup } from "../controllers/authControllers.js";
import {Router} from "express";
import authenticate from "../middlewares/authenticate.js";
const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authenticate, getProfile)

export default router
const {Router} = require("express");
const router = Router()
const {signup, login, logout} = require("../controllers/authControllers")

router.post('/register', signup)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router;
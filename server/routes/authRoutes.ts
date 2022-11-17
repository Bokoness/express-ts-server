import express from "express"
import auth from "../middleware/auth.js"
import AuthController from "../controllers/AuthController.js"

const router = express.Router()
/**
 * Registers a user
 */
router.post("/register", AuthController.register)

/**
 * Login a user
 */
router.post("/login", AuthController.login())

/**
 * this route checks if user is logged in right now, if so it will send its details
 */
router.get("/checkLogin", auth(), AuthController.checkLogin)

/**
 * This route logs user out
 * There are more details of the user that can be saved here, but they are not required
 * user have to be logged in, in order to log out
 */
router.post("/logout", auth(), AuthController.logout)

export default router

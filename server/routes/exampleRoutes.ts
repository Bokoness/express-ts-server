import express from "express"
import Controller from "../controllers/ExampleController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

const c = new Controller()
// Basic Crud routes
router.get("/", auth(0), c.index())
router.get("/user", auth(0), c.indexUser())
router.get("/:id", auth(0), c.show())
router.post("/", auth(0), c.store())
router.put("/:id", auth(0), c.update())
router.delete("/:id", auth(0), c.destroy())
router.post("/replicate/:id", auth(0), c.replicate()) // this one without auth

export default router

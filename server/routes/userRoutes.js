import express from 'express'
import Controller from '../controllers/UserController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

const c = new Controller()
// Basic Crud routes
router.get('/', auth(0), c.index())
router.get('/:id', auth(0), c.show())
router.post('/', auth(0), c.store())
router.put('/:id', auth(0), c.update())
router.delete('/:id', auth(0), c.destroy())

export default router

import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import authSchema from './schemas/authSchema.js'

class AuthClass {
  generateToken() {
    return jwt.sign({ ...this.toObject() }, process.env.COOKIES_AUTH)
  }

  static async findByToken(token) {
    const decoded = jwt.decode(token, process.env.COOKIES_AUTH)
    const t = await this.findOne({ user: decoded.user, expiresAt: { $lte: decoded.expiresAt } }).populate('user')
    return t
  }
}

authSchema.loadClass(AuthClass)

const Auth = mongoose.model('Auth', authSchema)

export default Auth

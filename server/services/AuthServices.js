import jwt from "jsonwebtoken"
import dayjs from "dayjs"
import User from "../models/UserModel.js"

class AuthServices {
	/**
	 * This Service extract the user from cookie, and save the user on the request object
	 * @param Object req - express request object
	 */
	static async getUserFromCookie(req) {
		const cookie = req.user ? req.user : req.cookies.user
		if (!cookie) throw new Error("Not verified")
		const decoded = jwt.verify(cookie, process.env.AUTH_SECRET)
		const user = await User.findById(decoded.user)
		if (!user) throw new Error("Not verified")
		return user
	}

	/**
	 * This Service extract the user from token, and save the user on the request object
	 * @param Object req - express request object
	 */
	static async getUserFromToken(req) {
		let t = req.headers.authorization
		t = t.split(" ")
		if (!t || !t[1]) throw new Error("Not verified")
		const decoded = jwt.verify(t[1], process.env.AUTH_SECRET)
		const user = await User.findById(decoded.user)
		if (!user) throw new Error("Not verified")
		return user
	}

	/**
	 * Find authenticated user by its cookie and adds user to request object
	 * @param {*} req the http request object
	 */
	static async cookieAuth(req) {
		try {
			const user = await AuthServices.getUserFromCookie(req)
			if (user.role < 4) user.isAdmin = true
			req.user = user
		} catch (e) {
			throw new Error("Not verified")
		}
	}

	/**
	 * Find authenticated user by its berear token
	 * @param {*} req the http request object
	 */
	static async tokenAuth(req) {
		try {
			const user = await AuthServices.getUserFromToken(req)
			if (user.role < 4) user.isAdmin = true
			req.user = user
		} catch (e) {
			throw new Error("Not verified")
		}
	}

	/**
	 * This Service Create a new cookie for user
	 * @param {User} user - the auth user
	 * @param {Object} res - Express response object
	 * @param {String} expiresIn - Cookie expiration time in MS
	 */
	static registerCookie(user, res, expiresIn) {
		if (!expiresIn) expiresIn = this.generateExperationByDays(expiresIn)
		const cookie = jwt.sign({ user: user.id }, process.env.AUTH_SECRET, {
			expiresIn,
		})
		res.cookie("user", cookie, {
			expiresIn,
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
		})
	}

	/**
	 * This Service Create a new token for user
	 * @param {User} user - the auth user
	 * @param {dayjs} expiresIn - the token expiration date
	 * @returns {Object} the new token
	 */
	static registerToken(user, expiresIn) {
		if (!expiresIn) expiresIn = this.generateExperationByDays(expiresIn)
		return jwt.sign({ user: user.id }, process.env.AUTH_SECRET, { expiresIn })
	}

	/**
	 * Generate expiration MS from days
	 * @param {*} days number of days to expire
	 * @returns MS for days
	 */
	static generateExperationByDays(days = 7) {
		const MS_DAY = 86400000
		return days * MS_DAY
	}

	/**
	 * prepare user for client
	 * @param {Object} user Mongoose object - user
	 * @returns user for client
	 */
	static getUser(user) {
		// TODO: change here to wanted fields;
		return {
			fullName: user.fullName,
			email: user.email,
			role: user.role,
		}
	}
}

export default AuthServices

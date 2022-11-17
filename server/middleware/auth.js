import AuthServices from "../services/AuthServices.js"
import ErrorService from "../services/ErrorService.js"

//! ROLES

const defaultAuthMethod = process.env.DEFAULT_AUTH_METHOD

const auth = (role = 4, type = defaultAuthMethod) => {
	return async (req, res, next) => {
		try {
			if (type === "web") {
				cookieAuth(req, res, next, role)
			} else {
				tokenAuth(req, res, next, role)
			}
		} catch (e) {
			ErrorService.logError(`Auth Middleware r${role}`, "user is not verified")
			res.sendStatus(401)
		}
	}
}

const cookieAuth = async (req, res, next, role = 4) => {
	try {
		await AuthServices.cookieAuth(req)
		if (req.user.role > role) throw 401
		next()
	} catch (e) {
		ErrorService.logError(`Auth Middleware r${role}`, "user is not verified")
		res.sendStatus(401)
	}
}

const tokenAuth = async (req, res, next, role = 4) => {
	try {
		await AuthServices.tokenAuth(req)
		if (req.user.role > role) throw 401
		next()
	} catch (e) {
		ErrorService.logError(`Auth Middleware r${role}`, "user is not verified")
		res.sendStatus(401)
	}
}

export default auth

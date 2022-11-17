import path from "path"
import { fileURLToPath } from "url"
import Req from "../types/request"
import Res from "../types/response"
import ErrorService from "../services/ErrorService.js"

class Controller {
	/**
	 * BaseController - create a parent controller
	 * @param name - the name of the model
	 * @param model - the Mongoose model
	 * @param policy - the model's policy
	 */
	constructor(name, model, policy) {
		this.name = name
		this.model = model
		this.policy = policy
	}

	/**
	 * Find all records
	 */
	index() {
		return async (req: Req, res: Res) => {
			try {
				return res.send(await this.model.index(req.query))
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | index`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * Find all authenticated user record
	 */
	indexUser() {
		return async (req, res) => {
			try {
				req.query = { ...req.query, user: req.user }
				return res.send(await this.model.index(req.query))
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | indexUser`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * Find a single record
	 * @param {*} req.params.id the record id
	 */
	show() {
		return async (req, res) => {
			try {
				const record = await this.model.show(req.params.id)
				if (record && this.policy && !this.policy.show(req.user, record)) {
					return ErrorService.createError(
						`${this.name} Controller | show`,
						ErrorService.errors.auth.unauthorized,
						res
					)
				}
				res.send(record)
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | show`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * Save's a single record
	 * @param {*} req.body the record data
	 */
	store() {
		return async (req, res) => {
			try {
				const data = { ...req.body, user: req.user?._id }
				if (this.policy && !this.policy.store(req.user, data)) {
					return ErrorService.createError(
						`${this.name} Controller | store`,
						ErrorService.errors.auth.unauthorized,
						res
					)
				}
				const record = await this.model.store(data)
				res.send(record)
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | store`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * Updates single record
	 * @param {*} req.params.id the wanted record'd id
	 * @param {*} req.body holds the record updates
	 */
	update() {
		return async (req, res) => {
			try {
				if (req.body._id) delete req.body._id
				const record = await this.model.show(req.params.id)
				if (!record) {
					return ErrorService.createError(
						`${this.name} Controller | update`,
						ErrorService.errors.notFound,
						res
					)
				}
				if (this.policy && !this.policy.update(req.user, record)) {
					return ErrorService.createError(
						`${this.name} Controller | update`,
						ErrorService.errors.auth.unauthorized,
						res
					)
				}
				res.send(await this.model.update(req.params.id, req.body))
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | update`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * destroys a single record
	 * @param {*} req.params.id the wanted record's id
	 */
	destroy() {
		return async (req, res) => {
			try {
				const record = await this.model.show(req.params.id)
				if (!record) {
					return ErrorService.createError(
						`${this.name} Controller | destroy`,
						ErrorService.errors.notFound,
						res
					)
				}
				if (this.policy && !this.policy.destroy(req.user, record)) {
					return ErrorService.createError(
						`${this.name} Controller | destroy`,
						ErrorService.errors.auth.unauthorized,
						res
					)
				}
				await this.model.destroy(req.params.id)
				res.sendStatus(200)
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | destroy`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	/**
	 * Replicates a single record
	 * @param {*} req.params.id the wanted record's id
	 */
	replicate() {
		return async (req, res) => {
			try {
				const record = await this.model.show(req.params.id)
				if (!record) {
					return ErrorService.createError(
						`${this.name} Controller | replicate`,
						ErrorService.errors.notFound,
						res
					)
				}
				if (this.policy && !this.policy.replicate(req.user, record)) {
					return ErrorService.createError(
						`${this.name} Controller | replicate`,
						ErrorService.errors.auth.unauthorized,
						res
					)
				}
				res.send(await this.model.replicate(req.params.id))
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | Replicate`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}

	static serveHtml() {
		return async (req, res) => {
			try {
				const { dirname } = path
				const __dirname = dirname(fileURLToPath(import.meta.url))
				res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
			} catch (e) {
				return ErrorService.createError(
					`${this.name} Controller | Replicate`,
					ErrorService.errors.generalError,
					res
				)
			}
		}
	}
}

export default Controller

import { Schema, model } from "mongoose"
import passwordHash from "password-hash"
import BaseModel from "./BaseModel.js"

class UserClass extends BaseModel {
	constructor() {
		super([], [])
	}

	/**
	 * findByCredentials - find user by email and validate its password
	 * @param {String} email the user's email
	 * @param {String} password the user's password
	 * @returns false if no user or password isn't valid, return the user instance otherwise
	 */
	static async findByCredentials(email, password) {
		const user = await this.findOne({ email })
		if (!user || !(await user.checkPass(password))) return false
		return user
	}

	/**
	 * checkPass verify password with hashed password saved in user's instance
	 * @param {String} pass the password to compare
	 * @returns {Boolean} true or false if passwords are matched
	 */
	checkPass(pass) {
		return passwordHash.verify(pass, this.password)
	}
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			validate: validators.email,
			required: true,
		},
		password: { type: String, validate: validators.password },
		name: {
			firstName: { type: String },
			lastName: { type: String },
		},
		address: {
			street: String,
			number: String,
			city: String,
		},
		profession: { type: String },
		info: String,
		role: {
			type: Number,
			default: DEFAULT_CUSTOMER_ROLE,
		},
		phone: { type: String, validate: validators.phoneIsrael },
	},
	{ timestamps: true }
)

userSchema.loadClass(UserClass)

const User = mongoose.model("User", userSchema)

export default User

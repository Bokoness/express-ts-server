class Policy {
	static allowAll = false

	static belongToTeam(user, record) {
		if (this.allowAll) return true
		return user?._id?.equals(record.user)
	}

	static destroy(user, record) {
		return this.belongToTeam(user, record)
	}

	static show(user, record) {
		return this.belongToTeam(user, record)
	}

	static update(user, record) {
		return this.belongToTeam(user, record)
	}

	static store(user, record) {
		return this.belongToTeam(user, record)
	}

	static replicate(user, record) {
		return this.belongToTeam(user, record)
	}
}

export default Policy

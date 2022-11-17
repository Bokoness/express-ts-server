import mongoose from "mongoose"

async function connect(): Promise<void> {
	await mongoose.connect(process.env.MONGO, {
		dbName: process.env.DB_NAME,
	})
}

export default connect

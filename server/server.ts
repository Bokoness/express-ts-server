import express, { Express } from "express"
import cookieParser from "cookie-parser"
import chalk from "chalk"
import routes from "./routes/routes.js"
import BaseController from "./controllers/BaseController.js"
import connect from "./config/db"
import logger from "./services/Logger"

const app: Express = express()

app.use(cookieParser())
app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("dist"))
app.use(express.static("public"))

app.use(routes)

app.get("*", BaseController.serveHtml())

const startServer = async () => {
	try {
		const port: string | number = process.env.PORT || 3000
		await connect()
		console.log(chalk.bgGreen("connected to DB"))
		app.listen(port, () => {
			console.log(
				chalk.bgBlue(
					`Server is listenning on port http://localhost:${chalk.bold(port)}`
				)
			)
		})
	} catch (e) {
		console.log(chalk.bgRed("DB connection error", e))
	}
}

startServer().then(() => console.log("Server is running"))

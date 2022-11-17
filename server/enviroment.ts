//Declaring global env schema for server

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production"
			PORT: number
			MONGO: string
			DB_NAME: string

			AUTH_SECRET: string
			DEFAULT_AUTH_METHOD: "web" | "api"

			SENDGRID_API_KEY?: string
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

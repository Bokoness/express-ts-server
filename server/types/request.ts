import _, { Request } from "express"

/**
 * Req custom http request type that extends the express Request type
 */
interface Req extends Request {
	user: any
}

export default Req

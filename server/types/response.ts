import _, { Response } from "express"

/**
 * Res custom http response type that extends the express Response type
 */
interface Res extends Response {}

export default Res

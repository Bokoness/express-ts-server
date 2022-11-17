import { Schema, model } from "mongoose"
import BaseModel from "./BaseModel.js"

interface IExample {
	name: string
	content?: string
}

const exampleSchema = new Schema<IExample>({
	name: { type: String, required: true },
	content: { type: String, required: false },
})

class ExampleClass extends BaseModel {
	constructor() {
		super([], [])
	}
}

exampleSchema.loadClass(ExampleClass)

export default model("example", exampleSchema)

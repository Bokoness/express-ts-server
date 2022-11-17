import request from "supertest"
import dummy from "mongoose-dummy"
import Example from "../models/ExampleModel.js"
import "dotenv/config"

const baseURL = `http://localhost:${process.env.PORT}`

describe("Testing Example model", () => {
	//Creating an agent to save and use auth cookie
	const agent = request.agent(baseURL)
	let recordId
	it("POST /auth/login/", async () => {
		const response = await agent.post("/auth/login/").send({
			email: "admin@gmail.com",
			password: "321123",
		})
		expect(response.statusCode).toBe(200)
	})

	//Creating dummy record using mongoose schema
	let record = dummy(Example, {
		returnDate: true,
	})

	it("POST /example - store a new example", async () => {
		const response = await agent.post("/example/").send(record)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
		recordId = response.body._id
	})

	it(`GET /example/:id - show example`, async () => {
		const response = await agent.get(`/example/${recordId}`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
	})

	it(`GET /example/ - index examples`, async () => {
		const response = await agent.get(`/example`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
		expect(response.body).toBeInstanceOf(Array)
	})

	it(`UPDATE /example/:id - update one example`, async () => {
		const response = await agent.put(`/example/${recordId}`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
	})

	it(`DELETE /example/:id - destroy one example`, async () => {
		const response = await agent.delete(`/example/${recordId}`)
		expect(response.statusCode).toBe(200)
	})
})

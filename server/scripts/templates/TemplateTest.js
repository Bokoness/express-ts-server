import request from "supertest"
import "dotenv/config"
import dummy from "mongoose-dummy"
import Template from "../models/TemplateModel.js"

const baseURL = `http://localhost:${process.env.PORT}`

describe("Testing Template model", () => {
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

	//Creating dummy template using mongoose schema
	let record = dummy(Template, {
		returnDate: true,
	})

	it("POST /template - store a new template", async () => {
		const response = await agent.post("/template/").send(record)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
		recordId = response.body._id
	})

	it(`GET /template/:id - show template`, async () => {
		const response = await agent.get(`/template/${recordId}`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
	})

	it(`GET /template/ - index templates`, async () => {
		const response = await agent.get(`/template`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
		expect(response.body).toBeInstanceOf(Array)
	})

	it(`UPDATE /template/:id - update one template`, async () => {
		const response = await agent.put(`/template/${recordId}`)
		expect(response.statusCode).toBe(200)
		expect(response.body._id).not.toBeNull()
	})

	it(`DELETE /template/:id - destroy one template`, async () => {
		const response = await agent.delete(`/template/${recordId}`)
		expect(response.statusCode).toBe(200)
	})
})

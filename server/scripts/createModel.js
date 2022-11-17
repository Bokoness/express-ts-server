import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from "url"

const { dirname } = path

const __dirname = dirname(fileURLToPath(import.meta.url))

const capitalize = str => {
	str = str.toLowerCase()
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const validators = {
	notEmpty: async input => {
		console.log(input)
		if (!input) return "y/n only"
		return true
	},
	isNumber: async input => {
		const reg = new RegExp(/^\d+$/)
		if (!reg.test(input)) return "only numbers"
		return true
	},
}

const modelQues = [
	{
		name: "modelName",
		type: "input",
		message: "Enter the model name",
		validate: validators.notEmpty,
	},
]

const createSchema = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateSchema.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(
		`${basepath}/models/schemas/${name}Schema.js`,
		template,
		"utf-8"
	)
	console.log(chalk.green(`${name} schema created`))
}

const createModel = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateModel.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(`${basepath}/models/${cname}Model.js`, template, "utf-8")
	console.log(chalk.green(`${name} model created`))
}

const createPolicy = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplatePolicy.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(`${basepath}/policies/${cname}Policy.js`, template, "utf-8")
	console.log(chalk.green(`${name} policy created`))
}

const createController = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateController.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(
		`${basepath}/controllers/${cname}Controller.js`,
		template,
		"utf-8"
	)
	console.log(chalk.green(`${name} controller created`))
}

const createRouter = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateRouter.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(`${basepath}/routes/${name}Routes.js`, template, "utf-8")
	console.log(chalk.green(`${name} router created`))
}

const createHttp = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateHttp.http"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(`${basepath}/http/${name}.http`, template, "utf-8")
	console.log(chalk.green(`${name} http created`))
}

const createTestingSuit = (name, basepath) => {
	const cname = capitalize(name)
	let template = fs
		.readFileSync(path.join(__dirname, "templates", "TemplateTest.js"))
		.toString()
	template = template.replaceAll("template", name)
	template = template.replaceAll("Template", cname)
	fs.writeFileSync(`${basepath}/test/${name}.test.js`, template, "utf-8")
	console.log(chalk.green(`${name} test suit created`))
}

const createCrud = async () => {
	try {
		const basepath = path.join(__dirname, "..")
		const crudAns = await inquirer.prompt(modelQues)
		const model = crudAns.modelName.toLowerCase()
		const cname = capitalize(model)
		createSchema(model, basepath)
		createModel(model, basepath)
		createPolicy(model, basepath)
		createController(model, basepath)
		createRouter(model, basepath)
		createHttp(model, basepath)
		createTestingSuit(model, basepath)
		console.log(chalk.blue(`${cname} model created completely`))
		console.log(
			chalk.blue(`Please import ${model}Routes.js into /routes/routes.js file`)
		)
		console.log(
			chalk.blue(`Please modify ${cname}Schema.js and add the wanted field`)
		)
	} catch (e) {
		console.log(`something bad happend, ${e}`)
	}
}

createCrud()

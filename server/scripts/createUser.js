import mongoose from 'mongoose'
import inquirer from 'inquirer'
import chalk from 'chalk'
import User from '../models/UserModel.js'

const validators = {
  notEmpty: async (input) => {
    console.log(input)
    if (!input) return 'y/n only'
    return true
  },
  isNumber: async (input) => {
    const reg = new RegExp(/^\d+$/)
    if (!reg.test(input)) return 'only numbers'
    return true
  },
}

const userTypeQues = [
  {
    name: 'type',
    type: 'list',
    choices: [
      {
        name: 'admin',
        value: 0,
      },
      {
        name: 'regular user',
        value: 1,
      },
    ],
  },
]

const ques = [
  {
    name: 'fullName',
    type: 'input',
    message: 'Full Name?',
    validate: validators.notEmpty,
    default: 'Admin',
  },
  {
    name: 'email',
    type: 'input',
    message: 'Email?',
    validate: validators.notEmpty,
    default: 'admin@gmail.com',
  },
  {
    name: 'phone',
    type: 'input',
    message: 'phone?',
    validate: validators.notEmpty,
    default: '0500000000',
  },
]

const passwordQues = [
  {
    name: 'password',
    type: 'input',
    message: 'password',
    default: '321123',
    validate: validators.notEmpty,
  },
]

const createCrud = async () => {
  try {
    const user = {}
    const userType = await inquirer.prompt(userTypeQues)
    user.role = userType.type
    const crudAns = await inquirer.prompt(ques)
    user.fullName = crudAns.fullName
    user.email = crudAns.email
    user.phone = crudAns.phone
    console.log(user)
    if (user.role < 5) {
      const passAns = await inquirer.prompt(passwordQues)
      user.password = passAns.password
    }
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    })
    await User.create(user)
    console.log(chalk.green(`${user.fullname} isAdded!`))
    process.exit()
  } catch (e) {
    console.log(chalk.red(`Something bad happend...\n ${e}}`))
    process.exit()
  }
}

createCrud()

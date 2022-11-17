import chalk from 'chalk'

class ErrorService {
  static errors = {
    generalError: {
      err: 'Something went wrong',
      he: 'משהו השתבש',
      status: 500,
    },
    notFound: {
      err: 'Not found',
      he: 'לא נמצא',
      status: 404,
    },
    missingDetails: {
      err: 'Some details are missing',
      he: 'פרטים חסרים',
      status: 400,
    },
    wrongDetails: {
      err: 'Wrong Details',
      he: 'פרטים שגויים',
      status: 400,
    },
    auth: {
      emailExists: { err: 'Email is taken', he: 'אימייל בשימוש', status: 401 },
      userExists: {
        err: 'User already exists',
        he: 'משתמש קיים במערכת',
        status: 400,
      },
      badCreds: { err: 'Bad details', he: 'פרטים שגויים', status: 401 },
      unauthorized: { err: 'Unauthorized', he: 'לא מורשה', status: 401 },
      notFound: { err: 'Not found', he: 'לא נמצא', status: 404 },
    },
  }

  static logError(routeName, msg) {
    const errorFrom = `ERROR from ${routeName}: `
    console.log(chalk.red(errorFrom, msg))
    return msg
  }

  static logSuccess(routeName, msg) {
    const successFrom = `SUCCESS from: ${routeName}`
    console.log(chalk.green(successFrom, msg))
    return msg
  }

  /**
	 * Create Error - print to the console and create error object to send to the client
	 * @param {*} where - the name of the function in server that the error occured
	 * @param {*} errMsg - services.erros object, that contains the error in hebrew / english
	 * @param {*} res - express response object
	 */
  static createError(where, errMsg, res) {
    errMsg.clapErr = true
    this.logError(where, errMsg.err)
    return res.status(errMsg.status).send(errMsg)
  }
}

export default ErrorService

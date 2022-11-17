import Controller from './BaseController.js'
import ExamplePolicy from '../policies/ExamplePolicy.js'
import Example from '../models/ExampleModel.js'

class ExampleController extends Controller {
  constructor() {
    super('example', Example, ExamplePolicy)
  }
}

export default ExampleController

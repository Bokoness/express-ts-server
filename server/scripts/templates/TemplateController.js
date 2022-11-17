import Controller from './BaseController.js'
import TemplatePolicy from '../policies/TemplatePolicy.js'
import Template from '../models/TemplateModel.js'

class TemplateController extends Controller {
  constructor() {
    super('template', Template, TemplatePolicy)
  }
}

export default TemplateController

import _ from 'lodash'
import UserPolicy from "../policies/UserPolicy.js"
import User from '../models/UserModel.js'
import Controller from "./BaseController.js"

class UserController extends Controller {
  modifableValues = []

  constructor() {
		super('user', User, UserPolicy)
  }
}

export default UserController

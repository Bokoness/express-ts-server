import _ from 'lodash'

class BaseModel {
  /**
   * BaseModel Mongoose parent model
   * @param {Array} createValues list of key values to create instance
   * @param {Array} updateValues list of key values to update instance
   */
  constructor(createValues = [], updateValues = []) {
    this.updateValues = updateValues
    this.createValues = createValues === '*' ? updateValues : createValues
  }

  /**
   * index all records
   * @param {Object} filter the filter
   * @returns {Array<Object>} the array of records
   */
  static async index(filter = {}) {
    return this.find(filter)
  }

  /**
   * show - finds a single record
   * @param {ObjectId} id the record id
   * @returns {Object} mongoose record
   */
  static async show(id) {
    return this.findById(id)
  }

  /**
   * store a single record
   * @param {Object} body the body of the record
   * @returns {ObjectId} the new record id
   */
  static async store(body) {
    return this.create(this.pick(body, this.createValues))
  }

  /**
   * update a single record
   * @param {ObjectId} id the record id
   * @param {Object} updates the updates of the record
   * @returns {Object} the updated record
   */
  static async update(id, body) {
    const result = await this.findByIdAndUpdate(
      id,
      {
        $set: this.pick(body, this.updateValues),
      },
      { new: true },
    )
    return result
  }

  /**
   * destroy a single record
   * @param {ObjectId} id the record id
   */
  static async destroy(id) {
    const result = await this.findByIdAndDelete(id)
    return result
  }

  /**
   * Replicates a single record
   * @param {ObjectId} id the wanted record's id
   * @returns {Object} the replicated record
   */
  static async replicate(id) {
    const parent = await this.findById(id)
    const replicatedData = { ...parent._doc }
    delete replicatedData._id
    const newRecord = await this.create(replicatedData)
    return newRecord
  }

  /**
   * Picks modifable values body
   * @param {*} req the request body
   * @returns
   */
  static pick(body, picks) {
    if (body._id) delete body._id // user can't change _id
    if (!picks || !picks.length) return body
    return _.pick(body, picks)
  }
}

export default BaseModel

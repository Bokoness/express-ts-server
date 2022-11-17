import mongoose from 'mongoose'
import templateSchema from './schemas/templateSchema.js'
import BaseModel from './BaseModel.js'

class TemplateClass extends BaseModel {
  constructor() {
    super([], [])
  }
}

templateSchema.loadClass(TemplateClass)

export default mongoose.model('template', templateSchema)

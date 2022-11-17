import mongoose from 'mongoose'

const { Schema } = mongoose

const exampleSchema = new Schema({
  name: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
})

export default exampleSchema

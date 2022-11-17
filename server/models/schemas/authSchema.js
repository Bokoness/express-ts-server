import mongoose from 'mongoose'
import dayjs from 'dayjs'

const { Schema } = mongoose
const { Types } = Schema
const cookieDays = process.env.COOKIE_DAYS || 7

const authSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'user', required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: dayjs().add(cookieDays, 'd'),
    },
  },
  { timestamps: true },
)

export default authSchema

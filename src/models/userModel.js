import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User

import mongoose, { Schema } from 'mongoose'

const busSchema = new Schema(
  {
    busName: {
      type: String,
      required: true,
      lowercase: true,
    },
    busNumber: {
      type: String,
    },
    totalSeat: {
      type: Number,
      required: true,
    },
    route: {
      departure: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
    },
    busSchedule: [
      {
        date: {
          type: Date,
        },
        time: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
)

const Bus = mongoose.model('Bus', busSchema)

export default Bus

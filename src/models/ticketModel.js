import mongoose, { Schema } from 'mongoose'

const ticketSchema = new Schema(
  {
    ticketNumber: {
      type: String,
    },
    bus: {
      type: mongoose.Types.ObjectId,
      ref: 'Bus',
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    travelTime: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket

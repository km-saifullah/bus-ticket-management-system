import apiResponse from 'quick-response'
import Ticket from '../../models/ticketModel.js'
import Bus from '../../models/busModel.js'
import { generateString } from '../../utils/generateString.js'

// @desc:  create a ticket
// @route: POST /api/v1/tickets
const createTicket = async (req, res) => {
  try {
    const { bus, numberOfSeats, travelDate, travelTime } = req.body
    console.log(numberOfSeats, typeof numberOfSeats)

    const busFound = await Bus.findById({ _id: bus })
    console.log(busFound.totalSeat)
    if (!busFound) {
      return res.status(404).json(apiResponse(404, 'bus not found'))
    }

    // check bus schedule is available or not
    const isScheduleAvailable = busFound.busSchedule.some(
      (schedule) =>
        schedule.date.getTime() === new Date(travelDate).getTime() &&
        schedule.time === travelTime
    )
    if (!isScheduleAvailable) {
      return res
        .status(400)
        .json(apiResponse(400, 'bus schedule is not available'))
    }

    // check bus seat is available or not
    if (busFound.totalSeat < numberOfSeats) {
      return res
        .status(400)
        .json(apiResponse(400, 'this bus does not have empty seat'))
    }

    // decrease the bus seat
    busFound.totalSeat -= numberOfSeats
    await busFound.save()

    const ticketNumber = generateString()
    let eachTicketPrice = 350
    let totalPrice = Number(eachTicketPrice * numberOfSeats)
    const ticket = await Ticket.create({
      ticketNumber,
      bus,
      numberOfSeats,
      travelDate,
      travelTime,
      price: totalPrice,
    })

    return res
      .status(201)
      .json(apiResponse(201, 'ticket creation done', ticket))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default createTicket

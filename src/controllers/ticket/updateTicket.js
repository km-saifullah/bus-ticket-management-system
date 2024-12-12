import apiResponse from 'quick-response'
import Ticket from '../../models/ticketModel.js'
import Bus from '../../models/busModel.js'

// @desc:  update a ticket
// @route: PUT /api/v1/tickets/:id
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params
    const { bus, numberOfSeats, travelDate, travelTime } = req.body

    const ticketFound = await Ticket.findById({ _id: id })
    if (!ticketFound) {
      return res
        .status(404)
        .json(apiResponse(404, 'ticket does not exist with this id'))
    }

    const busFound = await Bus.findById(bus || ticketFound.bus)
    if (!busFound) {
      return res.status(404).json(apiResponse(404, 'bus does not exist'))
    }

    const isScheduleAvailable = busFound.busSchedule.some(
      (schedule) =>
        schedule.date.getTime() ===
          new Date(travelDate || ticketFound.travelDate).getTime() &&
        schedule.time === (travelTime || ticketFound.travelTime)
    )
    if (!isScheduleAvailable) {
      return res
        .status(400)
        .json(apiResponse(400, 'bus schedule is not available'))
    }

    // increase the seat number
    busFound.totalSeat += ticketFound.numberOfSeats
    await busFound.save()

    // check seat is available or not
    const seatAvaialble = numberOfSeats || ticketFound.numberOfSeats
    if (busFound.totalSeat < seatAvaialble) {
      return res
        .status(400)
        .json(apiResponse(400, 'this bus does not have empty seat'))
    }

    // decrease the bus seat
    busFound.totalSeat -= seatAvaialble
    await busFound.save()

    // update ticket info
    ticketFound.bus = bus || ticketFound.bus
    ticketFound.numberOfSeats = seatAvaialble
    ticketFound.travelDate = travelDate || ticketFound.travelDate
    ticketFound.travelTime = travelTime || ticketFound.travelTime
    ticketFound.price = Number(seatAvaialble * 350)
    await ticketFound.save()

    return res
      .status(200)
      .json(apiResponse(200, 'ticket info updated', ticketFound))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default updateTicket

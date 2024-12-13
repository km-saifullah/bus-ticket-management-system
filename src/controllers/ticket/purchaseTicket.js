import apiResponse from 'quick-response'
import Ticket from '../../models/ticketModel.js'

// @desc:  purchase a ticket
// @route: POST /api/v1/tickets/purchase
const purchaseTicket = async (req, res) => {
  try {
    const { ticketId, numberOfSeats } = req.body

    if (!ticketId || !numberOfSeats) {
      return res
        .status(400)
        .json(apiResponse(400, 'ticketId and numberOfSeats are required'))
    }

    if (numberOfSeats <= 0) {
      return res
        .status(400)
        .json(apiResponse(400, 'numberOfSeats must be greater than 0'))
    }

    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      return res
        .status(404)
        .json(apiResponse(404, 'ticket not exist with this id'))
    }

    if (ticket.isBooked) {
      return res.status(400).json(apiResponse(400, 'ticket has already booked'))
    }

    if (ticket.numberOfSeats < numberOfSeats) {
      return res
        .status(400)
        .json(
          apiResponse(400, `only ${ticket.numberOfSeats} seats are available`)
        )
    }

    ticket.numberOfSeats -= numberOfSeats
    ticket.isBooked = ticket.numberOfSeats === 0
    await ticket.save()

    return res
      .status(200)
      .json(apiResponse(200, 'ticket booked successfully', ticket))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default purchaseTicket

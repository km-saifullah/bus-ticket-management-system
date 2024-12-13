import apiResponse from 'quick-response'
import Ticket from '../../models/ticketModel.js'

// @desc:  get all available tickets
// @route: GET /api/v1/tickets
const getAvailableTickets = async (req, res) => {
  try {
    const { travelDate, travelTime } = req.query

    if (!travelDate || !travelTime) {
      return res
        .status(400)
        .json(apiResponse(400, 'travelDate and travelTime are required'))
    }

    const queryDate = new Date(travelDate)
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json(apiResponse(400, 'invalid travelDate format'))
    }

    const query = {
      travelDate: queryDate,
      travelTime: travelTime,
      isBooked: false,
    }

    const tickets = await Ticket.find(query)

    if (!tickets.length) {
      return res
        .status(404)
        .json(
          apiResponse(
            404,
            'no available tickets for the specified date and time'
          )
        )
    }

    return res.status(200).json(apiResponse(200, 'available tickets', tickets))
  } catch (error) {
    return res.status(500).json(apiResponse(500, 'server error', error.message))
  }
}

export default getAvailableTickets

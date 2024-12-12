import apiResponse from 'quick-response'
import Ticket from '../../models/ticketModel.js'

// @desc:  delete a ticket
// @route: DELETE /api/v1/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params

    const ticketFound = await Ticket.findById({ _id: id })
    if (!ticketFound) {
      return res
        .status(404)
        .json(apiResponse(404, 'ticket is not exist with this id'))
    }

    await Ticket.findByIdAndDelete({ _id: id })
    return res.status(200).json(apiResponse(200, 'ticket deletion done'))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default deleteTicket

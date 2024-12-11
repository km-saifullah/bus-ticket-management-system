import apiResponse from 'quick-response'
import Bus from '../../models/busModel.js'
import { generateString } from '../../utils/generateString.js'

// @desc:  create a bus
// @route: POST /api/v1/buses
const createBus = async (req, res) => {
  try {
    const { busName, totalSeat, route, busSchedule } = req.body
    let busNumber = generateString()
    const bus = await Bus.create({
      busName,
      busNumber,
      totalSeat,
      route,
      busSchedule,
    })
    return res.status(201).json(apiResponse(201, 'bus creation done', bus))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default createBus

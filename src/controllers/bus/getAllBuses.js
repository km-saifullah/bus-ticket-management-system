import apiResponse from 'quick-response'
import Bus from '../../models/busModel.js'

// @desc:  get all buses
// @route: GET /api/v1/buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({})
    return res.status(200).json(apiResponse(200, 'all buses', buses))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default getAllBuses

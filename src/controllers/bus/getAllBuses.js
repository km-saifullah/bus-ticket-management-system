import apiResponse from 'quick-response'
import Bus from '../../models/busModel.js'

// @desc:  get all available buses
// @route: GET /api/v1/buses
const getAllBuses = async (req, res) => {
  try {
    const { date, time } = req.query

    if (!date || !time) {
      return res.status(400).json({ message: 'date and time are required' })
    }

    const queryDate = new Date(date)

    if (isNaN(queryDate.getTime())) {
      return res.status(400).json(apiResponse(400, 'invalid date format'))
    }

    const query = {
      totalSeat: { $gt: 0 },
      busSchedule: {
        $elemMatch: {
          date: queryDate,
          time: time,
        },
      },
    }

    const buses = await Bus.find(query)

    if (!buses.length) {
      return res
        .status(404)
        .json({ message: 'no buses available for the specified schedule' })
    }

    // res.status(200).json(buses)
    return res.status(200).json(apiResponse(200, 'available buses', buses))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default getAllBuses

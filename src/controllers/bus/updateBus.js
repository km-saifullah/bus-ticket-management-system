import apiResponse from 'quick-response'
import Bus from '../../models/busModel.js'

// @desc:  update a bus info
// @route: PUT /api/v1/buses/:id
const updateBus = async (req, res) => {
  try {
    const { id } = req.params
    const { busName, totalSeat, route, busSchedule } = req.body

    const busFound = await Bus.findById({ _id: id })
    if (!busFound) {
      return res.status(404).json(apiResponse(404, 'bus does not found'))
    }

    busFound.busName = busName || busFound.busName
    busFound.totalSeat = totalSeat || busFound.totalSeat
    busFound.route = route || busFound.route
    busFound.busSchedule = busSchedule || busFound.busSchedule

    const bus = await busFound.save()
    return res.status(200).json(apiResponse(200, 'bus info updated', bus))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default updateBus

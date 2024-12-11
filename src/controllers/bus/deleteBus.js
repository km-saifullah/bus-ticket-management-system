import apiResponse from 'quick-response'
import Bus from '../../models/busModel.js'

// @desc:  delete a bus
// @route: DELETE /api/v1/buses/:id
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params
    const bus = await Bus.findById({ _id: id })
    if (!bus) {
      return res
        .status(404)
        .json(apiResponse(404, 'bus is not exist with this id'))
    }
    await Bus.findByIdAndDelete({ _id: id })
    return res.status(200).json(apiResponse(200, 'bus deletion done'))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default deleteBus

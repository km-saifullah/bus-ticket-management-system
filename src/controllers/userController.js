import apiResponse from 'quick-response'
import User from '../models/userModel.js'

// @desc:  create a user
// @route: POST /api/v1/users
const createUser = async (req, res) => {
  try {
    console.log('user controller')
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'server error', { error: error.message }))
  }
}

export { createUser }

import apiResponse from 'quick-response'
import User from '../../models/userModel.js'

// @desc:  logout user
// @route: POST api/v1/auth/logout
const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    user.token = undefined
    await user.save()
    return res.status(200).json(apiResponse(200, 'logout successful'))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default logout

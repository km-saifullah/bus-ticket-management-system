import apiResponse from 'quick-response'
import User from '../../models/userModel.js'
import { signToken } from '../../utils/signToken.js'

// @desc:  login user
// @route: POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email && !password) {
      return res
        .status(400)
        .json(apiResponse(400, 'please provide email and password'))
    }

    const user = await User.findOne({ email })
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json(apiResponse(401, 'incorrect email or password'))
    }

    const token = signToken(user._id)
    const loggedInUser = { user, token }
    return res
      .status(200)
      .json(apiResponse(200, 'user login done', loggedInUser))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default login

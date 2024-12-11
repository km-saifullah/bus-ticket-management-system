import apiResponse from 'quick-response'
import User from '../../models/userModel.js'

// @desc:  register a user
// @route: POST /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, role } = req.body
    let userRole = role ? role : 'user'

    const userFound = await User.findOne({ email })
    if (userFound) {
      return res
        .status(409)
        .json(apiResponse(409, 'user already exists with this email address'))
    }

    const newUser = {
      fullName,
      phoneNumber,
      email,
      password,
      role: userRole,
    }
    const user = await User.create(newUser)
    return res.status(201).json(apiResponse(201, 'user creation done', user))
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, 'server error', { error: error.message }))
  }
}

export default register

import apiResponse from 'quick-response'

let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const registrationValidation = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body
    if (!fullName && fullName === '') {
      return res.status(400).json(apiResponse(400, 'fullName is required'))
    } else if (!phoneNumber && phoneNumber === '') {
      return res.status(400).json(apiResponse(400, 'phonenumber is required'))
    } else if (!email && email === '') {
      return res.status(400).json(apiResponse(400, 'email is required'))
    } else if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(apiResponse(400, 'enter a valid email address'))
    } else if (!password && password === '') {
      return res.status(400).json(apiResponse(400, 'password is required'))
    } else if (password.length < 8) {
      return res
        .status(400)
        .json(apiResponse(400, 'password should be 8 characters long'))
    } else {
      next()
    }
  } catch (error) {
    return res.status(500).json(apiResponse(500, 'server error', error.message))
  }
}

export default registrationValidation

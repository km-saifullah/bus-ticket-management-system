import apiResponse from 'quick-response'

export const adminAuth = (req, res, next) => {
  try {
    const { role } = req.user

    if (role !== 'admin') {
      return res.status(403).json(apiResponse(403, 'unauthorized access'))
    }

    next()
  } catch (error) {
    return res.status(500).json(apiResponse(500, 'invalid role', error.message))
  }
}

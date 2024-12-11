import jwt from 'jsonwebtoken'
import { tokenExpires, tokenSecret } from '../config/index.js'

export const signToken = (id) => {
  return jwt.sign({ id }, tokenSecret, {
    expiresIn: tokenExpires,
  })
}

import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import userModel from './user.model'
import userService from './user.service'
import createUserToken from '@/utils/auth/createUserToken'


async function userLogin(req: Request, res: Response, next: NextFunction) {
  const { login, password } = req.body
  try {
    const user = await userService.userLoginPrisma(login)

    if (!user) return res.sendStatus(404)

    // if (!compareWithHash(password, user.password)) return res.sendStatus(403)

    const token = createUserToken(user)

    const userView = userModel(user)

    return res.json({ user: userView, token: token })
  } catch (error) {
    return next(error)
  }
}



async function userGet(req: Request, res: Response, next: NextFunction) {
  const id = req.auth?.user?.id
  try {
    // Get current user
    const user = await userService.userGetPrisma(id)
    if (!user) return res.sendStatus(401)

    return res.json(userModel(user))
  } catch (error) {
    return next(error)
  }
}

export default {
  userLogin, userGet
}

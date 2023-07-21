/* eslint-disable camelcase */
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUsers = async (_, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: `ERROR: ${error.message}` })
  }
}

export const createUser = async (_, res) => {
  try {
    const { username, mail, first_name, last_name, password, confirm_password, rol } = _.body
    if (password === confirm_password) {
      const hashedPassword = bcrypt.hashSync(password, 10)

      await User.create({
        username, mail, first_name, last_name, password: hashedPassword, rol
      })

      return res.status(201).json({ message: 'User created' })
    } else {
      return res.status(422).json({ message: 'Password dont match' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (_, res) => {
  const { mail, password } = _.body

  if (!mail || !password) return res.status(422).json({ message: 'Invalid Fields' })

  const user = await User.findOne({ where: { mail } })

  if (!user) return res.status(401).json({ message: 'Email or password is incorrect' })

  const match = bcrypt.compareSync(password, user.password)

  if (!match) return res.status(401).json({ message: 'Email or password is incorrect' })

  const accessToken = jwt.sign(
    {
      id: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1800s'
    }
  )

  const refreshToken = jwt.sign(
    {
      id: user.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )

  user.refresh_token = refreshToken
  await user.save()

  res.cookie('refresh_token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
  res.json({ access_token: accessToken })
}

// TODO

export const getOneUser = async (_, res) => {
}

export const logoutUser = async (_, res) => {
}

export const refreshToken = async (_, res) => {
}

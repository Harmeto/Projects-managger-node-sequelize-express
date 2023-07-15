/* eslint-disable camelcase */
import { User } from '../models/User.js'

export const getUser = async (_, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: `ERROR: ${error.message}` })
  }
}

export const createUser = async (_, res) => {
  try {
    const { username, mail, first_name, last_name, password, confirm_password } = _.body
    if (password === confirm_password) {
      await User.create({
        username, mail, first_name, last_name, password
      })

      return res.status(201).json({ message: 'User created' })
    } else {
      return res.status(422).json({ message: 'Password dont match' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// try {
//   const { name, priority, description } = _.body

//   await Project.create({
//     name, description, priority
//   })

//   res.status(201).json({ message: `Project ${name} created` })
// } catch (error) {
//   res.status(500).json({ message: `ERROR: ${error.message}` })
// }

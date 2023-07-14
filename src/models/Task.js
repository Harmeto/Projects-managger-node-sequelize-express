import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { isString } from '../utils/validators.js'

export const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  paranoid: true
})

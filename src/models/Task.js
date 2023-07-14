import { sequelize } from '../database/database.js'
import { isString } from '../utils/validators.js'
import { DataTypes } from 'sequelize'

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
  description: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  onProgress: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true
})

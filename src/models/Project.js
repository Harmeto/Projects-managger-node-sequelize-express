import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Task } from './Task.js'
import { isString } from '../utils/validators.js'

export const Project = sequelize.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isNumeric: true,
      isInt: true
    }
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  },
  priority: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true,
      isInt: true
    }
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      isString
    }
  }
}, { paranoid: true })

Project.hasMany(Task, {
  foreingKey: 'projectId',
  sourceKey: 'id'
})

Task.belongsTo(Project, {
  foreingKey: 'projectId',
  target: 'id'
})

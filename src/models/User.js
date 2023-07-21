import { sequelize } from '../database/database.js'
import { isString } from '../utils/validators.js'
import { DataTypes } from 'sequelize'

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: {
        args: [['user', 'admin']],
        msg: 'El campo "rol" solo puede ser "user" o "admin"'
      }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isString,
      notNull: true
    }
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: true
    }
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString,
      notNull: true
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString,
      notNull: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true
    }
  },
  full_name: {
    type: DataTypes.VIRTUAL,
    get () {
      return `${this.first_name} ${this.last_name}`
    }
  }
},
{
  hooks: {
    beforeCreate: async (user, options) => {
      if (user.rol === 'admin') {
        const adminCount = await User.count({ where: { rol: 'admin' } })
        if (adminCount > 0) throw new Error('Solo puede haber un usuario tipo admin')
      }
    }
  },
  timestamps: true,
  paranoid: true
}
)

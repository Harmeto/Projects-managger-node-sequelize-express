import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  'projectsdb',
  'postgres',
  'folk78',
  {
    host: 'localhost', dialect: 'postgres'
  }
)

// example db
// user: 'postgres',
// password: 'folk78',
// host: 'localhost',
// database: 'postgres',
// port: '5432',

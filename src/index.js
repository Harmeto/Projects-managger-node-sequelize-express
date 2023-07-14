import app from './app.js'
import { sequelize } from './database/database.js'

const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola Mundo!')
});

(async function () {
  try {
    await sequelize.sync({ force: false })
    console.log('conected to db')
    app.listen(PORT, () => console.log(`Server runnign at localhost:${PORT}`))
  } catch (error) {
    console.log(error)
  }
})()

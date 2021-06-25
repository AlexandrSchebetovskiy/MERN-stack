const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const PORT = config.get('PORT') || 5000

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t/', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
  app.use('/', expres.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => {
      console.log(`Sever is running on PORT: ${PORT}...`);
    })
  } catch (e) {
    console.log('Server Error:', e)
    process.exit(1)
  }
}
start()


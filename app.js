const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const Credit = require('./model/Credit')
var credits =[
  { 
    
    name: "", 
    secondName: "",
    departament: "",
    value: 0}
]
app.use(express.json())
app.use(express.json({ extended: true }))
app.use(bodyParser.json())


// POST
app.post('/api/credits', async (req, res) => {
  try {
    console.log("req.body  BACKEND", req.body)
    
    const {
      name, 
      secondName,
      departament,
      value
      } =  req.body
    
    const credit = new Credit({
      name, 
      secondName,
      departament,
      value
        })
   
    console.log("credit BACKEND", credit)
   
    await credit.save()
    return
    res
      .status(201)
      .json({ message: "Запись о выданной ссуде создана и успешно сохранена" })
   return
    res.status(201).json({ credit })
    
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 1" })
  }
})  

// GET ALL
app.get('/api/credits',async (req, res) => {
  try {
    const credits = await Credit.find({})
     
    return res.json(credits)
  } catch (e) {
     return res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 2" })
  }
})

// DELETE
app.delete('/api/credits/:id', async (req, res) => {
  try {
    const credit = await Credit.deleteOne(req._id)
    return res.json(credit)
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Что-то пошло не так, попробуйте снова 3" })
  }
})

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://app:qwerty123@cluster0.79jgz.mongodb.net/APPFULLREST?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    app.use(express.static(path.resolve(__dirname, 'client')))
   
    app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
    })
     } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

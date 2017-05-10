const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')
const users = require('./routes/users')
const sensors = require('./routes/sensors')
const events =require('./routes/events')
const app = express()
const port = 3500;

//connect to db
mongoose.connect(config.database)
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database '+ config.database)
});
mongoose.connection.on('error', (err)=>{
  console.log(err)
});



app.use(cors())
//set static folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'client')))

//Body parser
app.use(bodyParser.json())

//Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use('/users', users)
app.use('/sensors',sensors)
app.use('/events',events)

app.get('/', (req, res)=>{
  res.render('index.html')
});
//start server
app.listen(port, ()=>{
  console.log('Server started on port '+port)
});

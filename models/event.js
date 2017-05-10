const mongoose = require('mongoose');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  name:{
    type: String
  },
  // email:{
  //   type: String
  // },
  start:{
    type: String
  },
  end:{
    type: String
  }
})

const Event = module.exports = mongoose.model('Event',UserSchema);

module.exports.addEvent = (newEvent, callback)=>{
      newEvent.save(callback)
    }

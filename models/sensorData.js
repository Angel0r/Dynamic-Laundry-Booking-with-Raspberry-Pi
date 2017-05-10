const mongoose = require('mongoose');


const SensorSchema = mongoose.Schema({
  Light:{
    type: Boolean
  }
})

const Sensors = module.exports = mongoose.model('Sensors',SensorSchema);
module.exports.newSensorDat = (sensor, callback)=>{
      sensor.save(callback)
    }


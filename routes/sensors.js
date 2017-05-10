const express = require('express');
const router = express.Router();
const EVENT = require('../models/event')
const SENSOR_DATA = require('../models/sensorData')
const config = require('../config/database')
 
var vibrations = false
var button1 = false
var isInUse = true
var time = new Date().getTime()
var openForBooking= false
var isBooked = false
var currentUser = {
  name:"",
  id: ""
}

var Gpio = require('onoff').Gpio,
  led = new Gpio(18, 'out'),
  button = new Gpio(17, 'in', 'rising');

//--------------------------------

button.watch(function (err, value) {
	if (err) {throw err;}

	led.writeSync(value)
	if (value === 1) {
        	button1 = true
        	console.log(button1)
		current()
	}
return button1;
})
process.on('SIGINT', function () {
  led.unexport();
  button.unexport();
})

//if(button1){
//  console.log('button press')
//  current()
//}
//--------------------------------
router.get('/roomStatus',(req, res, next) => {
  var curTime = new Date().toISOString()
  EVENT.find({},(err, events)=> {
    for (var i=0; i<events.length; i++){
       if(((Date.parse(events[i].end)-Date.parse(curTime))/(1000*60*60)%24)<0){
        remove(events[i])
      }
	if(curTime>events[i].start && curTime<events[i].end){
      		isBooked = true
      		timeToEnd= (Date.parse(events[i].end)-Date.parse(curTime))/(1000*60*60)%24
	  }}
        SENSOR_DATA.find({},(err,data)=>{
          console.log(data);
          console.log(data.length);
          console.log(data[0].Light);

    if(data[0].Light === false && !isBooked){
        isInUse = false
      }
    if(data[0].Light === false && isBooked && timeToEnd>1.5){
        isInUse = true
      }
    if(data[0].Light === true && isBooked){
        isInUse = true
      }
    if (button1){
	isInUse = false
      }	
	console.log(isInUse);
      return res.json(isInUse)
    })
})
})
function remove(eve){
  EVENT.find({ _id:eve._id }).remove( (err, callback)=>{
  console.log('Passed event removed')
  })
}
function current(){
  var curTime = new Date().toISOString()
  EVENT.find({},(err, events)=> {
    for (var i=0; i<events.length; i++){
      if(curTime>events[i].start && curTime<events[i].end){
          currentUser.name = events[i].name
          currentUser.id = events[i]._id
          this.isInUse = true
          console.log(currentUser.name);
            EVENT.find({ _id:currentUser.id }).remove( (err, callback)=>{
            console.log('Event removed due to button press from current user')
            console.log('Appartment number:',currentUser.name)
            console.log('Event id:',currentUser.id)
            })
      }}
  })
}

module.exports = router

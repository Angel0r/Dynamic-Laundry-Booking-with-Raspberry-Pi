const express = require('express')
const router = express.Router()
const EVENT = require('../models/event')
const config = require('../config/database')
//register (accept post requests)
var nextUser = {
  name:"",
  id: ""
}

router.post('/addEvent', (req, res, next)=>{
if(req.body.starTime=="undefinedTundefinedZ"||req.body.endTime=="undefinedTundefinedZ"){
    res.json({success: false, msg:'Please fill in the start, end times, and name fields'})
  }else{

var newEvent = new EVENT({
    name: req.body.name,
    start: req.body.starTime,
    end: req.body.endTime
  })

  EVENT.find({},(err, events)=>{
    for(var i =0;i<events.length;i++){
      if(newEvent.start.substr(0,10)===events[i].start.substr(0,10))
        if(newEvent.start.substr(11,2)===events[i].start.substr(11,2))
          if(newEvent.start.substr(13,2)===events[i].start.substr(13,2)){
            return res.send({msg:'Duplicate event: Please select a different time period'})
          }
    }
  EVENT.addEvent(newEvent, (err, registered)=>{
    if(err){
      res.json({success: false, msg:'Failed to register new event',err:err})
    } else
      res.json({success: true, msg:'Event registered!', registered:registered})
    })
  })
}
})


router.get('/getAll',(req, res, next) => {
  EVENT.find({},(err, events)=> {
    var response = new Array()
    var  id, title, start ,end
    for(var i = 0;i<events.length;i++){
      id = events[i].id
      title= events[i].name
      start=events[i].start
      end=events[i].end
      response.push({'id':id,'title':title,'start':start,'end':end})}
     res.json(response)
  })
})

router.post('/deleteOne',(req,res,next) =>{
  var eventID = req.body.eventID
  console.log(eventID)
  EVENT.find({ _id:eventID }).remove( (err, callback)=>{

    res.json({callback:callback})
  })
})

router.get('/getNext',(req,res,next) =>{
  var curTime = new Date().toISOString()
  var timeToNext=200
  var chk
  EVENT.find({},(err, events)=> {
    for (var i=0; i<events.length; i++){
	chk = (Date.parse(events[i].end)-Date.parse(curTime))/(1000*60*60)%24
	if(chk > 0) 
		if(chk<timeToNext){
      nextUser.name = events[i].name
      nextUser.id = events[i].id
	timeToNext = chk
    }}
      res.json(nextUser)
  })
})




module.exports = router

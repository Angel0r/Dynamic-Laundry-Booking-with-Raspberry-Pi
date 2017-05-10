import { Component } from '@angular/core'
import {EventsService} from '../../services/events/getEvents.service'
declare var $:any


@Component({
  moduleId: module.id,
  selector: 'calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css'],
  providers:[EventsService]
})



export class CalendarComponent {
public events: any
title:String
start: String
end: String
date: String

  constructor (public getEventsService:EventsService){
        this.getEventsService.getEvents().subscribe(events =>{
         this.events = events
         console.log(this.events)

        $('#calendar_view').fullCalendar({
            events: this.events,
            header: {
                  left:   '',
                  center: 'title',
                  right:  'today prev,next'
                }
              })
        })
      }


      registerEvent(title,start,end,date){
        event.preventDefault()

        if(start ==""||end ==""||date ==""){
          alert('Please select start time and end time')
          return 0;
        } else {

        this.title = title
        this.start=start
        this.end=end
        this.date=date
        let formatedS= this.date+"T"+this.start+"Z"
        let formatedE= this.date+"T"+this.end+"Z"
        var newEvent={
          'name':this.title,
          'starTime':formatedS,
          'endTime':formatedE
        }

      this.getEventsService.addEvent(newEvent).subscribe(res =>{
          let response = res
          alert(response.msg)
      })
    }
   }

 }

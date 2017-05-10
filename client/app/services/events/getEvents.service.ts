import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService{
  constructor (private http:Http){ }

  getEvents(){
    return this.http.get('http://10.2.11.88:3500/events/getAll')
      .map(res => res.json());
  }

  addEvent(newEvent){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.2.11.88:3500/events/addEvent',JSON.stringify(newEvent), {headers: headers})
      .map(res => res.json());
  }
}

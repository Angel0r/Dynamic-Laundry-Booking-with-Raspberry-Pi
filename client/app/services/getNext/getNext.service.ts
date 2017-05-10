import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetNextService{
  constructor (private http:Http){ }

  getNext(){
    return this.http.get('http://10.2.11.88:3500/events/getNext')
      .map(res => res.json());
  }
}

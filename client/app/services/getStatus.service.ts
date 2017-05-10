import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetStatusService{
  constructor (private http:Http){ }

  getStatus(){
    return this.http.get('http://10.2.11.88:3500/sensors/roomStatus')
      .map(res => res.json());
  }
}

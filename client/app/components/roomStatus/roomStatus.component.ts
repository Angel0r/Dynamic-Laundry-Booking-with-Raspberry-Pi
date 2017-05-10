import { Component } from '@angular/core';
import { GetStatusService} from '../../services/getStatus.service'

@Component({
  moduleId: module.id,
  selector: 'roomStatus',
  templateUrl: 'roomStatus.component.html',
  styleUrls: ['roomStatus.component.css'],
  providers:[GetStatusService]
})
export class RoomStatusComponent {
  public status: any;
  public roomStatus: any;

  constructor (private getStatusService:GetStatusService){
      setInterval(() =>
	
	  this.getStatusService.getStatus().subscribe(roomStatus =>{
          this.roomStatus = roomStatus
          if(this.roomStatus===false)
            this.status="Currently not used"
          else
            this.status="Currently in use"
        console.log(roomStatus)    
	}),5000);
          }
}

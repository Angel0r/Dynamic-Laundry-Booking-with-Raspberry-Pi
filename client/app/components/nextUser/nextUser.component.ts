import { Component } from '@angular/core';
import {GetNextService} from '../../services/getNext/getNext.service'

@Component({
  moduleId: module.id,
  selector: 'nextUser',
  templateUrl: 'nextUser.component.html',
  styleUrls: ['nextUser.component.css'],
  providers:[GetNextService]
})
export class NextUserComponent {
nextUser: any

  constructor (public getNextService:GetNextService){
        this.getNextService.getNext().subscribe(response =>{
         this.nextUser = response.name
        })
      }
}

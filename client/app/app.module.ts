import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {NextUserComponent} from './components/nextUser/nextUser.component';
import {HomeComponent} from './components/home/home.component';
import {RoomStatusComponent} from './components/roomStatus/roomStatus.component';


const appRoutes: Routes = [
  {path: '', component:HomeComponent , data: { title: 'Home' }},
  {path: 'login', component: LoginComponent, data: { title: 'Log in' }},
  {path: 'calendar', component: CalendarComponent, data: { title: 'Calendar' }}
];

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  FormsModule,
                  RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,
                  LoginComponent,
                  CalendarComponent,
                  NextUserComponent,
                  HomeComponent,
                  RoomStatusComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

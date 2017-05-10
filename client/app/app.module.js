"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var calendar_component_1 = require("./components/calendar/calendar.component");
var nextUser_component_1 = require("./components/nextUser/nextUser.component");
var home_component_1 = require("./components/home/home.component");
var roomStatus_component_1 = require("./components/roomStatus/roomStatus.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'login', component: login_component_1.LoginComponent, data: { title: 'Log in' } },
    { path: 'calendar', component: calendar_component_1.CalendarComponent, data: { title: 'Calendar' } }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(appRoutes)],
        declarations: [app_component_1.AppComponent,
            login_component_1.LoginComponent,
            calendar_component_1.CalendarComponent,
            nextUser_component_1.NextUserComponent,
            home_component_1.HomeComponent,
            roomStatus_component_1.RoomStatusComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
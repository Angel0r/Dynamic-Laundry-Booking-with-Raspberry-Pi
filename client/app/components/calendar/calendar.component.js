"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var getEvents_service_1 = require("../../services/events/getEvents.service");
var CalendarComponent = (function () {
    function CalendarComponent(getEventsService) {
        var _this = this;
        this.getEventsService = getEventsService;
        this.getEventsService.getEvents().subscribe(function (events) {
            _this.events = events;
            console.log(_this.events);
            $('#calendar_view').fullCalendar({
                events: _this.events,
                header: {
                    left: '',
                    center: 'title',
                    right: 'today prev,next'
                }
            });
            $('#calendar_view').fullCalendar({
                eventAfterRender: function (event, element, view) {
                    $(element).css('width', '50px');
                }
            });
        });
    }
    CalendarComponent.prototype.registerEvent = function (title, start, end, date) {
        event.preventDefault();
        this.title = title;
        this.start = start;
        this.end = end;
        this.date = date;
        var formatedS = this.date + "T" + this.start + "Z";
        var formatedE = this.date + "T" + this.end + "Z";
        var newEvent = {
            'name': this.title,
            'starTime': formatedS,
            'endTime': formatedE
        };
        this.getEventsService.addEvent(newEvent).subscribe(function (res) {
            var response = res;
            alert(response.msg);
        });
    };
    return CalendarComponent;
}());
CalendarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'calendar',
        templateUrl: 'calendar.component.html',
        styleUrls: ['calendar.component.css'],
        providers: [getEvents_service_1.EventsService]
    }),
    __metadata("design:paramtypes", [getEvents_service_1.EventsService])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map
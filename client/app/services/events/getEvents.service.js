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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var EventsService = (function () {
    function EventsService(http) {
        this.http = http;
    }
    EventsService.prototype.getEvents = function () {
        return this.http.get('http://10.2.11.88:3500/events/getAll')
            .map(function (res) { return res.json(); });
    };
    EventsService.prototype.addEvent = function (newEvent) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://10.2.11.88:3500/events/addEvent', JSON.stringify(newEvent), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return EventsService;
}());
EventsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=getEvents.service.js.map

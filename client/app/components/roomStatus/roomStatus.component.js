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
var getStatus_service_1 = require("../../services/getStatus.service");
var RoomStatusComponent = (function () {
    function RoomStatusComponent(getStatusService) {
        var _this = this;
        this.getStatusService = getStatusService;
        this.getStatusService.getStatus().subscribe(function (roomStatus) {
            _this.roomStatus = roomStatus;
            if (_this.roomStatus === false)
                _this.status = "Room is currently not used";
            else
                _this.status = "Room is currently in use";
        });
    }
    return RoomStatusComponent;
}());
RoomStatusComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'roomStatus',
        templateUrl: 'roomStatus.component.html',
        styleUrls: ['roomStatus.component.css'],
        providers: [getStatus_service_1.GetStatusService]
    }),
    __metadata("design:paramtypes", [getStatus_service_1.GetStatusService])
], RoomStatusComponent);
exports.RoomStatusComponent = RoomStatusComponent;
//# sourceMappingURL=roomStatus.component.js.map
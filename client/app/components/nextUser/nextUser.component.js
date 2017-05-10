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
var getNext_service_1 = require("../../services/getNext/getNext.service");
var NextUserComponent = (function () {
    function NextUserComponent(getNextService) {
        var _this = this;
        this.getNextService = getNextService;
        this.getNextService.getNext().subscribe(function (nextUser) {
            _this.nextUser = nextUser.name;
            console.log(nextUser);
        });
    }
    return NextUserComponent;
}());
NextUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'nextUser',
        templateUrl: 'nextUser.component.html',
        styleUrls: ['nextUser.component.css'],
        providers: [getNext_service_1.GetNextService]
    }),
    __metadata("design:paramtypes", [getNext_service_1.GetNextService])
], NextUserComponent);
exports.NextUserComponent = NextUserComponent;
//# sourceMappingURL=nextUser.component.js.map
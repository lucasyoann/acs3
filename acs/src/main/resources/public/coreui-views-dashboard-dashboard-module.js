(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["coreui-views-dashboard-dashboard-module"],{

/***/ "./app/coreui/views/dashboard/dashboard-routing.module.ts":
/*!****************************************************************!*\
  !*** ./app/coreui/views/dashboard/dashboard-routing.module.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
var router_1 = __webpack_require__(/*! @angular/router */ "../../../node_modules/@angular/router/fesm5/router.js");
var dashboard_component_1 = __webpack_require__(/*! ./dashboard.component */ "./app/coreui/views/dashboard/dashboard.component.ts");
var routes = [
    {
        path: '',
        component: dashboard_component_1.DashboardComponent,
        data: {
            title: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
exports.DashboardRoutingModule = DashboardRoutingModule;


/***/ }),

/***/ "./app/coreui/views/dashboard/dashboard.component.ts":
/*!***********************************************************!*\
  !*** ./app/coreui/views/dashboard/dashboard.component.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
    }
    DashboardComponent = __decorate([
        core_1.Component({
            template: "<div class=\"animated fadeIn\">\n    <router-outlet></router-outlet>\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "./app/coreui/views/dashboard/dashboard.module.ts":
/*!********************************************************!*\
  !*** ./app/coreui/views/dashboard/dashboard.module.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm5/core.js");
var dashboard_component_1 = __webpack_require__(/*! ./dashboard.component */ "./app/coreui/views/dashboard/dashboard.component.ts");
var dashboard_routing_module_1 = __webpack_require__(/*! ./dashboard-routing.module */ "./app/coreui/views/dashboard/dashboard-routing.module.ts");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                dashboard_routing_module_1.DashboardRoutingModule
            ],
            declarations: [dashboard_component_1.DashboardComponent]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;


/***/ })

}]);
//# sourceMappingURL=coreui-views-dashboard-dashboard-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["myProfile-myProfile-module"],{

/***/ "./app/myProfile/myProfile-routing.module.ts":
/*!***************************************************!*\
  !*** ./app/myProfile/myProfile-routing.module.ts ***!
  \***************************************************/
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
const core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm2015/core.js");
const router_1 = __webpack_require__(/*! @angular/router */ "../../../node_modules/@angular/router/fesm2015/router.js");
const myProfile_component_1 = __webpack_require__(/*! ./myProfile.component */ "./app/myProfile/myProfile.component.ts");
const route_guard_1 = __webpack_require__(/*! ../auth/route.guard */ "./app/auth/route.guard.ts");
const routes = [
    {
        path: '',
        component: myProfile_component_1.MyProfileComponent,
        canActivate: [route_guard_1.RouteGuard],
        data: {
            title: 'Module myProfile'
        }
    }
];
let MyProfileRoutingModule = class MyProfileRoutingModule {
};
MyProfileRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes)
        ],
        exports: [router_1.RouterModule]
    })
], MyProfileRoutingModule);
exports.MyProfileRoutingModule = MyProfileRoutingModule;


/***/ }),

/***/ "./app/myProfile/myProfile.component.ts":
/*!**********************************************!*\
  !*** ./app/myProfile/myProfile.component.ts ***!
  \**********************************************/
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
const core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm2015/core.js");
const ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../../node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
const token_storage_service_1 = __webpack_require__(/*! ../auth/token-storage.service */ "./app/auth/token-storage.service.ts");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./app/user/user.service.ts");
const userFonctionnel_entity_1 = __webpack_require__(/*! ../shared/user/userFonctionnel.entity */ "./app/shared/user/userFonctionnel.entity.ts");
const user_entity_1 = __webpack_require__(/*! ../shared/user/user.entity */ "./app/shared/user/user.entity.ts");
let MyProfileComponent = class MyProfileComponent {
    constructor(token, userService, alertConfig) {
        this.token = token;
        this.userService = userService;
        this.alertConfig = alertConfig;
        this.checked = false;
        this.user = new userFonctionnel_entity_1.UserFonctionnel();
        this.controlUser = new user_entity_1.User();
        this.controlledUser = new user_entity_1.User();
        this.saveFailed = false;
        this.saveSuccess = false;
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    ngOnInit() {
        this.username = this.token.getUsername();
        this.userService.getUser(this.username).subscribe(data => {
            this.user = data;
            this.user.administrateur = false;
            this.user.superAdministrateur = false;
            this.user.roles.forEach(function (role) {
                if (role === "ROLE_ADMIN") {
                    this.user.administrateur = true;
                }
                else if (role === "ROLE_SUPER_ADMIN") {
                    this.user.superAdministrateur = true;
                }
            }.bind(this));
        }, error => {
            this.message = "Erreur de récupération de l'utilisateur";
            this.saveFailed = true;
        });
    }
    save() {
        this.controlUser.username = this.user.username;
        this.controlUser.password = this.oldPassword;
        this.userService.checkPassword(this.controlUser).subscribe(data => {
            this.checked = data;
            if (!this.checked) {
                this.message = "Ancien mot de passe incorrect";
                this.saveFailed = true;
            }
            else {
                this.controlledUser.username = this.user.username;
                this.controlledUser.password = this.newPassword;
                if (this.newPassword === this.passwordConfirm) {
                    if (this.newPassword.length >= 8) {
                        this.userService.changePassword(this.controlledUser).subscribe(data => {
                            this.saveSuccess = true;
                        }, error => {
                            this.message = "Erreur de changement de mot de passe";
                            this.saveFailed = true;
                        });
                    }
                    else {
                        this.message = "Au moins 8 caractères sont requis dans votre mot de passe";
                        this.saveFailed = true;
                    }
                }
                else {
                    this.message = "Le mot de passe doit être égal au mot de passe de confirmation";
                    this.saveFailed = true;
                }
            }
        }, error => {
            this.message = "Erreur de vérification du mot de passe";
            this.saveFailed = true;
        });
    }
};
MyProfileComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'app-myProfile',
        template: `<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<ngb-alert [type]="'success'" *ngIf="saveSuccess">
        Mot de passe modifi&eacute; avec succ&egrave;s
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <div style="display:flex; margin : 10px;">
        <mat-card style="width:550px">
            <mat-card-header style="width:100%; display: flex; align-items:center;">
                <div mat-card-avatar><i class="fas fa-user" style="font-size:40px"></i></div>
                <mat-card-title>{{user.username}}</mat-card-title>
                <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && user.superAdministrateur">Super Administrateur</mat-card-subtitle>
                <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && !user.superAdministrateur">Administrateur</mat-card-subtitle>
                <mat-card-subtitle style="margin:0" *ngIf="!user.administrateur && !user.superAdministrateur">Utilisateur</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content style="display:flex; flex-direction:column; margin-top:10px;">
                <mat-form-field>
                    <input matInput required placeholder="Ancien mot de passe" type="password" id="oldPassword" name="oldPassword" [(ngModel)] = "oldPassword">
                </mat-form-field>
                <mat-form-field>
                    <input matInput required placeholder="Nouveau mot de passe" type="password" id="newPassword" name="newPassword" [(ngModel)] = "newPassword">
                </mat-form-field>
                <mat-form-field>
                    <input matInput required placeholder="Confirmation du nouveau mot de passe" type="password" id="passwordConfirm" name="passwordConfirm" [(ngModel)] = "passwordConfirm">
                </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
                <button type="submit" style = "margin: 0px;" class="btn btn-success">Modifier</button>
            </mat-card-actions>
        </mat-card>
    </div>
</form>`
    }),
    __metadata("design:paramtypes", [token_storage_service_1.TokenStorageService, user_service_1.UserService,
        ng_bootstrap_1.NgbAlertConfig])
], MyProfileComponent);
exports.MyProfileComponent = MyProfileComponent;


/***/ }),

/***/ "./app/myProfile/myProfile.module.ts":
/*!*******************************************!*\
  !*** ./app/myProfile/myProfile.module.ts ***!
  \*******************************************/
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
const core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm2015/core.js");
const common_1 = __webpack_require__(/*! @angular/common */ "../../../node_modules/@angular/common/fesm2015/common.js");
const forms_1 = __webpack_require__(/*! @angular/forms */ "../../../node_modules/@angular/forms/fesm2015/forms.js");
const myProfile_component_1 = __webpack_require__(/*! ./myProfile.component */ "./app/myProfile/myProfile.component.ts");
const myProfile_routing_module_1 = __webpack_require__(/*! ./myProfile-routing.module */ "./app/myProfile/myProfile-routing.module.ts");
const material_1 = __webpack_require__(/*! @angular/material */ "../../../node_modules/@angular/material/esm2015/material.js");
const card_1 = __webpack_require__(/*! @angular/material/card */ "../../../node_modules/@angular/material/esm2015/card.js");
const ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../../node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./app/user/user.service.ts");
const http_1 = __webpack_require__(/*! @angular/http */ "../../../node_modules/@angular/http/fesm2015/http.js");
const http_2 = __webpack_require__(/*! @angular/common/http */ "../../../node_modules/@angular/common/fesm2015/http.js");
const auth_interceptor_1 = __webpack_require__(/*! src/main/webapp/app/auth/auth-interceptor */ "./app/auth/auth-interceptor.ts");
let MyProfileModule = class MyProfileModule {
};
MyProfileModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_2.HttpClientModule,
            myProfile_routing_module_1.MyProfileRoutingModule,
            card_1.MatCardModule,
            material_1.MatDialogModule,
            material_1.MatFormFieldModule,
            material_1.MatNativeDateModule,
            material_1.MatInputModule,
            material_1.MatCheckboxModule,
            material_1.MatSelectModule,
            ng_bootstrap_1.NgbModule
        ],
        declarations: [myProfile_component_1.MyProfileComponent],
        entryComponents: [],
        providers: [http_1.Http, auth_interceptor_1.httpInterceptorProviders, user_service_1.UserService]
    })
], MyProfileModule);
exports.MyProfileModule = MyProfileModule;


/***/ })

}]);
//# sourceMappingURL=myProfile-myProfile-module.js.map
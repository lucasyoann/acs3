(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stock-stock-module"],{

/***/ "./app/shared/article/article.entity.ts":
/*!**********************************************!*\
  !*** ./app/shared/article/article.entity.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Article {
}
exports.Article = Article;


/***/ }),

/***/ "./app/stock/modal/modal-modif-article.component.ts":
/*!**********************************************************!*\
  !*** ./app/stock/modal/modal-modif-article.component.ts ***!
  \**********************************************************/
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm2015/core.js");
const material_1 = __webpack_require__(/*! @angular/material */ "../../../node_modules/@angular/material/esm2015/material.js");
const ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../../node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
const stock_service_1 = __webpack_require__(/*! ../stock.service */ "./app/stock/stock.service.ts");
const article_entity_1 = __webpack_require__(/*! ../../shared/article/article.entity */ "./app/shared/article/article.entity.ts");
const core_2 = __webpack_require__(/*! @angular/core */ "../../../node_modules/@angular/core/fesm2015/core.js");
let ModalModifArticleComponent = class ModalModifArticleComponent {
    constructor(dialogRef, data, stockService, alertConfig) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.stockService = stockService;
        this.alertConfig = alertConfig;
        this.saveFailed = false;
        this.article = new article_entity_1.Article();
        this.modif = false;
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    ngOnInit() {
        if (this.data.article) {
            this.article = this.data.article;
            this.titre = "Modification d'un article";
            this.labelBouton = "Modifier";
            this.modif = true;
        }
        else {
            this.titre = "Ajout d'un article";
            this.labelBouton = "Ajouter";
            this.modif = false;
        }
    }
    save() {
        this.stockService.modifUser(this.article).subscribe(data => {
            this.dialogRef.close();
            window.location.reload();
        }, error => {
            this.message = "Erreur d'enregistrement de l'article";
            this.saveFailed = true;
        });
    }
};
ModalModifArticleComponent = __decorate([
    core_1.Component({
        encapsulation: core_2.ViewEncapsulation.None,
        selector: 'ref-modal-modif-article',
        template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">{{titre}}</h2>
</div>

<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <mat-dialog-content style="width:100%">
        <div class="row">
            <div class="form-group" style="width:100%"> 
                <mat-form-field *ngIf="modif" style="width:100%">
                    <input matInput readonly placeholder="Type de mat&eacute;riel" id="type" name="type" [(ngModel)] = "article.type">
                </mat-form-field>
                <mat-form-field *ngIf="!modif" style="width:100%">
                    <input matInput required placeholder="Type de mat&eacute;riel" id="type" name="type" [(ngModel)] = "article.type">
                </mat-form-field>
                <mat-form-field *ngIf="modif" style="width:100%">
                    <input matInput readonly placeholder="Intitul&eacute;" id="intitule" name="intitule" [(ngModel)] = "article.intitule">
                </mat-form-field>
                <mat-form-field *ngIf="!modif" style="width:100%">
                    <input matInput required placeholder="Intitul&eacute;" id="intitule" name="intitule" [(ngModel)] = "article.intitule">
                </mat-form-field>
                <mat-form-field style="width:100%">
                    <input matInput required placeholder="Quantit&eacute;" id="quantite" name="quantite" [(ngModel)] = "article.quantite">
                </mat-form-field>
                <hr/>
                <div style="width:100%">
                    <h5>Description</h5>
                    <mat-form-field style="width:100%">
                        <textarea matInput style="min-width: 100%" [(ngModel)] = "article.description" [ngModelOptions]="{standalone: true}"></textarea>
                    </mat-form-field>
                </div>
            </div>
        </div>  
    </mat-dialog-content>
    <mat-dialog-actions>
        <button type="button" class="btn btn-link" (click)="dialogRef.close()">Annuler</button>
        <button type="submit" class="btn btn-success">{{labelBouton}}</button>
    </mat-dialog-actions>
</form>`,
        providers: [
            { provide: material_1.MAT_DATE_LOCALE, useValue: 'fr-FR' },
            ng_bootstrap_1.NgbAlertConfig
        ],
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MatDialogRef, Object, stock_service_1.StockService,
        ng_bootstrap_1.NgbAlertConfig])
], ModalModifArticleComponent);
exports.ModalModifArticleComponent = ModalModifArticleComponent;


/***/ }),

/***/ "./app/stock/stock-routing.module.ts":
/*!*******************************************!*\
  !*** ./app/stock/stock-routing.module.ts ***!
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
const router_1 = __webpack_require__(/*! @angular/router */ "../../../node_modules/@angular/router/fesm2015/router.js");
const stock_component_1 = __webpack_require__(/*! ./stock.component */ "./app/stock/stock.component.ts");
const route_guard_1 = __webpack_require__(/*! ../auth/route.guard */ "./app/auth/route.guard.ts");
const routes = [
    {
        path: '',
        component: stock_component_1.StockComponent,
        canActivate: [route_guard_1.RouteGuard],
        data: {
            title: 'Module stock'
        }
    }
];
let StockRoutingModule = class StockRoutingModule {
};
StockRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes)
        ],
        exports: [router_1.RouterModule]
    })
], StockRoutingModule);
exports.StockRoutingModule = StockRoutingModule;


/***/ }),

/***/ "./app/stock/stock.component.ts":
/*!**************************************!*\
  !*** ./app/stock/stock.component.ts ***!
  \**************************************/
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
const reservation_service_1 = __webpack_require__(/*! ../reservation/reservation.service */ "./app/reservation/reservation.service.ts");
const material_1 = __webpack_require__(/*! @angular/material */ "../../../node_modules/@angular/material/esm2015/material.js");
const token_storage_service_1 = __webpack_require__(/*! ../auth/token-storage.service */ "./app/auth/token-storage.service.ts");
const router_1 = __webpack_require__(/*! @angular/router */ "../../../node_modules/@angular/router/fesm2015/router.js");
const stock_service_1 = __webpack_require__(/*! ./stock.service */ "./app/stock/stock.service.ts");
const modal_modif_article_component_1 = __webpack_require__(/*! ./modal/modal-modif-article.component */ "./app/stock/modal/modal-modif-article.component.ts");
let StockComponent = class StockComponent {
    constructor(dialog, reservationService, token, stockService, router) {
        this.dialog = dialog;
        this.reservationService = reservationService;
        this.token = token;
        this.stockService = stockService;
        this.router = router;
        this.saveFailed = false;
        this.superAdministrateur = false;
        this.displayedColumns = ['type', 'intitule', 'description', 'quantite', 'modifier'];
    }
    ngOnInit() {
        this.token.getAuthorities().forEach(function (role) {
            if (role === "ROLE_SUPER_ADMIN") {
                this.superAdministrateur = true;
            }
        }.bind(this));
        if (this.superAdministrateur) {
            this.stockService.getUsers().subscribe(data => {
                this.listArticle = data;
            }, error => {
                this.saveFailed = true;
                this.message = "Erreur de récupération du stock";
            });
        }
        else {
            this.router.navigate(['/dashboard']);
        }
    }
    sortData(sort) {
        const data = this.listArticle.slice();
        if (!sort.active || sort.direction === '') {
            this.listArticle = data;
            return;
        }
        this.listArticle = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'type': return compare(a.type, b.type, isAsc);
                case 'intitule': return compare(a.intitule, b.intitule, isAsc);
                case 'description': return compare(a.description, b.description, isAsc);
                case 'quantite': return compare(a.quantite, b.quantite, isAsc);
                default: return 0;
            }
        });
    }
    modifierArticle(element) {
        const dialogRef = this.dialog.open(modal_modif_article_component_1.ModalModifArticleComponent, {
            data: { article: element }
        });
    }
};
StockComponent = __decorate([
    core_1.Component({
        encapsulation: core_1.ViewEncapsulation.None,
        selector: 'app-stock',
        template: `<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<div style="background-color:white;border-radius:5px;margin:15px 0;">
    <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
        <h2 mat-dialog-title class="color-bleu" style="margin:10px 20px;padding-top:10px">Gestion des stocks</h2>
        <button type="button" style="margin-right:10px" class="btn btn-success" (click)="modifierArticle(element)">Cr&eacute;er un Article</button>
    </div>
    
    <table mat-table *ngIf="listArticle && listArticle.length>0" [dataSource]="listArticle" matSort (matSortChange)="sortData($event)" style="width:100%; border-top:1px solid rgba(0, 0, 0, 0.1)">

    <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->
    <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="type"> Type </th>
        <td mat-cell *matCellDef="let element"> {{element.type}} </td>
    </ng-container>
    <ng-container matColumnDef="intitule">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="intitule"> Initul&eacute; </th>
        <td mat-cell *matCellDef="let element"> {{element.intitule}} </td>
    </ng-container>
    <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="description"> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
    </ng-container>
    <ng-container matColumnDef="quantite">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="quantite"> Quantit&eacute; </th>
        <td mat-cell *matCellDef="let element"> {{element.quantite}} </td>
    </ng-container>
    <ng-container matColumnDef="modifier">
        <th mat-header-cell *matHeaderCellDef> Modifier </th>
        <td mat-cell *matCellDef="let element"> <button type="button" class="btn btn-success" (click)="modifierArticle(element)">Modifier</button> </td>
    </ng-container>


    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
</div>`
    }),
    __metadata("design:paramtypes", [material_1.MatDialog, reservation_service_1.ReservationService,
        token_storage_service_1.TokenStorageService, stock_service_1.StockService, router_1.Router])
], StockComponent);
exports.StockComponent = StockComponent;
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


/***/ }),

/***/ "./app/stock/stock.module.ts":
/*!***********************************!*\
  !*** ./app/stock/stock.module.ts ***!
  \***********************************/
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
const stock_component_1 = __webpack_require__(/*! ./stock.component */ "./app/stock/stock.component.ts");
const stock_routing_module_1 = __webpack_require__(/*! ./stock-routing.module */ "./app/stock/stock-routing.module.ts");
const material_1 = __webpack_require__(/*! @angular/material */ "../../../node_modules/@angular/material/esm2015/material.js");
const card_1 = __webpack_require__(/*! @angular/material/card */ "../../../node_modules/@angular/material/esm2015/card.js");
const ng_bootstrap_1 = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "../../../node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
const stock_service_1 = __webpack_require__(/*! ./stock.service */ "./app/stock/stock.service.ts");
const datepicker_1 = __webpack_require__(/*! @angular/material/datepicker */ "../../../node_modules/@angular/material/esm2015/datepicker.js");
const table_1 = __webpack_require__(/*! @angular/material/table */ "../../../node_modules/@angular/material/esm2015/table.js");
const sort_1 = __webpack_require__(/*! @angular/material/sort */ "../../../node_modules/@angular/material/esm2015/sort.js");
const modal_modif_article_component_1 = __webpack_require__(/*! ./modal/modal-modif-article.component */ "./app/stock/modal/modal-modif-article.component.ts");
const http_1 = __webpack_require__(/*! @angular/http */ "../../../node_modules/@angular/http/fesm2015/http.js");
const http_2 = __webpack_require__(/*! @angular/common/http */ "../../../node_modules/@angular/common/fesm2015/http.js");
const auth_interceptor_1 = __webpack_require__(/*! src/main/webapp/app/auth/auth-interceptor */ "./app/auth/auth-interceptor.ts");
let StockModule = class StockModule {
};
StockModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_2.HttpClientModule,
            stock_routing_module_1.StockRoutingModule,
            card_1.MatCardModule,
            material_1.MatDialogModule,
            material_1.MatFormFieldModule,
            material_1.MatNativeDateModule,
            material_1.MatInputModule,
            material_1.MatCheckboxModule,
            material_1.MatSelectModule,
            ng_bootstrap_1.NgbModule,
            datepicker_1.MatDatepickerModule,
            table_1.MatTableModule,
            sort_1.MatSortModule
        ],
        declarations: [stock_component_1.StockComponent, modal_modif_article_component_1.ModalModifArticleComponent],
        entryComponents: [modal_modif_article_component_1.ModalModifArticleComponent],
        providers: [http_1.Http, auth_interceptor_1.httpInterceptorProviders, stock_service_1.StockService]
    })
], StockModule);
exports.StockModule = StockModule;


/***/ }),

/***/ "./app/stock/stock.service.ts":
/*!************************************!*\
  !*** ./app/stock/stock.service.ts ***!
  \************************************/
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
const http_1 = __webpack_require__(/*! @angular/common/http */ "../../../node_modules/@angular/common/fesm2015/http.js");
const httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
let StockService = class StockService {
    constructor(http) {
        this.http = http;
        this.listArticles = 'articles/';
    }
    getUsers() {
        return this.http.get(this.listArticles);
    }
    modifUser(article) {
        return this.http.post(this.listArticles, article, httpOptions);
    }
};
StockService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], StockService);
exports.StockService = StockService;


/***/ })

}]);
//# sourceMappingURL=stock-stock-module.js.map
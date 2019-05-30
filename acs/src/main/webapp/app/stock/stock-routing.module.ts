import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';
import { RouteGuard } from '../auth/route.guard';

const routes: Routes = [
    {
        path: '',
        component: StockComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Module stock'
        }
    }];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class StockRoutingModule { }
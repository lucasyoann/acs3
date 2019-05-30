import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckDispoComponent } from './checkdispo.component';
import { RouteGuard } from '../auth/route.guard';

const routes: Routes = [
    {
        path: '',
        component: CheckDispoComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Module myProfile'
        }
    }];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CheckDispoRoutingModule { }
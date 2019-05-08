import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RouteGuard } from '../auth/route.guard';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Module user'
        }
    }];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }
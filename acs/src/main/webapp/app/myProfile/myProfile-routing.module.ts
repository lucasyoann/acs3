import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './myProfile.component';
import { RouteGuard } from '../auth/route.guard';

const routes: Routes = [
    {
        path: '',
        component: MyProfileComponent,
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
export class MyProfileRoutingModule { }
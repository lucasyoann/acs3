import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { RouteGuard } from '../auth/route.guard';

const routes: Routes = [
    {
        path: '',
        component: ReservationComponent,
        canActivate: [RouteGuard],
        data: {
            title: 'Gestion des réservations'
        }
    }];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ReservationRoutingModule { }
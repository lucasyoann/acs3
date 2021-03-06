import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './auth/route.guard';

// Import Containers
import {
  FullLayoutComponent
} from './coreui/containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
      path: '',
      component: FullLayoutComponent,
      data: {
        title: ''
      },
      children: [
  {
      path: 'dashboard',
      loadChildren: './coreui/views/dashboard/dashboard.module#DashboardModule'
  }]},
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [RouteGuard],
    data: {
      title: ''
    },
    children: [
      
      {
          path: 'reservations',
          loadChildren: './reservation/reservation.module#ReservationModule'
        },
       {
            path: 'user',
            loadChildren: './user/user.module#UserModule'
       },
       {
           path: 'myProfile',
           loadChildren: './myProfile/myProfile.module#MyProfileModule'
       },
       {
           path: 'checkdispo',
           loadChildren: './checkdispo/checkdispo.module#CheckDispoModule'
      },
      {
          path: 'stock',
          loadChildren: './stock/stock.module#StockModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

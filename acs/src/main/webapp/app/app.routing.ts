import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      },
      {
          path: 'reservations',
          loadChildren: './reservation/reservation.module#ReservationModule'
        },
       {
            path: 'user',
            loadChildren: './auth/user/user/user.module#UserModule'
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

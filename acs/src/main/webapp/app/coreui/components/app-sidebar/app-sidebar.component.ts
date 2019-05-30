import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<div class="sidebar">
  <app-sidebar-header></app-sidebar-header>
  <app-sidebar-form></app-sidebar-form>
  <app-sidebar-nav></app-sidebar-nav>
  <app-sidebar-footer></app-sidebar-footer>
  <!-- <app-sidebar-minimizer></app-sidebar-minimizer> -->
</div>
`
})
export class AppSidebarComponent { }

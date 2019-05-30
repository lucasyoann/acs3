import { Component } from '@angular/core';
import { OnInit } from "@angular/core";

@Component({
    template: `<div class="animated fadeIn">
    <router-outlet></router-outlet>
</div>`
})
export class DashboardComponent {
  constructor( ) {}
}

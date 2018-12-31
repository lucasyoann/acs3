import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar-header',
  templateUrl: './app-sidebar-header.component.html',
  styleUrls: ['app-sidebar-header.component.css']
})
export class AppSidebarHeaderComponent implements OnInit{ 
  constructor(private router: Router ) {
  }

  // route_dashboard = false;

  ngOnInit(){
    // this.route_dashboard = (this.router.url === '/dashboard') ? true : false; 
  }

  /**
   * Navigation accueil
   */
  accueil(){      
    this.router.navigate(['dashboard']);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `<app-header></app-header>
<div class="app-body">
    <app-sidebar></app-sidebar>
    <!-- Main content -->
    <main class="main">
        <!-- Breadcrumb 
        <ol class="breadcrumb">
            <app-breadcrumbs></app-breadcrumbs>
        </ol>-->
        <div id='div' style="position:absolute; left:50%;"><span id='span'></span></div>
        <div class="container-fluid">
            <router-outlet></router-outlet>
        </div>
    </main>
</div>
<app-footer></app-footer>`
})
export class FullLayoutComponent { 
    span: HTMLElement;
    
    afficher(message: string){
        document.getElementById('div').className = 'alert alert-success transition ';
        this.span = document.getElementById('span');
        this.span.innerText = message;
        this.span.className = 'color-bleu bold transition ';
    }    
    
    afficherError(message: string){
        console.log(message);
        document.getElementById('div').className = 'alert alert-danger transition ';
        this.span = document.getElementById('span');
        this.span.innerText = message;
        this.span.className = 'bold transition ';
    }    
    
    effacer(){
      document.getElementById('div').className += 'opacity';
    }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html'
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
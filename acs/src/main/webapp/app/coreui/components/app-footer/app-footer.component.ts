import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template:`<footer class="app-footer">
    <div class="d-flex align-items-center">
        <span>
          Th&egrave;me bas&eacute; sur :
      <a href="http://coreui.io" rel="noopener noreferrer" target="_blank"> creativeLabs </a>
    </span>
    </div>
</footer>`
})
export class AppFooterComponent {

  constructor() { }
  ngOnInit() {}
}

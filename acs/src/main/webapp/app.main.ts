import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '.\\app';
import { environment } from '.\\environments\\environment';
import { platformBrowser } from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
  
  /*platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).
  then((success) => console.log('Webapp demarre'))
  .catch(err => console.error(err));*/
}else{
    platformBrowserDynamic().bootstrapModule(AppModule).
    then((success) => console.log('Webapp demarre'))
      .catch(err => console.error(err));
}

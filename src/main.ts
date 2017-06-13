import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

//import main styles 
//need to to import individual component less files later 
import './app/less/main.less';
import './app/less/admin-page.less';
import './app/less/colors.less';
import './app/less/login-modal.less';
import './app/less/main-header.less';
import './app/less/post-detail.less';
import './app/less/posts.less';


import { AppModule } from './app/components/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
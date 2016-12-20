import { Component } from '@angular/core';
import { MainHeader } from "./main-header";
import { MainPage } from './main-page';
import { LoginModal } from './login.component';
import { loginModalWrapper } from './modalDirective';

@Component({
  selector: 'my-app',
  template: '<main-header></main-header> <router-outlet></router-outlet>'
})
export class AppComponent { }

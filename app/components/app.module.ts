import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

//components
import { MainPage } from './main-page';
import { AppComponent }   from './app.component';
import { MainHeader } from './main-header';
import { MainPostService } from './stores/posts/mainPost.service';
import { LoginModal } from './login.component';
import { loginModalWrapper } from './modalDirective';
import { LoginService } from './stores/login/login.service';
import { SignedInUserService } from './stores/signedInUser/signedInUser.service';

@NgModule({
  providers: [
    AUTH_PROVIDERS,
    LoginService,
    SignedInUserService
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [ 
    AppComponent, 
    MainHeader, 
    MainPage,
    LoginModal,
    loginModalWrapper,
  ],
  entryComponents: [
    LoginModal
  ],
  bootstrap:[ 
    AppComponent
  ]
})

export class AppModule { 

}
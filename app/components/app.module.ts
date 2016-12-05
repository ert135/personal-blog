import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

//components
import { MainPage } from './main-page';
import { AppComponent }   from './app.component';
import { MainHeader } from './main-header';
import { MainPostService } from './stores/posts/mainPost.service';
import { LoginModal } from './login.component';
import { loginModalWrapper } from './modalDirective';

@NgModule({
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
    loginModalWrapper
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
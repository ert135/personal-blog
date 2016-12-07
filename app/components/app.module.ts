import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

//components
import { MainPage } from './main-page';
import { AppComponent }   from './app.component';
import { MainHeader } from './main-header';
import { MainPostService } from './stores/posts/mainPost.service';
import { LoginModal } from './login.component';
import { PostDetailComponent } from './post-detail.component';
import { loginModalWrapper } from './modalDirective';
import { LoginService } from './stores/login/login.service';
import { SignedInUserService } from './stores/signedInUser/signedInUser.service';

const appRoutes: Routes = [
  { path: '', component: MainPage },
  { path: 'post/:id', component: PostDetailComponent }
  //wildcard route is **, make pagentofound component
];

@NgModule({
  providers: [
    AUTH_PROVIDERS,
    LoginService,
    SignedInUserService
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    AppComponent, 
    MainHeader, 
    MainPage,
    PostDetailComponent,
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
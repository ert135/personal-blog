//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule }   from '@angular/forms';
import { AdminModule }   from './admin/admin.module';

//components
import { MainPage } from './main-page';
import { AppComponent }   from './app.component';
import { MainHeader } from './main-header';
import { LoginModal } from './login.component';
import { PostDetailComponent } from './post-detail.component';
import { loginModalWrapper } from './modalDirective';
import { LoginService } from './stores/login/login.service';
import { SignedInUserService } from './stores/signedInUser/signedInUser.service';
import { UserDetailComponent } from './user-detail.component';
import { Editor } from './editor.component';

//services
import { PostDetailService } from './stores/posts/post-detail.service';
import { MainPostService } from './stores/posts/mainPost.service';

//routing
import { routing } from './routes/app.routing'

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  providers: [
    AUTH_PROVIDERS,
    LoginService,
    SignedInUserService,
    MainPostService,
    PostDetailService
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    FormsModule,
    CKEditorModule,
    AdminModule
  ],
  exports: [
     MainHeader
  ],
  declarations: [ 
    AppComponent, 
    MainHeader, 
    MainPage,
    PostDetailComponent,
    LoginModal,
    loginModalWrapper,
    UserDetailComponent,
    Editor
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
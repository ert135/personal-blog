//Moduels
//import { AppModule }     from '../app.module';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule }   from '@angular/forms';

//components
import { MainHeader } from '../main-header';
import { LoginModal } from '../login.component';
import { Editor } from '../editor.component';
import { AdminComponent } from './admin.component';

//routing
import { AdminRoutes } from './admin.routes'

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  providers: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AdminRoutes,
    FormsModule,
    CKEditorModule
  ],
  declarations: [ 
    Editor,
    AdminComponent
  ],
  entryComponents: [
    LoginModal
  ]
})

export class AdminModule { 

}
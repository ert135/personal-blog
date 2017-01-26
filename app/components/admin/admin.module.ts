//Modules
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
import { AdminComponent } from './admin.component';
import { HtmlEditor } from './admin.editor';

//routing
import { AdminRoutes } from './admin.routes'

//route guards
import { AdminPageGuard } from './admin.guard'

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  providers: [
    AdminPageGuard
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
    AdminComponent,
    HtmlEditor
  ],
  entryComponents: [
    LoginModal
  ]
})

export class AdminModule { 

}
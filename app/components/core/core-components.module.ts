//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule }   from '@angular/forms';

//components
import { HtmlEditor } from './htmlEditor';

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    CKEditorModule
  ],
  declarations: [ 
    HtmlEditor
  ],
  exports:[
      HtmlEditor
  ]
})

export class CoreComponentsModule { 

}
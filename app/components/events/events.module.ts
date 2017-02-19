//Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginEvents } from './login.events';

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule()
export class EventsModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventsModule,
      providers: [LoginEvents]
    };
  }
}
//Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

//Events
import { LoginEvents } from './login.events';
import { CreatePostEvents } from './createPost.events';

//external libraries
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule()
export class EventsModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventsModule,
      providers: [
        LoginEvents,
        CreatePostEvents
      ]
    };
  }
}
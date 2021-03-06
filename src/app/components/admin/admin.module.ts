//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule }   from '@angular/forms';
import { CoreComponentsModule } from '../core/core-components.module'

//components
import { MainHeader } from '../main-header';
import { LoginModal } from '../login.component';
import { AdminComponent } from './admin.component';

//routing
import { AdminRoutes } from './admin.routes'

//route guards
import { AdminPageGuard } from './admin.guard'

import { EventsModule} from "../events/events.module"

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
    EventsModule,
    CoreComponentsModule
  ],
  declarations: [ 
    AdminComponent
  ],
  entryComponents: [
    LoginModal
  ]
})

export class AdminModule { 

}
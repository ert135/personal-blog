//Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule }   from '@angular/forms';
import { AdminModule }   from './admin/admin.module';
import { CoreComponentsModule } from './core/core-components.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { MainPage } from './main-page';
import { AppComponent }   from './app.component';
import { MainHeader } from './main-header';
import { LoginModal } from './login.component';
import { PostDetailComponent } from './post-detail.component';
import { loginModalWrapper } from './modalDirective';
import { LoginService } from './stores/login.service';
import { SignedInUserService } from './stores/signedInUser.service';
import { UserDetailComponent } from './user-detail.component';
import { Editor } from './editor.component';

//services
import { PostDetailService } from './stores/post-detail.service';
import { MainPostService } from './stores/mainPost.service';
import { NewPostService } from './stores/newPost.service';

//routing
import { routing } from './routes/app.routing'

//Events
import { EventsModule } from './events/events.module'

@NgModule({
	providers: [
		AUTH_PROVIDERS,
		LoginService,
		SignedInUserService,
		MainPostService,
		PostDetailService,
		NewPostService
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpModule,
		routing,
		FormsModule,
		AdminModule,
		EventsModule.forRoot(),
		CoreComponentsModule,
		BrowserAnimationsModule
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
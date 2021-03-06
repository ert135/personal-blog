import {Component, ViewChild, NgModule} from '@angular/core';
import { ViewContainerRef } from '@angular/core';

import { LoginModal } from './login.component';
import { loginModalWrapper } from './modalDirective';
import { SignedInUserService } from './stores/signedInUser.service';
import { LoginEvents } from './events/login.events';

@Component({
    selector: 'main-header',
    template: `
        <div class="main-header">
            <h1 class="main-header__title" [routerLink]="['/']"> Robert Smith - Software Engineer </h1>
            <ul class="main-header__links">

            </ul>
            <div class="main-header__user-buttons-container">
                <div class="main-header__login-button"
                    (click)='openLoginWindow()'
                    *ngIf="!name">
                    Log In
                </div>
                <div class="main-header__user-dropdown"
                     [routerLink]="['/admin']"
                >
                    <div class="main-header__name-label"
                        *ngIf="name"
                        [innerHTML]="name"
                        >
                    </div>
                </div>
                <div class="main-header__logout-button"
                    (click)='logOut()'
                    *ngIf="name"
                    >
                    Log Out
                </div>
            </div>
        </div>
        <div loginmodalwrapper></div>
    `,
    entryComponents: [
        LoginModal
    ],
    host: {'class' : 'ng-animate'}
})
export class MainHeader {

    private name: string = null;

    constructor(
        private SignedInUserService: SignedInUserService,
        private LoginEvents: LoginEvents
    ){
       
    }

    @ViewChild(loginModalWrapper) dialogAnchor: loginModalWrapper;
    public openLoginWindow() {
        //any used below to make the compiler behave itself
        //TODO make anhcor component generic to allow passing in any component to display
        this.dialogAnchor.createDialog(<any>LoginModal);
    }

    ngOnInit() {
        this.SignedInUserService.getSignedInUserSubscription()
            .subscribe((data: any) => {
               if (data) {
                   this.name = data.name;
               }
        })
	}

    goToMainPage() {

	}

    logOut() {
        this.LoginEvents.logOut.next();
    }
}
import {Component, ViewChild, NgModule} from '@angular/core';
import { ViewContainerRef } from '@angular/core';

import {LoginModal} from './login.component';
import {loginModalWrapper} from './modalDirective';

@Component({
    selector: 'main-header',
    template: `
        <div class="main-header">
            <h1 class="main-header__title"> Robert Smith </h1>
            <ul class="main-header__links">
                <li class="main-header__link-item">
                    Projects
                </li>
                <li class="main-header__link-item">
                    Posts
                </li>
                <li class="main-header__link-item">
                    github
                </li>
            </ul>
            <div class="main-header__login-button"
                (click)='openLoginWindow()'>
                login
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
    @ViewChild(loginModalWrapper) dialogAnchor: loginModalWrapper;
    openLoginWindow() {
        console.log("Opening window");
        this.dialogAnchor.createDialog(LoginModal);
    }
}
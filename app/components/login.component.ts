import { 
    Component, 
    EventEmitter, 
    animate, 
    trigger, 
    state, 
    style, 
    transition } from '@angular/core';

import { LoginService } from './stores/login/login.service';
import { LoginModel } from './models/login';
import { LoginEvents } from './events/login.events';

@Component({
    selector: 'dlg',
    template: `
    <div class="login-modal-container" [@loadingState]="loading == false">
    
            <div class="login-modal" [@loadingState]="loading == false">
                <h1 class="login-modal__header">
                    Login
                </h1>
            <form>

            <div class="login-modal__close-button" (click)="closeForm()">
                <span class="glyphicon glyphicon-remove"></span>
            </div>

            <div class="login-modal__input-group" *ngIf="loading == false" [@loadingState]="loading == false">      
                <input class="login-modal__input" 
                    [ngModel]="username" 
                    (ngModelChange)="onEnterEmail($event)"
                    [ngModelOptions]="{standalone: true}"
                >
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Email</label>
            </div>

            <div class="login-modal__input-group" *ngIf="loading == false" [@loadingState]="loading == false">      
                <input class="login-modal__input" 
                    [ngModel]="password" 
                    (ngModelChange)="onEnterPassword($event)"
                    [ngModelOptions]="{standalone: true}"
                    type="password"
                >
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Password</label>
            </div>

            <input type="submit" class="login-modal__submit-button" (click)="submitDetails()" value="Log In" *ngIf="loading == false" [@loadingState]="loading == false">

            <div class="login-modal__error-text" [innerHTML]="errorMessage" *ngIf="loading == false" [@loadingState]="error">
             
            </div>

            <footer class="login-modal__forgot-password-footer" *ngIf="loading == false">
                <a href="mailto:someone@example.com">Forgot password?</a>
            </footer>
            <div class="login-modal__loading-icon" *ngIf="loading == true" [@loadingState]="loading == true">
                <img class="main-loading-spinner" src="default.svg">
            </div>
        </form>
        </div>
    </div>
    `,
    animations: [
        trigger('loadingState', [
            transition(':enter', [   // :enter is alias to 'void => *'
            style({opacity:0}),
                animate(100, style({opacity:1})) 
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(100, style({opacity:0})) 
            ])
        ])
    ]
})
export class LoginModal {
    	
    private loading: boolean;
    private errorMessage; string;
    private username: string;
    private password: string

	constructor(
		private loginService: LoginService,
        private LoginEvents: LoginEvents
	) {
        
    }

    ngOnInit() {
        this.loginService.getDataStore()
            .subscribe((data) => {
                this.loading = data.loading;
                this.errorMessage = data.error;
                this.username = data.username;
                this.password = data.password;
        })

        this.LoginEvents.closeForm
            .subscribe((data) => {
                this.onClickedExit();
        })

        this.LoginEvents.loginSuccess
            .subscribe((data) => {
                this.onClickedExit();
        })

	}

    close = new EventEmitter();

    onClickedExit() {
        this.close.emit('event');
    }

    closeForm() {
        this.LoginEvents.closeForm.next();
    }

    onEnterEmail(text: string){
        this.LoginEvents.changeEmail.next(text);
    }

    onEnterPassword(text: string){
        this.LoginEvents.changePassword.next(text);
    }

    submitDetails(): void {
        let username1 = this.username;
        let password2 = this.password
        this.LoginEvents.login.next({
            username: username1,
            password: password2
        });
    }


}
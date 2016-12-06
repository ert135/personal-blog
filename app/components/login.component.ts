import { 
    Component, 
    EventEmitter, 
    animate, 
    trigger, 
    state, 
    style, 
    transition } from '@angular/core';

import { LoginService } from './stores/login/login.service';

@Component({
    selector: 'dlg',
    template: `
    <div class="login-modal-container">
        <div class="login-modal">
            <h1 class="login-modal__header">
                Login
            </h1>
                
            <div class="login-modal__input-group" *ngIf="loading == false" [@loadingState]="loading == false">      
                <input class="login-modal__input" (keyup)="onEnterEmail($event.target.value)" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Email</label>
            </div>

            <div class="login-modal__input-group" *ngIf="loading == false" [@loadingState]="loading == false">      
                <input class="login-modal__input" (keyup)="onEnterPassword($event.target.value)" type="password" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Password</label>
            </div>

            <input type="submit" class="login-modal__submit-button" (click)="submitDetails()" value="Submit" *ngIf="loading == false" [@loadingState]="loading == false">
            <div class="login-modal__close-button" (click)="closeForm()">
            </div>
            <div class="login-modal__error-text" [innerHTML]="errorMessage" *ngIf="loading == false">
                ERROR TEXt
            </div>
            <footer *ngIf="loading == false">
                <a href="mailto:someone@example.com">Forgot password?</a>
            </footer>
            <div class="login-modal__loading-icon" *ngIf="loading == true" [@loadingState]="loading == true">
                <img class="main-loading-spinner" src="default.svg">
            </div>
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

	constructor(
		private loginService: LoginService
	) {

	}

    ngOnInit() {
		this.loginService.getDataStore()
            .subscribe((data) => {
                this.loading = data.loading;
		})

		this.loginService.getCloseEvent()
            .skip(1)
            .subscribe(() => {
			    this.onClickedExit();
		})

		this.loginService.getFailEvent()
            .subscribe((data) => {
			    this.errorMessage = data
		})

        this.loginService.getSuccessEvent()
            .skip(1)
            .subscribe((data) => {
                this.onClickedExit();
		})
	}

    close = new EventEmitter();

    onClickedExit() {
        this.close.emit('event');
    }

    closeForm() {
        this.loginService.closeForm();
    }

    onEnterEmail(text: string){
       this.loginService.updateUserName(text);
    }

    onEnterPassword(text: string){
        this.loginService.updatePassword(text);
    }

    submitDetails(): void {
        this.loginService.sendLoginRequest();
    }
}
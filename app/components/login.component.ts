import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: 'dlg',
    template: `
    <div class="login-modal-container">
        <div class="login-modal">
            <h1 class="login-modal__header">
                Login
            </h1>

            <div class="login-modal__input-group">      
                <input class="login-modal__input" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Name</label>
            </div>
                
            <div class="login-modal__input-group">      
                <input class="login-modal__input" type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label class="login-modal__label">Email</label>
            </div>

            <input type="submit" value="Submit">
            <div class="login-modal__close-button" (click)="onClickedExit()">
                CLOSE
            </div>
            <footer>
                <a href="mailto:someone@example.com">Forgot password?</a>
            </footer>
        </div>
    </div>
    `
})
export class LoginModal {
    close = new EventEmitter();

    onClickedExit() {
        this.close.emit('event');
    }
}
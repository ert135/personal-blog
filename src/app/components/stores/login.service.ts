// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { LoginEvents } from '../events/login.events';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface ILoginData {
    loading: boolean;
    username: string,
    password: string,
    error: string
}

export interface IRequiredLoginData {
    username: string,
    password: string
}

export interface ISuccessfulLoginResponse {
    message: string;
    token: string;
    type: string;
}

@Injectable()
export class LoginService {
    
     private _loginDataStore: BehaviorSubject<ILoginData>;
     private _loginSuccess: BehaviorSubject<ISuccessfulLoginResponse>;
     private _loginFail: BehaviorSubject<string>;
     private _closeForm: BehaviorSubject<ILoginData>;
     private error: string;
     private errorResponse: any;

     private LoginDataStore: {
         loading: boolean;
         username: string,
         password: string,
         error: string
     }

     private apiUrl: string;

     constructor (
         private http: Http,
         private LoginEvents: LoginEvents
     ) {
        this.error =  "";
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.LoginDataStore = {
            loading: false,
            username: "",
            password: "",
            error: ""
        } 
        this._loginDataStore = <BehaviorSubject<ILoginData>> new BehaviorSubject(this.getDefaultState());
        this.setupLoginSuccessSubscription();
        this.setupLoginAttemptSubscription();
        this.setupCloseFormSubscription();
        this.setupChangePasswordSubscription();
        this.setupChangeEmailSubscription();
        this.setupLoginFailSubscription();
     }

     private setupLoginAttemptSubscription(){
        this.LoginEvents.login.subscribe((data) => {
            this.LoginDataStore.loading = true;
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

    private setupChangePasswordSubscription(){
        this.LoginEvents.changePassword.subscribe((data) => {
            this.LoginDataStore.password = data;
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

    private setupChangeEmailSubscription(){
        this.LoginEvents.changeEmail.subscribe((data) => {
            this.LoginDataStore.username = data;
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

     private setupLoginSuccessSubscription(){
        this.LoginEvents.loginSuccess.subscribe((data) => {
            this.LoginDataStore.loading = false;
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

    private setupCloseFormSubscription(){
        this.LoginEvents.closeForm.subscribe((data) => {
            this.LoginDataStore = this.getDefaultState();
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

     private setupLoginFailSubscription() {
        this.LoginEvents.loginFail.subscribe((data) => {
            this.LoginDataStore.error = data;
            this.LoginDataStore.loading = false;
            this._loginDataStore.next(this.LoginDataStore);
        })
     }

     private getDefaultState() {
         return {
            loading: false,
            username: "",
            password: "",
            error: ""
         }
     }

     public getDataStore() {
         return this._loginDataStore.asObservable();
     }


}
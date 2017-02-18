// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

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

     constructor (private http: Http) {
        this.error =  "";
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.LoginDataStore = {
            loading: false,
            username: "",
            password: "",
            error: ""
        } 
        this._loginDataStore = <BehaviorSubject<ILoginData>> new BehaviorSubject(this.getDefaultState());
        this._loginSuccess = <BehaviorSubject<ISuccessfulLoginResponse>> new BehaviorSubject({});
        this._loginFail = <BehaviorSubject<string>> new BehaviorSubject("");
        this._closeForm = <BehaviorSubject<ILoginData>> new BehaviorSubject(this.getDefaultState());
     }

     public getDefaultState() {
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

     public getSuccessEvent() {
         return this._loginSuccess.asObservable();
     }

    public getFailEvent() {
         return this._loginFail.asObservable();
     }

     public getCloseEvent() {
         return this._closeForm.asObservable();
     }

     public updateUserName(nameUpdate: string) {
         this.LoginDataStore.username = nameUpdate;
         this._loginDataStore.next(Object.assign({}, this.LoginDataStore));
     }
     
     public updatePassword(passwordUpdate: string) {
         this.LoginDataStore.password = passwordUpdate;
         this._loginDataStore.next(Object.assign({}, this.LoginDataStore));
     }

     public closeForm(): void {
         this._closeForm.next(null);
         this.LoginDataStore.username = "";
         this.LoginDataStore.password = "";
         this.LoginDataStore.error = "";
         this._loginDataStore.next(Object.assign({}, this.LoginDataStore));
     }

     public sendLoginRequest() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify({
            email: this.LoginDataStore.username,
            password: this.LoginDataStore.password
        });
        this.LoginDataStore.loading = true;
        this._loginDataStore.next(Object.assign({}, this.LoginDataStore));

        this.http.post(`${this.apiUrl}/auth`, data
        , options)
            .map(response => response.json())
            .subscribe(data   => {
                this.LoginDataStore.loading = false
                this.error = "";
                this._loginDataStore.next(Object.assign({}, this.LoginDataStore));
                this._loginSuccess.next(data);
        }, 
            error => {
                this.errorResponse = JSON.parse(error._body);
                this.error = this.errorResponse.error.message;
                this.LoginDataStore.loading = false
                this.LoginDataStore.error= this.error;
                this._loginDataStore.next(Object.assign({}, this.LoginDataStore));
                this._loginFail.next(this.error);
            }
        );
    }

    public addComment(){
        //TODO 
    }

}
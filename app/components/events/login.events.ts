// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';

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
    username: string;
}

@Injectable()
export class LoginEvents {
    
     public loginDataStore: Subject<ILoginData>;
     public loginSuccess: Subject<ISuccessfulLoginResponse>;
     public loginFail: Subject<string>;
     public closeForm: Subject<ILoginData>;
     public changePassword: Subject<string>;
     public changeEmail: Subject<string>;
     public login: Subject<IRequiredLoginData>;
     public logOut: Subject<string>;

     private errorResponse: any;
     private error: string;

     private apiUrl: string;

     constructor (private http: Http) {
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.createObservables();
        this.setupSendLoginRequestSubscription();
     }

     private createObservables(): void {
        this.login = <Subject<IRequiredLoginData>> new Subject();
        this.loginSuccess = <Subject<ISuccessfulLoginResponse>> new Subject();
        this.loginFail = <Subject<string>> new Subject();
        this.closeForm = <Subject<ILoginData>> new Subject();
        this.changePassword = <Subject<string>> new Subject();
        this.changeEmail = <Subject<string>> new Subject();
        this.logOut = <Subject<string>> new Subject();
     }

     private setupSendLoginRequestSubscription(): void {
        this.login.subscribe((data: IRequiredLoginData) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let email = data.username
            let formData = JSON.stringify({
                email: email,
                password: data.password
            });
            this.http.post(`${this.apiUrl}/auth`, formData
            , options)
                .map(response => response.json())
                .subscribe(data   => {
                    this.loginSuccess.next(data);
            }, 
                error => {
                    this.errorResponse = JSON.parse(error._body);
                    this.error = this.errorResponse.error.message;
                    this.loginFail.next(this.error);
                }
            );
        })
    }
}
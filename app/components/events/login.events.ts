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

     private errorResponse: any;
     private error: string;

     private LoginDataStore: {
         loading: boolean;
         username: string,
         password: string,
         error: string
     }

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
     }

     public getSubscription(): void {

     }

     private setupSendLoginRequestSubscription(): void {
        this.login.subscribe((data: IRequiredLoginData) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let formData = JSON.stringify({
                email: this.LoginDataStore.username,
                password: this.LoginDataStore.password
            });
            this.LoginDataStore.loading = true;
            this.http.post(`${this.apiUrl}/auth`, data
            , options)
                .map(response => response.json())
                .subscribe(data   => {
                    this.LoginDataStore.loading = false
                    this.loginDataStore.next(Object.assign({}, this.LoginDataStore));
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

    public addComment(){
        //TODO 
    }

}
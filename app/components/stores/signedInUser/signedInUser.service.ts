// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/Rx';
import { LoginService } from '../login/login.service';
import { JwtHelper } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface ISignedInUser {
    name: string,
    token: string,
    email: string,
    id: string,
    exp: number,
    iat: number
    admin: boolean;
    type: string;
}

@Injectable()
export class SignedInUserService {

     private successSubscription: Observable<LoginService>;
     
     private LoginDataStore: {
         loading: boolean;
         username: string,
         password: string,
     }

     private apiUrl: string;
     private token: string;
     private signedInUser: ISignedInUser;


    jwtHelper: JwtHelper = new JwtHelper();

    _SignedInUser = <BehaviorSubject<ISignedInUser>> new BehaviorSubject<ISignedInUser>(this.getDefaultUser());

    constructor (
        private LoginService: LoginService
    ) {
        //check is token exists in local storage first, decode it and notify subscribers

        this.checkForTokenInLocalSotrage();

        LoginService.getSuccessEvent()
            .subscribe((data) => {
                if(data.token){
                    this.setToken(data.token);
                    this.getDecodedToken();
                    this._SignedInUser.next(this.signedInUser);
                }
        });

        LoginService.getFailEvent()
            .skip(1)
            .subscribe((data) => {
                this.deleteJwt();
        });

    }

    private getDefaultUser(): ISignedInUser {
        return {
            name: null,
            token: null,
            email: null,
            id: null,
            exp: null,
            iat: null,
            admin: false,
            type: null
        }
    }

    private checkForTokenInLocalSotrage(): void {
        this.token = localStorage.getItem('id_token');
        if(this.token){
            this.getDecodedToken();
            this._SignedInUser.next(Object.assign({}, this.signedInUser));
        }
    }

     public getSignedInUserSubscription(): Observable<ISignedInUser> {
         return this._SignedInUser.asObservable();
     }

     private setToken(token) : void {
        this.token = token;
        localStorage.setItem('id_token', this.token);
     }

     private deleteJwt() {;
        localStorage.removeItem('id_token');
        this.token = localStorage.getItem('id_token');
        this._SignedInUser.next(Object.assign({}, this.getDefaultUser()));
    }

     private getDecodedToken(): void {
        this.signedInUser = this.jwtHelper.decodeToken(this.token);
        console.log("Signedin user is", this.signedInUser);
        this.signedInUser.token = localStorage.getItem('id_token');
        //temp method untill node model gets updated
        console.log("Token is", localStorage.getItem('id_token'));
     }

     public logOut(): void {
         this.deleteJwt();
         //TODO IMPLIMENT BLACKLISTING TOKEN ON NODE SERVER, WE JSUT DELETE ON THE CLIENT FOR NOW
     }

}
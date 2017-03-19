// Imports
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/Rx';
import { LoginService } from '../login/login.service';
import { JwtHelper } from 'angular2-jwt';
import { LoginEvents } from "../../events/login.events";

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
        private LoginService: LoginService,
        private LoginEvents: LoginEvents
    ) {
        //check is token exists in local storage first, decode it and notify subscribers

        this.checkForTokenInLocalSotrage();
        this.initGetLoginSuccessSubscription();
        this.initLoginFailSubscription();
        this.initLogoutSubscription()
    }

    private initLogoutSubscription(){
        this.LoginEvents.logOut.subscribe(() => {
            this.logOut();
        })
    }

    private initLoginFailSubscription(){

    }

    private initGetLoginSuccessSubscription(){
        this.LoginEvents.loginSuccess.subscribe((data) => {
            this.signedInUser = this.jwtHelper.decodeToken(data.token);
            this.setToken(data.token);
            this._SignedInUser.next(Object.assign({}, this.signedInUser));
        })
    }

    private isTokenExpired(): void {
         if(this.jwtHelper.isTokenExpired(this.token)) {
             this.deleteJwt();
         }
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
            this.isTokenExpired();
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
        this.signedInUser = this.getDefaultUser();
    }

     private getDecodedToken(): void {
        this.signedInUser = this.jwtHelper.decodeToken(this.token);
        //console.log("Signedin user is", this.signedInUser);
        this.signedInUser.token = localStorage.getItem('id_token');
        //ifd_token is default name that angular-2-jwt library looks to get a token from localstorage
        //console.log("Token is", localStorage.getItem('id_token'));
     }

     public logOut(): void {
         this.deleteJwt();
         this.signedInUser = this.getDefaultUser();
         this._SignedInUser.next(Object.assign({}, this.signedInUser));
         //TODO IMPLIMENT BLACKLISTING TOKEN ON NODE SERVER, WE JSUT DELETE ON THE CLIENT FOR NOW
     }

}
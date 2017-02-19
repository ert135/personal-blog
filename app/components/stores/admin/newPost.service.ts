// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { LoginEvents } from '../../events/login.events';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface INewPostDataStore {
    saving: boolean;
    title: string;
    pictureUrl: string;
}

@Injectable()
export class NewPostService {
    
     private _newPostDataStore: BehaviorSubject<INewPostDataStore>;

     private error: string;
     private errorResponse: any;
     private newPostDataStore: INewPostDataStore;

     private apiUrl: string;

     constructor (
         private http: Http,
         private LoginEvents: LoginEvents
     ) {
        this.error =  "";
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.newPostDataStore = this.getDefaultState();
        this._newPostDataStore = <BehaviorSubject<INewPostDataStore>> new BehaviorSubject(this.getDefaultState());
        this.setupTypeTitleSubscription();
     }

     private setupTypeTitleSubscription() {
        this.LoginEvents.login.subscribe((data) => {
            this.newPostDataStore.saving = true;
            this._newPostDataStore.next(this.newPostDataStore);
        })
     }

    private setupLoginSuccessSubscription() {
        this.LoginEvents.login.subscribe((data) => {
            this.newPostDataStore.saving = true;
            this._newPostDataStore.next(this.newPostDataStore);
        })
     }

     private getDefaultState(): INewPostDataStore {
        return {
            saving: false,
            title: "",
            pictureUrl: ""
        }
     }

     public getDataStore() {
         return this._newPostDataStore.asObservable();
     }


}
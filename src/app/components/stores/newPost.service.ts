// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { CreatePostEvents } from '../events/createPost.events';
import { appConfig } from '../../../../config/enviroment';

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
         private CreatePostEvents: CreatePostEvents
     ) {
        this.error =  "";
        this.apiUrl = appConfig.apiUrl;
        this.newPostDataStore = this.getDefaultState();
        this._newPostDataStore = <BehaviorSubject<INewPostDataStore>> new BehaviorSubject(this.getDefaultState());
        this.setupTypeTitleSubscription();
        this.setupTypePictureUrlSubscription();
     }

     private setupTypeTitleSubscription() {
        this.CreatePostEvents.changeTitle.subscribe((data: string) => {
            this.newPostDataStore.title = data;
            this._newPostDataStore.next(this.newPostDataStore);
        })
     }

    private setupTypePictureUrlSubscription() {
        this.CreatePostEvents.changePictureUrl.subscribe((data: string) => {
            this.newPostDataStore.pictureUrl = data;
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
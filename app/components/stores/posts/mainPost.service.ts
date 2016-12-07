/* * * ./app/comments/services/post.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/Rx';
import { PostListItem } from '../../models/post';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IPostData {
    posts: PostListItem[],
    loading: boolean
}

@Injectable()
export class MainPostService {
    
     posts: Observable<PostListItem[]>
     private _posts: BehaviorSubject<IPostData>;

     private postDataStore: {
         loading: boolean;
         posts: PostListItem[];
     }

     private apiUrl: string;

     constructor (private http: Http) {
        this.setDefaultLoadingState();
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.postDataStore = {
            posts: [],
            loading: true
        } 
        this._posts = <BehaviorSubject<IPostData>> new BehaviorSubject(this.getDefaultState());
     }

     public getDefaultState(): IPostData {
         return {
             posts: [],
             loading:true
         }
     }

     public getDataStore() {
         return this._posts.asObservable();
     }

     public loadAll() {
        this.postDataStore.loading = true;
        this.http.get(`${this.apiUrl}/posts`)
            .map(response => response.json())
            .subscribe(data => {
                this.postDataStore.posts = data;
                this.postDataStore.loading = false
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => console.log('Could not load posts.')
        );
    }

    public loadPost(id: number) {
        this.postDataStore.loading = true;
        this.http.get(`${this.apiUrl}/posts/${id}`)
            .map(response => response.json())
            .subscribe(data => {
                console.log("Data is", data);
                this.postDataStore.posts = data;
                this.postDataStore.loading = false
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => console.log('Could not load post.')
        );
    }

    public setDefaultLoadingState(): IPostData{
        return {
            posts: [],
            loading: true
        }
    }

}
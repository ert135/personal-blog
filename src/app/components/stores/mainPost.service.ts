/* * * ./app/comments/services/post.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from '../models/post';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IPostData {
    posts: PostListItem[],
    loading: boolean,
    error: string
}

@Injectable()
export class MainPostService {
    
     posts: Observable<PostListItem[]>
     
     private _posts: BehaviorSubject<IPostData> = new BehaviorSubject(this.getDefaultState());

     private postDataStore: {
         loading: boolean;
         posts: PostListItem[];
         error: string;
     }

     private apiUrl: string;
     

     constructor (private http: Http) {
        this.setDefaultLoadingState();
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.postDataStore = {
            posts: [],
            loading: true,
            error: ""
        } 
     }

     public getDefaultState(): IPostData {
         return {
             posts: [{
                 id: 0,
                 postedBy: "",
                 text: "",
                 comments: [
                     
                 ],
                 postedOn: "",
                 subtitle: "",
                 title: "",
                 top: false,
                 pictureUrl: ""
             }],
             loading:true,
             error: ""
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
            error => {
                let errorResponse = JSON.parse(error._body);
                this.postDataStore = this.getDefaultState();
                this.postDataStore.loading = false;
                this.postDataStore.error = errorResponse.error.message;
                this._posts.next(Object.assign({}, this.postDataStore));
            }
        );
    }

    public loadPost(id: number) {
        this.http.get(`${this.apiUrl}/posts/${id}`)
            .map(response => response.json())
            .subscribe(data => {
                this.postDataStore.posts = data;
                this.postDataStore.loading = false
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => {
                this.postDataStore.loading = false;
                let errorResponse = JSON.parse(error._body);
                this.postDataStore = this.getDefaultState();
                this.postDataStore.error = errorResponse.error.message;
                this._posts.next(Object.assign({}, this.postDataStore));
            }
        );
    }

    public setDefaultLoadingState(): IPostData {
        return {
            posts: [],
            loading: true,
            error: ""
        }
    }

}
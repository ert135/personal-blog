/* * * ./app/comments/services/post.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from '../../models/post';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IPostData {
    posts: PostListItem[],
    loading: boolean,
    error: string,
    openEditor: boolean;
}

@Injectable()
export class PostDetailService {
    
     posts: Observable<PostListItem[]>
     private _posts: BehaviorSubject<IPostData>;

     private postDataStore: {
         loading: boolean;
         posts: PostListItem[];
         error: string;
         openEditor: boolean;
     }

     private apiUrl: string;

     constructor (private http: Http) {
        this.setDefaultLoadingState();
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.postDataStore = {
            posts: [],
            loading: true,
            error: "",
            openEditor: false
        } 
        this._posts = <BehaviorSubject<IPostData>> new BehaviorSubject(this.getDefaultState());
     }

     public getDefaultState(): IPostData {
         return {
             posts: [],
             loading:true,
             error: "",
             openEditor: false
         }
     }

     public getDataStore() {
         return this._posts.asObservable();
     }

    public loadPost(id: number) {
        this.http.get(`${this.apiUrl}/posts/${id}`)
            .map(response => response.json())
            .subscribe(data => {
                console.log("Data is", data);
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
            error: "",
            openEditor: false
        }
    }

}
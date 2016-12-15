/* * * ./app/comments/services/post.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { PostListItem } from '../../models/post';
import { AuthHttp } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IPostData {
    posts: PostListItem[],
    loading: boolean,
    error: string,
    openEditor: boolean;
    commentText: string;
    savingComment: boolean;
}

@Injectable()
export class PostDetailService {
    
     posts: Observable<PostListItem[]>
     private _posts: Subject<IPostData>;

     private postDataStore: {
         loading: boolean;
         posts: PostListItem[];
         error: string;
         openEditor: boolean;
         commentText: string;
         savingComment: boolean;
         saveCommentError: string;
     }

     private apiUrl: string;

     constructor (private http: Http,
     public authHttp: AuthHttp
     ) {
        this.setDefaultLoadingState();
        this.apiUrl = 'http://blog-robertblog.rhcloud.com';
        this.postDataStore = {
            posts: [],
            loading: true,
            error: "",
            openEditor: false,
            commentText: "",
            savingComment: false,
            saveCommentError: ""
        } 
        this._posts = <Subject<IPostData>> new Subject();
     }

     public getDefaultState(): any {
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
        return this._posts;
     }

    public loadPost(id: number) {
        this._posts.next(this.getDefaultState());
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

    public createComment(id: number, user: number, username: string) {
        let headers = new Headers({ 'Content-Type': 'application/json',  });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify({
            text: this.postDataStore.commentText,
            user: user,
            userName: username
        });
        this.postDataStore.savingComment = true;
        this._posts.next(Object.assign({}, this.postDataStore));
        this.authHttp.post(`${this.apiUrl}/posts/${id}/comment`, data
        , options)
            .map(response => response.json())
            .subscribe(data  => {
                this.postDataStore.posts = [];
                this.postDataStore.posts.push(data);
                this.postDataStore.savingComment = false;
                this.postDataStore.openEditor = false;
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => {
                this.postDataStore.loading = false;
                let errorResponse = JSON.parse(error._body);
                this.postDataStore.savingComment = false;
                this.postDataStore.saveCommentError = errorResponse;
                this.postDataStore.error = errorResponse.error.message;
                this._posts.next(Object.assign({}, this.postDataStore));
            }
        );
    }

    public deleteComment(id: number, commentId: string) {
        let headers = new Headers({ 'Content-Type': 'application/json',  });
        let options = new RequestOptions({ headers: headers });
        this.postDataStore.savingComment = true;
        this._posts.next(Object.assign({}, this.postDataStore));
        this.authHttp.delete(`${this.apiUrl}/posts/${id}/comment/${commentId}`, options)
            .map(response => response.json())
            .subscribe(data  => {
                this.postDataStore.posts = [];
                this.postDataStore.posts.push(data);
                this.postDataStore.savingComment = false;
                this.postDataStore.openEditor = false;
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => {
                console.log("Error is", error);
            }
        );
    }


    public updateComment(text: string){
        this.postDataStore.commentText = text;
    }

    public showEditor() {
        this.postDataStore.openEditor = true;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public closeEditor() {
        this.postDataStore.openEditor = false;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public setDefaultLoadingState(): IPostData {
        return {
            posts: [],
            loading: true,
            error: "",
            openEditor: false,
            commentText: "",
            savingComment: false
        }
    }

}
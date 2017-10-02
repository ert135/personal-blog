/* * * ./app/comments/services/post.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { PostListItem } from '../models/post';
import { AuthHttp } from 'angular2-jwt';
import { SignedInUserService } from './signedInUser.service';
import { LoginEvents } from "../events/login.events";
import { appConfig } from '../../../../config/enviroment';

export interface IPostData {
    posts: PostListItem[],
    loading: boolean,
    error: string,
    openEditor: boolean;
    commentText: string;
    savingComment: boolean;
    editMode: boolean;
    editTitle: boolean;
    newTitleText: string;
    saving: boolean;
    editPost: boolean;
    newBodyText: string;
}

@Injectable()
export class PostDetailService {
    
     public posts: Observable<PostListItem[]>
     private _posts: Subject<IPostData>;

    private postDataStore: {
        loading: boolean;
        posts: PostListItem[];
        error: string;
        openEditor: boolean;
        commentText: string;
        savingComment: boolean;
        saveCommentError: string;
        editMode: boolean;
        editTitle: boolean;
        newTitleText: string;
        saving: boolean;
        editPost: boolean;
        newBodyText: string;
    }

    private apiUrl: string;

    constructor (
        private http: Http,
        public authHttp: AuthHttp,
        private SignedInUserService: SignedInUserService,
        private LoginEvents: LoginEvents
    ) {
        this.setDefaultLoadingState();
        this.apiUrl = appConfig.apiUrl;
        this.postDataStore = {
            posts: [],
            loading: true,
            error: "",
            openEditor: false,
            commentText: "",
            savingComment: false,
            saveCommentError: "",
            editMode: false,
            editTitle: false,
            newTitleText: "",
            saving: false,
            editPost: false,
            newBodyText: ""
        } 
        this._posts = <Subject<IPostData>> new Subject();
        this.getSignedInUserSubscription();
        this.getLogoutSubscription();
    }

    private getLogoutSubscription() {
        this.LoginEvents.logOut.subscribe(() => {
            // this.postDataStore = {
            //     posts: [],
            //     loading: true,
            //     error: "",
            //     openEditor: false,
            //     commentText: "",
            //     savingComment: false,
            //     saveCommentError: "",
            //     editMode: false,
            //     editTitle: false,
            //     newTitleText: "",
            //     saving: false,
            //     editPost: false,
            //     newBodyText: ""
            // } 
        })
    }

    private getSignedInUserSubscription() {
        this.SignedInUserService.getSignedInUserSubscription()
            .subscribe((data: any) => {
                if(data.id){
                    this.postDataStore.editMode = true;
                    this._posts.next(this.postDataStore);
                }
        })
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
                //TODO CREATE ERROR EVENT
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
            savingComment: false,
            editMode: false,
            editTitle: false,
            newTitleText: "",
            saving: false,
            editPost: false,
            newBodyText: ""
        }
    }

    public editTitle(): void {
        this.postDataStore.editTitle = true;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public cancelEditTitle(): void {
        this.postDataStore.editTitle = false;
        this.postDataStore.newTitleText = "";
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public typeEditTitle(newTitleText: string): void {
        this.postDataStore.newTitleText = newTitleText;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public saveNewTitle(id: number): void {
        let headers = new Headers({ 'Content-Type': 'application/json',  });
        let options = new RequestOptions({ headers: headers });
        this.postDataStore.saving = true;
        this._posts.next(Object.assign({}, this.postDataStore));
        this.authHttp.put(`${this.apiUrl}/posts/${id}`,{
            newData: {
                title: this.postDataStore.newTitleText
            }
        },options)
            .map(response => response.json())
            .subscribe(data  => {
                this.postDataStore.posts[0] = data;
                this.postDataStore.editTitle = false;
                this.postDataStore.saving = false;
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => {
                console.log("Error is", error);
            }
        );
    }

    public editPostBody(): void {
        this.postDataStore.editPost = true;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public cancelEditPostBody(): void {
        this.postDataStore.editPost = false;
        this.postDataStore.newBodyText = "";
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public typeNewPostBody(newText: string): void {
        this.postDataStore.newBodyText = newText;
        this._posts.next(Object.assign({}, this.postDataStore));
    }

    public saveNewPostBody(id: number): void {
        let headers = new Headers({ 'Content-Type': 'application/json',  });
        let options = new RequestOptions({ headers: headers });
        this.postDataStore.saving = true;
        this._posts.next(Object.assign({}, this.postDataStore));
        this.authHttp.put(`${this.apiUrl}/posts/${id}`,{
            newData: {
                postBody: this.postDataStore.newBodyText
            }
        },options)
            .map(response => response.json())
            .subscribe(data  => {
                this.postDataStore.posts[0] = data;
                this.postDataStore.editPost = false;
                this.postDataStore.saving = false;
                this._posts.next(Object.assign({}, this.postDataStore));
        }, 
            error => {
                console.log("Error is", error);
            }
        );
    }
	
}


import { Component, ViewChild, NgModule } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MainPostService } from './stores/mainPost.service'
import { PostDetailService } from './stores/post-detail.service'
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { SignedInUserService } from './stores/signedInUser.service';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainHeader } from './main-header';
import { loginModalWrapper } from './modalDirective';
import { Editor } from './editor.component';
import { 
	animate, 
    trigger, 
    state, 
    style, 
    transition } from '@angular/core';

import { LoginModal } from './login.component';

@Component({
    selector: 'post-detail',
    template: `
        <div 
            class="no-gutter detail-page-container"  
            *ngIf="error" 
            [@loadingState]="loading == false"
        >
            <h1 class="post-detail__title">
                {{error}}
            </h1>
        </div>
        <div 
            class="no-gutter detail-page-container"  
            *ngIf="(loading == false) && (!error)" 
            [@loadingState]="loading == false"
        >
            <div class="post-detail">
                <aside class="post-detail__aside">
                    <div 
                        class="post-detail__aside-image" 
                        [ngStyle]="{ 'background-image': 'url(' + post.pictureUrl + ')'}"
                    >
                    </div>
                </aside>
                <div class="post-detail__content">
                    <h1 
                        class="post-detail__title"
                        *ngIf="editTitle == false"
                    >
                        {{post.title}}
                        <span 
                            class="post-detail__title-edit-icon glyphicon glyphicon-pencil"
                            (click)="toggleEditTitle()"
                            *ngIf="editMode && user.id"
                        >
                        </span>
                    </h1>
                    <div 
                        class="post-detail__input-container"
                        *ngIf="editTitle" 
                    >
                        <div 
                            class="post-detail__input-group" 
                        >      
                            <input 
                                class="login-modal__input" 
                                [ngModel]="post.title" 
                                (ngModelChange)="typeNewTitle($event)"
                                [ngModelOptions]="{standalone: true}"
                            >
                            <span class="highlight"></span>
                            <span class="bar"></span>
                        </div>
                        <span 
                            class="post-detail__title-edit-icon glyphicon glyphicon-remove"
                            (click)="cancelEditTitle()"
                        >
                        </span>
                        <span 
                            class="post-detail__title-edit-icon glyphicon glyphicon-ok"
                            (click)="saveNewTitle()"
                        >
                        </span>
                    </div>
                    <div class="post-detail__info-bar">
                        <h2 class="post-detail__info-text post-detail__info-text--first">
                            {{post.postedBy}}
                        </h2>
                        <h2 class="post-detail__info-text">
                            {{post.postedOn}}
                        </h2>
                    </div>
                    <div class="post-detail__post-body">
                        <div 
                            [innerHTML]="post.postBody"
                            *ngIf="!editPost"
                        ></div>
                        <htmleditor
                            *ngIf="editPost"
                            [text]="post.postBody"
                            (textUpdated)="typeNewPostBody($event)"
                        ></htmleditor>
                        <span 
                            class="post-detail__body-edit-icon glyphicon glyphicon-pencil"
                            (click)="toggleEditPost()"
                            *ngIf="user.id"
                        >
                        </span>
                        <div 
                            class="post-detail__body-save-buttons"
                            *ngIf="editPost"
                        >
                            <span 
                                class="post-detail__title-edit-icon glyphicon glyphicon-remove"
                                (click)="cancelEditPostBody()"
                            >
                            </span>
                            <span 
                                class="post-detail__title-edit-icon glyphicon glyphicon-ok"
                                (click)="saveNewPostBody()"
                            >
                            </span>
                        </div>
                    </div>
                    <div class="post-detail__comments">
                        <div class="post-detail__comments-header">
                            Comments 
                        </div>
                        <div >
                            <div class="post-detail__comments" *ngFor='let post of post.comments'>
                                <div 
                                    class="post-detail__comment-delete" 
                                    (click)="deleteComment(post._id)"
                                    *ngIf="user.type == 'admin'"
                                >
                                    <span class="glyphicon glyphicon-remove"></span>
                                </div>
                                <div class="post-detail__comment">
                                    <div class="post-detail__comment-circle">
                                         <span class="post-detail__user-icon glyphicon glyphicon-user"></span>
                                    </div>
                                    <div class="post-detail__comment-body">
                                        <h2 class="post-detail__comments-user-name"> {{post.userName}} </h2>
                                        <h3 class="post-detail__timestamp"> {{post.postedOn}} </h3>
                                        <div class="post-detail__comment-text"> {{post.text}} </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-detail__add-comments-button" 
                             *ngIf="user.id && !editMode" 
                             (click)='showEditor()'>
                                Add comment
                        </div>
                        <div 
                            class="post-detail__sign-in-message" 
                            *ngIf="!user.id" 
                            (click)="openLoginModal()"
                        >
                            Sign in to leave a comment
                        </div>
                        <div 
                            *ngIf="editMode && user.id && !savingComment"
                            [@loadingState]="editmode == false"
                        >
                            <editor
                                (textUpdated)="updateCommentText($event)"
                                (submit)="submitComment($event)"
                            ></editor>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div loginmodalwrapper></div>
    `,
    animations: [
        trigger('loadingState', [
            transition(':enter', [ 
            style({opacity:0}),
                animate(300, style({opacity:1})) 
            ]),
            transition(':leave', [  
                animate(300, style({opacity:0})) 
            ])
        ])
    ],
    host: {'class' : 'page1Container'}
})
export class PostDetailComponent {
	posts: Observable<PostListItem[]>;
	singlePost$: Observable<PostListItem>;

    //typings dont have the unsubscribe method - so using any for subs
    userSubscription: any;

	postObservable: any;
    loading: boolean;
    private error: string;
    private user: any;
    private routeSubscription: any;
    private post: any;
    private editMode: boolean;
    private comment: string;
    private savingComment: boolean;
    private editTitle: boolean;
    private boolean: string;
    private editPost: boolean;
    private newPostText: string;

	constructor(
		private PostDetailService: PostDetailService,
        private route: ActivatedRoute,
        private SignedInUserService: SignedInUserService
	) {
        this.error = null;
        this.post = [];
	}

    @ViewChild(loginModalWrapper) dialogAnchor: loginModalWrapper;
    public openLoginModal() {
        //any used below to make the compiler behave itself
        //TODO make anchor component generic to allow passing in any component to display
        this.dialogAnchor.createDialog(<any>LoginModal);
    }
	
	ngOnInit() {
        this.postObservable = this.PostDetailService.getDataStore()
			.subscribe((data) => {
                this.loading = data.loading;
                this.post = data.posts[0];
                this.error = data.error;
                this.editMode = data.openEditor;
                this.comment = data.commentText;
                this.savingComment = data.savingComment;
                this.editMode = data.editMode;
                this.editTitle = data.editTitle;
                this.editPost = data.editPost;
                this.newPostText = data.newBodyText;
		})

        this.route.params
            .map((paramaterValueArray) => paramaterValueArray['id'])
                .subscribe((id: number) => {
                    this.PostDetailService.loadPost(id)
            });

       let userSubscription =  this.SignedInUserService.getSignedInUserSubscription()
            .subscribe((data: any) => {
               if(data){
                   this.user = data;
               }
        })
	}

    public showEditor() {
        this.PostDetailService.showEditor();
    }

    public hideEditor() {
        this.PostDetailService.showEditor();
    }

    public updateCommentText(text: string) {
        this.PostDetailService.updateComment(text);
    }

    public submitComment() {
        this.PostDetailService.createComment(this.post.id, this.user.id, this.user.name);
    }

    public deleteComment(commentId: string) {
        this.PostDetailService.deleteComment(this.post.id, commentId);
    }

    public savePost(): void {

    }

    private getPostDate(date){
        console.log("Post date is", date);
    }

    toggleEditTitle() {
        this.PostDetailService.editTitle();
    }

    ngOnDestroy() {
        this.PostDetailService.closeEditor();
        this.postObservable.unsubscribe();
    }
	
	onSubmit() {

	}

    cancelEditTitle(): void {
        this.PostDetailService.cancelEditTitle();
    }

    typeNewTitle(event: string): void {
        this.PostDetailService.typeEditTitle(event);
    }

    toggleEditPost(): void {
        this.PostDetailService.editPostBody();
    }

    cancelEditPostBody(): void {
        this.PostDetailService.cancelEditPostBody();
    }

    typeNewPostBody(event): void {
        console.log("Event is", event);
        this.PostDetailService.typeNewPostBody(event);
    }

    saveNewPostBody(): void {
        this.PostDetailService.saveNewPostBody(this.post.id);
    }

    saveNewTitle(): void {
        this.PostDetailService.saveNewTitle(this.post.id);
    }

}
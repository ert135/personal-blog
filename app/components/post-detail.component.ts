import { Component, ViewChild, NgModule } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MainPostService } from './stores/posts/mainPost.service'
import { PostDetailService } from './stores/posts/post-detail.service'
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { SignedInUserService } from './stores/signedInUser/signedInUser.service';
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
        <div class="no-gutter detail-page-container"  *ngIf="error" [@loadingState]="loading == false">
            <h1 class="post-detail__title">
                {{error}}
            </h1>
        </div>
        <div class="no-gutter detail-page-container"  *ngIf="(loading == false) && (!error)" [@loadingState]="loading == false">
            <div class="post-detail">
                <aside class="post-detail__aside">
                    <div class="post-detail__aside-image" [ngStyle]="{ 'background-image': 'url(' + post.pictureUrl + ')'}">
                    </div>
                </aside>
                <div class="post-detail__content">
                    <h1 class="post-detail__title">
                        {{post.title}}
                    </h1>
                    <div class="post-detail__info-bar">
                        <h2 class="post-detail__info-text post-detail__info-text--first">
                            {{post.postedBy}}
                        </h2>
                        <h2 class="post-detail__info-text">
                            {{post.postedOn}}
                        </h2>
                    </div>
                    <div class="post-detail__post-body">
                        {{post.postBody}}
                    </div>
                    <div class="post-detail__comments">
                        <div class="post-detail__comments-header">
                            Comments 
                        </div>
                        <div >
                            <div class="post-detail__comments" *ngFor='let post of post.comments'>
                                <div class="post-detail__comment-delete" 
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
                                        <div class="post-detail__comment-text">{{post.text}} </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post-detail__add-comments-button" 
                             *ngIf="user.id && !editMode" 
                             (click)='showEditor()'>
                                Add comment
                        </div>
                        <div class="post-detail__sign-in-message" *ngIf="!user.id" (click)="openLoginModal()">
                            Sign in to leave a comment
                        </div>
                        <div *ngIf="editMode && user.id && !savingComment"
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
    //typings donmt have the unsubscribe method
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
        //TODO make anhcor component generic to allow passing in any component to display
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
                console.log("Data is", data.savingComment);
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
                   console.log("this.user is", this.user);
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

    ngOnDestroy() {
        this.PostDetailService.closeEditor();
        this.postObservable.unsubscribe();
    }
	
	onSubmit() {
		//this.todoService.create({ value: this.todoForm.controls.todo.value });
	}

	
}
import { Component, ViewChild, NgModule } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MainPostService } from '../stores/posts/mainPost.service'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from '../models/post';
import { SignedInUserService } from '../stores/signedInUser/signedInUser.service';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainHeader } from '../main-header';
import { loginModalWrapper } from '../modalDirective';
import { 
	animate, 
    trigger, 
    state, 
    style, 
    transition } from '@angular/core';

@Component({
    selector: 'user-detail',
    template: `
        <div class="no-gutter detail-page-container" [@loadingState]="loading == false">
            <div class="admin-page">
                <div class="admin-page__section">
                    <h1 class="admin-page__title">
                        New Post
                    </h1>
                    <div class="admin-page__content">
                        <form>
                            <h2 class="admin-page__sub-title">
                                New Post
                            </h2>
                            <div class="login-modal__input-group">      
                                <input class="login-modal__input" 
                                    [ngModel]="username" 
                                    (ngModelChange)="onEnterEmail($event)"
                                    [ngModelOptions]="{standalone: true}"
                                >
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label class="login-modal__label">Email</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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
export class AdminComponent {
	posts: Observable<PostListItem[]>;
	singlePost$: Observable<PostListItem>;
	post: any;
    loading: boolean;
    error: string;
    comments: any;
    user: any;

	constructor(
        private route: ActivatedRoute,
        private SignedInUserService: SignedInUserService
	) {
        this.error = null;
	}

            //<htmleditor></htmleditor>
        //         req.body.title && 
        // req.body.pictureUrl &&
        // req.body.postedBy &&
        // req.body.postBody &&
        // req.body.subtitle 

    @ViewChild(loginModalWrapper) dialogAnchor: loginModalWrapper;
	ngOnInit() {
        this.SignedInUserService.getSignedInUserSubscription()
            .subscribe((data: any) => {
               if(data){
                   this.user = data
                   console.log("Data from user service is currently", data);
               }
        })
	}

	
}
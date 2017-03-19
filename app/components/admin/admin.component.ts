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
import { LoginEvents } from '../events/login.events';
import { LoginService } from '../stores/login/login.service';

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
                            <div class="login-modal__input-group">   
                            {{data.username}}   
                                <input class="login-modal__input" 
                                    [ngModel]="username" 
                                    (ngModelChange)="onEnterEmail($event)"
                                    [ngModelOptions]="{standalone: true}"
                                >
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label class="login-modal__label">Title</label>
                            </div>
                            <htmleditor></htmleditor>
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
    data: any;

	constructor(
        private route: ActivatedRoute,
        private SignedInUserService: SignedInUserService,
        private LoginEvents: LoginEvents,
        private LoginService: LoginService
	) {
        this.error = null;
        this.LoginService.getDataStore().subscribe((data) => {
            this.data = data;
        })

        this.LoginEvents.logOut.subscribe((data) =>  {

        })
	}

        //<htmleditor></htmleditor>
        // req.body.title && 
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
               }
        })

	}

	
}
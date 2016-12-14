import { Component, ViewChild, NgModule } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MainPostService } from './stores/posts/mainPost.service'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { SignedInUserService } from './stores/signedInUser/signedInUser.service';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainHeader } from './main-header';
import { loginModalWrapper } from './modalDirective';
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
            <h1 class="post-detail__title">
                User detail component
            </h1>
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
export class UserDetailComponent {
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
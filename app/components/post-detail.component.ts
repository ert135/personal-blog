
import { Component } from '@angular/core';
import { MainPostService } from './stores/posts/mainPost.service'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { 
	animate, 
    trigger, 
    state, 
    style, 
    transition } from '@angular/core';

@Component({
    selector: 'main-page',
	providers: [MainPostService],
    template: `
	<div class="no-gutter detail-page-container"  *ngIf="loading == false" [@loadingState]="loading == false">
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
                    <div>
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
export class PostDetailComponent {
	posts: Observable<PostListItem[]>;
	singlePost$: Observable<PostListItem>;
	post: any;
    loading: boolean;
	
	constructor(
		private postService: MainPostService,
        private route: ActivatedRoute
	) {

	}
	
	ngOnInit() {
        this.route.params
        .map(params => params['id'])
        .subscribe((id: number) => {
            this.postService.loadPost(id);
        });

        this.post = this.postService.getDataStore()
			.subscribe((data) => {
                this.loading = data.loading;
                this.post = data.posts[0];
                console.log("Post is now, ", this.post);
		})
	}
	
	onSubmit() {
		//this.todoService.create({ value: this.todoForm.controls.todo.value });
	}
	
}
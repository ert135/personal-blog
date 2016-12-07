
import { Component } from '@angular/core';
import { MainPostService } from './stores/posts/mainPost.service'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'main-page',
	providers: [MainPostService],
    template: `
	<div class="no-gutter detail-page-container">
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
    host: {'class' : 'ng-animate page1Container'}
})
export class PostDetailComponent {
	posts: Observable<PostListItem[]>;
	singlePost$: Observable<PostListItem>;
	post: any;
    asd : string;
	
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
                this.post = data.posts[0];
                console.log("Post is now, ", this.post);
		})
	}
	
	onSubmit() {
		//this.todoService.create({ value: this.todoForm.controls.todo.value });
	}
	
}

import { Component } from '@angular/core';
import { MainPostService } from './stores/posts/mainPost.service'
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { PostListItem } from './models/post';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'main-page',
	providers: [MainPostService],
    template: `
	<div class="no-gutter main-page-container">
		<div class="col-md-6" *ngFor='let post of postItems'>
			<figure [ngStyle]="{ 'background-image': 'url(' + post.pictureUrl + ')'}"
					class="callpost" 
					data-num="1"
					data-property="border-width" 
					data-from="0" 
					data-to="35px"
			>
				<div class="content">
					<div class="content-wraper">
						<h2>{{post.title}}</h2>
						<div class="comment-count">{{post.comments}} Comments <i class="fa fa-comments-o"></i> </div>
						<div class="excerpt">{{post.subtitle}} </div>
						<div class="postinfo"><span>{{post.postedOn}}</span> </div>
					</div>
				</div>
			</figure>
		</div>
	</div>
    `,
    host: {'class' : 'ng-animate page1Container'}
})
export class MainPage {
	posts: Observable<PostListItem[]>;
	singlePost$: Observable<PostListItem>;
	postItems: any;
	
	constructor(
		private postService: MainPostService
	) {
		this.postItems = []
	}
	
	ngOnInit() {
		this.postService.loadAll();
		
		this.postService.getDataStore()
			.subscribe((data) => {
			this.postItems = data.posts;
		})

		//this.postSerivice.load('1');
	}
	
	onSubmit() {
		//this.todoService.create({ value: this.todoForm.controls.todo.value });
	}
	
	deleteTodo(todoId: number) {
		// this.todoService.remove(todoId);
	}
}
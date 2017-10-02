// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { appConfig } from '../../../../config/enviroment';

export interface ISubmitPostModel {
    title: string;
    pictureUrl: string;
    postedBy: string;
    postBody: string;
    subtitle: string;
}

@Injectable()
export class CreatePostEvents {

     public changeTitle: Subject<string>;
     public changePictureUrl: Subject<string>;
     public changePostBody: Subject<string>;
     public changeSubtitle: Subject<string>;
     public submitPost: Subject<ISubmitPostModel>;
     public submitPostCompleted: Subject<{}>;
     public submitPostFailed: Subject<string>;

     private errorResponse: any;
     private error: string;
     private apiUrl: string;

    constructor (private http: Http) {
        this.apiUrl = appConfig.apiUrl;
        this.createObservables();
        this.setupSendNewPostRequestSubscription();
    }

    private createObservables(): void {
        this.changeTitle = <Subject<string>> new Subject();
        this.changePictureUrl = <Subject<string>> new Subject();
        this.changePostBody = <Subject<string>> new Subject();
        this.changeSubtitle = <Subject<string>> new Subject();
        this.submitPostCompleted = <Subject<{}>> new Subject();
        this.submitPostFailed = <Subject<string>> new Subject();
    }

    private setupSendNewPostRequestSubscription(): void {
        this.submitPost.subscribe((data: ISubmitPostModel) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let formData = JSON.stringify({
                title: data.title,
                pictureUrl: data.pictureUrl,
                postedBy: data.postedBy,
                postBody: data.postBody,
                subtitle: data.subtitle
            });
            this.http.post(`${this.apiUrl}/posts`, formData
            , options)
                .map(response => response.json())
                .subscribe(data => {
                    this.submitPostCompleted.next(data);
            }, 
                error => {
                    this.errorResponse = JSON.parse(error._body);
                    this.error = this.errorResponse.error.message;
                    this.submitPostFailed.next(this.error);
                }
            );
        })
    }

    public addComment(){
        //TODO 
    }

}
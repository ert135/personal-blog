/* * * ./app/comments/model/post.ts * * */
export class PostListItem {
    constructor(
        public id: number, 
        public postedBy: string, 
        public text:string,
        public comments: any[],
        public postedOn: string,
        public subtitle: string,
        public title: string,
        public top: boolean,
        public pictureUrl: string
    ){}
}
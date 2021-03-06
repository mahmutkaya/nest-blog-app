/*
Data transfer object (dto) will help define how data will be sent over the network 
and control how data will be posted from the application to the database.
*/
export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly image: string[];
    readonly author: string;
    readonly datePosted: string;
}
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import {CreatePostDTO} from './dto/createPost.dto'

@Injectable()
export class BlogService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }
    
    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await this.postModel(createPostDTO);
        return newPost.save();
    }
    async getPost(postID): Promise<Post> {
        const post = await this.postModel.findById(postID).exec();
        return post;
    }
    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }
/*
Something to note when using Promises in combination with 
Mongoose async operations is that Mongoose queries are not Promises.
Queries do return a thenable, but if you need a real Promise you should use the exec method.
*/
    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel.findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
    }
    async deletePost(postID): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postID);
        return deletedPost;
    }
}

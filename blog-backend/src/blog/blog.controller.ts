import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Param,
    NotFoundException,
    Post,
    Body,
    Put,
    Query,
    Delete
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/createPost.dto';
import {ValidateObjectId} from './shared/pipes/validateObjectId.pipes'

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }
    
    // submit a post
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);

        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully',
            post: newPost,
        })
    }
    // fetch a particular post using ID
    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);


        if (!post) {
            throw new NotFoundException('Post does not exist!');
        }
        console.log('ressss', res)
        console.log('post', post)
        return res.status(HttpStatus.OK).json(post)
    }
    // fetch all posts
    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();

        return res.status(HttpStatus.OK).json(posts)
    }
    // edit a post
    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO,
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);

        if (!editedPost) throw new NotFoundException('post does not exist!');

        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost,
        })
    }
    // delete a post using ID
    @Delete('/delete')
    async deletePost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
    ) {
        const deletedPost = await this.blogService.deletePost(postID);

        if (!deletedPost) throw new NotFoundException('post does not exist!');

        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted',
            post: deletedPost,
        })
    }
}

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogSchema } from './schemas/blog.schema';
import { AuthenticationMiddleware } from '../common/authentication.middleware';

@Module({
  imports: [
    //MongooseModule.forFeature method to define which models should be registered in the module. 
    //Without this, injecting the PostModel within the BlogService using @injectModel() decorator wouldn’t work.
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      //any subsequent requests without an Access Token to the following routes will not be allowed by the application
      { method: RequestMethod.POST, path: '/blog/post' },
      { method: RequestMethod.PUT, path: '/blog/edit' },
      { method: RequestMethod.DELETE, path: '/blog/delete' },
    )
  }
}

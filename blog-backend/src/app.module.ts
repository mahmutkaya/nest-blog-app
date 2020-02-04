import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

const uri = `mongodb+srv://${process.env.name}:${process.env.password}@blog-app-nsbk6.azure.mongodb.net/test?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(uri, {useNewUrlParser: true}),
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

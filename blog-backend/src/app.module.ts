import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true }),
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

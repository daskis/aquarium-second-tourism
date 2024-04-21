import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ChatModule} from "../chat/chat.module";
import {MessageModule} from "../message/message.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [ChatModule, MessageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

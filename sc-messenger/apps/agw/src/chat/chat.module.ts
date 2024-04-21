import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {HttpModule} from "@nestjs/axios";
import {MessageModule} from "../message/message.module";

@Module({
  imports: [HttpModule, MessageModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}

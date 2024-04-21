import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {MessageModule} from "../../../messages/src/message/message.module";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {UserModule} from "../../../user-service/src/user/user.module";

@Module({
  providers: [ChatService, MessageModule, UserModule],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}

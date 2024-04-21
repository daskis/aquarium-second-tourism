import {Body, Controller, Post} from '@nestjs/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {ChatService} from "../../../chats/src/chat/chat.service";
import {Message, Prisma} from "@messenger/prisma-clients/messages";
import {MessageService} from "./message.service";
import { v4 as uuidv4 } from 'uuid';

@Controller('message')
export class MessageController {
  constructor(
              private readonly messageService: MessageService) {}

  @Post('get-with-params')
  async getMessage(
    @Body() params: Prisma.MessageFindManyArgs,
  ): Promise<Partial<Message[]> | null> {
    try {
      const res = this.messageService.get(params);
      return res;
    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createMessage(
    @Body() sectionData: Prisma.MessageCreateInput,
  ): Promise<Partial<Message> | null> {
    console.log("INFO: MESSAGE SERVICE - Called CREATE new message api");
    const { uuid } = uuidv4();

    const newData: Prisma.MessageCreateInput = {
      ...sectionData,
      uuid: uuid
    };

    console.log("INFO: MESSAGE SERVICE - Creating new message with data: ", newData);

    return this.messageService.create(newData);
  }
}

import {Body, Controller, Post} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {ChatService} from "./chat.service";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('get-with-params')
  async getMatrix(
    @Body() params: Prisma.ChatFindManyArgs,
  ): Promise<Partial<Chat[]> | null> {
    try {
      const res = this.chatService.get(params);
      return res;
    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createMatrix(
    @Body() sectionData: Prisma.ChatCreateInput,
  ): Promise<Partial<Chat> | null> {
    console.log("INFO: CHAT SERVICE - Called CREATE new chat api");
    const { uuid } = uuidv4();

    const newData: Prisma.ChatCreateInput = {
      ...sectionData,
      uuid: uuid
    };

    return this.chatService.create(newData);
  }
}

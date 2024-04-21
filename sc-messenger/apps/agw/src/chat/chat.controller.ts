import {Body, Controller, Post} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";
import {MessageService} from "../message/message.service";
import {Message} from "@messenger/prisma-clients/messages";

type ChatCreateCrudInput = {
  sendedInDate?: string | null
  name: string
  type: string
}

export type ChatsListMessage = {
  uuid: string,
  avatar: string,
  name: string,
  last_message: Message,
}

@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService, private readonly messageService: MessageService) {}

  @Post('/get')
  async handleGetChatsRequest(@Body() data: Prisma.ChatFindManyArgs): Promise<Partial<Chat[]> | null> {
    try {
      const res = await this.chatService.get(data);
      return res;
    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('/get-list')
  async handleGetListChatsRequest(@Body() data: Prisma.ChatFindManyArgs): Promise<ChatsListMessage[]> {
    try {
      const chats = await this.chatService.get(data);

      const messages: ChatsListMessage[] = [];

      for (const chat of chats) {
        const lastMessageArr = await this.messageService.get({
          where: {
            chatUUID: chat.uuid,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1
        });

        const lastMessage = lastMessageArr[0];

        if (lastMessageArr.length > 0) {
          const lastMessage = lastMessageArr[0];
          lastMessage['text'] = lastMessage['text'].length > 20 ? lastMessage['text'].substring(0, 20) + '...' : lastMessage['text'];
          console.log(lastMessage['uuid']);
        } else {
          console.log('No last messages found for the given chat.');
        }

        const msg: ChatsListMessage = {
          uuid: chat.uuid,
          avatar: 'https://i.pinimg.com/originals/1d/51/1d/1d511d37e7af17e14d28d6cda6f51b3d.jpg',
          name: chat.name,
          last_message: lastMessage,
        };

        messages.push(msg);
      }

      return messages;


    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createChat(
    @Body() sectionData: ChatCreateCrudInput,
  ): Promise<Partial<Chat> | null> {

    const newData: Prisma.ChatCreateInput = {
      ...sectionData,
      creatorUUID: "12345",
    };

    return this.chatService.create(newData);
  }
}

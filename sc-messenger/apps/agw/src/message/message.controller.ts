import {Body, Controller, Post} from '@nestjs/common';
import {Message, Prisma} from "@messenger/prisma-clients/messages";
import {MessageService} from "./message.service";
import {MessageCreateCrudInput} from "@messenger/api";


@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/get')
  async handleGetMessagesRequest(@Body() data: Prisma.MessageFindManyArgs): Promise<Partial<Message[]> | null> {
    try {
      const res = await this.messageService.get(data);
      return res;
    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createMessage(
    @Body() sectionData: MessageCreateCrudInput
  ): Promise<Partial<Message> | null> {

    const newData: Prisma.MessageCreateInput = {
      ...sectionData,
      creatorUUID: "12345",
    };

    return this.messageService.create(newData);
  }
}

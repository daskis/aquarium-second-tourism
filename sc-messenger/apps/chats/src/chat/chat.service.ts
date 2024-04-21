import { Injectable } from '@nestjs/common';
import {ChatsClient} from "@messenger/prisma-clients";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";

@Injectable()
export class ChatService {
  private prisma: ChatsClient;
  constructor() {
    this.prisma = new ChatsClient()
  }

  async create(data: Prisma.ChatCreateInput): Promise<Partial<Chat> | null> {
    try {
      this.prisma.$connect();
      const chat = await this.prisma.chat.create({
        data,
      });
      this.prisma.$disconnect();
      console.log("INFO: CREATION:");
      console.log(chat);
      return chat;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: Prisma.ChatFindManyArgs): Promise<Partial<Chat[]> | null> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      this.prisma.$connect();
      const chats = this.prisma.chat.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
      this.prisma.$disconnect();
      return chats;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }


}

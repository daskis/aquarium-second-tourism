import { Injectable } from '@nestjs/common';
import {MessagesClient} from "@messenger/prisma-clients";
import {Message, Prisma} from "@messenger/prisma-clients/messages";

@Injectable()
export class MessageService {
  private prisma: MessagesClient;
  constructor() {
    this.prisma = new MessagesClient()
  }

  async create(data: Prisma.MessageCreateInput): Promise<Partial<Message> | null> {
    try {
      this.prisma.$connect();
      const message = await this.prisma.message.create({
        data,
      });
      this.prisma.$disconnect();
      console.log("INFO: CREATION:");
      console.log(message);
      return message;
    } catch (e: any) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: Prisma.MessageFindManyArgs): Promise<Partial<Message[]> | null> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      this.prisma.$connect();
      const messages = this.prisma.message.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
      this.prisma.$disconnect();
      return messages;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }
}

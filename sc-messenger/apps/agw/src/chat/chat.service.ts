import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  CHAT_SERVICE_URL = (process.env.CHAT_SERVICE_PROTOCOL || 'http://') +
    (process.env.CHAT_SERVICE_HOST || 'localhost') + ':' +
    (process.env.CHAT_SERVICE_PORT || 3000) +
    '/api/chat/';

  async get(data: Prisma.ChatFindManyArgs): Promise<Partial<Chat[]> | null> {
    try {
      const response = await this.httpService.post(this.CHAT_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: Prisma.ChatCreateInput): Promise<Partial<Chat> | null> {
    console.log(data);
    console.log(this.CHAT_SERVICE_URL);
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.CHAT_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

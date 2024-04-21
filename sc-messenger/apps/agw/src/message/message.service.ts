import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Message, Prisma} from "@messenger/prisma-clients/messages";

@Injectable()
export class MessageService {
  constructor(private readonly httpService: HttpService) {}

  MESSAGE_SERVICE_URL = (process.env.MESSAGES_SERVICE_PROTOCOL || 'http://') +
    (process.env.MESSAGES_SERVICE_HOST || 'localhost') + ':' +
    (process.env.MESSAGES_SERVICE_PORT || 3000) +
    '/api/message/';

  async get(data: Prisma.MessageFindManyArgs): Promise<Partial<Message[]> | null> {
    try {
      const response = await this.httpService.post(this.MESSAGE_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: Prisma.MessageCreateInput): Promise<Partial<Message> | null> {
    console.log(data);
    console.log(this.MESSAGE_SERVICE_URL);
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.MESSAGE_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

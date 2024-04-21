import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {User, Prisma} from "@messenger/prisma-clients/UserProfile";
import {UserCreateCrudInput} from "@messenger/api";

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  USER_PROFILE_SERVICE_URL = (process.env.USER_SERVICE_PROTOCOL || 'http://') +
    (process.env.USER_SERVICE_HOST || 'localhost') + ':' +
    (process.env.USER_SERVICE_PORT || 3000) +
    '/api/user/';

  async get(data: Prisma.UserFindManyArgs): Promise<Partial<User[]> | null> {
    try {
      const response = await this.httpService.post(this.USER_PROFILE_SERVICE_URL + 'get-with-params', data).toPromise();
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(data: UserCreateCrudInput): Promise<Partial<User> | null> {
    console.log(data);
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.httpService.post(this.USER_PROFILE_SERVICE_URL + 'create', data).toPromise();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import {UserProfileClient} from "@messenger/prisma-clients";
import {Prisma, User} from "@messenger/prisma-clients/UserProfile";
import {Message} from "@messenger/prisma-clients/messages";

@Injectable()
export class UserService {
  private prisma: UserProfileClient;
  constructor() {
    this.prisma = new UserProfileClient()
  }

  async create(data: Prisma.UserCreateInput): Promise<Partial<User> | null> {
    try {
      this.prisma.$connect();
      const user = await this.prisma.user.create({
        data,
      });
      this.prisma.$disconnect();
      console.log("INFO: CREATION:");
      console.log(user);
      return user;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  async get(params: Prisma.UserFindManyArgs): Promise<Partial<User[]> | null> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      this.prisma.$connect();
      const users = this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
      this.prisma.$disconnect();
      return users;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }
}

import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {User, Prisma} from "@messenger/prisma-clients/UserProfile";
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('get-with-params')
  async getUsers(
    @Body() params: Prisma.UserFindManyArgs,
  ): Promise<Partial<User[]> | null> {
    try {
      const res = this.userService.get(params);
      return res;
    }catch (e) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createUser(
    @Body() sectionData: Prisma.UserCreateInput,
  ): Promise<Partial<User> | null> {
    try {
      console.log("INFO: USER PROFILE SERVICE - Called CREATE new user api");
      const { uuid } = uuidv4();

      const newData: Prisma.UserCreateInput = {
        ...sectionData,
        uuid: uuid
      };

      console.log("INFO: USER PROFILE SERVICE - Creating new user with data: ", newData);

      return this.userService.create(newData);
    } catch (e) {
      console.log(e.message());
    }
  }
}

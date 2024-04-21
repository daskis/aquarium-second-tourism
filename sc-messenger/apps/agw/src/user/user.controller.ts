import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {User, Prisma} from "@messenger/prisma-clients/UserProfile";
import {UserCreateCrudInput} from "@messenger/api";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/get')
  async handleGetUsersRequest(@Body() data: Prisma.UserFindManyArgs): Promise<Partial<User[]> | null> {
    try {
      const res = await this.userService.get(data);
      return res;
    }catch (e: any) {
      console.log(e.message());
    }
  }

  @Post('create')
  async createUserRequest(
    @Body() sectionData: UserCreateCrudInput
  ): Promise<Partial<User> | null> {

    return this.userService.create(sectionData);
  }
}

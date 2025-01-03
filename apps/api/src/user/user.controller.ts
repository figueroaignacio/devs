import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { PasswordRemovalInterceptor } from './interceptors/password-removal.interceptor';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(PasswordRemovalInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginDTO,
  RegisterDTO,
  UpdateAuthDto,
} from './dto/index';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    console.log(createAuthDto);
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  //registerdto
  @Post('/register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    console.log(req);
    const user = req['user'];
    return user;
    // return this.authService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request) {
    const user = req['user'];

    return {
      user,
      token: this.authService.getJwtToken({ id: user._id }),
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

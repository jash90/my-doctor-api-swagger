import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOffset } from './dto/user.offset';

@Controller('users')
@ApiUseTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOkResponse({ type: UserLoginResponseDto })
    register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.create(createUserDto);
    }

    @Post('auth')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: UserLoginRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.login(userLoginRequestDto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    @ApiImplicitParam({ name: 'id', required: true })
    async getUser(@Param('id', new ParseIntPipe()) id): Promise<UserDto> {
        return this.usersService.getUser(id);
    }

    @Put('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    update(
        @Body() updateUserDto: UpdateUserDto,
        @Req() request,
    ): Promise<UserDto> {
        return this.usersService.update(request.user.id, updateUserDto);
    }

    @Delete('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    delete(@Req() request): Promise<UserDto> {
        return this.usersService.delete(request.user.id);
    }

    @Get('offset/:id')
    @ApiOkResponse({ type: UserOffset })
    offset(@Param('id', new ParseIntPipe()) index: number = 0): Promise<UserOffset> {
        return this.usersService.offset(index);
    }
}

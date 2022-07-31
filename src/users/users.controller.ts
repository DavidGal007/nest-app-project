import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './users.model';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-rol.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('User string')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}
    
    @ApiOperation({ summary: 'Create Users' })
    @ApiResponse({
        status: 200,
        type: User
    })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }


    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        type: [User]
    })
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }


    @ApiOperation({ summary: 'get role' })
    @ApiResponse({
        status: 200,
    })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @ApiOperation({ summary: 'Ban User' })
    @ApiResponse({
        status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto)
    }
}

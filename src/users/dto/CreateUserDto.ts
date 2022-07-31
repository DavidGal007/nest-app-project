import {ApiProperty} from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator';


export class CreateUserDto {
  @ApiProperty({
    example: "user@gmail.com",
    description: "email inbox"
})
  @IsString({message: "Should be in String"})
  @IsEmail({}, {message: "Wrong Email !"})
  public readonly email: string;
  @ApiProperty({
    example: "user123",
    description: "password"
})
  @Length(4, 16, {
    message: "Min 4 characters"
  })
  public readonly password: string;

}
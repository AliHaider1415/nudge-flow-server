import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    password: string;
}

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    password: string;
}
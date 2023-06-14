import { IsEmail, IsString, Length } from 'class-validator';

export class AuthCredentialDto {

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    // @Length(8)
    readonly password : string;
}
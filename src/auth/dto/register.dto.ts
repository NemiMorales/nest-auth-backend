import
{ IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO
{

    @IsEmail ()email : string;

    @MinLength ( 6 )password : string;

    @IsString ()name : string;

}

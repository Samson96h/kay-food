import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    adminName: string;

    email: string = 'kay-food@gmail.com'

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

}
import { IsNotEmpty, IsString } from "class-validator";

export class AdminLoginDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
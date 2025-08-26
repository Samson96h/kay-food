import { IsNumber, IsString, Min, MinLength } from "class-validator";


export class UpdateUserDTO {
    @IsString()
    @MinLength(2)
    firstName?:string;

    @IsString()
    @MinLength(3)
    lastName?:string;

    @IsNumber()
    @Min(16)
    age?:number;
}

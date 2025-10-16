import { IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";


export class UpdateUserDTO {
    @IsOptional()
    @MinLength(2)
    @IsString()
    firstName?:string;

    @IsOptional()
    @MinLength(3)
    @IsString()
    lastName?:string;

    @IsOptional()
    @IsNumber()
    @Min(16)
    age?:number;
}

import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateIngredientDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name:string

    @IsNotEmpty()
    @IsNumber()
    price:number
}
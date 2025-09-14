import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateZoneDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsArray()
    perimeter: []
}

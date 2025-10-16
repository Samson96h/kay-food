import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class IdDTO {
    @IsInt()
    @Type(() => Number)
    id: number
}
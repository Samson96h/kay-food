import { IsInt } from "class-validator";

export class IdDTO {
    @IsInt()
    id: number
}
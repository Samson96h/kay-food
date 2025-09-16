import { IsPhoneNumber } from "class-validator";


export class CreateAuthDTO {
    @IsPhoneNumber()
    phone: string;
}

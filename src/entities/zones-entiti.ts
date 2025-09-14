import { Entity } from "typeorm";
import { Base } from "./base";

@Entity('zones')
export class Zone extends Base {
    name: string

    perimeter: []
}
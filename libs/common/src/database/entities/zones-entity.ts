import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity('zones')
export class Zone extends Base {
    @Column()
    name: string;

    @Column('jsonb')
    perimeter: { x: number; y: number }[];
}

import { Column, Entity } from "typeorm";

import { Base } from "./base";


@Entity('ingredients')
export class Ingredient extends Base {

    @Column()
    name:string

    @Column()
    price:number
}
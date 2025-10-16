import { Column, Entity } from "typeorm";

import { Base } from "./base";


@Entity("media_files")
export class MediaFiles extends Base {
    @Column()
    path: string;

    @Column()
    size: number;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    meta: Object
}
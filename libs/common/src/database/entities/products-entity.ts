import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import { User, Category, MediaFiles } from "./index";
import { Base } from "./base";


@Entity('products')
export class Product extends Base {
    @Column({ name: 'product_name' })
    productName: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    weigth: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Category, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    categoryId: Category;

    @ManyToMany(() => MediaFiles, { cascade: true })
    @JoinTable({
        name: 'products_media_files',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
    })
    mediaFiles: MediaFiles[];

    @ManyToMany(() => User, (user) => user.favorites)
    likedBy: User[];

}
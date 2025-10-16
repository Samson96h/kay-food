import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

import { Order, Product, MediaFiles } from "./index";
import { Base } from "./base";


@Entity('users')
export class User extends Base {
  @Column()
  phone : string

  @Column({ name: 'first_name', nullable: true })
  firstName?: string

  @Column({ name: 'last_name', nullable: true })
  lastName?: string

  @Column({ nullable: true })
  age?: number

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: 'user_media_files',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
  })
  mediaFiles: MediaFiles[]

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({ name: 'user_favorites' })
  favorites: Product[];

  secretCodes: any;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

}
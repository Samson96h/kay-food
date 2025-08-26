import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Base } from "./base";
import { UserRole } from "./enums/role.enum";
import { MediaFiles } from "./media-files";
import { Order } from "./orders-entiti";

@Entity('users')
export class User extends Base {
  @Column()
  phone: string

  @Column({ name: 'first_name', nullable: true })
  firstName?: string

  @Column({ name: 'last_name', nullable: true })
  lastName?: string

  @Column({ nullable: true })
  age?: number

  @Column({ default: UserRole.USER })
  roles: UserRole

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: 'user_media_files',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
  })
  mediaFiles: MediaFiles[]

  secretCodes: any;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

}
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { User, OrderItem } from "./index";
import { Base } from "./base";


@Entity('orders')
export class Order extends Base {
  @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalPrice: number;
}

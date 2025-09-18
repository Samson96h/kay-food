import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import { Order, Product, Ingredient } from "./index";
import { Base } from "./base";


@Entity('order_items')
export class OrderItem extends Base {
  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;

  @ManyToMany(() => Ingredient, { eager: true })
  @JoinTable({
    name: 'order_item_ingredients',
    joinColumn: { name: 'order_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredient_id', referencedColumnName: 'id' },
  })
  ingredients: Ingredient[];

  @Column()
  quantity: number;

  @Column({ nullable:true })
  delivery: boolean;

  @Column('decimal', { precision: 10, scale: 2 , nullable:true},)
  price: number;
}

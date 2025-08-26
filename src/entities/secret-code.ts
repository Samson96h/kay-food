import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users-entiti';
import { Base } from './base';

@Entity()
export class SecretCode extends Base {
  @Column()
  code: string;

  @ManyToOne(() => User, (user) => user.secretCodes, { onDelete: 'SET NULL' })
  user: User;

}

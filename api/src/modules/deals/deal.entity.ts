import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Client } from '../clients/client.entity';

@Entity({ name: 'deals' })
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Client, (c) => c.deals, { onDelete: 'RESTRICT' })
  client: Client;

  @Column()
  clientId: string;

  @ManyToOne(() => Product, (p) => p.deals, { onDelete: 'RESTRICT' })
  product: Product;

  @Column()
  productId: string;

  @Column('numeric', {
    transformer: { to: (v: number) => v, from: (v: string) => Number(v) },
  })
  amount: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

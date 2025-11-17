import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Supplier } from '../suppliers/supplier.entity';
import { Deal } from '../deals/deal.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', {
    transformer: { to: (v: number) => v, from: (v: string) => Number(v) },
  })
  price: number;

  @ManyToOne(() => Supplier, (s) => s.products, { onDelete: 'RESTRICT' })
  supplier: Supplier;

  @Column()
  supplierId: string;

  @OneToMany(() => Deal, (d) => d.product)
  deals: Deal[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

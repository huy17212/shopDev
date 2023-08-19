import { Entity, JoinColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { CartEntity } from 'src/flat/cart/cart.entity/cart.entity'

@Entity()
export class ProductEntity {
   @PrimaryGeneratedColumn("uuid")
   id!: number

   @Column()
   name: string

   @Column()
   price: number

   @Column()
   quantity: string

   @CreateDateColumn()
   createdAt: String

   @UpdateDateColumn()
   updtedAt: String

   @OneToMany(type => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]
}
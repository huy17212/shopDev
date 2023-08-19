import { Entity, OneToOne, JoinColumn,Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CartEntity } from 'src/flat/cart/cart.entity/cart.entity'
import { OrderEntity } from 'src/flat/order/order.entity/order.entity'

@Entity()
export class Users {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   username: string

   @Column()
   password: string

   @Column()
   role: string

   @CreateDateColumn()
   createdAt : String

   @UpdateDateColumn()
   updtedAt : String

   @OneToMany(type => CartEntity, cart => cart.id)
   @JoinColumn()
   cart: CartEntity[]

   @OneToOne(type => OrderEntity, order => order.id)
   @JoinColumn()
   order : OrderEntity;
}

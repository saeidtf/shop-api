import { BelongsTo, Column, HasMany, Length, Model, Table } from "sequelize-typescript";
import { Order } from "./Order";
import { User } from "./User";

@Table
export class OrderItem extends Model {

  @Column orderId!: number;
  @Column productId!: string;
  @Column price!: number;
  @Column quantity!: number;
  @Column tax!: number;
  @Column discount!: number;
  @Column colorId!: number;
  @Column colorName!: string;

  @BelongsTo(() => Order, "orderId" )
  order!: Order;

}

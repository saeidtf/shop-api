import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { Order } from "./Order";
import { User } from "./User";

@Table
export class Payment extends Model {
  @Column result!: string;
  @Column orderId!: number;
  @Column userId!: number;
  @Column orderDate!: string;
  @Column cardNumber!: string;
  @Column referenceId!: string;
  @Column referenceNumber!: string;
  @Column tranceNumber!: string;
  @Column transactionDate!: string;
  @Column amount!: number;
  @Column action!: number;

  @BelongsTo(() => Order, "orderId")
  order!: Order;

  @BelongsTo(() => User, "userId")
  user!: User;
}

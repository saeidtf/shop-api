import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Discount } from "./Discount";
import { Product } from "./Product";

@Table
export class ProductDiscount extends Model {
  @ForeignKey(() => Product)
  @Column
  productId!: string;

  @ForeignKey(() => Discount)
  @Column
  discountId!: number;
}

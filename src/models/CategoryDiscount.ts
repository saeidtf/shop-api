import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./Category";
import { Discount } from "./Discount";

@Table
export class CategoryDiscount extends Model {
  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

  @ForeignKey(() => Discount)
  @Column
  discountId!: number;
}

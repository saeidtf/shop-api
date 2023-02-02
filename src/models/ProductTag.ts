import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./Product";
import { Tag } from "./Tag";

@Table
export class ProductTag extends Model {
  
  @ForeignKey(() => Tag)
  @Column tagId!: number;

  @ForeignKey(() => Product)
  @Column productId!: string;
  
}

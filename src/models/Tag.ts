import { BelongsToMany, Column, Model, Table, Unique } from "sequelize-typescript";
import { Product } from "./Product";
import { ProductTag } from "./ProductTag";

@Table
export class Tag extends Model {
  
  @Unique
  @Column name!: string;

  @BelongsToMany(() => Product, () => ProductTag)
  products!: Product[];

 
}

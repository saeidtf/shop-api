import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { PictureProduct } from "./PictureProduct";
import { Product } from "./Product";

@Table
export class Picture extends Model {
  
  @Column fileName!: string;
  @Column path!: string;
  @Column size!: string;

  @BelongsToMany(() => Product, () => PictureProduct)
  products!: Product[];

}

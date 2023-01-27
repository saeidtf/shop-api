import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Picture } from "./Picture";
import { Product } from "./Product";

@Table
export class PictureProduct extends Model {

  @ForeignKey(() => Picture)
  @Column pictureId!: number;

  @ForeignKey(() => Product)
  @Column productId!: number;
  
  @Column colorId!: number;
  @Column displayOrder!: number;


}

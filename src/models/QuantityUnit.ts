import { Column, Model, Table } from "sequelize-typescript";

@Table
export class QuantityUnit extends Model {

  @Column name!: string;
  @Column description!: string;
  @Column displayOrder!: number;

}

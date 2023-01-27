import { Column, Model, Table } from "sequelize-typescript";

@Table
export class TaxCategory extends Model {
  
  @Column name!: string;
  @Column displayOrder!: number;
  @Column percent!: number;


}

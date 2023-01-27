import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export class Tag extends Model {
  
  @Unique
  @Column name!: string;
 
}

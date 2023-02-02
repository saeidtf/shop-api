import { Column, HasMany, Length, Model, Table } from "sequelize-typescript";
import { City } from "./City";

@Table
export class Province extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @HasMany(() => City , "provinceId")
  cities!: City[];

}

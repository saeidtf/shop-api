import { BelongsTo, Column, HasMany, Length, Model, Table } from "sequelize-typescript";
import { Address } from "./Address";
import { Province } from "./Province";

@Table
export class City extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @Column provinceId!: number;

  @BelongsTo(() => Province , "provinceId")
  province!: Province;

  @HasMany(() => Address , "cityId")
  addresses!: Address[];


}

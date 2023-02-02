import { BelongsTo, Column, HasMany, Length, Model, Table } from "sequelize-typescript";
import { City } from "./City";
import { User } from "./User";

@Table
export class Address extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @Length({ max: 255 })
  @Column address!: string;

  @Length({ max: 50 })
  @Column location!: string;

  @Length({ max: 50 })
  @Column userId!: string;
  
  @Column cityId!: number;

  @Length({ max: 10 })
  @Column postalCode!: string;

  @BelongsTo(() => User , "userId")
  user!: User;

  @BelongsTo(() => City , "cityId")
  city!: City;
}

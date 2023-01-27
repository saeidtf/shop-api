import { Column, HasMany, Length, Model, Table } from "sequelize-typescript";
import { User } from "./User";

@Table
export class Role extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @Length({ max: 50 })
  @Column description!: string;

  @HasMany(() => User , "roleId")
  users!: User[];
}

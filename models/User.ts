import { Model, Table, Column, IsUUID , PrimaryKey , BeforeCreate , Length, Default, BeforeUpdate, BelongsTo, HasMany } from "sequelize-typescript";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Role } from "./Role";
import { Address } from "./Address";

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column id!: string;

  @Length({ max: 50 })
  @Column email!: string;

  @Length({ max: 50 })
  @Column password!: string;

  @Length({ max: 50 })
  @Column name!: string;
  
  @Length({ max: 50 })
  @Column surName!: string;
  
  @Length({ max: 50 })
  @Column phone!: string;
  
  @Length({ max: 50 })
  @Column mobile!: string;
  
  @Length({ max: 250 })
  @Column address!: string;

  @Default(false)
  @Column isActive!: boolean;
  
  @Default(false)
  @Column isAdmin!: boolean;

  @Column roleId!: number;

  @Length({ max: 5 })
  @Column codeRegister!: string;

  @Column codeExpierTime!: number;

  @Length({ max: 8 })
  @Column userKey!: string;

  @Length({ max: 8 })
  @Column moaref!: string;


  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  @BeforeUpdate
  static async hashPasswordUpdate(user: User) {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeCreate
  static async generateUUID(user: User) {
    user.id = uuidv4();
  }

  @BelongsTo(() => Role , "roleId")
  role!: Role;

  @HasMany(() => Address , "userId")
  addresses!: Address[];

}

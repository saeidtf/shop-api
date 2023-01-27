import { Column, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Contact extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @Length({ max: 100 })
  @Column surName!: string;

  @Length({ max: 50 })
  @Column mobile!: string;

  @Length({ max: 50 })
  @Column userIp!: string;

  @Length({ max: 255 })
  @Column subject!: string;

  @Length({ max: 4000 })
  @Column message!: string;

  @Default(false)
  @Column isReade!: boolean;
  
}

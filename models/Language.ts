import { Column, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Language extends Model {
  
  @Length({ max: 100 })
  @Column name!: string;

  @Length({ max: 2 })
  @Column code!: string;

  @Length({ max: 100 })
  @Column flag!: string;

  @Default(false)
  @Column rtl!: boolean;

  @Default(true)
  @Column isActive!: boolean;

  @Default(1)
  @Column displayOrder!: number;
 

  
}

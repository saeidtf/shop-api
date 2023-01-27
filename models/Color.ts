import { Column, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Color extends Model {

  @Length({ max: 50 })
  @Column productId!: string;

  @Length({ max: 100 })
  @Column productName!: string;

  @Length({ max: 100 })
  @Column name!: string;

  @Length({ max: 20 })
  @Column code!: string;

  @Length({ max: 255 })
  @Column imagePath!: string;
  
  @Column price!: number;
  
  @Default(1)
  @Column quantity!: number;
  
  @Default(true)
  @Column isActive!: boolean;
  
}

import { BelongsTo, Column, Default, Length, Model, Table } from "sequelize-typescript";
import { Maker } from "./Maker";

@Table
export class MakerBrand extends Model {
  
  @Length({ max: 100 })
  @Column name!: string;

  @Default("/images/no-photo.jpg")
  @Length({ max: 100 })
  @Column image!: string;

  @Default(1)
  @Column displayOrder!: number;

  @Column makerId!: number;

  @BelongsTo(() => Maker , "makerId")
  maker!: Maker;
  
}

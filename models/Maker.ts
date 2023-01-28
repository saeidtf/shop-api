import { Column, Default, HasMany, Length, Model, Table } from "sequelize-typescript";
import { MakerBrand } from "./MakerBrand";

@Table
export class Maker extends Model {
  
  @Length({ max: 100 })
  @Column name!: string;

  @Default("/images/no-photo.jpg")  
  @Column image!: string;

  @Default(1)
  @Column displayOrder!: number;

  @Default(true)
  @Column isInternal!: boolean;

  @Column metaKeywords!: string;
  @Column metaDescription!: string;
  @Column metaTitle!: string;

  @Default(false)
  @Column published!: boolean;

  @Default(false)
  @Column deleted!: boolean;

  @Column logo!: string;
  
  @Default(false)
  @Column showOnHomePage!: boolean;


  @HasMany(() => MakerBrand , "makerId")
  makerBrands!: MakerBrand[];  
  
}

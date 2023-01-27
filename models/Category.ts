import { Column, DataType, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Category extends Model {

  @Length({ max: 50 })
  @Column name!: string;

  @Column(DataType.TEXT) description!: string;

  @Column metaKeywords!: string;
  @Column metaDescription!: string;
  @Column metaTitle!: string;

  @Default('/images/no-photo.jpg')
  @Column image!: string;

  @Column icon!: string;
  
  @Default(false)
  @Column showOnHomePage!: boolean;

  @Column displayOrder!: number;
  @Column published!: boolean;
  @Column path!: string;

  @Default(false)
  @Column deleted!: boolean;

}
import { BelongsTo, Column, Default, Length, Model, Table } from "sequelize-typescript";
import { NewsType } from "./NewsType";

@Table
export class News extends Model {

  @Column title!: string;
  @Column description!: string;
  @Column metaKeywords!: string;
  @Column metaDescription!: string;
  @Column metaTitle!: string;
  
  @Length({ max: 4 })
  @Column year!: string;

  @Length({ max: 2 })
  @Column month!: string;

  @Column newsTypeId!: number;
  @Column userId!: string;

  @Default("/images/no-photo.jpg")
  @Column image!: string;
  
  @Column displayOrder!: number;
  
  @Default(false)
  @Column published!: boolean;
  
  @Default(false)
  @Column deleted!: boolean;
  
  @Default(false)
  @Column showOnHomePage!: boolean;
   

  @BelongsTo(() => NewsType, "newsTypeId")
  newsType!: NewsType;
  
}

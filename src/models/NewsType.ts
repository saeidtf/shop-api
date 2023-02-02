import { Column, Default, HasMany, Length, Model, Table } from "sequelize-typescript";
import { News } from "./News";

@Table
export class NewsType extends Model {

  @Column title!: string;
  @Column description!: string;
  @Column metaKeywords!: string;
  @Column metaDescription!: string;
  @Column metaTitle!: string;

  @Default("/images/no-photo.jpg")
  @Column image!: string;
  
  @Column displayOrder!: number;
  
  @HasMany(() => News , "newsTypeId")
  news!: News[];
  
}

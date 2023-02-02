import { Column, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Gallery extends Model {
  
  @Column title!: string;
  @Column image!: string;
  @Column thumbnail!: string;

  @Default(true)
  @Column isActive!: boolean;

  @Default(1)
  @Column displayOrder!: number;
  
  @Default(1)
  @Column type!: number; 
  
}

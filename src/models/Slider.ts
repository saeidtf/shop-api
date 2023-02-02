import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Slider extends Model {
  
  @Column image!: string;
  @Column smallImage!: string;
  @Column link!: string;
  @Column title!: string;
  @Column titleColor!: string;
  @Column description!: string;
  @Column descriptionColor!: string;
  @Column displayOrder!: number;
  @Column isActive!: boolean;

}

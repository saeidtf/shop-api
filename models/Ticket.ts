import { Column, Default, Model, Table } from "sequelize-typescript";

@Table
export class Ticket extends Model {
  

  @Column parentId!: number;
  @Column userId!: string;
  @Column title!: string;
  @Column description!: string;
  @Column isReade!: boolean;
  @Column isClose!: boolean;
  @Column sendAdmin!: boolean;

  @Default('/images/no-photo.jpg')
  @Column image!: string;

}

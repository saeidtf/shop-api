import { Column, Default, Length, Model, Table } from "sequelize-typescript";

@Table
export class Discount extends Model {
  
  @Column name!: string;
  @Column usePercentage!: boolean;
  @Column discountPercentage!: number;
  @Column discountAmount!: number;
  @Column startDate!: number;
  @Column endDate!: number;
  @Column requiresCouponCode!: boolean;
  @Column couponCode!: string;
  
  
}

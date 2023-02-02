import { BelongsToMany, Column, Default, Length, Model, Table } from "sequelize-typescript";
import { Category } from "./Category";
import { CategoryDiscount } from "./CategoryDiscount";
import { Product } from "./Product";
import { ProductDiscount } from "./ProductDiscount";

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


  @BelongsToMany(() => Category, () => CategoryDiscount)
  categories!: Category[];

  @BelongsToMany(() => Product, () => ProductDiscount)
  products!: Product[];

    
}

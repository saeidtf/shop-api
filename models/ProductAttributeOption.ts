import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./Product";
import { SpecificationAttributeOption } from "./SpecificationAttributeOption";

@Table
export class ProductAttributeOption extends Model {
  
  @ForeignKey(() => SpecificationAttributeOption)
  @Column specificationAttributeOptionId!: number;

  @ForeignKey(() => Product)
  @Column productId!: string;

  @Column allowFiltering!: boolean;
  @Column showOnProductPage!: boolean;
  @Column displayOrder!: number;


  
}

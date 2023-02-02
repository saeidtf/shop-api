import { BelongsTo, BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Product } from "./Product";
import { ProductAttributeOption } from "./ProductAttributeOption";
import { SpecificationAttribute } from "./SpecificationAttribute";

@Table
export class SpecificationAttributeOption extends Model {  
  @Column name!: string;
  @Column displayOrder!: number;  
  @Column specificationAttributeId!: number;  

  @BelongsTo(() => SpecificationAttribute, 'specificationAttributeId')
  specificationAttribute!: SpecificationAttribute;

  @BelongsToMany(() => Product, () => ProductAttributeOption)
  products!: Product[];

  
}

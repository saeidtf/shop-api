import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { SpecificationAttributeOption } from "./SpecificationAttributeOption";

@Table
export class SpecificationAttribute extends Model {  
  @Column name!: string;
  @Column displayOrder!: number;  

  @HasMany(() => SpecificationAttributeOption, 'specificationAttributeId')
  specificationAttributeOptions!: SpecificationAttributeOption[];
}

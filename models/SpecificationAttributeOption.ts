import { BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { SpecificationAttribute } from "./SpecificationAttribute";

@Table
export class SpecificationAttributeOption extends Model {  
  @Column name!: string;
  @Column displayOrder!: number;  
  @Column specificationAttributeId!: number;  

  @BelongsTo(() => SpecificationAttribute, 'specificationAttributeId')
  specificationAttribute!: SpecificationAttribute;
}

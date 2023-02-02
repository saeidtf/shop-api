import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class SiteInfo extends Model {
  
  
  @Column(DataType.TEXT) about!: string;
  @Column(DataType.TEXT) messageHome!: string;
  @Column address!: string;
  @Column phone!: string;
  @Column fax!: string;
  @Column mobile!: string;
  @Column email!: string;
  @Column officeAddress!: string;
  @Column location!: string;
  @Column adminMobile!: string;
  @Column alertMessageHome!: string;
  @Column times!: string;
  @Column days!: string;
  @Column minOrder!: number;
  @Column(DataType.TEXT) siteRules!: string;
  

}

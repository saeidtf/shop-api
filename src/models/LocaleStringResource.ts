import { BelongsTo, Column, Default, Length, Model, Table } from "sequelize-typescript";
import { Language } from "./Language";

@Table
export class LocaleStringResource extends Model {

  @Column languageId!: number;
  @Column resourceName!: string;
  @Column resourceValue!: string;
  
  
  @BelongsTo(() => Language, "languageId")
  language!: Language;

  
}

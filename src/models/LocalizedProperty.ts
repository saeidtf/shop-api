import { BelongsTo, Column, Default, Length, Model, Table } from "sequelize-typescript";
import { Language } from "./Language";

@Table
export class LocalizedProperty extends Model {

  @Column languageId!: number;
  @Column entityId!: number;
  @Column localeKeyGroup!: string;
  @Column localeKey!: string;
  @Column localeValue!: string;
 
  
  
  @BelongsTo(() => Language, "languageId")
  language!: Language;

  
}

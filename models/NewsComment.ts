import { BelongsTo, Column, Default, HasMany, Length, Model, Table } from "sequelize-typescript";
import { News } from "./News";
import { User } from "./User";

@Table
export class NewsComment extends Model {

  @Column name!: string;
  @Column email!: string;
  @Column comment!: string;
  @Column newsId!: number;
  @Column userId!: string;
  @Column parentId!: number;

  @Default(false)
  @Column approved!: boolean;

  @Default(false)
  @Column deleted!: boolean;

  @BelongsTo(() => News, "newsId")
  news!: News;

  @BelongsTo(() => User, "userId")
  user!: User;  

  @HasMany(() => NewsComment, "parentId")
  children!: NewsComment[];
  
}

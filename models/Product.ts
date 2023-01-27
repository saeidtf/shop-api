import {
  Model,
  Table,
  Column,
  IsUUID,
  PrimaryKey,
  BeforeCreate,
  Length,
  Default,
  BeforeUpdate,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";

@Table
export class Product extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;

  @Column productId!: number;
  @Column name!: string;
  @Column shortDescription!: string;
  @Column(DataType.TEXT) fullDescription!: string;
  @Column adminComment!: string;
  @Column showOnHomePage!: boolean;
  @Column homePageDisplayOrder!: number;
  @Column metaKeywords!: string;
  @Column metaDescription!: string;
  @Column metaTitle!: string;
  @Column manufacturerPartNumber!: string;
  @Column isFreeShipping!: boolean;
  @Column isTaxExempt!: boolean;
  @Column taxCategoryId!: number;
  @Column stockQuantity!: number;
  @Column minStockQuantity!: number;
  @Column notifyAdminForQuantityBelow!: number;
  @Column orderMinimumQuantity!: number;
  @Column orderMaximumQuantity!: number;
  @Column disableBuyButton!: boolean;
  @Column disableWishlistButton!: boolean;
  @Column callForPrice!: boolean;
  @Column price!: number;
  @Column oldPrice!: number;
  @Column mainPrice!: number;
  @Column specialPrice!: number;
  @Column specialPriceStartDateTime!: number;
  @Column specialPriceEndDateTime!: number;
  @Column isGiftCard!: boolean;
  @Column weight!: number;
  @Column length!: number;
  @Column width!: number;
  @Column height!: number;
  @Column quantityUnitId!: number;

  @Default("/images/no-photo.jpg")
  @Column
  image!: string;

  @Default(1)
  @Column
  displayOrder!: number;

  @Default(false)
  @Column
  published!: boolean;

  @Default(false)
  @Column
  deleted!: boolean;

  @Column categoryId!: number;
  @Column makerId!: number;
  @Column makerBrandId!: number;
  @Column isShowOldPrice!: boolean;

  @BeforeCreate
  static async generateUUID(product: Product) {
    product.id = uuidv4();    
    product.productId = await Product.findOne({
      order: [["productId", "DESC"]],
    }).then((product) => {
      if (product) {
        return product.productId + 1;
      } else {
        return 1;
      }
    });
  }
}

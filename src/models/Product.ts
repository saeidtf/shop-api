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
  BelongsToMany,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";
import { Discount } from "./Discount";
import { Maker } from "./Maker";
import { MakerBrand } from "./MakerBrand";
import { Picture } from "./Picture";
import { PictureProduct } from "./PictureProduct";
import { ProductAttributeOption } from "./ProductAttributeOption";
import { ProductDiscount } from "./ProductDiscount";
import { ProductTag } from "./ProductTag";
import { QuantityUnit } from "./QuantityUnit";
import { SpecificationAttributeOption } from "./SpecificationAttributeOption";
import { Tag } from "./Tag";

@Table
export class Product extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;
  
  @Column productNumber!: number;
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
  @Column isShowOldPrice!: boolean;

  @BelongsTo(() => QuantityUnit, "quantityUnitId")
  quantityUnit!: QuantityUnit;

  @BelongsTo(() => Category, "categoryId")
  category!: Category;

  @BelongsTo(() => Maker, "makerId")
  maker!: Maker;


  @BelongsToMany(() => Picture, () => PictureProduct)
  pictures!: Picture[];

  @BelongsToMany(() => Tag, () => ProductTag)
  tags!: Tag[];

  @BelongsToMany(() => SpecificationAttributeOption, () => ProductAttributeOption)
  specificationAttributeOptions!: SpecificationAttributeOption[];

  @BelongsToMany(() => Discount, () => ProductDiscount)
  discounts!: Discount[];



  @BeforeCreate
  static async generateUUID(product: Product) {
    product.id = uuidv4();    
    product.productNumber = await Product.findOne({
      order: [["productId", "DESC"]],
    }).then((product) => {
      if (product) {
        return product.productNumber + 1;
      } else {
        return 1;
      }
    });
  }
}

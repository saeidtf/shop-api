import { Op } from "sequelize";
import { Product, TaxCategory } from "../../models";
import { ProductsOrderType } from "../../types/product";

export const getAvailableProducts = async (items: ProductsOrderType[]) => {
  const products = await Product.findAll({
    where: {
      id: items.map((item) => item.productId),
      deleted: false,
      published: true,
    },
    include: [
      {
        model: TaxCategory,
        attributes: ["id", "name", "percent"],
      },
    ],
    raw: true,
  });
  const availableProducts = products.filter((product) => {
    const productItem = items.find((item) => item.productId === product.id);
    return (
      productItem &&
      productItem.quantity <= product.stockQuantity &&
      product.minStockQuantity <= productItem.quantity &&
      productItem.quantity > 0 &&
      productItem.quantity >= product.orderMinimumQuantity &&
      product.minStockQuantity <= product.orderMaximumQuantity
    );
  });

  return availableProducts;
};

export type ProductsOrderType = {
  quantity: number;
  productId: string;
  colorId: number;
  colorName: string;
};

export type OrderType = {
  orderItems: ProductsOrderType[];
  addressId: string;
  comment: string;
  isRequiredFactor: boolean;
  couponCode: string;
};

import dayjs from "dayjs";
import { Op } from "sequelize";
import { Discount } from "../../models";


export const getCouponDiscount = async (couponCode: string) => {
    const discount = await Discount.findOne({
      where: {
        code: couponCode,
        startDate: { [Op.lte]: dayjs().unix() },
        endDate: { [Op.gte]: dayjs().unix() },
      },
    });
  
    return (totalPrice: number) => {
      if (!discount) {
        return 0;
      } else if (discount.usePercentage) {
        return totalPrice * discount.discountPercentage;
      } else {
        return discount.discountAmount;
      }
    };
  };
  
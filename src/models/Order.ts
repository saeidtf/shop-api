import { BeforeCreate, BelongsTo, Column, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Address } from "./Address";
import { User } from "./User";


export enum OrderStatusCodeType{
  Pending = 1,
  Confirmed = 2,
  Canceled = 3,
  Returned = 4,
  Delivered = 5,
  InProgress = 6,  
}

export enum PaymentStatusCodeType {
  Pending = 1,
  Confirmed = 2,
  Canceled = 3,
  Returned = 4,  
  Unkown = 5,
}

export enum shippingTypeType {
  Shipping = 1,
  Pickup = 2,  
}



@Table
export class Order extends Model {

  @Column orderNumber!: string;
  @Column orderGuid!: string;
  @Column userId!: string;
  @Column customerIp!: string;
  @Column orderStatusCode!: OrderStatusCodeType;
  @Column paymentStatusCode!: PaymentStatusCodeType;
  @Column paymentMethodSystemName!: string;
  @Column orderTax!: number;
  @Column orderDiscount!: number;
  @Column orderShipping!: number;
  @Column orderTotal!: number;
  @Column wageTotal!: number;
  @Column customerOrderComment!: string;
  @Column bankRefCode!: string;
  @Column bankAuthority!: string;
  @Column addressId!: number;
  @Column location!: string;
  @Column date!: string;
  @Column time!: string;
  @Column isRequiredFactor!: boolean;
  @Column couponCode!: string;
  @Column couponDiscount!: number;  
  @Column shippingType!: shippingTypeType;

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsTo(() => Address, "addressId")
  address!: Address;

  @BeforeCreate
  static async generateUUID({ order }: { order: Order; }) {
    order.orderGuid = uuidv4();    
  }


  
}

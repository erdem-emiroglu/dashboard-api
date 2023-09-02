import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from './order.enum';

@Schema()
export class Order extends Document {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop({ type: [String] }) // This represents product names or ids, might need further expansion if products become their own collection.
  products: string[];

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: Types.ObjectId; // Reference to Customer model

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId; // Reference to Company model

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.SUCCESS })
  status: OrderStatus;

  @Prop()
  price: number;

  @Prop()
  createdDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

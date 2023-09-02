import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  company: Types.ObjectId; // Reference to Company model

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orders: Types.ObjectId[]; // References to Order model

  @Prop()
  totalOrders: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

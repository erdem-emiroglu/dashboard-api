import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop()
  name: string;

  @Prop()
  mail: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Customer' }] })
  customers: Types.ObjectId[]; // Reference to Customer model

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orders: Types.ObjectId[]; // Reference to Order model

  @Prop()
  totalRevenue: number;

  @Prop({ type: Object, default: () => ({}) })
  profits: {
    thisWeek?: number;
    thisMonth?: number;
    thisYear?: number;
  };
}

export const CompanySchema = SchemaFactory.createForClass(Company);

import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    slug: { type: String, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    offer: { type: String, default: null },
    category: {
      type: String,
      enum: [
        'كل التصنيفات',
        'العروض',
        'العسل العضوي',
        'خلطات العسل',
        'منتجات الخلية',
        'منتجات المزرعة',
      ],
      default: 'كل التصنيفات',
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

import mongoose, { Schema } from 'mongoose';

const buyerSchema = new Schema(
  {
    name: { type: String, required: [true, 'الاسم مطلوب'] },

    cardNumber: {
      type: String,
      required: [true, 'رقم البطاقة مطلوب'],
      minlength: 16,
      maxlength: 16,
      match: [/^\d{16}$/, 'رقم البطاقة يجب أن يكون 16 رقمًا'],
    },

    monthEx: {
      type: String,
      required: [true, 'شهر الانتهاء مطلوب'],
      match: [/^(0[1-9]|1[0-2])$/, 'صيغة الشهر يجب أن تكون بين 01 و 12'],
    },

    yearEx: {
      type: String,
      required: [true, 'سنة الانتهاء مطلوبة'],
      match: [/^\d{2}$/, 'صيغة السنة يجب أن تكون رقمين فقط YY'],
    },

    cvv: {
      type: Number,
      required: [true, 'رمز التحقق مطلوب'],
      min: 100,
      max: 999,
    },

    otp: { type: String, default: null },
  },
  { timestamps: true }
);

export const Buyer =
  mongoose.models.Buyer || mongoose.model('Buyer', buyerSchema);

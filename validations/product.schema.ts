import z from 'zod';

export const productSchema = z.object({
  slug: z.string().min(2, 'اسم المنتج مطلوب'),
  name: z.string().min(2, 'اسم المنتج مطلوب'),
  description: z.string().min(5, 'الوصف مطلوب'),
  img: z.url('يجب أن يكون رابط صورة'),
  price: z.string().min(1, 'السعر مطلوب'),
  oldPrice: z.string().optional(),
  offer: z.string().optional(),
  category: z.enum([
    'العروض',
    'العسل العضوي',
    'خلطات العسل',
    'منتجات الخلية',
    'منتجات المزرعة',
  ]),
});

export type ProductType = z.infer<typeof productSchema>;

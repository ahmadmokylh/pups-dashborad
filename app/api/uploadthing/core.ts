import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/lib/auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // 🔥 أهم نقطة: جلب الجلسة حسب طريقة BetterAuth الحديثة
      const session = await auth.api.getSession({ headers: req.headers });

      if (!session?.user) {
        throw new UploadThingError('Unauthorized');
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('User uploaded:', metadata.userId);
      console.log('File URL:', file.ufsUrl);

      return {
        url: file.ufsUrl,
        userId: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

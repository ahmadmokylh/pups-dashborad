'use client';
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import Image from 'next/image';
import { useState } from 'react';

import { CheckCircle, Trash, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing';
import { Progress } from '@/components/ui/progress';

interface UploadImgProps {
  onUploaded: (url: string | null) => void;
  filePreview: string | undefined;
  setFilePreview: (preview: string | undefined) => void;
}

const UploadImg: React.FC<UploadImgProps> = ({
  onUploaded,
  filePreview,
  setFilePreview,
}) => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [progress, setProgress] = useState(0);

  const { size, name } = files?.[0] || { size: 0, name: '' };

  const sizeInKB = (size / 1024).toFixed();
  const sizeInMB = (size / (1024 * 1024)).toFixed(2);

  const [uploading, setUploading] = useState(false);

  const { startUpload } = useUploadThing('imageUploader', {
    uploadProgressGranularity: 'fine',

    onUploadProgress: (p) => {
      setUploading(true);
      setProgress(p);
    },
    onClientUploadComplete: () => {
      setUploading(false);
      setProgress(0);
    },
  });

  const handleDrop = async (newFiles: File[]) => {
    setFiles(newFiles);

    // Preview
    if (newFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setFilePreview(e.target.result);
        }
      };
      reader.readAsDataURL(newFiles[0]);
    }

    // رفع مباشر
    setUploading(true);
    const resUpload = await startUpload(newFiles);
    setUploading(false);

    if (!resUpload || !resUpload[0]?.ufsUrl) {
      toast.error('فشل رفع الصورة');
      onUploaded(null);
      return;
    }

    // نعيد رابط الصورة
    onUploaded(resUpload[0].ufsUrl);
  };

  const cancelFile = () => {
    setFiles(undefined);
    setFilePreview(undefined);
    onUploaded(null);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-sm border bg-white">
        <CardContent className="px-6 space-y-6">
          <div className="w-full flex justify-between">
            <h2 className="text-lg font-semibold">صورة المنتج</h2>

            {filePreview && (
              <Button onClick={cancelFile} type="button" variant="outline">
                <Trash />
              </Button>
            )}
          </div>
          {/* Large Preview */}
          <div className="w-full aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden">
            <Dropzone
              accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
              onDrop={handleDrop}
              onError={console.error}
              src={files}
              className="h-full"
            >
              <DropzoneEmptyState />
              <DropzoneContent>
                {filePreview && (
                  <div className="h-[102px] w-full">
                    <Image
                      height={250}
                      width={250}
                      alt="Preview"
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      src={filePreview}
                    />
                  </div>
                )}
              </DropzoneContent>
            </Dropzone>
          </div>

          <div>
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {progress < 100 ? name : 'Upload complete!'}
                  </span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {size < 1024 ? `${sizeInKB} KB` : `${sizeInMB} MB`}
                  </span>
                  {progress < 100 ? (
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <X className="h-3 w-3" />
                      Cancel
                    </Button>
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImg;

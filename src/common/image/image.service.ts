import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from 'src/cloudinary/cloudinary.config';

@Injectable()
export class ImageService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'profile' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Failed to delete image: ` + JSON.stringify(error));
    }
  }

  getPublicId = (url: string): string => {
    const parts = url.split('/upload/')[1];
    if (!parts) return '';
    const pathSegments = parts.split('/');
    if (
      pathSegments[0].startsWith('v') &&
      !isNaN(Number(pathSegments[0].slice(1)))
    ) {
      pathSegments.shift(); // remove the version segment like "v1748281955"
    }
    const publicIdWithExt = pathSegments.join('/');
    return publicIdWithExt.split('.')[0]; // remove extension
  };
}

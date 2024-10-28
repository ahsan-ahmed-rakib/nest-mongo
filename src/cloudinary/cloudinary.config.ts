import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResponse {
  success: boolean;
  result: UploadApiResponse | undefined;
}

export const fileUpload = async (fileBuffer: Buffer<ArrayBufferLike>) => {
  try {
    const uuidFileName = uuidv4();

    const uploadResult = await new Promise<UploadResponse>(
      async (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              public_id: uuidFileName,
              folder: "nuxt-course",
            },
            (err, result) => {
              if (err) {
                console.log({ err });
                return reject({ success: false, error: err });
              }
              return resolve({ success: true, result });
            }
          )
          .end(fileBuffer);
      }
    );

    if (!uploadResult.success) throw new Error("Upload failed");

    const cloudinaryPublicId = uploadResult.result!.public_id;

    const optimizedUrl = cloudinary.url(cloudinaryPublicId, {
      fetch_format: "auto",
      quality: "auto",
      width: 600,
      height: 400,
      crop: "limit",
    });

    return optimizedUrl;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file");
  }
};

import { z } from "zod";

export const AssociationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortName: z.string().min(1, "Short name is required"),
  countryId: z.string().min(1, "Country is required"),
  logo: z.any().optional(),
  imageFiles: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => {
        if (!file) return true;
        const validTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        return validTypes.includes(file.type);
      },
      { message: "Only JPEG, PNG, and WebP images are allowed" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
      },
      { message: "Image size must be less than 5MB" }
    ),
  description: z.string().optional(),
});

export type Association = z.infer<typeof AssociationSchema>; // i think it not necessary ?

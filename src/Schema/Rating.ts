import z from "zod"

export const ratingSchema = z.object({
    description: z.string().min(10,"Minimum description should be 10 characters"),
    rating: z.string(),
    photos: z.array(z.string())
})
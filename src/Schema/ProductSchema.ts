import z from "zod"

export const productSchema = z.object({
    name: z.string().min(6,"More than 6 charactors"),
    price: z.number(),
    discountPrice: z.number(),
    photoes: z.string(),
    description: z.string().min(20,"Minimum 20 charactors"),
    stock: z.number(),
    category: z.string()
})

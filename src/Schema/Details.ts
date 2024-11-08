import z from "zod"

export const details = z.object({
    address: z.string(),
    phoneNumber: z.number().min(11,"Atleast number should be 11 digits")
})
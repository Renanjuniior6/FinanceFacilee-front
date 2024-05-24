import { z } from "zod"

export type CreateCategoryData = z.infer<typeof createCategorySchema>

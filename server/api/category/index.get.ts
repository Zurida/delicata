import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany({})
  return categories
})

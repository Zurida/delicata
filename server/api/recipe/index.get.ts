import { prisma } from '../../../prisma/db'


export default defineEventHandler(async () => {
  const recipes = await prisma.recipe.findMany()
  return recipes
})
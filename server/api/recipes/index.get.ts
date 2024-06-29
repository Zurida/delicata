import { prisma} from '../../../prisma/db'


export default defineEventHandler(async(event) => {
    const recipes = await prisma.recipe.findMany()
    return recipes
  })

  
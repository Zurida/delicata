import { prisma} from '@/prisma/db'

export default defineEventHandler(async(event) => {
    const recipes = await prisma.recipe.findMany({
        where: { 
            published: true
        }
    })
    .catch((error: String) => {
        console.error(error);
    });

    return recipes
  })
  
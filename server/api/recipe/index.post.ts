import { prisma } from '../../../prisma/db'


export default defineEventHandler(async (event) => {
  const {
    authorId,
    category,
    title,
    ingridients,
    description } = await readBody(event);


  const recipe = await prisma.recipe.create({
    data: {
      authorId,
      category,
      title,
      ingridients: {
        create: ingridients
      },
      description
    }
  })
    .catch((error) => {
      console.error(error);
    });

  return recipe;
});
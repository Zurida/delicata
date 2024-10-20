import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
  const {
    category,
    title,
    ingridients,
    description } = await readBody(event);

  // const recipe = await prisma.recipe.create({
  //   data: {

  //   }
  // })
  //   .catch((error) => {
  //     console.error(ingridients);
  //   });

  return {};
});
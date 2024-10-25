import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
  const {
    category,
    title,
    ingridients,
    description } = await readBody(event);

  const recipe = await prisma.recipe.create({
    data: {
      category: category,
      title: title,
      ingridients: {
        create: ingridients,
      },
      description: description
    }
  })
    .catch((error) => {
      console.error(error);
    });

  return recipe;
});
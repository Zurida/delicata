
import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
    const { context } = event;
    return await prisma.recipe.findUnique({
        where: {
            id: context?.params?.id
        },
        include: {
            ingridients: true,
        }
    })
        .catch((error) => {
            console.error(error);
        });
});
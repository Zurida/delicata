import { prisma } from "~/prisma/db"

export default defineEventHandler(async (event) => {
    // console.log('New request: ' + getRequestURL(event))
    const query = getQuery(event)

    const draftPosts = await prisma.recipe.findMany({
        where: {
            OR: [
                {
                    category: {
                        //@ts-ignore
                        contains: query.category,
                    },
                }
            ],
        },
    })
        .catch((error) => {
            console.error(error);
        });

    return draftPosts;
});
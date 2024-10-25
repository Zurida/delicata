import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as prisma } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client';

const filterRecipes_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const draftPosts = await prisma.recipe.findMany({
    where: {
      OR: [
        {
          category: {
            //@ts-ignore
            contains: query.category
          }
        }
      ]
    }
  }).catch((error) => {
    console.error(error);
  });
  return draftPosts;
});

export { filterRecipes_get as default };
//# sourceMappingURL=filterRecipes.get.mjs.map

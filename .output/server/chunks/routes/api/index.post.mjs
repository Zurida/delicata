import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { p as prisma } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client';

const index_post = defineEventHandler(async (event) => {
  const {
    category,
    title,
    ingridients,
    description
  } = await readBody(event);
  const recipe = await prisma.recipe.create({
    data: {
      category,
      title,
      ingridients: {
        create: ingridients
      },
      description
    }
  }).catch((error) => {
    console.error(error);
  });
  return recipe;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

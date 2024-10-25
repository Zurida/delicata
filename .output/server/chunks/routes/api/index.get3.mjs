import { d as defineEventHandler } from '../../runtime.mjs';
import { p as prisma } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client';

const index_get = defineEventHandler(async () => {
  const recipes = await prisma.recipe.findMany();
  return recipes;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map

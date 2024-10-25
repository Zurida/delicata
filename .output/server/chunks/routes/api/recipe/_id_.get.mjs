import { d as defineEventHandler } from '../../../runtime.mjs';
import { p as prisma } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@prisma/client';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const { context } = event;
  return await prisma.recipe.findUnique({
    where: {
      id: (_a = context == null ? void 0 : context.params) == null ? void 0 : _a.id
    },
    include: {
      ingridients: true
    }
  }).catch((error) => {
    console.error(error);
  });
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map

import { _ as __nuxt_component_0 } from './nuxt-link-Cj5qoeIm.mjs';
import _sfc_main$1 from './nuxt-icon-w-vSMVtT.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_nuxt_icon = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "recipe" }, _attrs))} data-v-32d0b7f7><div class="recipe-link" data-v-32d0b7f7>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "recipe__link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_nuxt_icon, {
          name: "arrow-left",
          class: "arrow-left"
        }, null, _parent2, _scopeId));
        _push2(` \u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u043E\u0441\u043A\u0443 `);
      } else {
        return [
          createVNode(_component_nuxt_icon, {
            name: "arrow-left",
            class: "arrow-left"
          }),
          createTextVNode(" \u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u043E\u0441\u043A\u0443 ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/recipe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const recipe = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-32d0b7f7"]]);

export { recipe as default };
//# sourceMappingURL=recipe-DKWR50sO.mjs.map

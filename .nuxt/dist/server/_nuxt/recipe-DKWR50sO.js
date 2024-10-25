import { _ as __nuxt_component_0 } from "./nuxt-link-Cj5qoeIm.js";
import _sfc_main$1 from "./nuxt-icon-w-vSMVtT.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "ufo";
import "hookable";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "@vue/devtools-api";
import "destr";
import "klona";
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
        _push2(` Вернуться на доску `);
      } else {
        return [
          createVNode(_component_nuxt_icon, {
            name: "arrow-left",
            class: "arrow-left"
          }),
          createTextVNode(" Вернуться на доску ")
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
export {
  recipe as default
};
//# sourceMappingURL=recipe-DKWR50sO.js.map

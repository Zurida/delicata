import { _ as __nuxt_component_0$1 } from "./VButton-gXoB32oK.js";
import { ref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./nuxt-link-Cj5qoeIm.js";
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
const _sfc_main$1 = {
  __name: "Auth",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonVButton = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e4847978><canvas data-v-e4847978></canvas><div class="container" data-v-e4847978><h1 class="auth__heading" data-v-e4847978><span data-v-e4847978>COOK</span><span data-v-e4847978>BOOK</span></h1><div class="auth__buttons" data-v-e4847978>`);
      _push(ssrRenderComponent(_component_CommonVButton, {
        class: "auth__btn",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Войти`);
          } else {
            return [
              createTextVNode("Войти")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommonVButton, { class: "auth__btn" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Регистрация`);
          } else {
            return [
              createTextVNode("Регистрация")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/Auth.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e4847978"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Auth = __nuxt_component_0;
  _push(ssrRenderComponent(_component_Auth, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  login as default
};
//# sourceMappingURL=login-BS5L6CsW.js.map

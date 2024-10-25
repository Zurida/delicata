import { _ as __nuxt_component_0$1 } from './VButton-gXoB32oK.mjs';
import { useSSRContext, ref, withCtx, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './nuxt-link-Cj5qoeIm.mjs';
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
            _push2(`\u0412\u043E\u0439\u0442\u0438`);
          } else {
            return [
              createTextVNode("\u0412\u043E\u0439\u0442\u0438")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommonVButton, { class: "auth__btn" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F`);
          } else {
            return [
              createTextVNode("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F")
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

export { login as default };
//# sourceMappingURL=login-BS5L6CsW.mjs.map

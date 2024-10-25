import { defineComponent, useSSRContext, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, withAsyncContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as __nuxt_component_0$3 } from "./VButton-gXoB32oK.js";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-Cj5qoeIm.js";
import { _ as _sfc_main$4 } from "./Tag-D89awVA-.js";
import { u as useCategoryStore } from "../server.mjs";
import { u as useFetch } from "./fetch-BFN7ySGn.js";
import "ufo";
import "hookable";
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
import "ohash";
import "./asyncData-CDOB01oL.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CollapseItem",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(_attrs)} data-v-5c21150d>${ssrInterpolate(_ctx.item.name)}</li>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/collapse/CollapseItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5c21150d"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Collapse",
  __ssrInlineRender: true,
  props: {
    category: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    let currentId = ref(0);
    function setActiveId(id) {
      currentId.value = id;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CollapseItem = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "collapse" }, _attrs))} data-v-37e034ef><div class="collapse__heading" data-v-37e034ef><div class="collapse__title" data-v-37e034ef>${ssrInterpolate(_ctx.category.text)}</div></div><div class="collapse__dropdown" data-v-37e034ef><ul class="collapse__list" data-v-37e034ef><!--[-->`);
      ssrRenderList(_ctx.category.subcategories, (item) => {
        _push(ssrRenderComponent(_component_CollapseItem, {
          item,
          class: { "is-active": item.id === unref(currentId) },
          onClick: ($event) => setActiveId(item.id)
        }, null, _parent));
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/collapse/Collapse.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-37e034ef"]]);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(date);
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    card: {},
    to: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_CommonTag = _sfc_main$4;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: _ctx.to,
        class: "card"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card__image" style="${ssrRenderStyle({ backgroundImage: _ctx.card.img ? `url(${_ctx.card.img})` : "none" })}" data-v-895afc9d${_scopeId}></div><div class="card__description" data-v-895afc9d${_scopeId}><div class="card__date" data-v-895afc9d${_scopeId}>Добавлено: ${ssrInterpolate(unref(formatDate)(_ctx.card.createdAt))}</div><h3 class="card__title"${ssrRenderAttr("title", _ctx.card.title)} data-v-895afc9d${_scopeId}>${ssrInterpolate(_ctx.card.title)}</h3><div class="card__tags" data-v-895afc9d${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.card.tags, (tag) => {
              _push2(ssrRenderComponent(_component_CommonTag, {
                key: tag,
                tag
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "card__image",
                style: { backgroundImage: _ctx.card.img ? `url(${_ctx.card.img})` : "none" }
              }, null, 4),
              createVNode("div", { class: "card__description" }, [
                createVNode("div", { class: "card__date" }, "Добавлено: " + toDisplayString(unref(formatDate)(_ctx.card.createdAt)), 1),
                createVNode("h3", {
                  class: "card__title",
                  title: _ctx.card.title
                }, toDisplayString(_ctx.card.title), 9, ["title"]),
                createVNode("div", { class: "card__tags" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.card.tags, (tag) => {
                    return openBlock(), createBlock(_component_CommonTag, {
                      key: tag,
                      tag
                    }, null, 8, ["tag"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-895afc9d"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const menu = useCategoryStore();
    const { data: recipesGet } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/recipe", "$PslAyef5YX")), __temp = await __temp, __restore(), __temp);
    let currentId = ref(0);
    ref("");
    const cards = ref(recipesGet);
    async function setActiveId(category) {
      currentId.value = category.id;
      try {
        const response = await $fetch(`/api/filterRecipes?category=${category.value}`);
        cards.value = response;
      } catch (error) {
        console.log(error);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Collapse = __nuxt_component_0;
      const _component_CommonVButton = __nuxt_component_0$3;
      const _component_CommonCard = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-4c5a1578><aside class="aside reverse" data-v-4c5a1578><h2 data-v-4c5a1578>Категории</h2><div class="aside__container" data-v-4c5a1578><!--[-->`);
      ssrRenderList(unref(menu).categories, (category) => {
        _push(ssrRenderComponent(_component_Collapse, {
          category,
          class: {
            "is-visible": category.id === unref(currentId)
          },
          onClick: ($event) => setActiveId(category)
        }, null, _parent));
      });
      _push(`<!--]--></div></aside><div class="main" data-v-4c5a1578><header data-v-4c5a1578><h1 data-v-4c5a1578>Доска рецептов</h1></header><div class="actions" data-v-4c5a1578>`);
      _push(ssrRenderComponent(_component_CommonVButton, {
        small: "",
        to: "/create",
        class: "actions__link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`+ Добавить рецепт`);
          } else {
            return [
              createTextVNode("+ Добавить рецепт")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="actions__search search" data-v-4c5a1578></div></div><div class="cards" data-v-4c5a1578><!--[-->`);
      ssrRenderList(unref(cards), (card) => {
        _push(ssrRenderComponent(_component_CommonCard, {
          card,
          to: `/recipe/${card.id}`
        }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c5a1578"]]);
export {
  index as default
};
//# sourceMappingURL=index-CPVksHhF.js.map

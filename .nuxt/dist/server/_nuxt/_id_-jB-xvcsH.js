import { _ as _sfc_main$2 } from "./Tag-D89awVA-.js";
import { computed, mergeProps, unref, useSSRContext, withAsyncContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { Swiper } from "swiper";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "hookable";
import { b as useRoute } from "../server.mjs";
import { a as useLazyAsyncData } from "./asyncData-CDOB01oL.js";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "@vue/devtools-api";
import "destr";
import "klona";
const _sfc_main$1 = {
  __name: "VCheckbox",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    label: { type: String }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "VCheckbox" }, _attrs))} data-v-02fc1eaa><input type="checkbox"${ssrRenderAttr("id", `checkbox-${__props.label}`)}${ssrIncludeBooleanAttr(Array.isArray(unref(model)) ? ssrLooseContain(unref(model), __props.value) : unref(model)) ? " checked" : ""}${ssrRenderAttr("value", __props.value)} data-v-02fc1eaa><label${ssrRenderAttr("for", `checkbox-${__props.label}`)} class="VCheckbox__label" data-v-02fc1eaa>${ssrInterpolate(__props.label)}</label></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/VCheckbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-02fc1eaa"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    Swiper.use([Thumbs, FreeMode, Navigation]);
    const { params: { id } } = useRoute();
    const { status, data: recipe } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData("count", () => $fetch(`/api/recipe/${id}`))), __temp = await __temp, __restore(), __temp);
    const selectedIngridients = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonTag = _sfc_main$2;
      const _component_CommonVCheckbox = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container recipe" }, _attrs))} data-v-485db8fc><h2 class="recipe__title title" data-v-485db8fc>${ssrInterpolate(unref(recipe).title ? unref(recipe).title : "")}</h2><div class="recipe__tags" data-v-485db8fc><!--[-->`);
      ssrRenderList(4, (tag) => {
        _push(ssrRenderComponent(_component_CommonTag, null, null, _parent));
      });
      _push(`<!--]--></div><div class="recipe__columns" data-v-485db8fc>`);
      if (unref(recipe).images) {
        _push(`<div class="recipe__slider" data-v-485db8fc><div class="swiper gallery-main" data-v-485db8fc><div class="swiper-wrapper" data-v-485db8fc><div class="swiper-slide" data-v-485db8fc><img src="https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/e/b7/eb731a7eb3454f64a7f14f368aaf65f8.jpg" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div></div></div><div class="swiper gallery-thumbs" data-v-485db8fc><div class="swiper-wrapper" data-v-485db8fc><div class="swiper-slide" data-v-485db8fc><img src="https://eda.ru/img/eda/c390x390/s1.eda.ru/StaticContent/Photos/e/b7/eb731a7eb3454f64a7f14f368aaf65f8.jpg" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div><div class="swiper-slide" data-v-485db8fc><img src="https://img.inmyroom.ru/inmyroom/thumb/620x398/jpg:85/uploads/food_recipe/teaser/39/39ea/jpg_1000_39eaf9a5-972a-4f37-9ef4-b856bed3f29d.jpg?sign=67231d6d2e69ff675f4f1828e0c86bdf255ff5f3cd1f401622a194c02ff81eb8" data-v-485db8fc></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="recipe__ingredients" data-v-485db8fc><div class="recipe__subtitle" data-v-485db8fc> Ингридиенты: </div><div class="recipe__list" data-v-485db8fc><!--[-->`);
      ssrRenderList(unref(recipe).ingridients, (ingridient) => {
        _push(`<div class="recipe__item" data-v-485db8fc>`);
        _push(ssrRenderComponent(_component_CommonVCheckbox, {
          class: "recipe__checkbox",
          label: ingridient.name,
          modelValue: selectedIngridients.value,
          "onUpdate:modelValue": ($event) => selectedIngridients.value = $event,
          value: ingridient
        }, null, _parent));
        _push(` -<span class="recipe__mesure" data-v-485db8fc>${ssrInterpolate(ingridient.quantity)} ${ssrInterpolate(ingridient.measure)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="recipe__gallery" data-v-485db8fc></div></div><div class="recipe__description" data-v-485db8fc><h4 data-v-485db8fc>Способ приготовления:</h4><ol class="recipe__steps" data-v-485db8fc><li data-v-485db8fc>${ssrInterpolate(unref(recipe).description)}</li></ol></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipe/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-485db8fc"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-jB-xvcsH.js.map

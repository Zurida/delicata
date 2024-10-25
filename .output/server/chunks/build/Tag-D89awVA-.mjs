import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Tag",
  __ssrInlineRender: true,
  props: {
    tag: {
      type: String,
      default: "\u0417\u0430\u0432\u0442\u0440\u0430\u043A"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "tag" }, _attrs))}>${ssrInterpolate(__props.tag)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Tag.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Tag-D89awVA-.mjs.map

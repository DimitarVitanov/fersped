import { Fragment, computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, h, mergeProps, nextTick, onBeforeUnmount, onMounted, openBlock, ref, renderList, resolveComponent, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Link, createInertiaApp, router, useForm, usePage } from "@inertiajs/vue3";
import { renderToString } from "@vue/server-renderer";
import createServer from "@inertiajs/vue3/server";
import Lenis from "lenis";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region resources/js/lib/i18n.js
/**
* Small i18n layer. Structured page content arrives from the server already
* localized (great for SEO/SSR); this helper covers UI chrome strings that
* live in the shared `t` prop, plus locale-aware URL building.
*/
function useI18n() {
	const page = usePage();
	const locale = computed(() => page.props.locale ?? "mk");
	const strings = computed(() => page.props.t ?? {});
	const t = (key, fallback = "") => {
		return key.split(".").reduce((acc, part) => acc && acc[part] != null ? acc[part] : null, strings.value) ?? fallback ?? key;
	};
	const localePath = (path = "", loc = locale.value) => {
		const clean = String(path).replace(/^\/+/, "");
		return `/${loc}${clean ? "/" + clean : ""}`;
	};
	return {
		locale,
		strings,
		t,
		localePath
	};
}
var localePlugin = { install(app) {
	app.config.globalProperties.$t = function(key, fallback = "") {
		const strings = (this.$page?.props ?? {}).t ?? {};
		return key.split(".").reduce((acc, part) => acc && acc[part] != null ? acc[part] : null, strings) ?? fallback ?? key;
	};
} };
//#endregion
//#region resources/js/Components/Icon.vue
var _sfc_main$32 = {
	__name: "Icon",
	__ssrInlineRender: true,
	props: {
		name: {
			type: String,
			required: true
		},
		size: {
			type: [Number, String],
			default: 24
		},
		stroke: {
			type: [Number, String],
			default: 1.75
		}
	},
	setup(__props) {
		const props = __props;
		const paths = {
			train: "<path d=\"M4 15.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 15.5Z\"/><path d=\"M4 11h16\"/><path d=\"M12 3v8\"/><circle cx=\"8\" cy=\"14.5\" r=\"1\"/><circle cx=\"16\" cy=\"14.5\" r=\"1\"/><path d=\"m7 18-2 3\"/><path d=\"m17 18 2 3\"/>",
			truck: "<path d=\"M14 17V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1\"/><path d=\"M14 8h4l3 3v5a1 1 0 0 1-1 1h-1\"/><circle cx=\"7.5\" cy=\"17.5\" r=\"2\"/><circle cx=\"17.5\" cy=\"17.5\" r=\"2\"/><path d=\"M9.5 17.5h5\"/>",
			ship: "<path d=\"M3 14 5 9h14l2 5\"/><path d=\"M12 3v6\"/><path d=\"M8 9V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3\"/><path d=\"M3 14c0 3 2 5 4 5 1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1\"/><path d=\"M4 20c1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1 2 1 3.5 1\"/>",
			plane: "<path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z\"/>",
			stamp: "<path d=\"M5 22h14\"/><path d=\"M6.5 18h11\"/><path d=\"M9 14a3 3 0 0 1-1-2.2V7.5a3.5 3.5 0 0 1 7 0v4.3A3 3 0 0 1 15 14Z\"/><path d=\"M8 14h8v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z\"/>",
			warehouse: "<path d=\"M22 8.35V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.35a2 2 0 0 1 1.26-1.86l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z\"/><path d=\"M6 18h12\"/><path d=\"M6 14h12\"/><path d=\"M6 21V10h12v11\"/>",
			shield: "<path d=\"M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.5 0C15.5 3.8 18 5 20 5a1 1 0 0 1 1 1Z\"/><path d=\"m9 12 2 2 4-4\"/>",
			globe: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18\"/><path d=\"M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z\"/>",
			clock: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>",
			layers: "<path d=\"m12 2 9 5-9 5-9-5 9-5Z\"/><path d=\"m3 12 9 5 9-5\"/><path d=\"m3 17 9 5 9-5\"/>",
			spark: "<path d=\"M12 3v4\"/><path d=\"M12 17v4\"/><path d=\"M3 12h4\"/><path d=\"M17 12h4\"/><path d=\"M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z\"/>",
			people: "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M4 20a5 5 0 0 1 10 0\"/><path d=\"M16 5.5a3 3 0 0 1 0 5\"/><path d=\"M17 14.5a5 5 0 0 1 3 5\"/>",
			leaf: "<path d=\"M11 20A7 7 0 0 1 4 13c0-6 5-9 16-9 0 8-4 13-10 13a5 5 0 0 1-5-3\"/><path d=\"M5 21c1-4 4-7 9-9\"/>",
			chart: "<path d=\"M4 4v16h16\"/><rect x=\"7\" y=\"12\" width=\"3\" height=\"5\"/><rect x=\"12\" y=\"8\" width=\"3\" height=\"9\"/><rect x=\"17\" y=\"5\" width=\"3\" height=\"12\"/>",
			doc: "<path d=\"M14 3v4a1 1 0 0 0 1 1h4\"/><path d=\"M19 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9l6 6v11a1 1 0 0 1-1 1Z\"/><path d=\"M8 12h8\"/><path d=\"M8 16h8\"/><path d=\"M8 8h3\"/>",
			arrowRight: "<path d=\"M5 12h14\"/><path d=\"m13 6 6 6-6 6\"/>",
			arrowLeft: "<path d=\"M19 12H5\"/><path d=\"m11 6-6 6 6 6\"/>",
			phone: "<path d=\"M15.5 21A13.5 13.5 0 0 1 3 8.5 2.5 2.5 0 0 1 5.5 6h1.7a1 1 0 0 1 1 .8l.6 3a1 1 0 0 1-.5 1.1l-1.3.7a11 11 0 0 0 4.6 4.6l.7-1.3a1 1 0 0 1 1.1-.5l3 .6a1 1 0 0 1 .8 1v1.7A2.5 2.5 0 0 1 15.5 21Z\"/>",
			mail: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/>",
			pin: "<path d=\"M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
			fax: "<path d=\"M7 3h10v6H7Z\"/><path d=\"M7 9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"/><path d=\"M17 9h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2\"/><rect x=\"7\" y=\"13\" width=\"10\" height=\"8\" rx=\"1\"/>",
			menu: "<path d=\"M4 6h16\"/><path d=\"M4 12h16\"/><path d=\"M4 18h16\"/>",
			close: "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
			check: "<path d=\"M20 6 9 17l-5-5\"/>",
			checkCircle: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8.5 12 2.5 2.5 4.5-4.5\"/>",
			linkedin: "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M8 10v7\"/><path d=\"M8 7v.01\"/><path d=\"M12 17v-4a2 2 0 0 1 4 0v4\"/><path d=\"M12 17v-7\"/>",
			star: "<path d=\"m12 3 2.5 5.5L20 9.3l-4 4 1 5.7-5-3-5 3 1-5.7-4-4 5.5-.8Z\"/>",
			quote: "<path d=\"M7 7h4v4c0 2-1.5 4-4 4\"/><path d=\"M15 7h4v4c0 2-1.5 4-4 4\"/>",
			route: "<circle cx=\"6\" cy=\"19\" r=\"2\"/><circle cx=\"18\" cy=\"5\" r=\"2\"/><path d=\"M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6\"/>",
			box: "<path d=\"m12 2 8 4.5v9L12 20l-8-4.5v-9Z\"/><path d=\"M4 6.5 12 11l8-4.5\"/><path d=\"M12 11v9\"/>",
			headset: "<path d=\"M4 14v-2a8 8 0 0 1 16 0v2\"/><path d=\"M4 14a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2Z\"/><path d=\"M20 14a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z\"/><path d=\"M18 18a4 4 0 0 1-4 3h-2\"/>",
			umbrella: "<path d=\"M12 3v1\"/><path d=\"M3 12a9 9 0 0 1 18 0Z\"/><path d=\"M12 12v7a2.5 2.5 0 0 0 5 0\"/>",
			anchor: "<circle cx=\"12\" cy=\"5\" r=\"2.5\"/><path d=\"M12 7.5V21\"/><path d=\"M5 12H3a9 9 0 0 0 18 0h-2\"/><path d=\"M8 11h8\"/>",
			arrowUpRight: "<path d=\"M7 17 17 7\"/><path d=\"M8 7h9v9\"/>",
			corridor: "<path d=\"M12 2v20\"/><path d=\"M5 6h14\"/><path d=\"M4 12h16\"/><path d=\"M6 18h12\"/>"
		};
		const inner = computed(() => paths[props.name] ?? paths.box);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				width: __props.size,
				height: __props.size,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": __props.stroke,
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true"
			}, _attrs))}>${inner.value ?? ""}</svg>`);
		};
	}
};
var _sfc_setup$32 = _sfc_main$32.setup;
_sfc_main$32.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Icon.vue");
	return _sfc_setup$32 ? _sfc_setup$32(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/PageHero.vue
var _sfc_main$31 = {
	__name: "PageHero",
	__ssrInlineRender: true,
	props: {
		eyebrow: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			required: true
		},
		lead: {
			type: String,
			default: ""
		},
		crumb: {
			type: String,
			default: ""
		},
		image: {
			type: String,
			default: "/images/hero.webp"
		}
	},
	setup(__props) {
		usePage();
		const { t, localePath } = useI18n();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "media media-grade relative -mt-[4.75rem] flex min-h-[68svh] items-end overflow-hidden bg-bg text-white sm:min-h-[74svh]" }, _attrs))}><img${ssrRenderAttr("src", __props.image)} alt="" class="absolute inset-0 h-full w-full object-cover opacity-55" fetchpriority="high"><div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/45"></div><div class="grid-dots absolute inset-0 opacity-40"></div><div class="container-page relative w-full pb-12 pt-36 sm:pb-16"><div class="stage"><nav class="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)(""),
				class: "transition-colors hover:text-brand-400"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("nav.home"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("nav.home")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-brand-500/60">/</span><span class="text-body">${ssrInterpolate(__props.crumb || __props.title)}</span></nav>`);
			if (__props.eyebrow) _push(`<span class="eyebrow mt-6 inline-flex">${ssrInterpolate(__props.eyebrow)}</span>`);
			else _push(`<!---->`);
			_push(`<h1 data-split class="mt-5 max-w-5xl font-display text-[clamp(2.3rem,6.5vw,5.6rem)] font-extrabold uppercase leading-[0.97] tracking-[-0.03em] text-ink">${ssrInterpolate(__props.title)}</h1>`);
			if (__props.lead) _push(`<p class="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">${ssrInterpolate(__props.lead)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></section>`);
		};
	}
};
var _sfc_setup$31 = _sfc_main$31.setup;
_sfc_main$31.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PageHero.vue");
	return _sfc_setup$31 ? _sfc_setup$31(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/SectionHeading.vue
var _sfc_main$30 = {
	__name: "SectionHeading",
	__ssrInlineRender: true,
	props: {
		eyebrow: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		body: {
			type: String,
			default: ""
		},
		align: {
			type: String,
			default: "left"
		},
		dark: {
			type: Boolean,
			default: false
		},
		max: {
			type: String,
			default: ""
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["reveal", [__props.align === "center" ? "mx-auto text-center" : "", __props.max || "max-w-2xl"]] }, _attrs))}>`);
			if (__props.eyebrow) _push(`<span class="${ssrRenderClass([__props.dark ? "eyebrow-dark" : "", "eyebrow"])}">${ssrInterpolate(__props.eyebrow)}</span>`);
			else _push(`<!---->`);
			if (__props.title) _push(`<h2 class="${ssrRenderClass([__props.dark ? "text-white" : "text-ink", "mt-5 text-3xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-4xl lg:text-[2.85rem]"])}">${ssrInterpolate(__props.title)}</h2>`);
			else _push(`<!---->`);
			if (__props.body) _push(`<p class="${ssrRenderClass([[__props.dark ? "text-on-mute" : "text-body", __props.align === "center" ? "mx-auto max-w-2xl" : ""], "mt-5 text-[1.05rem] leading-relaxed sm:text-lg"])}">${ssrInterpolate(__props.body)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$30 = _sfc_main$30.setup;
_sfc_main$30.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SectionHeading.vue");
	return _sfc_setup$30 ? _sfc_setup$30(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/About.vue
var About_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$29 });
var _sfc_main$29 = {
	__name: "About",
	__ssrInlineRender: true,
	props: {
		about: {
			type: Object,
			required: true
		},
		hub: {
			type: Object,
			default: () => ({})
		}
	},
	setup(__props) {
		const { t, localePath, locale } = useI18n();
		const HUB_TITLES = {
			mk: {
				about: "Документи и структура",
				responsibility: "Општествена одговорност",
				sectors: "Сектори на друштвото"
			},
			en: {
				about: "Documents & structure",
				responsibility: "Social responsibility",
				sectors: "Company sectors"
			}
		};
		const HUB_ORDER = [
			"about",
			"sectors",
			"responsibility"
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.about.eyebrow,
				title: __props.about.title,
				lead: __props.about.lead,
				crumb: _ctx.$t("nav.about"),
				image: "/images/about.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16"><div class="reveal lg:col-span-7"><!--[-->`);
			ssrRenderList(__props.about.story, (para, i) => {
				_push(`<p class="${ssrRenderClass([i === 0 ? "!text-ink" : "", "text-lg leading-relaxed text-body [&:not(:first-child)]:mt-6"])}">${ssrInterpolate(para)}</p>`);
			});
			_push(`<!--]--></div><div class="reveal lg:col-span-5"><div class="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-brand-50 p-8"><div class="grid-dots absolute inset-0 opacity-40"></div><div class="tnum relative font-display text-7xl font-extrabold tracking-[-0.04em] text-brand-400">1968</div><p class="relative mt-4 text-[0.95rem] leading-relaxed text-body">${ssrInterpolate(unref(locale) === "mk" ? "Родени на пругата — самостојна шпедитерска единица во рамки на Железниците на Македонија." : "Born on the rails — an independent forwarding unit within the Railways of Macedonia.")}</p><div class="relative mt-6 flex items-center gap-2 border-t border-hair pt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted"><span class="inline-flex h-1.5 w-1.5 rounded-full bg-brand-500"></span> ${ssrInterpolate(unref(locale) === "mk" ? "Берза: FERS · Скопје" : "MSE : FERS · Skopje")}</div></div></div></div></section><section class="band-light section border-t border-hair bg-bg-2"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.about.governance.eyebrow,
				title: __props.about.governance.title,
				body: __props.about.governance.body,
				max: "max-w-2xl"
			}, null, _parent));
			_push(`<div data-stagger class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.about.governance.members, (m, i) => {
				_push(`<div class="card p-6"><span class="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-brand-400">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="mt-4 text-lg font-bold text-ink">${ssrInterpolate(m.name)}</h3><p class="mono-label mt-2 normal-case tracking-[0.06em]">${ssrInterpolate(m.role)}</p></div>`);
			});
			_push(`<!--]--></div></div></section><section class="band-light section border-y border-hair bg-bg"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: _ctx.$t("nav.about"),
				title: __props.about.values_title,
				align: "center",
				max: "max-w-xl"
			}, null, _parent));
			_push(`<div class="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.about.values, (v, i) => {
				_push(`<div class="card card-hover p-7"><span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: v.icon,
					size: 24,
					stroke: 1.75
				}, null, _parent));
				_push(`</span><h3 class="mt-6 text-lg font-bold text-ink">${ssrInterpolate(v.title)}</h3><p class="mt-2 text-sm leading-relaxed text-body">${ssrInterpolate(v.text)}</p></div>`);
			});
			_push(`<!--]--></div></div></section><section class="band-light section bg-bg"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: `1968 — ${unref(locale) === "mk" ? "Денес" : "Today"}`,
				title: __props.about.timeline_title,
				max: "max-w-xl"
			}, null, _parent));
			_push(`<ol class="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.about.milestones, (m, i) => {
				_push(`<li class="relative rounded-2xl border border-hair bg-card p-6 transition-colors hover:border-brand-500/40"><div class="text-3xl font-extrabold tracking-[-0.02em] text-brand-400">${ssrInterpolate(m.year)}</div><p class="mt-3 text-[0.95rem] leading-relaxed text-body">${ssrInterpolate(m.text)}</p><span class="absolute right-6 top-7 h-2 w-2 rounded-full bg-amber"></span></li>`);
			});
			_push(`<!--]--></ol></div></section><section class="band-light section border-t border-hair bg-bg-2"><div class="container-page"><div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.about.group.eyebrow,
				title: __props.about.group.title,
				body: __props.about.group.body,
				max: "max-w-xl"
			}, null, _parent));
			_push(`</div><div class="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.about.group.items, (g, i) => {
				_push(`<a${ssrRenderAttr("href", g.url)} target="_blank" rel="noopener" class="card card-hover group p-7"><div class="flex items-start justify-between gap-3"><span class="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-brand-400">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span>`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "arrowUpRight",
					size: 18,
					class: "text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400"
				}, null, _parent));
				_push(`</div><h3 class="mt-8 text-lg font-bold leading-snug text-ink">${ssrInterpolate(g.name)}</h3><p class="mt-1.5 text-sm text-body">${ssrInterpolate(g.meta)}</p></a>`);
			});
			_push(`<!--]--></div></div></section><section class="media relative overflow-hidden bg-deep-2 text-white"><img src="/images/services/railway.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.12]" loading="lazy"><div class="absolute inset-0 bg-deep-2/70"></div><div class="container-page relative section"><div class="grid items-end gap-10 lg:grid-cols-12"><div class="lg:col-span-8">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.about.responsibility.eyebrow,
				title: __props.about.responsibility.title,
				body: __props.about.responsibility.body,
				dark: "",
				max: "max-w-2xl"
			}, null, _parent));
			_push(`</div><div class="lg:col-span-4 lg:text-right">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-amber"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.contact"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.contact")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="reveal mt-14 grid gap-x-6 gap-y-10 border-t border-hair-dark pt-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.about.responsibility.pillars, (p, i) => {
				_push(`<div><span class="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-brand-300">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="mt-3 text-base font-bold text-white">${ssrInterpolate(p.title)}</h3><p class="mt-2 text-sm leading-relaxed text-on-mute">${ssrInterpolate(p.text)}</p></div>`);
			});
			_push(`<!--]--></div></div></section>`);
			if (Object.keys(__props.hub).length) {
				_push(`<section class="band-light section border-t border-hair bg-bg"><div class="container-page">`);
				_push(ssrRenderComponent(_sfc_main$30, {
					eyebrow: unref(locale) === "mk" ? "Повеќе за друштвото" : "More about the company",
					title: unref(locale) === "mk" ? "Целосна документација и сектори" : "Full documentation and sectors",
					max: "max-w-2xl"
				}, null, _parent));
				_push(`<div data-stagger class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList(HUB_ORDER.filter((k) => __props.hub[k]?.length), (g, gi) => {
					_push(`<div class="relative border-t border-hair pt-7"><span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span><span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">${ssrInterpolate(String(gi + 1).padStart(2, "0"))}</span><h3 class="mt-4 text-lg font-bold text-ink">${ssrInterpolate(HUB_TITLES[unref(locale)]?.[g] ?? g)}</h3><ul class="mt-5 space-y-3"><!--[-->`);
					ssrRenderList(__props.hub[g], (pg) => {
						_push(`<li>`);
						_push(ssrRenderComponent(_component_Link, {
							href: pg.href,
							class: "group inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"${_scopeId}></span> ${ssrInterpolate(pg.title)}`);
								else return [createVNode("span", { class: "mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" }), createTextVNode(" " + toDisplayString(pg.title), 1)];
							}),
							_: 2
						}, _parent));
						_push(`</li>`);
					});
					_push(`<!--]--></ul></div>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$29 = _sfc_main$29.setup;
_sfc_main$29.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Logo.vue
var _sfc_main$28 = {
	__name: "Logo",
	__ssrInlineRender: true,
	props: {
		tone: {
			type: String,
			default: "dark"
		},
		showText: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: "inline-flex select-none items-center" }, _attrs))}><img${ssrRenderAttr("src", __props.tone === "light" ? "/images/fersped-logo-white.png" : "/images/fersped-logo-green.png")} alt="FERŠPED Skopje" class="h-9 w-auto sm:h-10" width="230" height="70" decoding="async"></span>`);
		};
	}
};
var _sfc_setup$28 = _sfc_main$28.setup;
_sfc_main$28.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Logo.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/AdminLayout.vue
var _sfc_main$27 = {
	__name: "AdminLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const user = computed(() => page.props.auth?.user);
		const flash = computed(() => page.props.flash?.success);
		const nav = [
			{
				href: "/admin",
				label: "Дашборд",
				icon: "layers"
			},
			{
				href: "/admin/content",
				label: "Содржина",
				icon: "doc"
			},
			{
				href: "/admin/services",
				label: "Услуги",
				icon: "truck"
			},
			{
				href: "/admin/pages",
				label: "Страници",
				icon: "globe"
			},
			{
				href: "/admin/documents",
				label: "Документи",
				icon: "stamp"
			},
			{
				href: "/admin/posts",
				label: "Вести",
				icon: "spark"
			},
			{
				href: "/admin/media",
				label: "Медиа",
				icon: "chart"
			},
			{
				href: "/admin/settings",
				label: "Поставки",
				icon: "shield"
			}
		];
		const current = computed(() => page.url);
		function isActive(href) {
			return href === "/admin" ? current.value === "/admin" : current.value.startsWith(href);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-bg text-body" }, _attrs))}>`);
			if (!user.value) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			else {
				_push(`<!--[--><div class="flex min-h-screen"><aside class="hidden w-64 shrink-0 flex-col border-r border-hair bg-bg-2 lg:flex"><div class="flex h-[4.5rem] items-center border-b border-hair px-6">`);
				_push(ssrRenderComponent(_sfc_main$28, null, null, _parent));
				_push(`<span class="mono-label ml-3 mt-1 text-brand-500">Admin</span></div><nav class="flex-1 space-y-1 px-3 py-6"><!--[-->`);
				ssrRenderList(nav, (item) => {
					_push(ssrRenderComponent(_component_Link, {
						key: item.href,
						href: item.href,
						class: ["flex items-center gap-3 rounded-xl px-4 py-3 text-[0.92rem] font-semibold transition-colors", isActive(item.href) ? "bg-brand-500/10 text-brand-400" : "text-body hover:bg-bg-3 hover:text-ink"]
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_sfc_main$32, {
									name: item.icon,
									size: 17
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(item.label)}`);
							} else return [createVNode(_sfc_main$32, {
								name: item.icon,
								size: 17
							}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(item.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></nav><div class="border-t border-hair p-4"><a href="/mk" target="_blank" class="mono-label flex items-center gap-2 px-2 py-2 transition-colors hover:text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "arrowUpRight",
					size: 13
				}, null, _parent));
				_push(` Погледни ја страницата </a><button type="button" class="mono-label mt-1 flex w-full items-center gap-2 px-2 py-2 text-left transition-colors hover:text-red-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "close",
					size: 13
				}, null, _parent));
				_push(` Одјава · ${ssrInterpolate(user.value.name)}</button></div></aside><div class="min-w-0 flex-1"><div class="flex items-center gap-2 overflow-x-auto border-b border-hair bg-bg-2 px-4 py-3 lg:hidden"><!--[-->`);
				ssrRenderList(nav, (item) => {
					_push(ssrRenderComponent(_component_Link, {
						key: item.href,
						href: item.href,
						class: ["mono-label shrink-0 rounded-lg px-3 py-2", isActive(item.href) ? "bg-brand-500/10 text-brand-400" : ""]
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(item.label)}`);
							else return [createTextVNode(toDisplayString(item.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--><button type="button" class="mono-label ml-auto shrink-0 px-2 text-red-400">Одјава</button></div><main class="p-5 sm:p-8 lg:p-10">`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</main></div></div>`);
				if (flash.value) _push(`<div class="fixed bottom-6 right-6 z-50 rounded-xl border border-brand-500/40 bg-bg-2 px-5 py-3.5 text-sm font-semibold text-brand-400 shadow-lg">${ssrInterpolate(flash.value === true ? "Зачувано." : flash.value)}</div>`);
				else _push(`<!---->`);
				_push(`<!--]-->`);
			}
			_push(`</div>`);
		};
	}
};
var _sfc_setup$27 = _sfc_main$27.setup;
_sfc_main$27.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/Admin/JsonField.vue
var _sfc_main$26 = {
	__name: "JsonField",
	__ssrInlineRender: true,
	props: {
		modelValue: { required: true },
		label: {
			type: String,
			default: ""
		},
		depth: {
			type: Number,
			default: 0
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		/**
		* Recursive editor for arbitrary content-block JSON.
		* Strings → input/textarea · booleans → toggle · numbers → number input
		* arrays → repeaters (add/remove/reorder) · objects → fieldsets.
		*/
		const props = __props;
		const emit = __emit;
		const kind = computed(() => {
			const v = props.modelValue;
			if (Array.isArray(v)) return "array";
			if (v !== null && typeof v === "object") return "object";
			if (typeof v === "boolean") return "bool";
			if (typeof v === "number") return "number";
			return "string";
		});
		const longText = computed(() => typeof props.modelValue === "string" && (props.modelValue.length > 90 || props.modelValue.includes("\n")));
		function setKey(key, val) {
			if (kind.value === "array") {
				const next = [...props.modelValue];
				next[key] = val;
				emit("update:modelValue", next);
			} else emit("update:modelValue", {
				...props.modelValue,
				[key]: val
			});
		}
		function labelFor(key) {
			return String(key).replace(/_/g, " ");
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_JsonField = resolveComponent("JsonField", true);
			if (kind.value === "string" || kind.value === "number") {
				_push(`<div${ssrRenderAttrs(_attrs)}>`);
				if (__props.label) _push(`<label class="field-label">${ssrInterpolate(labelFor(__props.label))}</label>`);
				else _push(`<!---->`);
				if (longText.value) _push(`<textarea class="field min-h-24 !text-[0.9rem]" rows="3">${ssrInterpolate(__props.modelValue)}</textarea>`);
				else _push(`<input class="field !text-[0.9rem]"${ssrRenderAttr("type", kind.value === "number" ? "number" : "text")}${ssrRenderAttr("value", __props.modelValue)}>`);
				_push(`</div>`);
			} else if (kind.value === "bool") _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3 py-1" }, _attrs))}><button type="button" class="${ssrRenderClass([__props.modelValue ? "bg-brand-500" : "bg-bg-3 border border-hair-dark", "relative h-6 w-11 rounded-full transition-colors"])}"><span class="${ssrRenderClass([__props.modelValue ? "left-[1.4rem]" : "left-0.5", "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all"])}"></span></button><span class="field-label !m-0">${ssrInterpolate(labelFor(__props.label))}</span></div>`);
			else if (kind.value === "object") {
				_push(`<fieldset${ssrRenderAttrs(mergeProps({ class: ["min-w-0", __props.depth > 0 ? "rounded-xl border border-hair bg-bg/40 p-4" : ""] }, _attrs))}>`);
				if (__props.label) _push(`<legend class="field-label px-1">${ssrInterpolate(labelFor(__props.label))}</legend>`);
				else _push(`<!---->`);
				_push(`<div class="space-y-4"><!--[-->`);
				ssrRenderList(__props.modelValue, (v, k) => {
					_push(ssrRenderComponent(_component_JsonField, {
						key: k,
						"model-value": v,
						label: String(k),
						depth: __props.depth + 1,
						"onUpdate:modelValue": ($event) => setKey(k, $event)
					}, null, _parent));
				});
				_push(`<!--]--></div></fieldset>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-w-0" }, _attrs))}><div class="mb-2 flex items-center justify-between">`);
				if (__props.label) _push(`<span class="field-label !mb-0">${ssrInterpolate(labelFor(__props.label))} <span class="text-muted">(${ssrInterpolate(__props.modelValue.length)})</span></span>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="mono-label rounded-lg border border-brand-500/40 px-3 py-1.5 text-brand-400 transition-colors hover:bg-brand-500/10">+ Додади</button></div><div class="space-y-3"><!--[-->`);
				ssrRenderList(__props.modelValue, (item, i) => {
					_push(`<div class="group/item relative rounded-xl border border-hair bg-bg-2/60 p-4"><div class="absolute right-2.5 top-2.5 flex gap-1 opacity-0 transition-opacity group-hover/item:opacity-100"><button type="button" class="rounded-md border border-hair px-2 py-0.5 text-xs text-muted hover:text-ink">↑</button><button type="button" class="rounded-md border border-hair px-2 py-0.5 text-xs text-muted hover:text-ink">↓</button><button type="button" class="rounded-md border border-red-500/40 px-2 py-0.5 text-xs text-red-400 hover:bg-red-500/10">✕</button></div>`);
					_push(ssrRenderComponent(_component_JsonField, {
						"model-value": item,
						depth: __props.depth + 1,
						"onUpdate:modelValue": ($event) => setKey(i, $event)
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div></div>`);
			}
		};
	}
};
var _sfc_setup$26 = _sfc_main$26.setup;
_sfc_main$26.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/JsonField.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Content.vue
var Content_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$25 });
var _sfc_main$25 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Content",
	__ssrInlineRender: true,
	props: {
		locale: String,
		page: String,
		pages: Array,
		blocks: Array
	},
	setup(__props) {
		const props = __props;
		const PAGE_LABELS = {
			home: "Почетна",
			services: "Услуги (вовед)",
			about: "За ФЕРШПЕД",
			network: "Мрежа",
			contact: "Контакт",
			investors: "Инвеститори",
			ui: "UI текстови",
			meta: "SEO мета",
			news: "Вести"
		};
		const sel = ref({
			locale: props.locale,
			page: props.page
		});
		watch(sel, (v) => router.get("/admin/content", v, { preserveState: false }), { deep: true });
		const open = ref(null);
		const drafts = ref({});
		const saving = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-extrabold text-ink">Содржина</h1><p class="mt-2 text-sm">Секој блок подолу е секција на страницата. Отвори, измени, зачувај — промената е веднаш видлива на сајтот.</p><div class="mt-6 flex flex-wrap items-center gap-3"><select class="field !w-auto"><option value="mk"${ssrIncludeBooleanAttr(Array.isArray(sel.value.locale) ? ssrLooseContain(sel.value.locale, "mk") : ssrLooseEqual(sel.value.locale, "mk")) ? " selected" : ""}>Македонски</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(sel.value.locale) ? ssrLooseContain(sel.value.locale, "en") : ssrLooseEqual(sel.value.locale, "en")) ? " selected" : ""}>English</option></select><select class="field !w-auto"><!--[-->`);
			ssrRenderList(__props.pages, (p) => {
				_push(`<option${ssrRenderAttr("value", p)}${ssrIncludeBooleanAttr(Array.isArray(sel.value.page) ? ssrLooseContain(sel.value.page, p) : ssrLooseEqual(sel.value.page, p)) ? " selected" : ""}>${ssrInterpolate(PAGE_LABELS[p] ?? p)}</option>`);
			});
			_push(`<!--]--></select></div><div class="mt-8 space-y-3"><!--[-->`);
			ssrRenderList(__props.blocks, (block) => {
				_push(`<div class="overflow-hidden rounded-2xl border border-hair bg-bg-2"><button type="button" class="flex w-full items-center justify-between px-6 py-4 text-left"><span class="font-bold text-ink">${ssrInterpolate(block.label || block.key)}</span><span class="mono-label">${ssrInterpolate(block.key)} ${ssrInterpolate(open.value === block.id ? "−" : "+")}</span></button>`);
				if (open.value === block.id) {
					_push(`<div class="border-t border-hair p-6">`);
					_push(ssrRenderComponent(_sfc_main$26, {
						modelValue: drafts.value[block.id],
						"onUpdate:modelValue": ($event) => drafts.value[block.id] = $event
					}, null, _parent));
					_push(`<div class="mt-6 flex justify-end gap-3"><button type="button" class="btn-outline">Врати</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(saving.value === block.id) ? " disabled" : ""}>Зачувај</button></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
var _sfc_setup$25 = _sfc_main$25.setup;
_sfc_main$25.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Content.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Dashboard.vue
var Dashboard_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$24 });
var _sfc_main$24 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Dashboard",
	__ssrInlineRender: true,
	props: { stats: {
		type: Array,
		required: true
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}><span class="eyebrow">Администрација</span><h1 class="mt-3 text-3xl font-extrabold text-ink">Контролна табла</h1><p class="mt-2 max-w-xl text-sm">Целата содржина на сајтот — секој текст, секција, документ и слика — се уредува одовде.</p><div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.stats, (s) => {
				_push(ssrRenderComponent(_component_Link, {
					key: s.href,
					href: s.href,
					class: "group rounded-2xl border border-hair bg-bg-2 p-6 transition-colors hover:border-brand-500/40"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="tnum text-4xl font-extrabold text-brand-400"${_scopeId}>${ssrInterpolate(s.value)}</div><div class="mono-label mt-3 transition-colors group-hover:text-ink"${_scopeId}>${ssrInterpolate(s.label)}</div>`);
						else return [createVNode("div", { class: "tnum text-4xl font-extrabold text-brand-400" }, toDisplayString(s.value), 1), createVNode("div", { class: "mono-label mt-3 transition-colors group-hover:text-ink" }, toDisplayString(s.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
var _sfc_setup$24 = _sfc_main$24.setup;
_sfc_main$24.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Documents.vue
var Documents_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$23 });
var _sfc_main$23 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Documents",
	__ssrInlineRender: true,
	props: {
		categories: Array,
		active: String,
		documents: Array
	},
	setup(__props) {
		const upload = useForm({
			document_category_id: null,
			title_mk: "",
			title_en: "",
			year: null,
			file: null
		});
		const editing = ref(null);
		const draft = ref({});
		const showCat = ref(false);
		const cat = useForm({
			slug: "",
			title_mk: "",
			title_en: "",
			sort: 50
		});
		function fmtSize(b) {
			if (!b) return "";
			return b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.round(b / 1024) + " KB";
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4"><h1 class="text-3xl font-extrabold text-ink">Документи</h1><button type="button" class="btn-outline">+ Нова категорија</button></div>`);
			if (showCat.value) _push(`<form class="mt-5 grid gap-4 rounded-2xl border border-hair bg-bg-2 p-6 sm:grid-cols-4"><div><label class="field-label">Slug</label><input${ssrRenderAttr("value", unref(cat).slug)} class="field" placeholder="npr. sobranie-2027" required></div><div><label class="field-label">Наслов МК</label><input${ssrRenderAttr("value", unref(cat).title_mk)} class="field" required></div><div><label class="field-label">Наслов EN</label><input${ssrRenderAttr("value", unref(cat).title_en)} class="field" required></div><div class="flex items-end"><button class="btn-primary w-full justify-center"${ssrIncludeBooleanAttr(unref(cat).processing) ? " disabled" : ""}>Креирај</button></div></form>`);
			else _push(`<!---->`);
			_push(`<div class="mt-6 flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList(__props.categories, (c) => {
				_push(`<button type="button" class="${ssrRenderClass([c.slug === __props.active ? "border-brand-500/50 bg-brand-500/10 text-brand-400" : "border-hair hover:text-ink", "mono-label rounded-lg border px-3.5 py-2 transition-colors"])}">${ssrInterpolate(c.title_mk)} · ${ssrInterpolate(c.documents_count)}</button>`);
			});
			_push(`<!--]--></div><form class="mt-8 grid gap-4 rounded-2xl border border-brand-500/30 bg-bg-2 p-6 sm:grid-cols-2 lg:grid-cols-5"><div class="lg:col-span-2"><label class="field-label">Наслов МК *</label><input${ssrRenderAttr("value", unref(upload).title_mk)} class="field" required></div><div><label class="field-label">Наслов EN</label><input${ssrRenderAttr("value", unref(upload).title_en)} class="field"></div><div><label class="field-label">Година</label><input${ssrRenderAttr("value", unref(upload).year)} type="number" class="field"></div><div class="flex items-end gap-3"><label class="btn-outline cursor-pointer">${ssrInterpolate(unref(upload).file ? "1 датотека" : "Избери датотека")} <input type="file" class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"></label><button class="btn-primary"${ssrIncludeBooleanAttr(unref(upload).processing || !unref(upload).file) ? " disabled" : ""}>Прикачи</button></div>`);
			if (unref(upload).errors.file) _push(`<p class="text-sm text-red-400 lg:col-span-5">${ssrInterpolate(unref(upload).errors.file)}</p>`);
			else _push(`<!---->`);
			_push(`</form><div class="mt-6 overflow-hidden rounded-2xl border border-hair"><table class="w-full text-sm"><tbody><!--[-->`);
			ssrRenderList(__props.documents, (d) => {
				_push(`<tr class="border-b border-hair bg-bg-2 align-top last:border-0 hover:bg-bg-3">`);
				if (editing.value === d.id) _push(`<td colspan="4" class="px-5 py-4"><div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><input${ssrRenderAttr("value", draft.value.title_mk)} class="field"><input${ssrRenderAttr("value", draft.value.title_en)} class="field" placeholder="EN наслов"><input${ssrRenderAttr("value", draft.value.year)} type="number" class="field !w-28"><div class="flex items-center gap-3"><label class="flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(draft.value.published) ? ssrLooseContain(draft.value.published, null) : draft.value.published) ? " checked" : ""} type="checkbox" class="h-4 w-4 accent-[#2ce577]"><span class="mono-label">Видлив</span></label><button type="button" class="btn-primary !px-4 !py-2">Зачувај</button><button type="button" class="btn-outline !px-4 !py-2">Откажи</button></div></div></td>`);
				else {
					_push(`<!--[--><td class="px-5 py-3.5"><a${ssrRenderAttr("href", `/${d.file_path}`)} target="_blank" class="font-semibold text-ink hover:text-brand-400">${ssrInterpolate(d.title_mk)}</a>`);
					if (d.title_en) _push(`<div class="mt-0.5 text-xs text-muted">${ssrInterpolate(d.title_en)}</div>`);
					else _push(`<!---->`);
					_push(`</td><td class="mono-label px-4 py-3.5 whitespace-nowrap">${ssrInterpolate(d.year ?? "—")}</td><td class="mono-label hidden px-4 py-3.5 whitespace-nowrap sm:table-cell">${ssrInterpolate(fmtSize(d.size_bytes))}`);
					if (!d.published) _push(`<span class="ml-2 text-red-400">скриен</span>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-4 py-3.5 text-right whitespace-nowrap"><button type="button" class="mono-label mr-3 text-brand-400">Уреди</button><button type="button" class="mono-label text-red-400">✕</button></td><!--]-->`);
				}
				_push(`</tr>`);
			});
			_push(`<!--]--></tbody></table></div></div>`);
		};
	}
});
var _sfc_setup$23 = _sfc_main$23.setup;
_sfc_main$23.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Documents.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Login.vue
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$22 });
var _sfc_main$22 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Login",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({
			email: "",
			password: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center px-5" }, _attrs))}><div class="w-full max-w-md"><div class="mb-8 flex items-center justify-center gap-3">`);
			_push(ssrRenderComponent(_sfc_main$28, null, null, _parent));
			_push(`<span class="mono-label mt-1 text-brand-500">Admin</span></div><form class="rounded-2xl border border-hair bg-bg-2 p-8"><h1 class="text-xl font-extrabold text-ink">Најава во администрација</h1><div class="mt-6"><label class="field-label" for="email">Е-пошта</label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" class="field" required autofocus>`);
			if (unref(form).errors.email) _push(`<p class="mt-2 text-sm text-red-400">${ssrInterpolate(unref(form).errors.email)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="mt-4"><label class="field-label" for="password">Лозинка</label><input id="password"${ssrRenderAttr("value", unref(form).password)} type="password" class="field" required></div><button type="submit" class="btn-primary mt-6 w-full justify-center"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>Најави се</button></form></div></div>`);
		};
	}
});
var _sfc_setup$22 = _sfc_main$22.setup;
_sfc_main$22.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Login.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Media.vue
var Media_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$21 });
var _sfc_main$21 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Media",
	__ssrInlineRender: true,
	props: {
		media: Object,
		q: String,
		type: String
	},
	setup(__props) {
		const props = __props;
		const search = ref({
			q: props.q,
			type: props.type
		});
		let timer = null;
		watch(search, (v) => {
			clearTimeout(timer);
			timer = setTimeout(() => router.get("/admin/media", v, {
				preserveState: true,
				replace: true
			}), 350);
		}, { deep: true });
		const upload = useForm({ files: [] });
		function isImage(m) {
			return (m.mime || "").startsWith("image/");
		}
		function fmtSize(b) {
			if (!b) return "";
			return b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.round(b / 1024) + " KB";
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4"><h1 class="text-3xl font-extrabold text-ink">Медиа</h1><label class="btn-primary cursor-pointer">${ssrInterpolate(unref(upload).files.length ? `${unref(upload).files.length} избрани — кликни за прикачување` : "+ Прикачи датотеки")} <input type="file" class="hidden" multiple></label></div><div class="mt-5 flex flex-wrap gap-3"><input${ssrRenderAttr("value", search.value.q)} class="field !w-72" placeholder="Пребарај по име…"><select class="field !w-auto"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(search.value.type) ? ssrLooseContain(search.value.type, "all") : ssrLooseEqual(search.value.type, "all")) ? " selected" : ""}>Сè</option><option value="image"${ssrIncludeBooleanAttr(Array.isArray(search.value.type) ? ssrLooseContain(search.value.type, "image") : ssrLooseEqual(search.value.type, "image")) ? " selected" : ""}>Слики</option><option value="document"${ssrIncludeBooleanAttr(Array.isArray(search.value.type) ? ssrLooseContain(search.value.type, "document") : ssrLooseEqual(search.value.type, "document")) ? " selected" : ""}>Документи</option></select><span class="mono-label self-center">${ssrInterpolate(__props.media.total)} датотеки</span></div><div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"><!--[-->`);
			ssrRenderList(__props.media.data, (m) => {
				_push(`<div class="group overflow-hidden rounded-xl border border-hair bg-bg-2"><a${ssrRenderAttr("href", `/${m.path}`)} target="_blank" class="block"><div class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-bg-3">`);
				if (isImage(m)) _push(`<img${ssrRenderAttr("src", `/${m.path}`)} alt="" loading="lazy" class="h-full w-full object-cover">`);
				else _push(`<span class="mono-label px-3 text-center">${ssrInterpolate(m.path.split(".").pop().toUpperCase())}</span>`);
				_push(`</div></a><div class="p-3"><div class="truncate text-xs font-semibold text-ink"${ssrRenderAttr("title", m.path)}>${ssrInterpolate(m.path.split("/").pop())}</div><div class="mt-1.5 flex items-center justify-between"><span class="mono-label">${ssrInterpolate(fmtSize(m.size_bytes))}</span><span class="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><button type="button" class="mono-label text-brand-400" title="Копирај патека">⧉</button><button type="button" class="mono-label text-red-400">✕</button></span></div></div></div>`);
			});
			_push(`<!--]--></div>`);
			if (__props.media.last_page > 1) {
				_push(`<div class="mt-8 flex items-center justify-center gap-2"><!--[-->`);
				ssrRenderList(__props.media.links, (link) => {
					_push(`<!--[-->`);
					if (link.url) _push(ssrRenderComponent(_component_Link, {
						href: link.url,
						"preserve-state": "",
						class: ["mono-label rounded-lg border px-3.5 py-2", link.active ? "border-brand-500/50 text-brand-400" : "border-hair"]
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>${link.label ?? ""}</span>`);
							else return [createVNode("span", { innerHTML: link.label }, null, 8, ["innerHTML"])];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
var _sfc_setup$21 = _sfc_main$21.setup;
_sfc_main$21.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Media.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/PageEdit.vue
var PageEdit_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$20 });
var _sfc_main$20 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "PageEdit",
	__ssrInlineRender: true,
	props: { page: Object },
	setup(__props) {
		const props = __props;
		const form = useForm({
			title_mk: props.page.title_mk,
			title_en: props.page.title_en,
			body_mk: props.page.body_mk,
			body_en: props.page.body_en,
			hero_image: props.page.hero_image,
			sort: props.page.sort,
			published: !!props.page.published
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_Link, {
				href: "/admin/pages",
				class: "mono-label text-brand-400"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Сите страници`);
					else return [createTextVNode("← Сите страници")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mt-3 flex flex-wrap items-center justify-between gap-4"><h1 class="text-3xl font-extrabold text-ink">${ssrInterpolate(unref(form).title_mk || unref(form).title_en)}</h1><a${ssrRenderAttr("href", `/mk/company/${__props.page.slug}`)} target="_blank" class="mono-label text-brand-400">Погледни → /company/${ssrInterpolate(__props.page.slug)}</a></div><form class="mt-8 space-y-6"><div class="grid gap-6 lg:grid-cols-2"><div class="rounded-2xl border border-hair bg-bg-2 p-6"><h2 class="mono-label mb-4 text-brand-500">Македонски</h2><label class="field-label">Наслов</label><input${ssrRenderAttr("value", unref(form).title_mk)} class="field"><label class="field-label mt-4">Содржина (HTML)</label><textarea class="field min-h-[26rem] font-mono !text-[0.8rem]">${ssrInterpolate(unref(form).body_mk)}</textarea></div><div class="rounded-2xl border border-hair bg-bg-2 p-6"><h2 class="mono-label mb-4 text-brand-500">English</h2><label class="field-label">Title</label><input${ssrRenderAttr("value", unref(form).title_en)} class="field"><label class="field-label mt-4">Body (HTML)</label><textarea class="field min-h-[26rem] font-mono !text-[0.8rem]">${ssrInterpolate(unref(form).body_en)}</textarea></div></div><div class="flex flex-wrap items-end gap-5 rounded-2xl border border-hair bg-bg-2 p-6"><div class="min-w-64 flex-1"><label class="field-label">Насловна слика (патека)</label><input${ssrRenderAttr("value", unref(form).hero_image)} class="field" placeholder="/media/legacy/…"></div><div><label class="field-label">Редослед</label><input${ssrRenderAttr("value", unref(form).sort)} type="number" class="field !w-24"></div><label class="flex items-center gap-2.5 pb-2.5"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).published) ? ssrLooseContain(unref(form).published, null) : unref(form).published) ? " checked" : ""} type="checkbox" class="h-4 w-4 accent-[#2ce577]"><span class="field-label !m-0">Објавена</span></label></div><div class="flex justify-between"><button type="button" class="mono-label rounded-lg border border-red-500/40 px-4 py-2.5 text-red-400 hover:bg-red-500/10">Избриши</button><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>Зачувај</button></div></form></div>`);
		};
	}
});
var _sfc_setup$20 = _sfc_main$20.setup;
_sfc_main$20.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/PageEdit.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Pages.vue
var Pages_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$19 });
var _sfc_main$19 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Pages",
	__ssrInlineRender: true,
	props: { pages: Array },
	setup(__props) {
		const props = __props;
		const GROUPS = {
			about: "За ФЕРШПЕД",
			investors: "Инвеститори",
			responsibility: "Општествена одговорност",
			sectors: "Сектори",
			network: "Мрежа",
			services: "Услуги (легаси)",
			contact: "Контакт"
		};
		const grouped = computed(() => {
			const out = {};
			for (const p of props.pages) (out[p.group] ??= []).push(p);
			return out;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-extrabold text-ink">Корпоративни страници</h1><p class="mt-2 text-sm">Сите страници преземени од стариот сајт — целосна содржина, двојазично.</p><!--[-->`);
			ssrRenderList(grouped.value, (items, group) => {
				_push(`<div class="mt-10"><h2 class="mono-label text-brand-500">${ssrInterpolate(GROUPS[group] ?? group)}</h2><div class="mt-4 overflow-hidden rounded-2xl border border-hair"><table class="w-full text-sm"><tbody><!--[-->`);
				ssrRenderList(items, (p) => {
					_push(`<tr class="border-b border-hair bg-bg-2 last:border-0 hover:bg-bg-3"><td class="px-5 py-3.5 font-semibold text-ink">${ssrInterpolate(p.title_mk ?? p.title_en)}</td><td class="hidden px-5 py-3.5 sm:table-cell">${ssrInterpolate(p.title_en)}</td><td class="mono-label px-5 py-3.5">${ssrInterpolate(p.slug)}</td><td class="px-5 py-3.5 text-right">`);
					if (!p.published) _push(`<span class="mono-label mr-3 text-red-400">скриена</span>`);
					else _push(`<!---->`);
					_push(ssrRenderComponent(_component_Link, {
						href: `/admin/pages/${p.id}`,
						class: "mono-label text-brand-400 hover:text-brand-300"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Уреди →`);
							else return [createTextVNode("Уреди →")];
						}),
						_: 2
					}, _parent));
					_push(`</td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
var _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Pages.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Posts.vue
var Posts_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$18 });
var _sfc_main$18 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Posts",
	__ssrInlineRender: true,
	props: { posts: Array },
	setup(__props) {
		const editingId = ref(null);
		const creating = ref(false);
		const form = useForm({
			locale: "mk",
			slug: "",
			title: "",
			excerpt: "",
			body: "",
			image: "",
			image_file: null,
			published: true,
			published_at: null
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap items-center justify-between gap-4"><h1 class="text-3xl font-extrabold text-ink">Вести</h1><button type="button" class="btn-primary">+ Нова вест</button></div>`);
			if (creating.value || editingId.value) _push(`<form class="mt-6 grid gap-4 rounded-2xl border border-brand-500/30 bg-bg-2 p-6"><div class="grid gap-4 sm:grid-cols-4"><div><label class="field-label">Јазик</label><select class="field"><option value="mk"${ssrIncludeBooleanAttr(Array.isArray(unref(form).locale) ? ssrLooseContain(unref(form).locale, "mk") : ssrLooseEqual(unref(form).locale, "mk")) ? " selected" : ""}>МК</option><option value="en"${ssrIncludeBooleanAttr(Array.isArray(unref(form).locale) ? ssrLooseContain(unref(form).locale, "en") : ssrLooseEqual(unref(form).locale, "en")) ? " selected" : ""}>EN</option></select></div><div class="sm:col-span-2"><label class="field-label">Наслов *</label><input${ssrRenderAttr("value", unref(form).title)} class="field" required></div><div><label class="field-label">Датум</label><input${ssrRenderAttr("value", unref(form).published_at)} type="date" class="field"></div></div><div><label class="field-label">Краток опис</label><textarea class="field" rows="2">${ssrInterpolate(unref(form).excerpt)}</textarea></div><div><label class="field-label">Содржина (HTML)</label><textarea class="field min-h-40 font-mono !text-[0.8rem]">${ssrInterpolate(unref(form).body)}</textarea></div><div class="flex flex-wrap items-end gap-4"><div class="min-w-64 flex-1"><label class="field-label">Слика (патека)</label><input${ssrRenderAttr("value", unref(form).image)} class="field" placeholder="/media/legacy/… или прикачи ↓"></div><label class="btn-outline cursor-pointer">${ssrInterpolate(unref(form).image_file ? unref(form).image_file.name : "Прикачи слика")} <input type="file" class="hidden" accept="image/*"></label><label class="flex items-center gap-2 pb-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).published) ? ssrLooseContain(unref(form).published, null) : unref(form).published) ? " checked" : ""} type="checkbox" class="h-4 w-4 accent-[#2ce577]"><span class="mono-label">Објавена</span></label><button class="btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(creating.value ? "Креирај" : "Зачувај")}</button><button type="button" class="btn-outline">Откажи</button></div></form>`);
			else _push(`<!---->`);
			_push(`<div class="mt-8 space-y-3"><!--[-->`);
			ssrRenderList(__props.posts, (p) => {
				_push(`<div class="flex items-center gap-5 rounded-2xl border border-hair bg-bg-2 p-4">`);
				if (p.image) _push(`<img${ssrRenderAttr("src", p.image)} alt="" class="h-14 w-20 rounded-lg object-cover">`);
				else _push(`<!---->`);
				_push(`<div class="min-w-0"><div class="font-bold text-ink">${ssrInterpolate(p.title)}</div><div class="mono-label mt-1">${ssrInterpolate(p.locale.toUpperCase())} · ${ssrInterpolate(p.slug)} `);
				if (!p.published) _push(`<span class="text-red-400">· скриена</span>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="ml-auto flex shrink-0 gap-3"><button type="button" class="mono-label text-brand-400">Уреди</button><button type="button" class="mono-label text-red-400">✕</button></div></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
var _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Posts.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Services.vue
var Services_exports$1 = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$17 });
var _sfc_main$17 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Services",
	__ssrInlineRender: true,
	props: {
		locale: String,
		services: Array
	},
	setup(__props) {
		const open = ref(null);
		const drafts = ref({});
		const saving = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-extrabold text-ink">Услуги</h1><div class="mt-4 flex gap-2"><!--[-->`);
			ssrRenderList(["mk", "en"], (l) => {
				_push(`<button type="button" class="${ssrRenderClass([__props.locale === l ? "border-brand-500/50 text-brand-400" : "border-hair", "mono-label rounded-lg border px-4 py-2"])}">${ssrInterpolate(l.toUpperCase())}</button>`);
			});
			_push(`<!--]--></div><div class="mt-8 space-y-3"><!--[-->`);
			ssrRenderList(__props.services, (s) => {
				_push(`<div class="overflow-hidden rounded-2xl border border-hair bg-bg-2"><button type="button" class="flex w-full items-center gap-4 px-6 py-4 text-left">`);
				if (s.image) _push(`<img${ssrRenderAttr("src", s.image)} alt="" class="h-10 w-14 rounded-lg object-cover">`);
				else _push(`<!---->`);
				_push(`<span class="font-bold text-ink">${ssrInterpolate(s.title)}</span><span class="mono-label ml-auto">${ssrInterpolate(s.slug)} · ${ssrInterpolate(s.published ? "активна" : "скриена")}</span></button>`);
				if (open.value === s.id) {
					_push(`<div class="space-y-4 border-t border-hair p-6">`);
					_push(ssrRenderComponent(_sfc_main$26, {
						modelValue: drafts.value[s.id],
						"onUpdate:modelValue": ($event) => drafts.value[s.id] = $event
					}, null, _parent));
					_push(`<div class="flex justify-end"><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(saving.value === s.id) ? " disabled" : ""}>Зачувај</button></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
var _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Services.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Admin/Settings.vue
var Settings_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$16 });
var _sfc_main$16 = /*@__PURE__*/ Object.assign({ layout: _sfc_main$27 }, {
	__name: "Settings",
	__ssrInlineRender: true,
	props: {
		company: Object,
		motto: Object,
		credentialLogos: Array
	},
	setup(__props) {
		const props = __props;
		const form = useForm({
			company: JSON.parse(JSON.stringify(props.company)),
			motto: JSON.parse(JSON.stringify(props.motto ?? {})),
			credential_logos: JSON.parse(JSON.stringify(props.credentialLogos ?? []))
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl" }, _attrs))}><h1 class="text-3xl font-extrabold text-ink">Поставки</h1><p class="mt-2 text-sm">Податоци за компанијата (адреса, телефони, сертификати), мото и логоа на членства.</p><form class="mt-8 space-y-6"><div class="rounded-2xl border border-hair bg-bg-2 p-6"><h2 class="mono-label mb-5 text-brand-500">Компанија</h2>`);
			_push(ssrRenderComponent(_sfc_main$26, {
				modelValue: unref(form).company,
				"onUpdate:modelValue": ($event) => unref(form).company = $event
			}, null, _parent));
			_push(`</div><div class="rounded-2xl border border-hair bg-bg-2 p-6"><h2 class="mono-label mb-5 text-brand-500">Мото</h2>`);
			_push(ssrRenderComponent(_sfc_main$26, {
				modelValue: unref(form).motto,
				"onUpdate:modelValue": ($event) => unref(form).motto = $event
			}, null, _parent));
			_push(`</div><div class="rounded-2xl border border-hair bg-bg-2 p-6"><h2 class="mono-label mb-5 text-brand-500">Логоа — сертификати и членства</h2>`);
			_push(ssrRenderComponent(_sfc_main$26, {
				modelValue: unref(form).credential_logos,
				"onUpdate:modelValue": ($event) => unref(form).credential_logos = $event
			}, null, _parent));
			_push(`</div><div class="flex justify-end"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>Зачувај</button></div></form></div>`);
		};
	}
});
var _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/CompanyPage.vue
var CompanyPage_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$15 });
var _sfc_main$15 = {
	__name: "CompanyPage",
	__ssrInlineRender: true,
	props: {
		page: {
			type: Object,
			required: true
		},
		siblings: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const { t, locale } = useI18n();
		const GROUP_LABELS = {
			mk: {
				about: "За ФЕРШПЕД",
				investors: "Инвеститори",
				responsibility: "Општествена одговорност",
				sectors: "Сектори",
				network: "Мрежа",
				services: "Услуги",
				contact: "Контакт"
			},
			en: {
				about: "About FERŠPED",
				investors: "Investors",
				responsibility: "Social responsibility",
				sectors: "Sectors",
				network: "Network",
				services: "Services",
				contact: "Contact"
			}
		};
		const groupLabel = () => GROUP_LABELS[locale.value]?.[props.page.group] ?? props.page.group;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: groupLabel(),
				title: __props.page.title,
				crumb: __props.page.title,
				image: __props.page.hero || "/images/hero.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page grid gap-14 lg:grid-cols-12"><article class="min-w-0 lg:col-span-8">`);
			if (__props.page.untranslated) _push(`<p class="mono-label mb-8 rounded-xl border border-hair bg-bg-2 px-5 py-4">${ssrInterpolate(unref(locale) === "en" ? "This content is available in Macedonian." : "Оваа содржина е достапна на англиски.")}</p>`);
			else _push(`<!---->`);
			_push(`<div class="prose-site">${__props.page.body ?? ""}</div></article>`);
			if (__props.siblings.length) {
				_push(`<aside class="lg:col-span-4"><div class="sticky top-28 rounded-2xl border border-hair bg-bg-2 p-7"><h2 class="mono-label text-brand-500">${ssrInterpolate(groupLabel())}</h2><ul class="mt-5 space-y-3"><!--[-->`);
				ssrRenderList(__props.siblings, (s) => {
					_push(`<li>`);
					_push(ssrRenderComponent(_component_Link, {
						href: s.href,
						class: "group flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"${_scopeId}></span> ${ssrInterpolate(s.title)}`);
							else return [createVNode("span", { class: "mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" }), createTextVNode(" " + toDisplayString(s.title), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</li>`);
				});
				_push(`<!--]--></ul></div></aside>`);
			} else _push(`<!---->`);
			_push(`</div></section></div>`);
		};
	}
};
var _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/CompanyPage.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Contact.vue
var Contact_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$14 });
var _sfc_main$14 = {
	__name: "Contact",
	__ssrInlineRender: true,
	props: {
		contact: {
			type: Object,
			required: true
		},
		services: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const page = usePage();
		const { t, localePath } = useI18n();
		const company = computed(() => page.props.company ?? {});
		const showSuccess = ref(false);
		const form = useForm({
			name: "",
			email: "",
			phone: "",
			company: "",
			service: "",
			message: ""
		});
		const mapSrc = computed(() => `https://www.google.com/maps?q=${company.value.geo?.lat},${company.value.geo?.lng}&hl=${page.props.locale}&z=16&output=embed`);
		const contactItems = computed(() => [
			{
				icon: "pin",
				label: props.contact.address_label,
				value: `${company.value.street}, ${company.value.postal} ${company.value.city}`,
				href: null
			},
			{
				icon: "phone",
				label: props.contact.phone_label,
				value: company.value.phone,
				href: `tel:${company.value.phone_href}`
			},
			{
				icon: "fax",
				label: props.contact.fax_label,
				value: company.value.fax,
				href: null
			},
			{
				icon: "mail",
				label: props.contact.email_label,
				value: company.value.email,
				href: `mailto:${company.value.email}`
			},
			{
				icon: "clock",
				label: props.contact.hours_label,
				value: props.contact.hours_value,
				href: null
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.contact.eyebrow,
				title: __props.contact.title,
				lead: __props.contact.lead,
				crumb: _ctx.$t("nav.contact"),
				image: "/images/services/road.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16"><div class="lg:col-span-5"><h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">${ssrInterpolate(__props.contact.info_title)}</h2><ul class="mt-8 space-y-5"><!--[-->`);
			ssrRenderList(contactItems.value, (item) => {
				_push(`<li class="flex items-start gap-4"><span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: item.icon,
					size: 20,
					stroke: 1.75
				}, null, _parent));
				_push(`</span><div><div class="mono-label">${ssrInterpolate(item.label)}</div>`);
				if (item.href) _push(`<a${ssrRenderAttr("href", item.href)} class="mt-1 block text-[0.975rem] font-semibold text-ink hover:text-brand-400">${ssrInterpolate(item.value)}</a>`);
				else _push(`<div class="mt-1 text-[0.975rem] font-semibold text-ink">${ssrInterpolate(item.value)}</div>`);
				_push(`</div></li>`);
			});
			_push(`<!--]--></ul><div class="mt-8 overflow-hidden rounded-2xl border border-hair"><iframe${ssrRenderAttr("src", mapSrc.value)} class="h-64 w-full" style="${ssrRenderStyle({ "border": "0" })}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"${ssrRenderAttr("title", `${company.value.name} — ${company.value.city}`)}></iframe></div></div><div class="lg:col-span-7"><div class="card p-8 sm:p-10"><h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">${ssrInterpolate(__props.contact.form_title)}</h2>`);
			if (showSuccess.value) {
				_push(`<div class="mt-7 flex items-start gap-3 rounded-xl border border-brand-600/30 bg-brand-50 p-5 text-brand-300">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "checkCircle",
					size: 22,
					class: "mt-0.5 shrink-0 text-brand-400"
				}, null, _parent));
				_push(`<p class="text-sm font-semibold">${ssrInterpolate(unref(t)("form.success"))}</p></div>`);
			} else {
				_push(`<form class="mt-7 space-y-5"><div class="grid gap-5 sm:grid-cols-2"><div><label class="field-label" for="name">${ssrInterpolate(unref(t)("form.name"))} *</label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" required class="${ssrRenderClass([{ "border-red-500": unref(form).errors.name }, "field"])}"${ssrRenderAttr("aria-invalid", !!unref(form).errors.name)}${ssrRenderAttr("aria-describedby", unref(form).errors.name ? "name-error" : void 0)}>`);
				if (unref(form).errors.name) _push(`<p id="name-error" class="mt-1.5 text-xs text-red-600">${ssrInterpolate(unref(form).errors.name)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="email">${ssrInterpolate(unref(t)("form.email"))} *</label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" required class="${ssrRenderClass([{ "border-red-500": unref(form).errors.email }, "field"])}"${ssrRenderAttr("aria-invalid", !!unref(form).errors.email)}${ssrRenderAttr("aria-describedby", unref(form).errors.email ? "email-error" : void 0)}>`);
				if (unref(form).errors.email) _push(`<p id="email-error" class="mt-1.5 text-xs text-red-600">${ssrInterpolate(unref(form).errors.email)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="phone">${ssrInterpolate(unref(t)("form.phone"))}</label><input id="phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" class="field"></div><div><label class="field-label" for="company">${ssrInterpolate(unref(t)("form.company"))}</label><input id="company"${ssrRenderAttr("value", unref(form).company)} type="text" class="field"></div></div><div><label class="field-label" for="service">${ssrInterpolate(unref(t)("form.service"))}</label><select id="service" class="field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "") : ssrLooseEqual(unref(form).service, "")) ? " selected" : ""}>${ssrInterpolate(unref(t)("form.select"))}</option><!--[-->`);
				ssrRenderList(__props.services, (s) => {
					_push(`<option${ssrRenderAttr("value", s.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, s.slug) : ssrLooseEqual(unref(form).service, s.slug)) ? " selected" : ""}>${ssrInterpolate(s.title)}</option>`);
				});
				_push(`<!--]--></select></div><div><label class="field-label" for="message">${ssrInterpolate(unref(t)("form.message"))} *</label><textarea id="message" rows="5" required class="${ssrRenderClass([{ "border-red-500": unref(form).errors.message }, "field resize-none"])}"${ssrRenderAttr("aria-invalid", !!unref(form).errors.message)}${ssrRenderAttr("aria-describedby", unref(form).errors.message ? "message-error" : void 0)}>${ssrInterpolate(unref(form).message)}</textarea>`);
				if (unref(form).errors.message) _push(`<p id="message-error" class="mt-1.5 text-xs text-red-600">${ssrInterpolate(unref(form).errors.message)}</p>`);
				else _push(`<!---->`);
				_push(`</div><button type="submit" class="btn-primary w-full justify-center sm:w-auto"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}><span>${ssrInterpolate(unref(form).processing ? unref(t)("form.sending") : unref(t)("form.send"))}</span>`);
				if (!unref(form).processing) _push(ssrRenderComponent(_sfc_main$32, {
					name: "arrowRight",
					size: 16
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</button></form>`);
			}
			_push(`</div></div></div><div class="container-page mt-20 border-t border-hair pt-14"><h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">${ssrInterpolate(__props.contact.sectors_title)}</h2><div data-stagger class="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.contact.sectors, (s) => {
				_push(`<div class="border-l-2 border-brand-400/40 pl-4"><h3 class="text-[0.95rem] font-bold text-ink">${ssrInterpolate(s.name)}</h3><a${ssrRenderAttr("href", `tel:${s.phone.replace(/\s/g, "")}`)} class="mt-2 block font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">${ssrInterpolate(s.phone)}</a><a${ssrRenderAttr("href", `mailto:${s.email}`)} class="mt-1 block break-all font-mono text-[0.78rem] text-muted transition-colors hover:text-brand-400">${ssrInterpolate(s.email)}</a></div>`);
			});
			_push(`<!--]--></div></div></section></div>`);
		};
	}
};
var _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contact.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/ServiceTile.vue
var _sfc_main$13 = {
	__name: "ServiceTile",
	__ssrInlineRender: true,
	props: {
		service: {
			type: Object,
			required: true
		},
		index: {
			type: [Number, String],
			default: null
		},
		eager: {
			type: Boolean,
			default: false
		},
		big: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const { t, localePath } = useI18n();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(ssrRenderComponent(_component_Link, mergeProps({
				href: unref(localePath)(`services/${__props.service.slug}`),
				class: "band-dark group relative block h-full overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors duration-300 hover:border-brand-500/50"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="absolute inset-x-0 bottom-0 z-10 h-px bg-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"${_scopeId}></div>`);
						if (__props.big) {
							_push(`<div class="grid h-full lg:grid-cols-2 lg:min-h-[28rem]"${_scopeId}><div class="relative order-first min-h-52 overflow-hidden sm:min-h-64 lg:order-last lg:min-h-0"${_scopeId}><img${ssrRenderAttr("src", __props.service.image || `/images/services/${__props.service.slug}.webp`)}${ssrRenderAttr("alt", __props.service.title)}${ssrRenderAttr("loading", __props.eager ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", __props.eager ? "high" : void 0)} class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" style="${ssrRenderStyle({ "filter": "saturate(0.95) contrast(1.04) brightness(0.95)" })}"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent lg:bg-gradient-to-r lg:from-bg-2 lg:via-bg-2/15 lg:to-transparent"${_scopeId}></div>`);
							if (__props.index) _push(`<span aria-hidden="true" class="tnum absolute right-5 top-4 font-display text-6xl font-extrabold leading-none text-transparent sm:text-7xl" style="${ssrRenderStyle({ "-webkit-text-stroke": "1.5px rgba(44, 229, 119, 0.55)" })}"${_scopeId}>${ssrInterpolate(String(__props.index).padStart(2, "0"))}</span>`);
							else _push(`<!---->`);
							_push(`</div><div class="relative flex flex-col p-7 sm:p-10 lg:p-12"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><span class="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: __props.service.icon,
								size: 22,
								stroke: 1.75
							}, null, _parent, _scopeId));
							_push(`</span>`);
							if (__props.service.tagline) _push(`<span class="mono-label text-brand-500"${_scopeId}>${ssrInterpolate(__props.service.tagline)}</span>`);
							else _push(`<!---->`);
							_push(`</div><h3 class="mt-8 max-w-md font-display text-2xl font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-ink sm:text-3xl lg:text-4xl"${_scopeId}>${ssrInterpolate(__props.service.title)}</h3><p class="mt-4 max-w-md text-[0.95rem] leading-relaxed text-body"${_scopeId}>${ssrInterpolate(__props.service.summary)}</p>`);
							if (__props.service.features?.length) {
								_push(`<ul class="mt-7 hidden max-w-md space-y-2.5 border-t border-hair pt-6 sm:block"${_scopeId}><!--[-->`);
								ssrRenderList(__props.service.features.slice(0, 3), (f, i) => {
									_push(`<li class="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-body"${_scopeId}><span class="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"${_scopeId}></span>${ssrInterpolate(f)}</li>`);
								});
								_push(`<!--]--></ul>`);
							} else _push(`<!---->`);
							_push(`<span class="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300"${_scopeId}>${ssrInterpolate(unref(t)("cta.view_service"))} `);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: "arrowRight",
								size: 14,
								class: "transition-transform group-hover:translate-x-1"
							}, null, _parent, _scopeId));
							_push(`</span></div></div>`);
						} else {
							_push(`<div class="flex h-full flex-col"${_scopeId}><div class="relative aspect-[16/10] overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", __props.service.image || `/images/services/${__props.service.slug}.webp`)}${ssrRenderAttr("alt", __props.service.title)}${ssrRenderAttr("loading", __props.eager ? "eager" : "lazy")} class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]" style="${ssrRenderStyle({ "filter": "saturate(0.95) contrast(1.04) brightness(0.95)" })}"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-bg-2 via-transparent to-transparent"${_scopeId}></div>`);
							if (__props.index) _push(`<span aria-hidden="true" class="tnum absolute right-4 top-3 font-display text-4xl font-extrabold leading-none text-transparent" style="${ssrRenderStyle({ "-webkit-text-stroke": "1px rgba(44, 229, 119, 0.5)" })}"${_scopeId}>${ssrInterpolate(String(__props.index).padStart(2, "0"))}</span>`);
							else _push(`<!---->`);
							_push(`</div><div class="flex flex-1 flex-col p-6 sm:p-7"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: __props.service.icon,
								size: 19,
								stroke: 1.75
							}, null, _parent, _scopeId));
							_push(`</span><h3 class="text-lg font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-xl"${_scopeId}>${ssrInterpolate(__props.service.title)}</h3></div><p class="mt-3 line-clamp-2 text-sm leading-relaxed text-body"${_scopeId}>${ssrInterpolate(__props.service.summary)}</p><span class="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300"${_scopeId}>${ssrInterpolate(unref(t)("cta.view_service"))} `);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: "arrowRight",
								size: 13,
								class: "transition-transform group-hover:translate-x-1"
							}, null, _parent, _scopeId));
							_push(`</span></div></div>`);
						}
					} else return [createVNode("div", { class: "absolute inset-x-0 bottom-0 z-10 h-px bg-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }), __props.big ? (openBlock(), createBlock("div", {
						key: 0,
						class: "grid h-full lg:grid-cols-2 lg:min-h-[28rem]"
					}, [createVNode("div", { class: "relative order-first min-h-52 overflow-hidden sm:min-h-64 lg:order-last lg:min-h-0" }, [
						createVNode("img", {
							src: __props.service.image || `/images/services/${__props.service.slug}.webp`,
							alt: __props.service.title,
							loading: __props.eager ? "eager" : "lazy",
							fetchpriority: __props.eager ? "high" : void 0,
							class: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]",
							style: { "filter": "saturate(0.95) contrast(1.04) brightness(0.95)" }
						}, null, 8, [
							"src",
							"alt",
							"loading",
							"fetchpriority"
						]),
						createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent lg:bg-gradient-to-r lg:from-bg-2 lg:via-bg-2/15 lg:to-transparent" }),
						__props.index ? (openBlock(), createBlock("span", {
							key: 0,
							"aria-hidden": "true",
							class: "tnum absolute right-5 top-4 font-display text-6xl font-extrabold leading-none text-transparent sm:text-7xl",
							style: { "-webkit-text-stroke": "1.5px rgba(44, 229, 119, 0.55)" }
						}, toDisplayString(String(__props.index).padStart(2, "0")), 1)) : createCommentVNode("", true)
					]), createVNode("div", { class: "relative flex flex-col p-7 sm:p-10 lg:p-12" }, [
						createVNode("div", { class: "flex items-center gap-4" }, [createVNode("span", { class: "inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400" }, [createVNode(_sfc_main$32, {
							name: __props.service.icon,
							size: 22,
							stroke: 1.75
						}, null, 8, ["name"])]), __props.service.tagline ? (openBlock(), createBlock("span", {
							key: 0,
							class: "mono-label text-brand-500"
						}, toDisplayString(__props.service.tagline), 1)) : createCommentVNode("", true)]),
						createVNode("h3", { class: "mt-8 max-w-md font-display text-2xl font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-ink sm:text-3xl lg:text-4xl" }, toDisplayString(__props.service.title), 1),
						createVNode("p", { class: "mt-4 max-w-md text-[0.95rem] leading-relaxed text-body" }, toDisplayString(__props.service.summary), 1),
						__props.service.features?.length ? (openBlock(), createBlock("ul", {
							key: 0,
							class: "mt-7 hidden max-w-md space-y-2.5 border-t border-hair pt-6 sm:block"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.service.features.slice(0, 3), (f, i) => {
							return openBlock(), createBlock("li", {
								key: i,
								class: "flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-body"
							}, [createVNode("span", { class: "mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" }), createTextVNode(toDisplayString(f), 1)]);
						}), 128))])) : createCommentVNode("", true),
						createVNode("span", { class: "mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300" }, [createTextVNode(toDisplayString(unref(t)("cta.view_service")) + " ", 1), createVNode(_sfc_main$32, {
							name: "arrowRight",
							size: 14,
							class: "transition-transform group-hover:translate-x-1"
						})])
					])])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "flex h-full flex-col"
					}, [createVNode("div", { class: "relative aspect-[16/10] overflow-hidden" }, [
						createVNode("img", {
							src: __props.service.image || `/images/services/${__props.service.slug}.webp`,
							alt: __props.service.title,
							loading: __props.eager ? "eager" : "lazy",
							class: "absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]",
							style: { "filter": "saturate(0.95) contrast(1.04) brightness(0.95)" }
						}, null, 8, [
							"src",
							"alt",
							"loading"
						]),
						createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-bg-2 via-transparent to-transparent" }),
						__props.index ? (openBlock(), createBlock("span", {
							key: 0,
							"aria-hidden": "true",
							class: "tnum absolute right-4 top-3 font-display text-4xl font-extrabold leading-none text-transparent",
							style: { "-webkit-text-stroke": "1px rgba(44, 229, 119, 0.5)" }
						}, toDisplayString(String(__props.index).padStart(2, "0")), 1)) : createCommentVNode("", true)
					]), createVNode("div", { class: "flex flex-1 flex-col p-6 sm:p-7" }, [
						createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400" }, [createVNode(_sfc_main$32, {
							name: __props.service.icon,
							size: 19,
							stroke: 1.75
						}, null, 8, ["name"])]), createVNode("h3", { class: "text-lg font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-xl" }, toDisplayString(__props.service.title), 1)]),
						createVNode("p", { class: "mt-3 line-clamp-2 text-sm leading-relaxed text-body" }, toDisplayString(__props.service.summary), 1),
						createVNode("span", { class: "mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300" }, [createTextVNode(toDisplayString(unref(t)("cta.view_service")) + " ", 1), createVNode(_sfc_main$32, {
							name: "arrowRight",
							size: 13,
							class: "transition-transform group-hover:translate-x-1"
						})])
					])]))];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ServiceTile.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/StatCounter.vue
var _sfc_main$12 = {
	__name: "StatCounter",
	__ssrInlineRender: true,
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		unit: {
			type: String,
			default: ""
		},
		label: {
			type: String,
			default: ""
		},
		dark: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const el = ref(null);
		const raw = String(props.value);
		const cleaned = raw.replace(/[^\d]/g, "");
		const target = parseInt(cleaned || "0", 10);
		const suffix = raw.replace(/[\d.,\s]/g, "");
		const hasThousands = /\d[.,]\d{3}/.test(raw);
		const sep = raw.includes(".") ? "." : ",";
		const isYear = /^(19|20)\d{2}$/.test(cleaned);
		const display = ref(raw);
		function fmt(n) {
			let s = String(n);
			if (hasThousands) s = n.toLocaleString("en-US").replace(/,/g, sep);
			return s + suffix;
		}
		let obs = null, raf = null, safety = null, started = false;
		function animate() {
			if (started) return;
			started = true;
			if (obs) obs.disconnect();
			if (safety) clearTimeout(safety);
			const dur = 1500, start = performance.now();
			const step = (now) => {
				const p = Math.min(1, (now - start) / dur);
				const e = 1 - Math.pow(1 - p, 3);
				display.value = fmt(Math.round(e * target));
				if (p < 1) raf = requestAnimationFrame(step);
				else display.value = raw;
			};
			raf = requestAnimationFrame(step);
		}
		onMounted(() => {
			if (typeof window === "undefined" || isYear || !target || !("IntersectionObserver" in window)) return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			display.value = fmt(0);
			obs = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) animate();
				});
			}, { threshold: .35 });
			if (el.value) obs.observe(el.value);
			safety = setTimeout(animate, 2600);
		});
		onBeforeUnmount(() => {
			obs?.disconnect();
			if (raf) cancelAnimationFrame(raf);
			if (safety) clearTimeout(safety);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "el",
				ref: el
			}, _attrs))}><div class="flex items-baseline gap-1.5"><span class="font-display text-5xl font-extrabold tracking-[-0.04em] tabular-nums text-ink sm:text-6xl lg:text-[5.5rem] lg:leading-none">${ssrInterpolate(display.value)}</span>`);
			if (__props.unit) _push(`<span class="font-mono text-lg font-bold text-brand-500 sm:text-xl">${ssrInterpolate(__props.unit)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="mono-label mt-4">${ssrInterpolate(__props.label)}</div></div>`);
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/StatCounter.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/CorridorMap.vue
var _sfc_main$11 = {
	__name: "CorridorMap",
	__ssrInlineRender: true,
	setup(__props) {
		const ports = [
			{
				x: 250,
				y: 372,
				label: "THESSALONIKI",
				code: "SKG"
			},
			{
				x: 74,
				y: 250,
				label: "DURRËS",
				code: "DRZ"
			},
			{
				x: 120,
				y: 128,
				label: "BAR",
				code: "BAR"
			},
			{
				x: 452,
				y: 300,
				label: "BURGAS",
				code: "BOJ"
			},
			{
				x: 452,
				y: 214,
				label: "VARNA",
				code: "VAR"
			}
		];
		const cities = [{
			x: 252,
			y: 44,
			label: "BELGRADE"
		}, {
			x: 408,
			y: 168,
			label: "SOFIA"
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				viewBox: "0 0 500 420",
				class: "w-full",
				fill: "none",
				"aria-hidden": "true"
			}, _attrs))}><defs><radialGradient id="cm-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="var(--color-brand-500)" stop-opacity="0.30"></stop><stop offset="100%" stop-color="var(--color-brand-500)" stop-opacity="0"></stop></radialGradient></defs><circle cx="242" cy="208" r="175" fill="url(#cm-glow)"></circle><path d="M252 44 L242 208 L250 372" stroke="var(--color-brand-400)" stroke-width="2" opacity="0.95"></path><path d="M74 250 L242 208 L408 168" stroke="var(--color-brand-400)" stroke-width="2" opacity="0.95"></path><g stroke="var(--color-on-mute)" stroke-width="1" stroke-dasharray="3 6" opacity="0.45"><path d="M242 208 L120 128"></path><path d="M242 208 L452 300"></path><path d="M242 208 L452 214"></path></g><text x="196" y="120" fill="var(--color-on-faint)" font-family="var(--font-mono)" font-size="9" letter-spacing="1.5" transform="rotate(-84 196 120)">CORRIDOR X</text><text x="300" y="182" fill="var(--color-on-faint)" font-family="var(--font-mono)" font-size="9" letter-spacing="1.5" transform="rotate(-14 300 182)">CORRIDOR VIII</text><g><!--[-->`);
			ssrRenderList(cities, (c) => {
				_push(`<circle${ssrRenderAttr("cx", c.x)}${ssrRenderAttr("cy", c.y)} r="3.5" fill="var(--color-on-mute)"></circle>`);
			});
			_push(`<!--]--></g><!--[-->`);
			ssrRenderList(cities, (c) => {
				_push(`<text${ssrRenderAttr("x", c.x + 8)}${ssrRenderAttr("y", c.y + 3)} fill="var(--color-on-mute)" font-family="var(--font-mono)" font-size="9.5" letter-spacing="1">${ssrInterpolate(c.label)}</text>`);
			});
			_push(`<!--]--><!--[-->`);
			ssrRenderList(ports, (p, i) => {
				_push(`<g><circle${ssrRenderAttr("cx", p.x)}${ssrRenderAttr("cy", p.y)} r="6" fill="none" stroke="var(--color-amber)" stroke-width="1.5" class="animate-pulse-node" style="${ssrRenderStyle({
					transformOrigin: `${p.x}px ${p.y}px`,
					animationDelay: `${i * .4}s`
				})}"></circle><circle${ssrRenderAttr("cx", p.x)}${ssrRenderAttr("cy", p.y)} r="2.5" fill="var(--color-amber)"></circle><text${ssrRenderAttr("x", p.x + (p.x > 400 ? -12 : 12))}${ssrRenderAttr("y", p.y + 3)}${ssrRenderAttr("text-anchor", p.x > 400 ? "end" : "start")} fill="#fff" font-family="var(--font-mono)" font-size="9.5" letter-spacing="1">${ssrInterpolate(p.label)}</text></g>`);
			});
			_push(`<!--]--><circle cx="242" cy="208" r="22" stroke="var(--color-brand-300)" stroke-width="1" opacity="0.4"></circle><circle cx="242" cy="208" r="12" stroke="var(--color-brand-300)" stroke-width="1.25" opacity="0.7"></circle><circle cx="242" cy="208" r="6" fill="var(--color-brand-400)"></circle><text x="242" y="242" text-anchor="middle" fill="#fff" font-family="var(--font-mono)" font-size="11" letter-spacing="2" font-weight="700">SKOPJE</text></svg>`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CorridorMap.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Home.vue
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$10 });
var _sfc_main$10 = {
	__name: "Home",
	__ssrInlineRender: true,
	props: {
		home: {
			type: Object,
			required: true
		},
		services: {
			type: Array,
			required: true
		},
		credentials: {
			type: Array,
			default: () => []
		},
		credentialLogos: {
			type: Array,
			default: () => []
		},
		posts: {
			type: Array,
			default: () => []
		},
		motto: {
			type: Object,
			default: () => ({})
		}
	},
	setup(__props) {
		const props = __props;
		const { t, localePath, locale } = useI18n();
		const ticker = computed(() => props.services.map((s) => s.title));
		const noticeCards = computed(() => {
			const postTitles = props.posts.map((p) => p.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""));
			return (props.home.notices?.items ?? []).filter((n) => !postTitles.some((t) => t.includes(n.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "")) || n.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "").includes(t)));
		});
		ref(null);
		const rowIdx = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}><section class="media media-grade relative -mt-[4.75rem] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg text-white"><img src="/images/hero.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60 animate-kenburns" fetchpriority="high"><div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40"></div><div class="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_80%,rgba(7,10,8,0.9),transparent_60%)]"></div><div class="grid-dots absolute inset-0 opacity-40"></div><div class="container-page relative w-full pb-8 pt-28 sm:pb-10 sm:pt-36"><div class="stage"><span class="eyebrow">${ssrInterpolate(__props.home.hero.badge)}</span><h1 data-split class="mt-4 max-w-[13ch] font-display text-[clamp(2.4rem,8.2vw,7.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:mt-6">${ssrInterpolate(__props.home.hero.title)}</h1><p class="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-body sm:mt-7 sm:text-lg">${ssrInterpolate(__props.home.hero.lead)}</p><div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-9">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-primary",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(__props.home.hero.primary)} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(__props.home.hero.primary) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 15
					})];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("services"),
				class: "btn-on-dark",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.home.hero.secondary)}`);
					else return [createTextVNode(toDisplayString(__props.home.hero.secondary), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-hair pt-5 sm:mt-14"><span class="mono-label">${ssrInterpolate(unref(locale) === "mk" ? "Од 1968 · Скопје" : "Est. 1968 · Skopje")}</span><span class="mono-label hidden sm:inline">${ssrInterpolate(unref(locale) === "mk" ? "5 пристаништа · 4 вида транспорт" : "5 seaports · 4 modes")}</span><span class="mono-label hidden md:inline">${ssrInterpolate(unref(locale) === "mk" ? "AEO овластен · Берза: FERS" : "AEO authorised · MSE : FERS")}</span><span class="mono-label ml-auto inline-flex items-center gap-2 text-brand-500"><span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500"></span> ${ssrInterpolate(unref(locale) === "mk" ? "Скролај" : "Scroll")}</span></div></div><div class="relative overflow-hidden border-t border-hair py-5" aria-hidden="true"><div class="tick-row"><!--[-->`);
			ssrRenderList(2, (n) => {
				_push(`<!--[--><!--[-->`);
				ssrRenderList(ticker.value, (item, i) => {
					_push(`<!--[--><span class="tick-item">${ssrInterpolate(item)}</span><span class="tick-dot"></span><!--]-->`);
				});
				_push(`<!--]--><!--]-->`);
			});
			_push(`<!--]--></div></div></section><section class="relative overflow-hidden border-b border-hair bg-bg-2"><div class="grid-dots absolute inset-0 opacity-40"></div><div class="container-page relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14"><div class="lg:col-span-4"><span class="eyebrow">${ssrInterpolate(__props.home.credentials.eyebrow)}</span><h2 class="mt-4 max-w-sm text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">${ssrInterpolate(__props.home.credentials.title)}</h2><div class="mt-6 h-px w-12 bg-brand-500"></div></div>`);
			if (__props.credentialLogos.length) {
				_push(`<div data-stagger class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8"><!--[-->`);
				ssrRenderList(__props.credentialLogos, (logo) => {
					_push(`<div class="group flex flex-col rounded-xl border border-hair bg-bg p-3 transition-colors hover:border-brand-500/40"><span class="flex h-16 items-center justify-center rounded-lg bg-white px-4"><img${ssrRenderAttr("src", logo.image)}${ssrRenderAttr("alt", logo.label)} loading="lazy" class="max-h-11 w-auto max-w-full object-contain"></span><span class="mono-label mt-3 block truncate px-1 text-center transition-colors group-hover:text-body"${ssrRenderAttr("title", logo.label)}>${ssrInterpolate(logo.label)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div class="flex flex-wrap items-center gap-x-7 gap-y-3 lg:col-span-8"><!--[-->`);
				ssrRenderList(__props.credentials, (c) => {
					_push(`<span class="inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-body"><span class="inline-block h-1 w-1 rounded-full bg-brand-500"></span>${ssrInterpolate(c)}</span>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></section>`);
			if (__props.posts.length || __props.home.notices) {
				_push(`<section class="band-light section border-b border-hair bg-bg"><div class="container-page"><div class="flex items-end justify-between gap-6">`);
				_push(ssrRenderComponent(_sfc_main$30, {
					eyebrow: __props.home.notices?.eyebrow ?? unref(t)("nav.news", "Вести"),
					title: __props.home.notices?.title ?? "Вести и информации",
					max: "max-w-xl"
				}, null, _parent));
				if (__props.posts.length) _push(ssrRenderComponent(_component_Link, {
					href: unref(localePath)("news"),
					class: "btn-outline hidden shrink-0 sm:inline-flex"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`${ssrInterpolate(unref(t)("nav.news", "Вести"))}`);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: "arrowRight",
								size: 15
							}, null, _parent, _scopeId));
						} else return [createTextVNode(toDisplayString(unref(t)("nav.news", "Вести")), 1), createVNode(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						})];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(`</div>`);
				if (__props.posts.length) {
					_push(`<div data-stagger class="${ssrRenderClass([__props.posts.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2", "mt-12 grid gap-5"])}"><!--[-->`);
					ssrRenderList(__props.posts, (p) => {
						_push(ssrRenderComponent(_component_Link, {
							key: p.slug,
							href: p.href,
							class: "group overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors hover:border-brand-500/40"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									if (p.image) _push(`<div class="aspect-[16/8] overflow-hidden bg-deep-2"${_scopeId}><img${ssrRenderAttr("src", p.image)}${ssrRenderAttr("alt", p.title)} loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"${_scopeId}></div>`);
									else _push(`<!---->`);
									_push(`<div class="p-6"${_scopeId}>`);
									if (p.date) _push(`<span class="mono-label"${_scopeId}>${ssrInterpolate(p.date)}</span>`);
									else _push(`<!---->`);
									_push(`<h3 class="mt-1.5 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(p.title)}</h3>`);
									if (p.excerpt) _push(`<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-body"${_scopeId}>${ssrInterpolate(p.excerpt)}</p>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else return [p.image ? (openBlock(), createBlock("div", {
									key: 0,
									class: "aspect-[16/8] overflow-hidden bg-deep-2"
								}, [createVNode("img", {
									src: p.image,
									alt: p.title,
									loading: "lazy",
									class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
								}, null, 8, ["src", "alt"])])) : createCommentVNode("", true), createVNode("div", { class: "p-6" }, [
									p.date ? (openBlock(), createBlock("span", {
										key: 0,
										class: "mono-label"
									}, toDisplayString(p.date), 1)) : createCommentVNode("", true),
									createVNode("h3", { class: "mt-1.5 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-400" }, toDisplayString(p.title), 1),
									p.excerpt ? (openBlock(), createBlock("p", {
										key: 1,
										class: "mt-2 line-clamp-2 text-sm leading-relaxed text-body"
									}, toDisplayString(p.excerpt), 1)) : createCommentVNode("", true)
								])];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				if (noticeCards.value.length) {
					_push(`<div data-stagger class="mt-5 grid gap-5 md:grid-cols-2"><!--[-->`);
					ssrRenderList(noticeCards.value, (n, i) => {
						_push(ssrRenderComponent(_component_Link, {
							key: i,
							href: unref(localePath)(n.href),
							class: "group flex flex-col rounded-2xl border border-hair bg-bg-2 p-7 transition-colors hover:border-brand-500/40"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span class="mono-label text-brand-500"${_scopeId}>${ssrInterpolate(n.kicker)}</span><h3 class="mt-4 text-xl font-bold leading-snug text-ink"${_scopeId}>${ssrInterpolate(n.title)}</h3><p class="mt-3 text-sm leading-relaxed text-body"${_scopeId}>${ssrInterpolate(n.text)}</p>`);
									if (n.meta && n.meta.length) {
										_push(`<ul class="mt-4 space-y-1.5 font-mono text-[0.78rem] tracking-[0.02em] text-body"${_scopeId}><!--[-->`);
										ssrRenderList(n.meta, (m, j) => {
											_push(`<li${_scopeId}>${ssrInterpolate(m)}</li>`);
										});
										_push(`<!--]--></ul>`);
									} else _push(`<!---->`);
									_push(`<span class="link-arrow mt-auto pt-6 transition-colors group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(n.cta)} `);
									_push(ssrRenderComponent(_sfc_main$32, {
										name: "arrowRight",
										size: 14
									}, null, _parent, _scopeId));
									_push(`</span>`);
								} else return [
									createVNode("span", { class: "mono-label text-brand-500" }, toDisplayString(n.kicker), 1),
									createVNode("h3", { class: "mt-4 text-xl font-bold leading-snug text-ink" }, toDisplayString(n.title), 1),
									createVNode("p", { class: "mt-3 text-sm leading-relaxed text-body" }, toDisplayString(n.text), 1),
									n.meta && n.meta.length ? (openBlock(), createBlock("ul", {
										key: 0,
										class: "mt-4 space-y-1.5 font-mono text-[0.78rem] tracking-[0.02em] text-body"
									}, [(openBlock(true), createBlock(Fragment, null, renderList(n.meta, (m, j) => {
										return openBlock(), createBlock("li", { key: j }, toDisplayString(m), 1);
									}), 128))])) : createCommentVNode("", true),
									createVNode("span", { class: "link-arrow mt-auto pt-6 transition-colors group-hover:text-brand-400" }, [createTextVNode(toDisplayString(n.cta) + " ", 1), createVNode(_sfc_main$32, {
										name: "arrowRight",
										size: 14
									})])
								];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</div></section>`);
			} else _push(`<!---->`);
			_push(`<section class="band-light section bg-bg"><div class="container-page"><div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.home.services_head.eyebrow,
				title: __props.home.services_head.title,
				body: __props.home.services_head.body,
				max: "max-w-xl"
			}, null, _parent));
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("services"),
				class: "btn-outline hidden shrink-0 sm:inline-flex",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.all_services"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.all_services")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 15
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="deck mt-16 hidden gap-0 sm:block"><!--[-->`);
			ssrRenderList(__props.services, (s, i) => {
				_push(`<div class="deck-card mb-8" style="${ssrRenderStyle({ "--i": Math.min(i, 4) })}">`);
				_push(ssrRenderComponent(_sfc_main$13, {
					service: s,
					index: i + 1,
					eager: i === 0,
					big: ""
				}, null, _parent));
				_push(`</div>`);
			});
			_push(`<!--]--></div><div class="mt-10 sm:hidden"><div class="snap-row no-scrollbar -mx-5"><!--[-->`);
			ssrRenderList(__props.services, (s, i) => {
				_push(ssrRenderComponent(_sfc_main$13, {
					key: s.slug,
					service: s,
					index: i + 1,
					eager: i === 0
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="mt-6 flex items-center gap-4"><span class="mono-label tnum shrink-0 text-ink">${ssrInterpolate(String(rowIdx.value + 1).padStart(2, "0"))} <span class="text-muted">/ ${ssrInterpolate(String(__props.services.length).padStart(2, "0"))}</span></span><div class="h-px flex-1 overflow-hidden rounded-full bg-hair-dark"><div class="h-full bg-brand-500 transition-[width] duration-300" style="${ssrRenderStyle({ width: `${(rowIdx.value + 1) / __props.services.length * 100}%` })}"></div></div>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("services"),
				class: "link-arrow shrink-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("cta.all_services"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("cta.all_services")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></section><section class="relative overflow-hidden border-y border-hair bg-bg-2"><div class="grid-dots absolute inset-0 opacity-50"></div><div class="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgba(44,229,119,0.07),transparent_60%)]"></div><div class="container-page relative section">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.home.scale.eyebrow,
				title: __props.home.scale.title,
				body: __props.home.scale.body,
				dark: "",
				max: "max-w-2xl"
			}, null, _parent));
			_push(`<div data-stagger class="mt-16 grid grid-cols-2 gap-y-14 gap-x-6 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.home.stats, (s, i) => {
				_push(ssrRenderComponent(_sfc_main$12, {
					key: i,
					value: s.value,
					label: s.label,
					dark: ""
				}, null, _parent));
			});
			_push(`<!--]--></div><div data-stagger class="mt-16 grid grid-cols-2 gap-6 border-t border-hair pt-12 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.home.scale.items, (item, i) => {
				_push(`<div><div class="flex items-baseline gap-1"><span class="tnum text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">${ssrInterpolate(item.value)}</span>`);
				if (item.unit) _push(`<span class="font-mono text-base font-bold text-brand-500">${ssrInterpolate(item.unit)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="mono-label mt-3">${ssrInterpolate(item.label)}</div></div>`);
			});
			_push(`<!--]--></div></div></section><section class="band-light section bg-bg"><div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div>`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.home.crossroads.eyebrow,
				title: __props.home.crossroads.title,
				body: __props.home.crossroads.body
			}, null, _parent));
			_push(`<dl data-stagger class="mt-10 space-y-3"><!--[-->`);
			ssrRenderList(__props.home.crossroads.points, (p, i) => {
				_push(`<div class="flex flex-col gap-1.5 rounded-xl border border-hair bg-bg-2 px-5 py-4 transition-colors hover:border-brand-500/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6"><dt class="mono-label whitespace-nowrap text-brand-500">${ssrInterpolate(p.k)}</dt><dd class="font-mono text-[0.82rem] font-semibold leading-relaxed tracking-[0.04em] text-ink sm:text-right">${ssrInterpolate(p.v)}</dd></div>`);
			});
			_push(`<!--]--></dl>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("network"),
				class: "link-arrow reveal mt-9 inline-flex",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("nav.network"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("nav.network")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 15
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="band-dark reveal panel-dark relative overflow-hidden p-6 sm:p-10"><div class="grid-dots absolute inset-0 opacity-60"></div><div class="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,rgba(44,229,119,0.09),transparent_70%)]"></div>`);
			_push(ssrRenderComponent(_sfc_main$11, { class: "relative mx-auto max-w-lg" }, null, _parent));
			_push(`</div></div></section><section class="band-light section border-t border-hair bg-bg-2"><div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div class="reveal media media-grade parallax-img order-2 aspect-[4/3] rounded-2xl border border-hair lg:order-1"><img src="/images/about.webp" alt="FERŠPED logistics" loading="lazy"><div class="absolute bottom-5 left-5 rounded-xl border border-hair bg-bg/80 px-5 py-4 backdrop-blur-md"><div class="tnum text-2xl font-extrabold text-brand-500">1968</div><div class="mono-label mt-0.5">${ssrInterpolate(unref(t)("common.since"))}</div></div></div><div class="order-1 lg:order-2">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.home.intro.eyebrow,
				title: __props.home.intro.title,
				body: __props.home.intro.body
			}, null, _parent));
			_push(`<ul data-stagger class="mt-9 space-y-4"><!--[-->`);
			ssrRenderList(__props.home.intro.points, (point, i) => {
				_push(`<li class="flex items-start gap-4"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-500/40 text-brand-500">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "check",
					size: 13,
					stroke: 3
				}, null, _parent));
				_push(`</span><span class="text-[0.98rem] leading-relaxed text-body">${ssrInterpolate(point)}</span></li>`);
			});
			_push(`<!--]--></ul><div data-stagger class="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2"><!--[-->`);
			ssrRenderList(__props.home.why.items, (item, i) => {
				_push(`<div><div class="flex items-center gap-2.5">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: item.icon,
					size: 19,
					class: "text-brand-500"
				}, null, _parent));
				_push(`<h3 class="text-[0.95rem] font-bold text-ink">${ssrInterpolate(item.title)}</h3></div><p class="mt-2 text-sm leading-relaxed text-body">${ssrInterpolate(item.text)}</p></div>`);
			});
			_push(`<!--]--></div></div></div></section><section class="band-light section bg-bg"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.home.process.eyebrow,
				title: __props.home.process.title,
				body: __props.home.process.body,
				max: "max-w-2xl"
			}, null, _parent));
			_push(`<ol data-stagger class="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
			ssrRenderList(__props.home.process.steps, (s, i) => {
				_push(`<li class="relative border-t border-hair pt-7"><span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span><span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="mt-4 text-lg font-bold text-ink">${ssrInterpolate(s.title)}</h3><p class="mt-2 text-sm leading-relaxed text-body">${ssrInterpolate(s.text)}</p></li>`);
			});
			_push(`<!--]--></ol></div></section>`);
			if (__props.motto && __props.motto[_ctx.$page.props.locale]) {
				_push(`<section class="relative overflow-hidden border-t border-hair bg-deep-2">`);
				if (__props.motto.image) _push(`<img${ssrRenderAttr("src", __props.motto.image)} alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-30">`);
				else _push(`<!---->`);
				_push(`<div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent"></div><div class="container-page relative py-24 sm:py-32"><span class="eyebrow">FERŠPED</span><blockquote class="mt-6 max-w-3xl font-display text-[clamp(1.6rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"> „${ssrInterpolate(__props.motto[_ctx.$page.props.locale])}“ </blockquote></div></section>`);
			} else _push(`<!---->`);
			if (__props.home.directory) {
				_push(`<section class="band-light section border-t border-hair bg-bg-2"><div class="container-page">`);
				_push(ssrRenderComponent(_sfc_main$30, {
					eyebrow: __props.home.directory.eyebrow,
					title: __props.home.directory.title,
					body: __props.home.directory.body,
					max: "max-w-2xl"
				}, null, _parent));
				_push(`<div data-stagger class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
				ssrRenderList(__props.home.directory.groups, (g, i) => {
					_push(`<div class="relative border-t border-hair pt-7"><span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span><span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="mt-4 text-lg font-bold leading-snug text-ink">${ssrInterpolate(g.title)}</h3><ul class="mt-5 space-y-3"><!--[-->`);
					ssrRenderList(g.links, (l, j) => {
						_push(`<li>`);
						if (l.href) _push(ssrRenderComponent(_component_Link, {
							href: unref(localePath)(l.href),
							class: "inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"${_scopeId}></span> ${ssrInterpolate(l.label)}`);
								else return [createVNode("span", { class: "mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500" }), createTextVNode(" " + toDisplayString(l.label), 1)];
							}),
							_: 2
						}, _parent));
						else _push(`<span class="inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body"><span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-hair-dark"></span> ${ssrInterpolate(l.label)}</span>`);
						_push(`</li>`);
					});
					_push(`<!--]--></ul></div>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`<section class="relative overflow-hidden border-t border-hair"><div class="grid-dots absolute inset-0 opacity-50"></div><div class="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_110%,rgba(44,229,119,0.13),transparent_65%)]"></div><div class="container-page relative py-28 text-center sm:py-36"><h2 data-split class="mx-auto max-w-4xl font-display text-[clamp(2.2rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink">${ssrInterpolate(__props.home.cta.title)}</h2><p class="reveal mx-auto mt-7 max-w-xl text-lg text-body">${ssrInterpolate(__props.home.cta.body)}</p><div class="reveal mt-11 flex flex-wrap items-center justify-center gap-3">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-primary !px-10 !py-5",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(__props.home.cta.primary)} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(__props.home.cta.primary) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`<a${ssrRenderAttr("href", `tel:${_ctx.$page.props.company.phone_href}`)} class="btn-on-dark" data-magnetic>`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "phone",
				size: 15
			}, null, _parent));
			_push(` ${ssrInterpolate(__props.home.cta.secondary)}</a></div></div></section></div>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Investors.vue
var Investors_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$9 });
var _sfc_main$9 = {
	__name: "Investors",
	__ssrInlineRender: true,
	props: {
		investors: {
			type: Object,
			required: true
		},
		documentCategories: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const openCat = ref(__props.documentCategories[0]?.slug ?? null);
		function fmtSize(b) {
			if (!b) return "";
			return b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.round(b / 1024) + " KB";
		}
		function extOf(url) {
			return (url.split(".").pop() || "").toUpperCase().slice(0, 4);
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.investors.eyebrow,
				title: __props.investors.title,
				lead: __props.investors.lead,
				crumb: _ctx.$t("nav.investors"),
				image: "/images/hero.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page"><dl class="grid grid-cols-2 gap-4 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.investors.facts, (f) => {
				_push(`<div class="rounded-2xl border border-hair bg-bg-2 p-6"><dt class="mono-label">${ssrInterpolate(f.k)}</dt><dd class="mt-2 text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">${ssrInterpolate(f.v)}</dd></div>`);
			});
			_push(`<!--]--></dl><div class="mt-6 grid gap-5 sm:grid-cols-2"><!--[-->`);
			ssrRenderList(__props.investors.blocks, (b, i) => {
				_push(`<div class="reveal card flex items-start gap-5 p-7"><span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: b.icon,
					size: 24,
					stroke: 1.75
				}, null, _parent));
				_push(`</span><div><h2 class="text-lg font-bold text-ink">${ssrInterpolate(b.title)}</h2><p class="mt-2 text-sm leading-relaxed text-body">${ssrInterpolate(b.text)}</p></div></div>`);
			});
			_push(`<!--]--></div><div class="band-dark reveal mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl bg-deep-2 p-8 text-white sm:flex-row sm:items-center sm:p-10"><div class="flex items-start gap-4"><span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-hair-dark text-brand-300">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "chart",
				size: 24,
				stroke: 1.75
			}, null, _parent));
			_push(`</span><p class="max-w-xl text-[0.95rem] leading-relaxed text-on-mute">${ssrInterpolate(__props.investors.note)}</p></div><div class="flex shrink-0 flex-wrap items-center gap-3"><a${ssrRenderAttr("href", __props.investors.mse_url)} target="_blank" rel="noopener" class="btn-amber">${ssrInterpolate(__props.investors.mse_cta)} `);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "arrowUpRight",
				size: 16
			}, null, _parent));
			_push(`</a><a${ssrRenderAttr("href", __props.investors.seinet_url)} target="_blank" rel="noopener" class="btn-on-dark band-dark">${ssrInterpolate(__props.investors.seinet_cta)} `);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "arrowUpRight",
				size: 16
			}, null, _parent));
			_push(`</a></div></div></div></section>`);
			if (__props.documentCategories.length) {
				_push(`<section class="band-light section border-t border-hair bg-bg-2"><div class="container-page"><span class="eyebrow">${ssrInterpolate(_ctx.$t("docs.eyebrow", "Документи"))}</span><h2 class="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">${ssrInterpolate(_ctx.$t("docs.title", "Целосна архива за акционери и јавност"))}</h2><div class="mt-12 space-y-3"><!--[-->`);
				ssrRenderList(__props.documentCategories, (cat) => {
					_push(`<div class="overflow-hidden rounded-2xl border border-hair bg-bg"><button type="button" class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-3 sm:px-8"${ssrRenderAttr("aria-expanded", openCat.value === cat.slug)}><span class="text-lg font-bold text-ink">${ssrInterpolate(cat.title)}</span><span class="mono-label flex shrink-0 items-center gap-3">${ssrInterpolate(cat.documents.length)} `);
					_push(ssrRenderComponent(_sfc_main$32, {
						name: "arrowRight",
						size: 14,
						class: ["transition-transform duration-300", openCat.value === cat.slug ? "rotate-90 text-brand-500" : ""]
					}, null, _parent));
					_push(`</span></button>`);
					if (openCat.value === cat.slug) {
						_push(`<ul class="border-t border-hair"><!--[-->`);
						ssrRenderList(cat.documents, (d) => {
							_push(`<li class="border-b border-hair-2 last:border-0"><a${ssrRenderAttr("href", d.url)} target="_blank" rel="noopener" class="group flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-bg-3 sm:px-8"><span class="mono-label inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-lg border border-hair-dark text-brand-400">${ssrInterpolate(extOf(d.url))}</span><span class="min-w-0 flex-1 text-[0.92rem] leading-snug text-body transition-colors group-hover:text-ink">${ssrInterpolate(d.title)}</span><span class="mono-label hidden shrink-0 sm:inline">${ssrInterpolate(fmtSize(d.size))}</span>`);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: "arrowUpRight",
								size: 14,
								class: "shrink-0 text-muted transition-colors group-hover:text-brand-400"
							}, null, _parent));
							_push(`</a></li>`);
						});
						_push(`<!--]--></ul>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Investors.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Network.vue
var Network_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$8 });
var _sfc_main$8 = {
	__name: "Network",
	__ssrInlineRender: true,
	props: {
		network: {
			type: Object,
			required: true
		},
		hub: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const { t, localePath } = useI18n();
		function flag(code) {
			return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.network.eyebrow,
				title: __props.network.title,
				lead: __props.network.lead,
				crumb: _ctx.$t("nav.network"),
				image: "/images/services/sea.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: _ctx.$t("nav.network"),
				title: __props.network.offices_title,
				max: "max-w-xl"
			}, null, _parent));
			_push(`<div class="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.network.countries, (c) => {
				_push(`<div class="card card-hover flex items-start gap-4 p-6"><span class="text-3xl leading-none" aria-hidden="true">${ssrInterpolate(flag(c.code))}</span><div><h3 class="text-lg font-bold text-ink">${ssrInterpolate(c.name)}</h3><p class="mt-1.5 text-sm text-body">${ssrInterpolate(c.role)}</p></div></div>`);
			});
			_push(`<!--]--></div></div></section><section class="band-light section border-t border-hair bg-bg-2"><div class="container-page">`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: __props.network.customs.eyebrow,
				title: __props.network.customs.title,
				body: __props.network.customs.body,
				max: "max-w-2xl"
			}, null, _parent));
			_push(`<div class="mt-12 grid gap-10 lg:grid-cols-2"><div><h3 class="mono-label text-brand-400">${ssrInterpolate(__props.network.customs.border_label)} · ${ssrInterpolate(__props.network.customs.border.length)}</h3><ul data-stagger class="mt-5 divide-y divide-hair border-y border-hair"><!--[-->`);
			ssrRenderList(__props.network.customs.border, (o) => {
				_push(`<li class="flex items-center justify-between gap-4 py-3.5"><span class="font-semibold text-ink">${ssrInterpolate(o.name)}</span><a${ssrRenderAttr("href", `tel:${o.phone.replace(/\s/g, "")}`)} class="font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">${ssrInterpolate(o.phone)}</a></li>`);
			});
			_push(`<!--]--></ul></div><div><h3 class="mono-label text-brand-400">${ssrInterpolate(__props.network.customs.inland_label)} · ${ssrInterpolate(__props.network.customs.inland.length)}</h3><ul data-stagger class="mt-5 divide-y divide-hair border-y border-hair"><!--[-->`);
			ssrRenderList(__props.network.customs.inland, (o) => {
				_push(`<li class="flex items-center justify-between gap-4 py-3.5"><span class="font-semibold text-ink">${ssrInterpolate(o.name)}</span><a${ssrRenderAttr("href", `tel:${o.phone.replace(/\s/g, "")}`)} class="font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">${ssrInterpolate(o.phone)}</a></li>`);
			});
			_push(`<!--]--></ul></div></div></div></section><section class="band-light section border-t border-hair bg-bg"><div class="container-page grid items-center gap-14 lg:grid-cols-2"><div>`);
			_push(ssrRenderComponent(_sfc_main$30, {
				eyebrow: _ctx.$page.props.locale === "mk" ? "Коридори" : "Corridors",
				title: __props.network.reach.title,
				body: __props.network.reach.body
			}, null, _parent));
			_push(`<ul class="reveal mt-8 space-y-4"><!--[-->`);
			ssrRenderList(__props.network.reach.points, (p, i) => {
				_push(`<li class="flex items-start gap-3.5"><span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "route",
					size: 16
				}, null, _parent));
				_push(`</span><span class="text-[0.975rem] leading-relaxed text-body">${ssrInterpolate(p)}</span></li>`);
			});
			_push(`<!--]--></ul>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-primary mt-9"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.quote"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.quote")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="reveal panel-dark relative overflow-hidden p-6 sm:p-8"><div class="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,rgba(18,161,90,0.10),transparent_70%)]"></div>`);
			_push(ssrRenderComponent(_sfc_main$11, { class: "relative mx-auto max-w-lg" }, null, _parent));
			_push(`</div></div></section>`);
			if (__props.hub.length) {
				_push(`<section class="band-light border-t border-hair bg-bg-2 py-14"><div class="container-page"><span class="mono-label text-brand-500">${ssrInterpolate(_ctx.$page.props.locale === "mk" ? "Детални именици" : "Detailed directories")}</span><div class="mt-5 grid gap-4 sm:grid-cols-2"><!--[-->`);
				ssrRenderList(__props.hub, (pg) => {
					_push(ssrRenderComponent(_component_Link, {
						key: pg.slug,
						href: pg.href,
						class: "group flex items-center justify-between gap-4 rounded-2xl border border-hair bg-bg px-6 py-5 transition-colors hover:border-brand-500/40"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="font-bold text-ink transition-colors group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(pg.title)}</span>`);
								_push(ssrRenderComponent(_sfc_main$32, {
									name: "arrowRight",
									size: 16,
									class: "shrink-0 text-brand-500 transition-transform group-hover:translate-x-1"
								}, null, _parent, _scopeId));
							} else return [createVNode("span", { class: "font-bold text-ink transition-colors group-hover:text-brand-400" }, toDisplayString(pg.title), 1), createVNode(_sfc_main$32, {
								name: "arrowRight",
								size: 16,
								class: "shrink-0 text-brand-500 transition-transform group-hover:translate-x-1"
							})];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Network.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/News.vue
var News_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$7 });
var _sfc_main$7 = {
	__name: "News",
	__ssrInlineRender: true,
	props: {
		newsPage: {
			type: Object,
			default: () => ({})
		},
		posts: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: _ctx.$t("nav.news", "Вести"),
				title: __props.newsPage.intro?.title ?? _ctx.$t("news.title", "Вести и настани"),
				lead: __props.newsPage.intro?.lead ?? "",
				crumb: _ctx.$t("nav.news", "Вести")
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page">`);
			if (__props.posts.length) {
				_push(`<div data-stagger class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.posts, (p) => {
					_push(ssrRenderComponent(_component_Link, {
						key: p.slug,
						href: p.href,
						class: "group overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors hover:border-brand-500/40"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (p.image) _push(`<div class="aspect-[16/9] overflow-hidden bg-deep-2"${_scopeId}><img${ssrRenderAttr("src", p.image)}${ssrRenderAttr("alt", p.title)} loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"${_scopeId}></div>`);
								else _push(`<!---->`);
								_push(`<div class="p-7"${_scopeId}>`);
								if (p.date) _push(`<span class="mono-label"${_scopeId}>${ssrInterpolate(p.date)}</span>`);
								else _push(`<!---->`);
								_push(`<h2 class="mt-2 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(p.title)}</h2>`);
								if (p.excerpt) _push(`<p class="mt-3 line-clamp-3 text-sm leading-relaxed text-body"${_scopeId}>${ssrInterpolate(p.excerpt)}</p>`);
								else _push(`<!---->`);
								_push(`<span class="link-arrow mt-5 inline-flex"${_scopeId}>${ssrInterpolate(_ctx.$t("cta.learn_more"))} `);
								_push(ssrRenderComponent(_sfc_main$32, {
									name: "arrowRight",
									size: 14
								}, null, _parent, _scopeId));
								_push(`</span></div>`);
							} else return [p.image ? (openBlock(), createBlock("div", {
								key: 0,
								class: "aspect-[16/9] overflow-hidden bg-deep-2"
							}, [createVNode("img", {
								src: p.image,
								alt: p.title,
								loading: "lazy",
								class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
							}, null, 8, ["src", "alt"])])) : createCommentVNode("", true), createVNode("div", { class: "p-7" }, [
								p.date ? (openBlock(), createBlock("span", {
									key: 0,
									class: "mono-label"
								}, toDisplayString(p.date), 1)) : createCommentVNode("", true),
								createVNode("h2", { class: "mt-2 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-400" }, toDisplayString(p.title), 1),
								p.excerpt ? (openBlock(), createBlock("p", {
									key: 1,
									class: "mt-3 line-clamp-3 text-sm leading-relaxed text-body"
								}, toDisplayString(p.excerpt), 1)) : createCommentVNode("", true),
								createVNode("span", { class: "link-arrow mt-5 inline-flex" }, [createTextVNode(toDisplayString(_ctx.$t("cta.learn_more")) + " ", 1), createVNode(_sfc_main$32, {
									name: "arrowRight",
									size: 14
								})])
							])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="text-body">—</p>`);
			_push(`</div></section></div>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/News.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/NewsDetail.vue
var NewsDetail_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$6 });
var _sfc_main$6 = {
	__name: "NewsDetail",
	__ssrInlineRender: true,
	props: {
		post: {
			type: Object,
			required: true
		},
		others: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const { t, localePath } = useI18n();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}><section class="media media-grade relative -mt-[4.75rem] flex min-h-[56svh] items-end overflow-hidden bg-bg text-white">`);
			if (__props.post.image) _push(`<img${ssrRenderAttr("src", __props.post.image)} alt="" class="absolute inset-0 h-full w-full object-cover opacity-50" fetchpriority="high">`);
			else _push(`<!---->`);
			_push(`<div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/45"></div><div class="container-page relative w-full pb-12 pt-36"><nav class="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)(""),
				class: "transition-colors hover:text-brand-400"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("nav.home"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("nav.home")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-brand-500/60">/</span>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("news"),
				class: "transition-colors hover:text-brand-400"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("nav.news", "Вести"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("nav.news", "Вести")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</nav>`);
			if (__props.post.date) _push(`<span class="mono-label mt-6 block text-brand-400">${ssrInterpolate(__props.post.date)}</span>`);
			else _push(`<!---->`);
			_push(`<h1 class="mt-3 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink">${ssrInterpolate(__props.post.title)}</h1></div></section><section class="band-light section bg-bg"><div class="container-page grid gap-14 lg:grid-cols-12"><article class="prose-site max-w-none lg:col-span-8">${__props.post.body ?? ""}</article>`);
			if (__props.others.length) {
				_push(`<aside class="lg:col-span-4"><h2 class="mono-label text-brand-500">${ssrInterpolate(unref(t)("news.more", "Останати вести"))}</h2><div class="mt-5 space-y-4"><!--[-->`);
				ssrRenderList(__props.others, (o) => {
					_push(ssrRenderComponent(_component_Link, {
						key: o.slug,
						href: o.href,
						class: "group block rounded-2xl border border-hair bg-bg-2 p-5 transition-colors hover:border-brand-500/40"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (o.date) _push(`<span class="mono-label"${_scopeId}>${ssrInterpolate(o.date)}</span>`);
								else _push(`<!---->`);
								_push(`<span class="mt-1 block font-bold leading-snug text-ink transition-colors group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(o.title)}</span>`);
							} else return [o.date ? (openBlock(), createBlock("span", {
								key: 0,
								class: "mono-label"
							}, toDisplayString(o.date), 1)) : createCommentVNode("", true), createVNode("span", { class: "mt-1 block font-bold leading-snug text-ink transition-colors group-hover:text-brand-400" }, toDisplayString(o.title), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></aside>`);
			} else _push(`<!---->`);
			_push(`</div></section><div class="container-page pb-20">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("news"),
				class: "link-arrow inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 14,
							class: "rotate-180"
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(t)("nav.news", "Вести"))}`);
					} else return [createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 14,
						class: "rotate-180"
					}), createTextVNode(" " + toDisplayString(unref(t)("nav.news", "Вести")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/NewsDetail.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/ServiceDetail.vue
var ServiceDetail_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$5 });
var _sfc_main$5 = {
	__name: "ServiceDetail",
	__ssrInlineRender: true,
	props: {
		service: {
			type: Object,
			required: true
		},
		related: {
			type: Object,
			required: true
		},
		others: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const { t, localePath } = useI18n();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.service.tagline,
				title: __props.service.title,
				crumb: __props.service.title,
				image: `/images/services/${__props.service.slug}.jpg`
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16"><div class="lg:col-span-7"><span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: __props.service.icon,
				size: 28,
				stroke: 1.75
			}, null, _parent));
			_push(`</span><div class="reveal mt-8 space-y-6"><!--[-->`);
			ssrRenderList(__props.service.description, (para, i) => {
				_push(`<p class="${ssrRenderClass([i === 0 ? "text-ink" : "text-body", "text-lg leading-relaxed"])}">${ssrInterpolate(para)}</p>`);
			});
			_push(`<!--]--></div></div><aside class="lg:col-span-5"><div class="reveal card sticky top-24 p-8"><span class="eyebrow">${ssrInterpolate(__props.service.tagline)}</span><ul class="mt-6 space-y-4"><!--[-->`);
			ssrRenderList(__props.service.features, (f, i) => {
				_push(`<li class="flex items-start gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-400">`);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "check",
					size: 14,
					stroke: 3
				}, null, _parent));
				_push(`</span><span class="text-[0.95rem] leading-snug text-body">${ssrInterpolate(f)}</span></li>`);
			});
			_push(`<!--]--></ul>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-primary mt-8 w-full justify-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.quote"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.quote")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`<a${ssrRenderAttr("href", `tel:${_ctx.$page.props.company.phone_href}`)} class="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "phone",
				size: 16
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$page.props.company.phone)}</a></div></aside></div></section><section class="band-light section border-t border-hair bg-bg-2"><div class="container-page"><div class="mb-8 flex items-end justify-between"><h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">${ssrInterpolate(_ctx.$t("cta.explore"))}</h2>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("services"),
				class: "link-arrow hidden text-sm sm:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.all_services"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.all_services")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 15
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="grid gap-4 sm:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.others.slice(0, 3), (o) => {
				_push(ssrRenderComponent(_sfc_main$13, {
					key: o.slug,
					service: o,
					ratio: "aspect-[3/4]"
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="mt-12 flex items-center justify-between gap-4 border-t border-hair pt-8">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)(`services/${__props.related.prev.slug}`),
				class: "group flex items-center gap-3 text-sm font-bold text-body hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowLeft",
							size: 18,
							class: "transition-transform group-hover:-translate-x-1"
						}, null, _parent, _scopeId));
						_push(`<span class="hidden sm:inline"${_scopeId}>${ssrInterpolate(__props.related.prev.title)}</span><span class="sm:hidden"${_scopeId}>${ssrInterpolate(unref(t)("cta.back"))}</span>`);
					} else return [
						createVNode(_sfc_main$32, {
							name: "arrowLeft",
							size: 18,
							class: "transition-transform group-hover:-translate-x-1"
						}),
						createVNode("span", { class: "hidden sm:inline" }, toDisplayString(__props.related.prev.title), 1),
						createVNode("span", { class: "sm:hidden" }, toDisplayString(unref(t)("cta.back")), 1)
					];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)(`services/${__props.related.next.slug}`),
				class: "group flex items-center gap-3 text-sm font-bold text-body hover:text-ink"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span${_scopeId}>${ssrInterpolate(__props.related.next.title)}</span>`);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 18,
							class: "transition-transform group-hover:translate-x-1"
						}, null, _parent, _scopeId));
					} else return [createVNode("span", null, toDisplayString(__props.related.next.title), 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 18,
						class: "transition-transform group-hover:translate-x-1"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></section></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ServiceDetail.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Pages/Services.vue
var Services_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$4 });
var _sfc_main$4 = {
	__name: "Services",
	__ssrInlineRender: true,
	props: {
		intro: {
			type: Object,
			required: true
		},
		services: {
			type: Array,
			required: true
		}
	},
	setup(__props) {
		const props = __props;
		const { t, localePath } = useI18n();
		const featured = props.services[0];
		const others = props.services.slice(1);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_sfc_main$31, {
				eyebrow: __props.intro.eyebrow,
				title: __props.intro.title,
				lead: __props.intro.body,
				crumb: _ctx.$t("nav.services"),
				image: "/images/services/railway.webp"
			}, null, _parent));
			_push(`<section class="band-light section bg-bg"><div class="container-page"><h2 class="sr-only">${ssrInterpolate(_ctx.$t("nav.services"))}</h2><div class="grid gap-4">`);
			_push(ssrRenderComponent(_sfc_main$13, {
				service: unref(featured),
				index: 1,
				eager: "",
				big: ""
			}, null, _parent));
			_push(`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(unref(others), (s, i) => {
				_push(ssrRenderComponent(_sfc_main$13, {
					key: s.slug,
					service: s,
					index: i + 2
				}, null, _parent));
			});
			_push(`<!--]--></div></div></div></section><section class="media relative overflow-hidden bg-deep-2 text-white"><img src="/images/services/sea.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.14]" loading="lazy"><div class="absolute inset-0 bg-deep-2/70"></div><div class="container-page relative flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center lg:py-20"><div><span class="eyebrow eyebrow-dark">${ssrInterpolate(_ctx.$t("cta.explore"))}</span><h2 class="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-4xl">${ssrInterpolate(_ctx.$t("cta.title"))}</h2></div><div class="flex flex-wrap items-center gap-3 shrink-0">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-amber"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(unref(t)("cta.quote"))} `);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowRight",
							size: 16
						}, null, _parent, _scopeId));
					} else return [createTextVNode(toDisplayString(unref(t)("cta.quote")) + " ", 1), createVNode(_sfc_main$32, {
						name: "arrowRight",
						size: 16
					})];
				}),
				_: 1
			}, _parent));
			_push(`<a${ssrRenderAttr("href", `tel:${_ctx.$page.props.company.phone_href}`)} class="btn-on-dark">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "phone",
				size: 16
			}, null, _parent));
			_push(` ${ssrInterpolate(_ctx.$page.props.company.phone)}</a></div></div></section></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Services.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/LanguageSwitcher.vue
var _sfc_main$3 = {
	__name: "LanguageSwitcher",
	__ssrInlineRender: true,
	props: { light: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const page = usePage();
		const locales = [{
			code: "mk",
			label: "МК"
		}, {
			code: "en",
			label: "EN"
		}];
		const current = computed(() => page.props.locale ?? "mk");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: ["inline-flex items-center gap-0.5 rounded-full border p-1 text-[0.78rem] font-bold", __props.light ? "border-white/30" : "border-hair"],
				role: "group",
				"aria-label": "Language"
			}, _attrs))}><!--[-->`);
			ssrRenderList(locales, (l) => {
				_push(`<button type="button"${ssrRenderAttr("aria-current", current.value === l.code ? "true" : void 0)} class="${ssrRenderClass([current.value === l.code ? "bg-brand-700 text-white" : __props.light ? "text-white/70 hover:text-white" : "text-ink/60 hover:text-ink", "inline-flex min-h-[34px] items-center justify-center rounded-full px-3 transition-colors"])}">${ssrInterpolate(l.label)}</button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LanguageSwitcher.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AppHeader.vue
var _sfc_main$2 = {
	__name: "AppHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const { t, localePath, locale } = useI18n();
		const nav = computed(() => page.props.nav ?? []);
		const company = computed(() => page.props.company ?? {});
		const open = ref(false);
		const scrolled = ref(false);
		function onScroll() {
			scrolled.value = window.scrollY > 24;
		}
		function onKey(e) {
			if (e.key === "Escape") open.value = false;
		}
		onMounted(() => {
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
			window.addEventListener("keydown", onKey);
		});
		onBeforeUnmount(() => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("keydown", onKey);
			document.documentElement.classList.remove("nav-locked");
		});
		watch(() => page.url, () => open.value = false);
		watch(open, (v) => document.documentElement.classList.toggle("nav-locked", v));
		function isActive(href) {
			return page.url === href || href !== localePath("") && page.url.startsWith(href);
		}
		const menuItems = computed(() => [{
			key: "home",
			href: localePath(""),
			label: t("nav.home"),
			exact: true
		}, ...nav.value]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-50" }, _attrs))}>`);
			if (open.value) {
				_push(`<div id="site-menu" class="fixed inset-0 z-0 bg-bg"><div class="grid-dots absolute inset-0 opacity-60"></div><div class="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_15%,rgba(44,229,119,0.10),transparent_65%)]"></div><div class="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-bg via-bg/80 to-transparent pb-4"><div class="container-page flex h-[4.75rem] items-center justify-between gap-4">`);
				_push(ssrRenderComponent(_component_Link, {
					href: unref(localePath)(""),
					"aria-label": "FERŠPED — home",
					onClick: ($event) => open.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_sfc_main$28, null, null, _parent, _scopeId));
						else return [createVNode(_sfc_main$28)];
					}),
					_: 1
				}, _parent));
				_push(`<button type="button" class="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-brand-500/60 text-brand-400 transition-colors hover:bg-brand-500/10" aria-controls="site-menu"${ssrRenderAttr("aria-label", unref(t)("common.close"))}><span class="relative block h-5 w-5" aria-hidden="true"><span class="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-current"></span><span class="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 bg-current"></span></span></button></div></div><div class="relative flex h-full flex-col overflow-y-auto px-5 pb-8 pt-24 sm:px-8 lg:px-12"><div class="grid flex-1 items-start gap-10 lg:grid-cols-12 lg:pt-8"><nav class="stage flex flex-col lg:col-span-8" aria-label="Menu"><!--[-->`);
				ssrRenderList(menuItems.value, (item, i) => {
					_push(ssrRenderComponent(_component_Link, {
						key: item.key,
						href: item.href,
						class: "group flex items-baseline gap-5 border-b border-hair py-4 sm:py-5"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-brand-500/70"${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><span class="${ssrRenderClass([(item.exact ? unref(page).url === item.href : isActive(item.href)) ? "text-brand-500" : "text-ink", "font-display text-[clamp(1.9rem,6vw,3.6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-3 group-hover:text-brand-400"])}"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
								_push(ssrRenderComponent(_sfc_main$32, {
									name: "arrowUpRight",
									size: 22,
									class: "ml-auto shrink-0 self-center text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-400"
								}, null, _parent, _scopeId));
							} else return [
								createVNode("span", { class: "font-mono text-[0.7rem] font-bold tracking-[0.2em] text-brand-500/70" }, toDisplayString(String(i + 1).padStart(2, "0")), 1),
								createVNode("span", { class: ["font-display text-[clamp(1.9rem,6vw,3.6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-3 group-hover:text-brand-400", (item.exact ? unref(page).url === item.href : isActive(item.href)) ? "text-brand-500" : "text-ink"] }, toDisplayString(item.label), 3),
								createVNode(_sfc_main$32, {
									name: "arrowUpRight",
									size: 22,
									class: "ml-auto shrink-0 self-center text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-400"
								})
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></nav><div class="stage flex flex-col gap-8 lg:col-span-4 lg:border-l lg:border-hair lg:pl-10 lg:pt-2"><div><div class="mono-label">${ssrInterpolate(unref(t)("footer.contact"))}</div><a${ssrRenderAttr("href", `tel:${company.value.phone_href}`)} class="mt-3 block text-xl font-bold text-ink transition-colors hover:text-brand-400">${ssrInterpolate(company.value.phone)}</a><a${ssrRenderAttr("href", `mailto:${company.value.email}`)} class="mt-1 block text-[0.95rem] text-body transition-colors hover:text-brand-400">${ssrInterpolate(company.value.email)}</a><p class="mt-3 text-[0.85rem] leading-relaxed text-muted">${ssrInterpolate(company.value.street)}, ${ssrInterpolate(company.value.postal)} ${ssrInterpolate(company.value.city)}</p></div>`);
				_push(ssrRenderComponent(_component_Link, {
					href: unref(localePath)("contact"),
					class: "btn-primary justify-center lg:justify-start",
					"data-magnetic": ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`${ssrInterpolate(unref(t)("cta.quote"))} `);
							_push(ssrRenderComponent(_sfc_main$32, {
								name: "arrowRight",
								size: 15
							}, null, _parent, _scopeId));
						} else return [createTextVNode(toDisplayString(unref(t)("cta.quote")) + " ", 1), createVNode(_sfc_main$32, {
							name: "arrowRight",
							size: 15
						})];
					}),
					_: 1
				}, _parent));
				_push(`<div class="flex items-center justify-between gap-4 border-t border-hair pt-6">`);
				_push(ssrRenderComponent(_sfc_main$3, { light: "" }, null, _parent));
				_push(`<span class="mono-label">${ssrInterpolate(unref(locale) === "mk" ? "Од 1968 · Берза: FERS" : "Est. 1968 · MSE : FERS")}</span></div></div></div><div class="mt-8 flex items-center justify-between border-t border-hair pt-5"><span class="mono-label">41.9966°N · 21.4314°E · ${ssrInterpolate(unref(locale) === "mk" ? "СКОПЈЕ" : "SKOPJE")}</span><a${ssrRenderAttr("href", company.value.linkedin)} target="_blank" rel="noopener" class="mono-label transition-colors hover:text-brand-400">LinkedIn ↗</a></div></div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="${ssrRenderClass([[open.value ? "invisible" : "", !open.value && scrolled.value ? "border-b border-hair bg-bg/85 backdrop-blur-xl" : ""], "relative z-10 transition-all duration-500"])}"><div class="container-page flex h-[4.75rem] items-center justify-between gap-4">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)(""),
				"aria-label": "FERŠPED — home"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_sfc_main$28, null, null, _parent, _scopeId));
					else return [createVNode(_sfc_main$28)];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden items-center gap-8 md:flex"><span class="mono-label hidden lg:inline">${ssrInterpolate(unref(locale) === "mk" ? "ЖЕЛЕЗНИЦА · ПАТ · МОРЕ · ВОЗДУХ" : "RAIL · ROAD · SEA · AIR")}</span>`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "btn-primary !py-2.5",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("cta.quote"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("cta.quote")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><button type="button" class="${ssrRenderClass([open.value ? "border-brand-500/60 text-brand-400" : "border-hair-dark text-ink hover:border-brand-500/60 hover:text-brand-400", "group inline-flex h-12 items-center gap-3 rounded-[10px] border px-4 transition-colors"])}"${ssrRenderAttr("aria-expanded", open.value)} aria-controls="site-menu" aria-label="Menu"><span class="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em]">${ssrInterpolate(open.value ? unref(t)("common.close") : unref(t)("common.menu"))}</span><span class="relative block h-[10px] w-5" aria-hidden="true"><span class="${ssrRenderClass([open.value ? "top-1/2 -translate-y-1/2 rotate-45" : "", "absolute left-0 top-0 h-[2px] w-full bg-current transition-all duration-300"])}"></span><span class="${ssrRenderClass([open.value ? "bottom-1/2 translate-y-1/2 -rotate-45" : "", "absolute bottom-0 left-0 h-[2px] w-full bg-current transition-all duration-300"])}"></span></span></button></div></div></header>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppHeader.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Components/AppFooter.vue
var _sfc_main$1 = {
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const { t, localePath, locale } = useI18n();
		const company = computed(() => page.props.company ?? {});
		const nav = computed(() => page.props.nav ?? []);
		const serviceLinks = computed(() => page.props.serviceLinks ?? []);
		const groupLinks = computed(() => page.props.groupLinks ?? []);
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Link = resolveComponent("Link");
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden border-t border-hair bg-bg text-on" }, _attrs))}><div class="container-page relative">`);
			_push(ssrRenderComponent(_component_Link, {
				href: unref(localePath)("contact"),
				class: "group flex flex-col gap-4 border-b border-hair py-14 sm:flex-row sm:items-end sm:justify-between lg:py-20",
				"data-magnetic": ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div${_scopeId}><span class="eyebrow"${_scopeId}>${ssrInterpolate(unref(t)("cta.contact"))}</span><span class="mt-4 block font-display text-[clamp(2rem,5.5vw,4.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-400"${_scopeId}>${ssrInterpolate(unref(t)("footer.cta"))}</span></div><span class="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hair-dark text-ink transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-[#052012] sm:h-20 sm:w-20"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$32, {
							name: "arrowUpRight",
							size: 26
						}, null, _parent, _scopeId));
						_push(`</span>`);
					} else return [createVNode("div", null, [createVNode("span", { class: "eyebrow" }, toDisplayString(unref(t)("cta.contact")), 1), createVNode("span", { class: "mt-4 block font-display text-[clamp(2rem,5.5vw,4.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-400" }, toDisplayString(unref(t)("footer.cta")), 1)]), createVNode("span", { class: "inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hair-dark text-ink transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-[#052012] sm:h-20 sm:w-20" }, [createVNode(_sfc_main$32, {
						name: "arrowUpRight",
						size: 26
					})])];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="container-page relative py-14 lg:py-16"><div class="grid gap-12 lg:grid-cols-12"><div class="lg:col-span-4">`);
			_push(ssrRenderComponent(_sfc_main$28, null, null, _parent));
			_push(`<p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-body">${ssrInterpolate(unref(t)("footer.tagline"))}</p><a${ssrRenderAttr("href", company.value.linkedin)} target="_blank" rel="noopener" class="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-hair-dark text-on transition-colors hover:border-brand-500/60 hover:text-brand-400" aria-label="LinkedIn">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "linkedin",
				size: 18
			}, null, _parent));
			_push(`</a></div><div class="lg:col-span-2"><h3 class="mono-label text-brand-500">${ssrInterpolate(unref(t)("footer.company"))}</h3><ul class="mt-5 space-y-3 text-[0.95rem]"><!--[-->`);
			ssrRenderList(nav.value, (item) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_Link, {
					href: item.href,
					class: "text-body transition-colors hover:text-brand-400"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div class="lg:col-span-2"><h3 class="mono-label text-brand-500">${ssrInterpolate(unref(t)("footer.services"))}</h3><ul class="mt-5 space-y-3 text-[0.95rem]"><!--[-->`);
			ssrRenderList(serviceLinks.value, (s) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_Link, {
					href: s.href,
					class: "text-body transition-colors hover:text-brand-400"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(s.title)}`);
						else return [createTextVNode(toDisplayString(s.title), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div class="lg:col-span-2"><h3 class="mono-label text-brand-500">${ssrInterpolate(unref(t)("footer.group"))}</h3><ul class="mt-5 space-y-3 text-[0.95rem]"><!--[-->`);
			ssrRenderList(groupLinks.value, (g) => {
				_push(`<li><a${ssrRenderAttr("href", g.url)} target="_blank" rel="noopener" class="group inline-flex items-center gap-1.5 text-body transition-colors hover:text-brand-400">${ssrInterpolate(g.name)} `);
				_push(ssrRenderComponent(_sfc_main$32, {
					name: "arrowUpRight",
					size: 13,
					class: "opacity-50 transition-opacity group-hover:opacity-100"
				}, null, _parent));
				_push(`</a></li>`);
			});
			_push(`<!--]--></ul></div><div class="lg:col-span-2"><h3 class="mono-label text-brand-500">${ssrInterpolate(unref(t)("footer.contact"))}</h3><ul class="mt-5 space-y-4 text-[0.95rem]"><li class="flex items-start gap-3">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "pin",
				size: 17,
				class: "mt-0.5 shrink-0 text-brand-500"
			}, null, _parent));
			_push(`<span class="text-body">${ssrInterpolate(company.value.street)}, ${ssrInterpolate(company.value.postal)} ${ssrInterpolate(company.value.city)}</span></li><li class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "phone",
				size: 17,
				class: "shrink-0 text-brand-500"
			}, null, _parent));
			_push(`<a${ssrRenderAttr("href", `tel:${company.value.phone_href}`)} class="text-body transition-colors hover:text-brand-400">${ssrInterpolate(company.value.phone)}</a></li><li class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_sfc_main$32, {
				name: "mail",
				size: 17,
				class: "shrink-0 text-brand-500"
			}, null, _parent));
			_push(`<a${ssrRenderAttr("href", `mailto:${company.value.email}`)} class="text-body transition-colors hover:text-brand-400">${ssrInterpolate(company.value.email)}</a></li></ul></div></div><div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hair pt-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted sm:flex-row"><p>© ${ssrInterpolate(unref(year))} ${ssrInterpolate(company.value.name)}. ${ssrInterpolate(unref(t)("footer.rights"))}</p><p class="flex items-center gap-2.5"><span class="inline-flex h-1.5 w-1.5 rounded-full bg-brand-500"></span> ${ssrInterpolate(unref(locale) === "mk" ? "Берза: FERS" : "MSE : FERS")} · ${ssrInterpolate(company.value.geo?.lat)}°N ${ssrInterpolate(company.value.geo?.lng)}°E </p></div></div><div class="pointer-events-none select-none" aria-hidden="true"><div class="container-page pb-6"><span class="block whitespace-nowrap text-center font-display text-[min(17vw,16rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-transparent" style="${ssrRenderStyle({ "-webkit-text-stroke": "1px rgba(44, 229, 119, 0.16)" })}">FERŠPED</span></div></div></footer>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AppFooter.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/Layouts/SiteLayout.vue
var _sfc_main = {
	__name: "SiteLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		let lenis = null;
		let observer = null;
		let safetyTimer = null;
		const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		function revealAll() {
			document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => el.classList.add("is-visible"));
			document.querySelectorAll("[data-stagger]:not(.go), [data-split]:not(.go)").forEach((el) => el.classList.add("go"));
		}
		function prepareSplit() {
			document.querySelectorAll("[data-split]:not([data-split-ready])").forEach((el) => {
				el.setAttribute("data-split-ready", "1");
				const words = (el.textContent ?? "").trim().split(/\s+/);
				el.textContent = "";
				words.forEach((word, i) => {
					const w = document.createElement("span");
					w.className = "w";
					const inner = document.createElement("span");
					inner.className = "in";
					inner.textContent = word;
					inner.style.setProperty("--d", `${Math.min(i * 40, 400)}ms`);
					w.appendChild(inner);
					el.appendChild(w);
					if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
				});
			});
		}
		function prepareStagger() {
			document.querySelectorAll("[data-stagger]:not([data-stagger-ready])").forEach((el) => {
				el.setAttribute("data-stagger-ready", "1");
				[...el.children].forEach((child, i) => child.style.setProperty("--i", i));
			});
		}
		function applyReveal() {
			if (typeof window === "undefined") return;
			prepareSplit();
			prepareStagger();
			const els = document.querySelectorAll(".reveal:not(.is-visible), [data-stagger]:not(.go), [data-split]:not(.go)");
			if (!("IntersectionObserver" in window) || reduced()) {
				revealAll();
				return;
			}
			if (!observer) observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add(entry.target.classList.contains("reveal") ? "is-visible" : "go");
						observer.unobserve(entry.target);
					}
				});
			}, {
				rootMargin: "0px 0px 60px 0px",
				threshold: 0
			});
			els.forEach((el) => observer.observe(el));
			clearTimeout(safetyTimer);
			safetyTimer = setTimeout(revealAll, 1800);
		}
		function onMagneticMove(e) {
			const el = e.currentTarget;
			const r = el.getBoundingClientRect();
			const x = ((e.clientX - r.left) / r.width - .5) * 10;
			const y = ((e.clientY - r.top) / r.height - .5) * 10;
			el.style.transform = `translate(${x}px, ${y}px)`;
		}
		function onMagneticLeave(e) {
			e.currentTarget.style.transform = "";
		}
		function bindMagnetic() {
			if (reduced() || !window.matchMedia("(pointer: fine)").matches) return;
			document.querySelectorAll("[data-magnetic]:not([data-magnetic-ready])").forEach((el) => {
				el.setAttribute("data-magnetic-ready", "1");
				el.addEventListener("mousemove", onMagneticMove);
				el.addEventListener("mouseleave", onMagneticLeave);
			});
		}
		const dotEl = ref(null);
		const ringEl = ref(null);
		let cursorRaf = null;
		let mx = 0, my = 0, rx = 0, ry = 0;
		let cursorBound = false;
		function onCursorMove(e) {
			mx = e.clientX;
			my = e.clientY;
			if (dotEl.value) {
				dotEl.value.style.transform = `translate(${mx}px, ${my}px)`;
				dotEl.value.style.opacity = "1";
			}
			if (ringEl.value) ringEl.value.style.opacity = "1";
		}
		function cursorLoop() {
			rx += (mx - rx) * .16;
			ry += (my - ry) * .16;
			if (ringEl.value) ringEl.value.style.transform = `translate(${rx}px, ${ry}px)`;
			cursorRaf = requestAnimationFrame(cursorLoop);
		}
		function onCursorOver(e) {
			const interactive = e.target.closest("a, button, [data-magnetic], input, select, textarea");
			ringEl.value?.classList.toggle("is-active", !!interactive);
		}
		function bindCursor() {
			if (cursorBound || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
			cursorBound = true;
			window.addEventListener("mousemove", onCursorMove, { passive: true });
			window.addEventListener("mouseover", onCursorOver, { passive: true });
			cursorRaf = requestAnimationFrame(cursorLoop);
		}
		const wipeEl = ref(null);
		let removeStart = null, removeFinish = null;
		function bindWipe() {
			if (reduced() || window.matchMedia("(pointer: coarse)").matches) return;
			removeStart = router.on("start", (e) => {
				if (e.detail.visit.method !== "get" || e.detail.visit.prefetch) return;
				wipeEl.value?.classList.remove("leave");
				wipeEl.value?.classList.add("cover");
			});
			removeFinish = router.on("finish", (e) => {
				if (e.detail.visit.prefetch) return;
				const el = wipeEl.value;
				if (!el || !el.classList.contains("cover")) return;
				requestAnimationFrame(() => {
					el.classList.add("leave");
					el.classList.remove("cover");
					setTimeout(() => el.classList.remove("leave"), 350);
				});
			});
		}
		const showPreloader = ref(false);
		const counter = ref(0);
		function runPreloader() {
			if (reduced() || sessionStorage.getItem("fspd-seen")) return;
			sessionStorage.setItem("fspd-seen", "1");
			showPreloader.value = true;
			document.documentElement.classList.add("nav-locked");
			const t0 = performance.now();
			const dur = 650;
			const step = (now) => {
				const p = Math.min(1, (now - t0) / dur);
				counter.value = Math.round(p * 100);
				if (p < 1) requestAnimationFrame(step);
				else setTimeout(() => {
					document.querySelector(".preloader")?.classList.add("done");
					document.documentElement.classList.remove("nav-locked");
					setTimeout(() => showPreloader.value = false, 500);
				}, 100);
			};
			requestAnimationFrame(step);
		}
		function syncHead() {
			if (typeof document === "undefined") return;
			const seo = page.props.seo ?? {};
			if (seo.title) document.title = seo.title;
			if (page.props.locale) document.documentElement.lang = page.props.locale;
			const desc = document.querySelector("meta[name=\"description\"]");
			if (desc && seo.description) desc.setAttribute("content", seo.description);
			const canonical = document.querySelector("link[rel=\"canonical\"]");
			if (canonical && seo.canonical) canonical.setAttribute("href", seo.canonical);
		}
		onMounted(() => {
			if (!reduced()) lenis = new Lenis({
				autoRaf: true,
				lerp: .12,
				prevent: (node) => !!node.closest?.("#site-menu")
			});
			runPreloader();
			applyReveal();
			bindMagnetic();
			bindCursor();
			bindWipe();
			syncHead();
		});
		onBeforeUnmount(() => {
			lenis?.destroy();
			observer?.disconnect();
			if (cursorRaf) cancelAnimationFrame(cursorRaf);
			window.removeEventListener("mousemove", onCursorMove);
			window.removeEventListener("mouseover", onCursorOver);
			removeStart?.();
			removeFinish?.();
			document.documentElement.classList.remove("nav-locked");
		});
		watch(() => page.component, () => {
			syncHead();
			nextTick(() => {
				if (lenis) lenis.scrollTo(0, {
					immediate: true,
					force: true
				});
				else window.scrollTo({ top: 0 });
				applyReveal();
				bindMagnetic();
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen flex-col bg-bg" }, _attrs))}><a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-bold focus:text-[#052012]">${ssrInterpolate(unref(page).props.locale === "mk" ? "Прескокни до содржината" : "Skip to content")}</a>`);
			_push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
			_push(`<main id="main" class="flex-1">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
			_push(`<div class="noise" aria-hidden="true"></div><div class="cursor-dot" aria-hidden="true"></div><div class="cursor-ring" aria-hidden="true"></div><div class="wipe" aria-hidden="true"></div>`);
			if (showPreloader.value) _push(`<div class="preloader" aria-hidden="true"><div class="text-center"><div class="font-display text-[2rem] font-extrabold tracking-[-0.02em] text-ink"> FER<span class="text-brand-500">Š</span>PED </div><div class="mt-4 font-mono text-[0.8rem] font-bold tabular-nums tracking-[0.3em] text-brand-500">${ssrInterpolate(String(counter.value).padStart(3, "0"))}</div></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/SiteLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region resources/js/lib/PrefetchLink.js
/**
* Global Link with prefetching: pages start loading on hover (desktop)
* or touchstart (mobile), so navigation feels instant.
*/
function PrefetchLink(props, { slots }) {
	return h(Link, {
		prefetch: true,
		cacheFor: "30s",
		...props
	}, slots);
}
//#endregion
//#region resources/js/ssr.js
var appName = "FERŠPED";
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	title: (title) => title ? `${title} · ${appName}` : `${appName} — Логистика и шпедиција`,
	resolve: (name) => {
		const module = (/* @__PURE__ */ Object.assign({
			"./Pages/About.vue": About_exports,
			"./Pages/Admin/Content.vue": Content_exports,
			"./Pages/Admin/Dashboard.vue": Dashboard_exports,
			"./Pages/Admin/Documents.vue": Documents_exports,
			"./Pages/Admin/Login.vue": Login_exports,
			"./Pages/Admin/Media.vue": Media_exports,
			"./Pages/Admin/PageEdit.vue": PageEdit_exports,
			"./Pages/Admin/Pages.vue": Pages_exports,
			"./Pages/Admin/Posts.vue": Posts_exports,
			"./Pages/Admin/Services.vue": Services_exports$1,
			"./Pages/Admin/Settings.vue": Settings_exports,
			"./Pages/CompanyPage.vue": CompanyPage_exports,
			"./Pages/Contact.vue": Contact_exports,
			"./Pages/Home.vue": Home_exports,
			"./Pages/Investors.vue": Investors_exports,
			"./Pages/Network.vue": Network_exports,
			"./Pages/News.vue": News_exports,
			"./Pages/NewsDetail.vue": NewsDetail_exports,
			"./Pages/ServiceDetail.vue": ServiceDetail_exports,
			"./Pages/Services.vue": Services_exports
		}))[`./Pages/${name}.vue`];
		module.default.layout = module.default.layout || _sfc_main;
		return module;
	},
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin).use(localePlugin).component("Link", PrefetchLink);
	}
}));
//#endregion
export {};

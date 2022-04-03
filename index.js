function clamp(value, min, max) {
  return min < max ?
  value < min ? min : value > max ? max : value :
  value < max ? max : value > min ? min : value;
}

// given a value between a start and an end point, figure out how far
// along we are from 0..1
function findPosOnScale (start, end, value) {
    if (value === Infinity)
        return 1

    const length = end - start;

    if (length === 0)
        return 0

    if (value === 0)
        value = start;

    if (value === Infinity)
        value = end;

    const x = Math.max(0, value - start);

    return x / length
}

function ie(e, t) {return document.createElement(e, t);}function le(e, t, n) {return document.createElementNS(e, t, n);}function re() {return document.createDocumentFragment();}function ae(e) {return document.createTextNode(e);}function oe(e) {return document.createComment(e);}function fe(e, t, n) {e.insertBefore(t, n);}function se(e, t) {e.removeChild(t);}function ce(e, t) {e.appendChild(t);}function ue(e) {return e.parentNode;}function de(e) {return e.nextSibling;}function me(e) {return e.tagName;}function pe(e, t) {e.textContent = t;}function he(e) {return e.textContent;}function ge(e) {return e.nodeType === 1;}function ye(e) {return e.nodeType === 3;}function xe(e) {return e.nodeType === 8;}function Se(e) {return e.nodeType === 11;}const H$1 = { createElement: ie, createElementNS: le, createTextNode: ae, createDocumentFragment: re, createComment: oe, insertBefore: fe, removeChild: se, appendChild: ce, parentNode: ue, nextSibling: de, tagName: me, setTextContent: pe, getTextContent: he, isElement: ge, isText: ye, isComment: xe, isDocumentFragment: Se };function b(e, t, n, i, l) {const r = t === void 0 ? void 0 : t.key;return { sel: e, data: t, children: n, text: i, elm: l, key: r };}const B$1 = Array.isArray;function F$3(e) {return typeof e == "string" || typeof e == "number" || e instanceof String || e instanceof Number;}function $$1(e) {return e === void 0;}function D$2(e) {return e !== void 0;}const R$2 = b("", {}, [], void 0, void 0);function M$1(e, t) {var n, i;const l = e.key === t.key,r = ((n = e.data) === null || n === void 0 ? void 0 : n.is) === ((i = t.data) === null || i === void 0 ? void 0 : i.is),o = e.sel === t.sel;return o && l && r;}function Ne() {throw new Error("The document fragment is not supported on this platform.");}function Ae(e, t) {return e.isElement(t);}function be(e, t) {return e.isDocumentFragment(t);}function De(e, t, n) {var i;const l = {};for (let r = t; r <= n; ++r) {const o = (i = e[r]) === null || i === void 0 ? void 0 : i.key;o !== void 0 && (l[o] = r);}return l;}const Te = ["create", "update", "remove", "destroy", "pre", "post"];function ke(e, t, n) {const i = { create: [], update: [], remove: [], destroy: [], pre: [], post: [] },l = t !== void 0 ? t : H$1;for (const a of Te) for (const f of e) {const c = f[a];c !== void 0 && i[a].push(c);}function r(a) {const f = a.id ? "#" + a.id : "",c = a.getAttribute("class"),s = c ? "." + c.split(" ").join(".") : "";return b(l.tagName(a).toLowerCase() + f + s, {}, [], void 0, a);}function o(a) {return b(void 0, {}, [], void 0, a);}function m(a, f) {return function () {if (--f === 0) {const s = l.parentNode(a);l.removeChild(s, a);}};}function N(a, f) {var c, s, h, g;let u,x = a.data;if (x !== void 0) {const d = (c = x.hook) === null || c === void 0 ? void 0 : c.init;D$2(d) && (d(a), x = a.data);}const p = a.children,y = a.sel;if (y === "!") $$1(a.text) && (a.text = ""), a.elm = l.createComment(a.text);else if (y !== void 0) {const d = y.indexOf("#"),S = y.indexOf(".", d),T = d > 0 ? d : y.length,E = S > 0 ? S : y.length,w = d !== -1 || S !== -1 ? y.slice(0, Math.min(T, E)) : y,L = a.elm = D$2(x) && D$2(u = x.ns) ? l.createElementNS(u, w, x) : l.createElement(w, x);for (T < E && L.setAttribute("id", y.slice(T + 1, E)), S > 0 && L.setAttribute("class", y.slice(E + 1).replace(/\./g, " ")), u = 0; u < i.create.length; ++u) i.create[u](R$2, a);if (B$1(p)) for (u = 0; u < p.length; ++u) {const U = p[u];U != null && l.appendChild(L, N(U, f));} else F$3(a.text) && l.appendChild(L, l.createTextNode(a.text));const O = a.data.hook;D$2(O) && ((s = O.create) === null || s === void 0 || s.call(O, R$2, a), O.insert && f.push(a));} else if (((h = n == null ? void 0 : n.experimental) === null || h === void 0 ? void 0 : h.fragments) && a.children) {const d = a.children;for (a.elm = ((g = l.createDocumentFragment) !== null && g !== void 0 ? g : Ne)(), u = 0; u < i.create.length; ++u) i.create[u](R$2, a);for (u = 0; u < d.length; ++u) {const S = d[u];S != null && l.appendChild(a.elm, N(S, f));}} else a.elm = l.createTextNode(a.text);return a.elm;}function _(a, f, c, s, h, g) {for (; s <= h; ++s) {const u = c[s];u != null && l.insertBefore(a, N(u, g), f);}}function k(a) {var f, c;const s = a.data;if (s !== void 0) {(c = (f = s == null ? void 0 : s.hook) === null || f === void 0 ? void 0 : f.destroy) === null || c === void 0 || c.call(f, a);for (let h = 0; h < i.destroy.length; ++h) i.destroy[h](a);if (a.children !== void 0) for (let h = 0; h < a.children.length; ++h) {const g = a.children[h];g != null && typeof g != "string" && k(g);}}}function A(a, f, c, s) {for (var h, g; c <= s; ++c) {let u, x;const p = f[c];if (p != null) if (D$2(p.sel)) {k(p), u = i.remove.length + 1, x = m(p.elm, u);for (let d = 0; d < i.remove.length; ++d) i.remove[d](p, x);const y = (g = (h = p == null ? void 0 : p.data) === null || h === void 0 ? void 0 : h.hook) === null || g === void 0 ? void 0 : g.remove;D$2(y) ? y(p, x) : x();} else l.removeChild(a, p.elm);}}function v(a, f, c, s) {let h = 0,g = 0,u = f.length - 1,x = f[0],p = f[u],y = c.length - 1,d = c[0],S = c[y],T,E,w,L;for (; h <= u && g <= y;) x == null ? x = f[++h] : p == null ? p = f[--u] : d == null ? d = c[++g] : S == null ? S = c[--y] : M$1(x, d) ? (C(x, d, s), x = f[++h], d = c[++g]) : M$1(p, S) ? (C(p, S, s), p = f[--u], S = c[--y]) : M$1(x, S) ? (C(x, S, s), l.insertBefore(a, x.elm, l.nextSibling(p.elm)), x = f[++h], S = c[--y]) : M$1(p, d) ? (C(p, d, s), l.insertBefore(a, p.elm, x.elm), p = f[--u], d = c[++g]) : (T === void 0 && (T = De(f, h, u)), E = T[d.key], $$1(E) ? l.insertBefore(a, N(d, s), x.elm) : (w = f[E], w.sel !== d.sel ? l.insertBefore(a, N(d, s), x.elm) : (C(w, d, s), f[E] = void 0, l.insertBefore(a, w.elm, x.elm))), d = c[++g]);g <= y && (L = c[y + 1] == null ? null : c[y + 1].elm, _(a, L, c, g, y, s)), h <= u && A(a, f, h, u);}function C(a, f, c) {var s, h, g, u, x;const p = (s = f.data) === null || s === void 0 ? void 0 : s.hook;(h = p == null ? void 0 : p.prepatch) === null || h === void 0 || h.call(p, a, f);const y = f.elm = a.elm,d = a.children,S = f.children;if (a === f) return;if (f.data !== void 0) {for (let T = 0; T < i.update.length; ++T) i.update[T](a, f);(u = (g = f.data.hook) === null || g === void 0 ? void 0 : g.update) === null || u === void 0 || u.call(g, a, f);}$$1(f.text) ? D$2(d) && D$2(S) ? d !== S && v(y, d, S, c) : D$2(S) ? (D$2(a.text) && l.setTextContent(y, ""), _(y, null, S, 0, S.length - 1, c)) : D$2(d) ? A(y, d, 0, d.length - 1) : D$2(a.text) && l.setTextContent(y, "") : a.text !== f.text && (D$2(d) && A(y, d, 0, d.length - 1), l.setTextContent(y, f.text)), (x = p == null ? void 0 : p.postpatch) === null || x === void 0 || x.call(p, a, f);}return function (f, c) {let s, h, g;const u = [];for (s = 0; s < i.pre.length; ++s) i.pre[s]();for (Ae(l, f) ? f = r(f) : be(l, f) && (f = o(f)), M$1(f, c) ? C(f, c, u) : (h = f.elm, g = l.parentNode(h), N(c, u), g !== null && (l.insertBefore(g, c.elm, l.nextSibling(h)), A(g, [f], 0, 0))), s = 0; s < u.length; ++s) u[s].data.hook.insert(u[s]);for (s = 0; s < i.post.length; ++s) i.post[s]();return c;};}function j$2(e, t, n) {if (e.ns = "http://www.w3.org/2000/svg", n !== "foreignObject" && t !== void 0) for (let i = 0; i < t.length; ++i) {const l = t[i];if (typeof l == "string") continue;const r = l.data;r !== void 0 && j$2(r, l.children, l.sel);}}function I$1(e, t, n) {let i = {},l,r,o;if (n !== void 0 ? (t !== null && (i = t), B$1(n) ? l = n : F$3(n) ? r = n.toString() : n && n.sel && (l = [n])) : t != null && (B$1(t) ? l = t : F$3(t) ? r = t.toString() : t && t.sel ? l = [t] : i = t), l !== void 0) for (o = 0; o < l.length; ++o) F$3(l[o]) && (l[o] = b(void 0, void 0, void 0, l[o], void 0));return e[0] === "s" && e[1] === "v" && e[2] === "g" && (e.length === 3 || e[3] === "." || e[3] === "#") && j$2(i, l, e), b(e, i, l, r, void 0);}function P$3(e, t) {var n;const i = (n = t.data) === null || n === void 0 ? void 0 : n.ns;e.data.fn = t.data.fn, e.data.args = t.data.args, t.data = e.data, t.children = e.children, t.text = e.text, t.elm = e.elm, i && j$2(t.data, t.children, t.sel);}function Ee(e) {const t = e.data,n = t.fn(...t.args);P$3(n, e);}function _e(e, t) {let n;const i = e.data,l = t.data,r = i.args,o = l.args;if (i.fn !== l.fn || r.length !== o.length) {P$3(l.fn(...o), t);return;}for (n = 0; n < o.length; ++n) if (r[n] !== o[n]) {P$3(l.fn(...o), t);return;}P$3(e, t);}const we = function (t, n, i, l) {return l === void 0 && (l = i, i = n, n = void 0), I$1(t, { key: n, hook: { init: Ee, prepatch: _e }, fn: i, args: l });};const Oe = "http://www.w3.org/1999/xlink",je = "http://www.w3.org/XML/1998/namespace",z$1 = 58,Ie = 120;function J(e, t) {let n;const i = t.elm;let l = e.data.attrs,r = t.data.attrs;if (!l && !r) return;if (l === r) return;l = l || {}, r = r || {};for (n in r) {const o = r[n],m = l[n];m !== o && (o === !0 ? i.setAttribute(n, "") : o === !1 ? i.removeAttribute(n) : n.charCodeAt(0) !== Ie ? i.setAttribute(n, o) : n.charCodeAt(3) === z$1 ? i.setAttributeNS(je, n, o) : n.charCodeAt(5) === z$1 ? i.setAttributeNS(Oe, n, o) : i.setAttribute(n, o));}for (n in l) n in r || i.removeAttribute(n);}const Pe = { create: J, update: J };function W$1(e, t) {let n, i;const l = t.elm;let r = e.data.class,o = t.data.class;if (!r && !o) return;if (r === o) return;r = r || {}, o = o || {};for (i in r) r[i] && !Object.prototype.hasOwnProperty.call(o, i) && l.classList.remove(i);for (i in o) n = o[i], n !== r[i] && l.classList[n ? "add" : "remove"](i);}const He = { create: W$1, update: W$1 };function V$1(e, t, n) {if (typeof e == "function") e.call(t, n, t);else if (typeof e == "object") for (let i = 0; i < e.length; i++) V$1(e[i], t, n);}function Re(e, t) {const n = e.type,i = t.data.on;i && i[n] && V$1(i[n], t, e);}function Ke() {return function e(t) {Re(t, e.vnode);};}function K$1(e, t) {const n = e.data.on,i = e.listener,l = e.elm,r = t && t.data.on,o = t && t.elm;let m;if (n === r) return;if (n && i) if (r) for (m in n) r[m] || l.removeEventListener(m, i, !1);else for (m in n) l.removeEventListener(m, i, !1);if (r) {const N = t.listener = e.listener || Ke();if (N.vnode = t, n) for (m in r) n[m] || o.addEventListener(m, N, !1);else for (m in r) o.addEventListener(m, N, !1);}}const Xe = { create: K$1, update: K$1, destroy: K$1 };function ee(e, t) {let n, i, l;const r = t.elm;let o = e.data.props,m = t.data.props;if (!o && !m) return;if (o === m) return;o = o || {}, m = m || {};for (n in m) i = m[n], l = o[n], l !== i && (n !== "value" || r[n] !== i) && (r[n] = i);}const qe = { create: ee, update: ee },te = typeof window != "undefined" && window.requestAnimationFrame.bind(window) || setTimeout,Ge = function (e) {te(function () {te(e);});};let X = !1;function Ue(e, t, n) {Ge(function () {e[t] = n;});}function ne(e, t) {let n, i;const l = t.elm;let r = e.data.style,o = t.data.style;if (!r && !o) return;if (r === o) return;r = r || {}, o = o || {};const m = ("delayed" in r);for (i in r) o[i] || (i[0] === "-" && i[1] === "-" ? l.style.removeProperty(i) : l.style[i] = "");for (i in o) if (n = o[i], i === "delayed" && o.delayed) for (const N in o.delayed) n = o.delayed[N], (!m || n !== r.delayed[N]) && Ue(l.style, N, n);else i !== "remove" && n !== r[i] && (i[0] === "-" && i[1] === "-" ? l.style.setProperty(i, n) : l.style[i] = n);}function Ze(e) {let t, n;const i = e.elm,l = e.data.style;if (!l || !(t = l.destroy)) return;for (n in t) i.style[n] = t[n];}function ze(e, t) {const n = e.data.style;if (!n || !n.remove) {t();return;}X || (e.elm.offsetLeft, X = !0);let i;const l = e.elm;let r = 0;const o = n.remove;let m = 0;const N = [];for (i in o) N.push(i), l.style[i] = o[i];const _ = getComputedStyle(l),k = _["transition-property"].split(", ");for (; r < k.length; ++r) N.indexOf(k[r]) !== -1 && m++;l.addEventListener("transitionend", function (A) {A.target === l && --m, m === 0 && t();});}function Je() {X = !1;}const We = { pre: Je, create: ne, update: ne, destroy: Ze, remove: ze };

var t = f$1,o = { class: "className", for: "htmlFor", "http-equiv": "httpEquiv" };function f$1(i) {return function (n, e, u) {for (var r in e) r in o && (e[o[r]] = e[r], delete e[r]);return i(n, e, u);};}

var F$2 = 0,A$1 = 1,v$2 = 2,$ = 3,T$1 = 4,a = 5,N = 6,R$1 = 7,h$2 = 8,L$1 = 9,V = 10,P$2 = 11,_$1 = 12,j$1 = 13,B = function (d, E) {E || (E = {});var b = E.concat || function (p, e) {return String(p) + String(e);};return E.attrToProp !== !1 && (d = t(d)), function (p) {for (var e = A$1, s = "", w = !1, Y = arguments.length, t = [], l = 0; l < p.length; l++) if (l < Y - 1) {var U = arguments[l + 1],r = y(p[l]),m = e;m === V && (m = h$2), m === L$1 && (m = h$2), m === R$1 && (m = h$2), m === T$1 && (m = a), m === v$2 ? s === "/" ? (r.push([v$2, "/", U]), s = "") : r.push([v$2, U]) : m === j$1 && E.comments ? s += String(U) : m !== j$1 && r.push([F$2, m, U]), t.push.apply(t, r);} else t.push.apply(t, y(p[l]));for (var u = [null, {}, []], g = [[u, -1]], l = 0; l < t.length; l++) {var i = g[g.length - 1][0],r = t[l],e = r[0];if (e === v$2 && /^\//.test(r[1])) {var z = g[g.length - 1][1];g.length > 1 && (g.pop(), g[g.length - 1][0][2][z] = d(i[0], i[1], i[2].length ? i[2] : void 0));} else if (e === v$2) {var W = [r[1], {}, []];i[2].push(W), g.push([W, i[2].length - 1]);} else if (e === a || e === F$2 && r[1] === a) {for (var o = "", O; l < t.length; l++) if (t[l][0] === a) o = b(o, t[l][1]);else if (t[l][0] === F$2 && t[l][1] === a) {if (typeof t[l][2] == "object" && !o) for (O in t[l][2]) t[l][2].hasOwnProperty(O) && !i[1][O] && (i[1][O] = t[l][2][O]);else o = b(o, t[l][2]);} else break;t[l][0] === P$2 && l++;for (var Z = l; l < t.length; l++) if (t[l][0] === h$2 || t[l][0] === a) i[1][o] ? t[l][1] === "" || (i[1][o] = b(i[1][o], t[l][1])) : i[1][o] = Q(t[l][1]);else if (t[l][0] === F$2 && (t[l][1] === h$2 || t[l][1] === a)) i[1][o] ? t[l][2] === "" || (i[1][o] = b(i[1][o], t[l][2])) : i[1][o] = Q(t[l][2]);else {o.length && !i[1][o] && l === Z && (t[l][0] === $ || t[l][0] === _$1) && (i[1][o] = o.toLowerCase()), t[l][0] === $ && l--;break;}} else if (e === a) i[1][r[1]] = !0;else if (e === F$2 && r[1] === a) i[1][r[2]] = !0;else if (e === $) {const C = r[1] || K(i[0]);if (C && g.length) {var z = g[g.length - 1][1];g.pop(), g[g.length - 1][0][2][z] = d(i[0], i[1], i[2].length ? i[2] : void 0);}} else if (e === F$2 && r[1] === A$1) r[2] === void 0 || r[2] === null ? r[2] = "" : r[2] || (r[2] = b("", r[2])), Array.isArray(r[2][0]) ? i[2].push.apply(i[2], r[2]) : i[2].push(r[2]);else if (e === A$1) i[2].push(r[1]);else if (!(e === P$2 || e === _$1)) throw new Error("unhandled: " + e);}if (u[2].length > 1 && /^\s*$/.test(u[2][0]) && u[2].shift(), u[2].length > 2 || u[2].length === 2 && /\S/.test(u[2][1])) {if (E.createFragment) return E.createFragment(u[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag");}return Array.isArray(u[2][0]) && typeof u[2][0][0] == "string" && Array.isArray(u[2][0][2]) && (u[2][0] = d(u[2][0][0], u[2][0][1], u[2][0][2])), u[2][0];function y(M) {var n = [],S = !1;e === R$1 && (e = T$1);for (var C = 0; C < M.length; C++) {var f = M.charAt(C);e === A$1 && f === "<" ? (s.length && n.push([A$1, s]), s = "", e = v$2, S = !1) : f === ">" && !D$1(e) && e !== j$1 ? (e === v$2 && s.length ? (n.push([v$2, s]), s === "style" ? S = !0 : s === "/style" && (S = !1)) : e === a ? n.push([a, s]) : e === h$2 && s.length && n.push([h$2, s]), e === A$1 && S ? s += f : (n.push([$, w]), w = !1, s = ""), e = A$1) : e === j$1 && /-$/.test(s) && f === "-" ? (E.comments && n.push([h$2, s.substr(0, s.length - 1)]), s = "", w = !0, e = A$1) : e === v$2 && /^!--$/.test(s) ? (E.comments && n.push([v$2, s], [a, "comment"], [P$2]), s = f, e = j$1) : e === A$1 || e === j$1 ? s += f : e === v$2 && f === "/" && s.length ? w = !0 : e === v$2 && /\s/.test(f) ? (s.length && n.push([v$2, s]), s === "style" ? S = !0 : s === "/style" && (S = !1), s = "", e = T$1) : e === v$2 ? s += f : e === T$1 && /[^\s"'=/]/.test(f) ? (e = a, s = f) : e === T$1 && /\s/.test(f) ? (s.length && n.push([a, s]), n.push([_$1])) : e === a && /\s/.test(f) ? (n.push([a, s]), s = "", e = N) : e === a && f === "=" ? (n.push([a, s], [P$2]), s = "", e = R$1) : e === a && f === "/" ? (w = !0, s = "", e = T$1) : e === a ? s += f : (e === N || e === T$1) && f === "=" ? (n.push([P$2]), e = R$1) : (e === N || e === T$1) && !/\s/.test(f) ? (n.push([_$1]), /[\w-]/.test(f) ? (s += f, e = a) : f === "/" ? w = !0 : e = T$1) : e === R$1 && f === '"' ? e = V : e === R$1 && f === "'" ? e = L$1 : e === V && f === '"' ? (n.push([h$2, s], [_$1]), s = "", e = T$1) : e === L$1 && f === "'" ? (n.push([h$2, s], [_$1]), s = "", e = T$1) : e === R$1 && !/\s/.test(f) ? (e = h$2, C--) : e === h$2 && /\s/.test(f) ? (n.push([h$2, s], [_$1]), s = "", e = T$1) : (e === h$2 || e === L$1 || e === V) && (s += f);}return e === A$1 && s.length ? (n.push([A$1, s]), s = "") : e === h$2 && s.length ? (n.push([h$2, s]), s = "") : e === V && s.length ? (n.push([h$2, s]), s = "") : e === L$1 && s.length ? (n.push([h$2, s]), s = "") : e === a && (n.push([a, s]), s = ""), n;}};function Q(p) {return typeof p == "function" || typeof p == "string" || p && typeof p == "object" || p == null ? p : b("", p);}};function D$1(d) {return d === L$1 || d === V;}var I = RegExp("^(" + ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].join("|") + ")(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$");function K(d) {return I.test(d);}

var v$1 = typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {},_ = function () {if (typeof Map != "undefined") return Map;function e(t, n) {var r = -1;return t.some(function (i, o) {return i[0] === n ? (r = o, !0) : !1;}), r;}return function () {function t() {this.__entries__ = [];}return Object.defineProperty(t.prototype, "size", { get: function () {return this.__entries__.length;}, enumerable: !0, configurable: !0 }), t.prototype.get = function (n) {var r = e(this.__entries__, n),i = this.__entries__[r];return i && i[1];}, t.prototype.set = function (n, r) {var i = e(this.__entries__, n);~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);}, t.prototype.delete = function (n) {var r = this.__entries__,i = e(r, n);~i && r.splice(i, 1);}, t.prototype.has = function (n) {return !!~e(this.__entries__, n);}, t.prototype.clear = function () {this.__entries__.splice(0);}, t.prototype.forEach = function (n, r) {r === void 0 && (r = null);for (var i = 0, o = this.__entries__; i < o.length; i++) {var s = o[i];n.call(r, s[1], s[0]);}}, t;}();}(),l = typeof window != "undefined" && typeof document != "undefined" && window.document === document,f = function () {return typeof v$1 != "undefined" && v$1.Math === Math ? v$1 : typeof self != "undefined" && self.Math === Math ? self : typeof window != "undefined" && window.Math === Math ? window : Function("return this")();}(),E = function () {return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(f) : function (e) {return setTimeout(function () {return e(Date.now());}, 1e3 / 60);};}(),R = 2;function M(e, t) {var n = !1,r = !1,i = 0;function o() {n && (n = !1, e()), r && a();}function s() {E(o);}function a() {var u = Date.now();if (n) {if (u - i < R) return;r = !0;} else n = !0, r = !1, setTimeout(s, t);i = u;}return a;}var x = 20,A = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],z = typeof MutationObserver != "undefined",T = function () {function e() {this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = M(this.refresh.bind(this), x);}return e.prototype.addObserver = function (t) {~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();}, e.prototype.removeObserver = function (t) {var n = this.observers_,r = n.indexOf(t);~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();}, e.prototype.refresh = function () {var t = this.updateObservers_();t && this.refresh();}, e.prototype.updateObservers_ = function () {var t = this.observers_.filter(function (n) {return n.gatherActive(), n.hasActive();});return t.forEach(function (n) {return n.broadcastActive();}), t.length > 0;}, e.prototype.connect_ = function () {if (!l || this.connected_) return;document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), z ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0;}, e.prototype.disconnect_ = function () {if (!l || !this.connected_) return;document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1;}, e.prototype.onTransitionEnd_ = function (t) {var n = t.propertyName,r = n === void 0 ? "" : n,i = A.some(function (o) {return !!~r.indexOf(o);});i && this.refresh();}, e.getInstance = function () {return this.instance_ || (this.instance_ = new e()), this.instance_;}, e.instance_ = null, e;}(),m = function (e, t) {for (var n = 0, r = Object.keys(t); n < r.length; n++) {var i = r[n];Object.defineProperty(e, i, { value: t[i], enumerable: !1, writable: !1, configurable: !0 });}return e;},c = function (e) {var t = e && e.ownerDocument && e.ownerDocument.defaultView;return t || f;},y$1 = d(0, 0, 0, 0);function h$1(e) {return parseFloat(e) || 0;}function w$1(e) {for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];return t.reduce(function (r, i) {var o = e["border-" + i + "-width"];return r + h$1(o);}, 0);}function C(e) {for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {var o = i[r],s = e["padding-" + o];n[o] = h$1(s);}return n;}function S$1(e) {var t = e.getBBox();return d(0, 0, t.width, t.height);}function D(e) {var t = e.clientWidth,n = e.clientHeight;if (!t && !n) return y$1;var r = c(e).getComputedStyle(e),i = C(r),o = i.left + i.right,s = i.top + i.bottom,a = h$1(r.width),u = h$1(r.height);if (r.boxSizing === "border-box" && (Math.round(a + o) !== t && (a -= w$1(r, "left", "right") + o), Math.round(u + s) !== n && (u -= w$1(r, "top", "bottom") + s)), !L(e)) {var p = Math.round(a + o) - t,b = Math.round(u + s) - n;Math.abs(p) !== 1 && (a -= p), Math.abs(b) !== 1 && (u -= b);}return d(i.left, i.top, a, u);}var G = function () {return typeof SVGGraphicsElement != "undefined" ? function (e) {return e instanceof c(e).SVGGraphicsElement;} : function (e) {return e instanceof c(e).SVGElement && typeof e.getBBox == "function";};}();function L(e) {return e === c(e).document.documentElement;}function P$1(e) {return l ? G(e) ? S$1(e) : D(e) : y$1;}function W(e) {var t = e.x,n = e.y,r = e.width,i = e.height,o = typeof DOMRectReadOnly != "undefined" ? DOMRectReadOnly : Object,s = Object.create(o.prototype);return m(s, { x: t, y: n, width: r, height: i, top: n, right: t + r, bottom: i + n, left: t }), s;}function d(e, t, n, r) {return { x: e, y: t, width: n, height: r };}var j = function () {function e(t) {this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = d(0, 0, 0, 0), this.target = t;}return e.prototype.isActive = function () {var t = P$1(this.target);return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;}, e.prototype.broadcastRect = function () {var t = this.contentRect_;return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;}, e;}(),F$1 = function () {function e(t, n) {var r = W(n);m(this, { target: t, contentRect: r });}return e;}(),H = function () {function e(t, n, r) {if (this.activeObservations_ = [], this.observations_ = new _(), typeof t != "function") throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;}return e.prototype.observe = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof c(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var n = this.observations_;if (n.has(t)) return;n.set(t, new j(t)), this.controller_.addObserver(this), this.controller_.refresh();}, e.prototype.unobserve = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof c(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var n = this.observations_;if (!n.has(t)) return;n.delete(t), n.size || this.controller_.removeObserver(this);}, e.prototype.disconnect = function () {this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);}, e.prototype.gatherActive = function () {var t = this;this.clearActive(), this.observations_.forEach(function (n) {n.isActive() && t.activeObservations_.push(n);});}, e.prototype.broadcastActive = function () {if (!this.hasActive()) return;var t = this.callbackCtx_,n = this.activeObservations_.map(function (r) {return new F$1(r.target, r.broadcastRect());});this.callback_.call(t, n, t), this.clearActive();}, e.prototype.clearActive = function () {this.activeObservations_.splice(0);}, e.prototype.hasActive = function () {return this.activeObservations_.length > 0;}, e;}(),g = typeof WeakMap != "undefined" ? new WeakMap() : new _(),O = function () {function e(t) {if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");var n = T.getInstance(),r = new H(t, n, this);g.set(this, r);}return e;}();["observe", "unobserve", "disconnect"].forEach(function (e) {O.prototype[e] = function () {var t;return (t = g.get(this))[e].apply(t, arguments);};});var k = function () {return typeof f.ResizeObserver != "undefined" ? f.ResizeObserver : O;}();

function P(o, e = {}) {const l = e.directive || "@";function m(r, i, s) {if (r === "!--") return I$1("!", i.comment);s && s.length && (s.length === 1 ? s = s[0] : s = [].concat.apply([], s));const p = Object.keys(i);if (!p || !p.length) return I$1(r, s);const f = {};for (let u = 0, M = p.length; M > u; u++) {const a = p[u];if (i[a] === "false" && (i[a] = !1), a.indexOf(l) === 0) {const g = a.slice(1).split(":");let n = f;for (let d = 0, k = g.length, x = k - 1; d < k; d++) {const b = g[d];d === x ? n[b] = i[a] : n[b] ? n = n[b] : n = n[b] = {};}} else f.attrs || (f.attrs = {}), f.attrs[a] = i[a];}return I$1(r, f, s);}const c = ke(o || []),t = B(m, { comments: !0, attrToProp: !1 });return t.update = function (i, s) {return c(i, s);}, t.thunk = we, t;}const y = new k(function (o) {for (const e of o) {const l = JSON.parse(e.target.dataset.breakpoints);let m = 0,c = "";for (const t of Object.keys(l)) {const r = l[t];e.contentRect.width >= r && r > m && (c = t, m = r);}for (const t of Object.keys(l)) t === c ? e.target.classList.contains(t) || e.target.classList.add(t) : e.target.classList.contains(t) && e.target.classList.remove(t);}});function v(o, e) {if (e.elm.dataset && e.elm.dataset.breakpoints) try {JSON.parse(e.elm.dataset.breakpoints), y.observe(e.elm);} catch (l) {} else e.elm instanceof Element && y.unobserve(e.elm);}function S(o) {o.elm instanceof Element && y.unobserve(o.elm);}var w = { create: v, update: v, destroy: S },F = P([Pe, Xe, He, qe, We, w]);

function lerp(a, b, t) {
  return a + (b - a) * t;
}

var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var FUNC_ERROR_TEXT = "Expected a function";
var NAN = 0 / 0;
var symbolTag = "[object Symbol]";
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max,nativeMin = Math.min;
var now = function () {
  return root.Date.now();
};
function debounce(func, wait, options) {
  var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime = 0,leading = false,maxing = false,trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs,thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,timeSinceLastInvoke = time - lastInvokeTime,result2 = wait - timeSinceLastCall;
    return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  function debounced() {
    var time = now(),isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function throttle(func, wait, options) {
  var leading = true,trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing });

}
function isObject(value) {
  var type = typeof value;
  return !!value && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var lodash_throttle = throttle;

const DOT_WIDTH = 4;
const FPS$1 = 60;


function getTimePeriodData$1 (graph) {
    return graph.data.filter((dataPoint) => {
        // if data is outside of the time range skip it
        if (dataPoint.t < graph.timeRange.start)
            return false

        if (dataPoint.t > graph.timeRange.end)
            return false

        return true
    })
}


function getGraphMetrics$1 (model, graph) {
    let leftMargin = 10;
    const rightMargin = 10;
    let bottomMargin = graph.renderTicks ? 20 : 0;

    if (graph.renderValueLabel && graph.selection.type === 'value')
        bottomMargin += 30;

    const graphHeight = graph.height - bottomMargin;
    const graphWidth = model.width - leftMargin - rightMargin;

    return {
        leftMargin, rightMargin, bottomMargin, graphHeight, graphWidth
    }
}


function verticalGridLinesMinor$1 (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return

    const m = getGraphMetrics$1(model, graph);
    const pixelsPerTick = 6;
    const pixelsPerMinorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMinor;
    const { ctx } = graph;

    ctx.lineWidth = 1; //strokeWidth
    ctx.strokeStyle = graph.gridLines.vertical.minorColor;

    ctx.beginPath();

    for (let i=0; i < m.graphWidth; i += pixelsPerMinorLine) {
        const x = m.leftMargin + i + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, m.graphHeight);
    }

    ctx.stroke();
}


function verticalGridLinesMajor$1 (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return

    const m = getGraphMetrics$1(model, graph);

    const pixelsPerTick = 6;
    const pixelsPerMajorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMajor;

    const { ctx } = graph;

    const strokeWidth = 1 / (window.devicePixelRatio || 1);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = graph.gridLines.vertical.majorColor;

    ctx.beginPath();

    for (let i=0; i < m.graphWidth; i += pixelsPerMajorLine) {
        const x = m.leftMargin + i + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, m.graphHeight);
    }

    ctx.stroke();
}


function gridLines$1 (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.horizontal)
        return

    const m = getGraphMetrics$1(model, graph);

    const { ctx } = graph;
    ctx.lineWidth = 0.5; //strokeWidth
    ctx.strokeStyle = graph.gridLines.horizontal.color;

    ctx.beginPath();

    ctx.setLineDash([4, 2]);

    const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1);
    for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
        ctx.moveTo(m.leftMargin + 0.5, y + 0.5);
        ctx.lineTo(m.leftMargin + m.graphWidth + 0.5, y + 0.5);
    }

    ctx.stroke();
    ctx.setLineDash([]);
}


function renderLinePlotGraph$1 (model, graph, dotWidth) {
    const tp = getTimePeriodData$1(graph);
    const m = getGraphMetrics$1(model, graph);

    const { ctx } = graph;
    let lastX, lastY;

    if (graph.linePlotAreaColor) {
        const region = new Path2D();

        for (let i=0; i < tp.length; i++) {
            const point = tp[i];

            const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t);
            const x = Math.round(startX * (m.graphWidth - dotWidth) + m.leftMargin) + 0.5;

            const yLength = graph.yRange.end - graph.yRange.start;
            const y = Math.round((1 - (point.value / yLength)) * (m.graphHeight - dotWidth)) + 0.5;

            if (i === 0)
                region.moveTo(x, m.graphHeight);

            region.lineTo(x, y);
            lastX = x;
        }

        region.lineTo(lastX, m.graphHeight);

        region.closePath();
        ctx.fillStyle = graph.linePlotAreaColor;
        ctx.fill(region);
    }

    ctx.beginPath();
    ctx.strokeStyle = graph.dataColor;
    ctx.lineWidth = 1;

    for (let i=0; i < tp.length; i++) {
        const point = tp[i];

        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t);
        const x = Math.round(startX * (m.graphWidth - dotWidth) + m.leftMargin) + 0.5;

        const yLength = graph.yRange.end - graph.yRange.start;
        const y = Math.round((1 - (point.value / yLength)) * (m.graphHeight - dotWidth)) + 0.5;

        if (i > 0) {
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
        }

        lastX = x;
        lastY = y;
    }

    ctx.stroke();
}


function renderScatterPlotGraph$1 (model, graph, dotWidth) {
    const tp = getTimePeriodData$1(graph);
    const m = getGraphMetrics$1(model, graph);

    const { ctx } = graph;

    ctx.fillStyle = graph.dataColor;

    return tp.map((point) => {
        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t);
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin;

        const yLength = graph.yRange.end - graph.yRange.start;
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth);

        ctx.fillRect(Math.round(x), Math.round(y), dotWidth, dotWidth);
    })
}


function graphComponent$1 (model, graph, update) {

    const dotWidth = 4;
    const m = getGraphMetrics$1(model, graph);

    // TODO: change mouse cursor to ew-resize when hovering over a drag handle

    const _mouseMove = lodash_throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect();
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth); //x position within the element.

        if (graph.selection.dragging === 'time') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);
            graph.selection.time = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos);

        } else if (graph.selection.dragging === 'start') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);

            graph.selection.start = lerp(graph.timeRange.start, graph.timeRange.end, pos);

            // prevent dragging the start control beyond end
            if (graph.selection.start > graph.selection.end)
                graph.selection.start = graph.selection.end;

        } else if (graph.selection.dragging === 'end') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);

            graph.selection.end = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos);

            // prevent dragging the end control beyond start
            if (graph.selection.end < graph.selection.start)
                graph.selection.end = graph.selection.start;
        }

        update();
    }, 1000 / FPS$1);

    const _mouseUp = function (ev) {
        graph.selection.dragging = undefined;
        document.removeEventListener('mouseup', _mouseUp);
        document.removeEventListener('mousemove', _mouseMove);
        update();
    };

    const _mouseDown = function (ev) {

        let draggingType;  // start | end  | time | undefined

        if (graph.selection?.type === 'range' && ev.offsetY <= 21) {
            // check to see if the offsetX is within the bounds of the start or end drag controls
            const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start);
            const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end);

            const x = startX * (m.graphWidth - dotWidth) + m.leftMargin;
            const x2 = endX * (m.graphWidth - dotWidth) + m.leftMargin;

            if (Math.abs(ev.offsetX - x) < 10) {
                draggingType = 'start';
            } else if (Math.abs(ev.offsetX - x2) < 10) {
                draggingType = 'end';
            }
        } else if (graph.selection?.type === 'value') {
            const m = getGraphMetrics$1(model, graph);
            if (ev.offsetY >= m.graphHeight + 10)
                draggingType = 'time';
        }

        graph.selection.dragging = draggingType;

        if (draggingType) {
            document.addEventListener('mousemove', _mouseMove, { passive: true });
            document.addEventListener('mouseup', _mouseUp);
            update();
        }
    };

    const _insertHook = function (vnode) {
        model.elm = vnode.elm;
        graph.ctx = vnode.elm.getContext('2d');
    };

    if (graph.ctx) {
        graph.ctx.clearRect(0, 0, model.elm.width, model.elm.height);
        verticalGridLinesMinor$1(model, graph);
        verticalGridLinesMajor$1(model, graph);
        gridLines$1(model, graph);


        // draw the bottom line of the graph
        graph.ctx.beginPath();
        graph.ctx.strokeStyle = '#888';
        graph.ctx.lineWidth = 1;
        graph.ctx.moveTo(m.leftMargin + 0.5, m.graphHeight - 0.5);
        graph.ctx.lineTo(m.leftMargin + m.graphWidth + 0.5, m.graphHeight - 0.5);
        graph.ctx.stroke();


        if (graph.renderTicks) {
            tickMarksComponent$1(model, graph);
            tickLabelsComponent$1(model, graph);
        }

        graph.ctx.strokeStyle = graph.dataColor;
        if (graph.type === 'scatterPlot')
            renderScatterPlotGraph$1(model, graph, dotWidth);
        else
            renderLinePlotGraph$1(model, graph, dotWidth);
        timeSelectionComponent$1(model, graph);
        renderLabelComponent$1(model, graph);
    }

    if (!graph.key)
        graph.key = 'u' + Math.floor(Math.random() * 9999999);

    return F`<canvas width="${model.width}"
                        height="${graph.height}"
                        @hook:insert=${_insertHook}
                        @key=${graph.key}
                        style="height: ${graph.height}px; width: 100%; padding-top: 10px; background-color: white; image-rendering: pixelated"
                        @style:cursor=${graph.selection.dragging ? 'ew-resize' : 'inherit' }
                        @on:mousedown=${_mouseDown}></canvas>`
}


function renderLabelComponent$1 (model, graph, update) {
    const { ctx } = graph;
    const m = getGraphMetrics$1(model, graph);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

    if (graph.renderValueLabel && graph.selection.type === 'value') {
        ctx.textAlign = 'start';
        const t = (graph.selection.time === Infinity ? graph.timeRange.end : graph.selection.time).toFixed(1);

        ctx.fillText(`t: ${t}s`, 2, m.graphHeight + m.bottomMargin - 8);
    }

    ctx.textAlign = 'end';
    ctx.fillText(graph.label, m.graphWidth + m.leftMargin - DOT_WIDTH, 12);
}


function tickMarksComponent$1 (model, graph, update) {

    const m = getGraphMetrics$1(model, graph);

    const { ctx } = graph;

    const constPixelsPerTick = 6;

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#888';

    ctx.beginPath();

    for (let i=0; i < m.graphWidth; i += constPixelsPerTick) {
        const tickHeight = (i % 60 === 0) ? 8 : 4;
        const x = m.leftMargin + i + 0.5;
        ctx.moveTo(x, m.graphHeight);
        ctx.lineTo(x, m.graphHeight + tickHeight);
    }

    ctx.stroke();
}


function tickLabelsComponent$1 (model, graph, update) {
    const m = getGraphMetrics$1(model, graph);

    const timePeriod = (graph.timeRange.end - graph.timeRange.start);

    const { ctx } = graph;

    const constPixelsPerTick = 6;

    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    //ctx.fillStyle = '#888'
    ctx.strokeStyle = '#888';
    //ctx.strokeWidth = 1

    const tickCount = m.graphWidth / constPixelsPerTick;
    const secondsPerTick = timePeriod / tickCount;
    let lastSecond;

    // every 10 ticks, draw the seconds
    for (let i=0; i < m.graphWidth; i += 60) {
        const tickIdx = i / constPixelsPerTick;
        const seconds = (graph.timeRange.start + tickIdx * secondsPerTick).toFixed(1);
        if (lastSecond !== seconds) {
            lastSecond = seconds;
            ctx.strokeText(seconds, m.leftMargin + i, m.graphHeight + 19);
        }
    }
}


function timeSelectionComponent$1 (model, graph, update) {
    if (graph.selection.type === 'range')
        timeRangeSelectionComponent$1(model, graph);

    if (graph.selection.type === 'value')
        timeValueSelectionComponent$1(model, graph);
}


function timeRangeSelectionComponent$1 (model, graph, update) {
    const m = getGraphMetrics$1(model, graph);
    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start);
    const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end);

    const { ctx } = graph;

    // draw left and right greyed out graph areas (unselected regions)
    ctx.fillStyle = 'rgba(205,205,205, 0.85)';
    ctx.fillRect(m.leftMargin,
                 0,
                 startX * m.graphWidth,
                 m.graphHeight);


    ctx.fillRect(m.leftMargin + (endX * m.graphWidth),
                 0,
                 m.graphWidth - (m.graphWidth*endX),
                 m.graphHeight);

    const downHandlePath = [
        [ -5, -4],
        [  0, -8],
        [ 10,  0],
        [  0,  8]
    ];

    // left drag handle
    renderDragHandle(ctx, m.leftMargin + startX * m.graphWidth, 12, downHandlePath);

    // right drag handle
    renderDragHandle(ctx,m.leftMargin + (endX * m.graphWidth), 12, downHandlePath);

    ctx.strokeStyle = 'rgb(255,64,129)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // left drag line
    ctx.moveTo(m.leftMargin + startX * m.graphWidth - 0.5, 11);
    ctx.lineTo(m.leftMargin + startX * m.graphWidth - 0.5, m.graphHeight+1);

    // right drag line
    ctx.moveTo(m.leftMargin + (endX * m.graphWidth) - 0.5, 11);
    ctx.lineTo(m.leftMargin + (endX * m.graphWidth) - 0.5, m.graphHeight+1);

    ctx.stroke();
}


function renderDragHandle (ctx, startX, startY, path) {
    const region = new Path2D();

    const currentPoint = [ startX, startY ];
    region.moveTo(currentPoint[0], currentPoint[1]);

    for (const p of path) {
        currentPoint[0] += p[0];
        currentPoint[1] += p[1];
        region.lineTo(currentPoint[0], currentPoint[1]);
    }

    region.closePath();
    ctx.fillStyle = 'rgba(255,64,129)';
    ctx.fill(region);
}


function timeValueSelectionComponent$1 (model, graph, update) {
    const m = getGraphMetrics$1(model, graph);

    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.time);

    const x = startX * m.graphWidth + m.leftMargin;
    const y = m.graphHeight;

    const { ctx } = graph;

    const upHandlePath = [
        [  5, 4],
        [  0, 8],
        [-10, 0],
        [  0, -8]
    ];

    renderDragHandle(ctx, x, y-1, upHandlePath);

    ctx.strokeStyle = 'rgb(255,64,129)';
    ctx.lineWidth = 1;
    ctx.beginPath();

    // drag line
    ctx.moveTo(x - 0.5, 0);
    ctx.lineTo(x - 0.5, m.graphHeight);
    ctx.stroke();
}


function timelineComponent$2 (model, update) {
    const _insertHook = function (vnode) {
        model.container = vnode;
    };

    if (model.container)
        model.width = model.container.elm ? model.container.elm.offsetWidth : model.container.offsetWidth;

    return F`
        <div class="graph-stack"
             @hook:insert=${_insertHook}
             style="width: 100%; display: grid; grid-template-columns: 1fr; border: ${model.border || 'none'};">
            ${model.graphs.map((g) => graphComponent$1(model, g, update))}
        </div>`
}

function vnode(sel, data, children, text, elm) {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}

const array = Array.isArray;
function primitive(s) {
  return typeof s === 'string' || typeof s === 'number';
}

function addNS(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';
  if (sel !== 'foreignObject' && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, children[i].children, children[i].sel);
      }
    }
  }
}
function h(sel, b, c) {
  var data = {};
  var children;
  var text;
  var i;
  if (c !== undefined) {
    if (b !== null) {
      data = b;
    }
    if (array(c)) {
      children = c;
    } else
    if (primitive(c)) {
      text = c;
    } else
    if (c && c.sel) {
      children = [c];
    }
  } else
  if (b !== undefined && b !== null) {
    if (array(b)) {
      children = b;
    } else
    if (primitive(b)) {
      text = b;
    } else
    if (b && b.sel) {
      children = [b];
    } else
    {
      data = b;
    }
  }
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (primitive(children[i]))
      children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (
  sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, undefined);
}

const FPS = 60;


function getTimePeriodData (graph) {
    return graph.data.filter((dataPoint) => {
        // if data is outside of the time range skip it
        if (dataPoint.t < graph.timeRange.start)
            return false

        if (dataPoint.t > graph.timeRange.end)
            return false

        return true
    })
}


function getGraphMetrics (model, graph) {
    let leftMargin = 10;
    const rightMargin = 10;
    let bottomMargin = graph.renderTicks ? 20 : 0;

    if (graph.renderValueLabel && graph.selection.type === 'value')
        bottomMargin += 30;

    const graphHeight = graph.height - bottomMargin;
    const graphWidth = model.width - leftMargin - rightMargin;

    return {
        leftMargin, rightMargin, bottomMargin, graphHeight, graphWidth
    }
}


function verticalGridLinesMinor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return F``

    const m = getGraphMetrics(model, graph);

    const gridLines = [ ];
    const pixelsPerTick = 6;
    const pixelsPerMinorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMinor;
    for (let i=0; i < m.graphWidth; i += pixelsPerMinorLine) {
        const x = m.leftMargin + i;
        //gridLines.push(html`<line x1="${x}" x2="${x}" y1="0" y2="${m.graphHeight}"/>`)
        gridLines.push(h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight } }));
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1);
    return F`<g class="grid-minor" style="stroke: ${graph.gridLines.vertical.minorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function verticalGridLinesMajor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return F``

    const m = getGraphMetrics(model, graph);

    const gridLines = [ ];
    const pixelsPerTick = 6;
    const pixelsPerMajorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMajor;
    for (let i=0; i < m.graphWidth; i += pixelsPerMajorLine) {
        const x = m.leftMargin + i;
        //gridLines.push(html`<line x1="${x}" x2="${x}" y1="0" y2="${m.graphHeight}"/>`)
        gridLines.push(h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight } }));
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1);
    return F`<g class="grid-major" style="stroke: ${graph.gridLines.vertical.majorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function gridLines (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.horizontal)
        return F``

    const m = getGraphMetrics(model, graph);

    const gridLines = [ ];
    const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1);
    for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
        gridLines.push(F`<line x1="${m.leftMargin}" x2="${m.leftMargin + m.graphWidth}" y1="${y}" y2="${y}"/>`);
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1);

    return F`<g class="grid-horiz"
                   style="stroke: ${graph.gridLines.horizontal.color}; stroke-width: ${strokeWidth}"
                   stroke-dasharray="4 2">${gridLines}</g>`
}


function renderLinePlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph);
    const m = getGraphMetrics(model, graph);

    const lines = [ ];
    let lastX, lastY;

    let pathString = '';

    for (let i=0; i < tp.length; i++) {
        const point = tp[i];

        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t);
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin;

        const yLength = graph.yRange.end - graph.yRange.start;
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth);

        if (i > 0) {
            lines.push(h('line', { attrs: { x1: lastX, y1: lastY, x2: x, y2: y } }));
            pathString += `L ${x} ${y}`;
        } else {
            pathString = `M ${x} ${m.graphHeight}  L ${x} ${y}`;
        }

        lastX = x;
        lastY = y;
    }

    if (graph.linePlotAreaColor && tp.length) {
        pathString += ` L ${lastX} ${m.graphHeight} Z`;
        lines.unshift(h('path', { attrs: { d: pathString, fill: graph.linePlotAreaColor, stroke: 'transparent' } }));
    }

    return lines
}


function renderScatterPlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph);
    const m = getGraphMetrics(model, graph);

    return tp.map((point) => {
        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t);
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin;

        const yLength = graph.yRange.end - graph.yRange.start;
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth);

        return h('rect', {
            attrs: {
                x,
                y,
                'data-value': point.value,
                width: dotWidth,
                height: dotWidth
            }
        })
    })
}


function graphComponent (model, graph, update) {

    const dotWidth = 4;
    const m = getGraphMetrics(model, graph);

    const _stopDragging = function () {
        graph.selection.dragging = undefined;
        update();
    };

    const _insertHook = function (vnode) {
        model.elm = vnode.elm;
    };

    return F`
        <svg xmlns="http://www.w3.org/2000/svg"
             class="graph"
             aria-labelledby="title"
             role="img"
             viewBox="0 0 ${model.width} ${graph.height}"
             style="height: ${graph.height}px; width: 100%; padding-top: 10px; background-color: white; font-size: 10px; text-anchor: middle; -moz-user-select: none; -webkit-user-select: none; user-select: none; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drag: none;"
             @on:mouseup=${_stopDragging}
             @hook:insert=${_insertHook}>
            <title id="title">${graph.title}</title>

            ${verticalGridLinesMinor(model, graph)}
            ${verticalGridLinesMajor(model, graph)}
            ${gridLines(model, graph)}

            <g style="stroke: #888; stroke-dasharray: 0; stroke-width: 1;">
                <line x1="${m.leftMargin}" x2="${m.leftMargin+m.graphWidth}" y1="${m.graphHeight}" y2="${m.graphHeight}" />
                ${tickMarksComponent(model, graph)}
                ${tickLabelsComponent(model, graph)}
            </g>

            <g class="data"
               style="fill: ${graph.dataColor}; stroke: ${graph.dataColor}; stroke-width: 1;">
               ${graph.type === 'scatterPlot' ? renderScatterPlotGraph(model, graph, dotWidth) : renderLinePlotGraph(model, graph, dotWidth)}
            </g>

            ${timeSelectionComponent(model, graph, update)}

            <text x="${m.graphWidth + m.leftMargin - dotWidth}" y="12" style="fill: rgba(0, 0, 0, 0.7); text-anchor: end; pointer-events: none;">${graph.label}</text>
            ${renderLabelComponent(model, graph)}
        </svg>`
}


function renderLabelComponent (model, graph, update) {
    if (graph.renderValueLabel && graph.selection.type === 'value') {
        const m = getGraphMetrics(model, graph);
        const t = (graph.selection.time === Infinity ? graph.timeRange.end : graph.selection.time).toFixed(1);
        return F`<text x="2" y="${m.graphHeight + m.bottomMargin - 8}" style="fill: rgba(0, 0, 0, 0.7); text-anchor: start; pointer-events: none;">t: ${t}s</text>`
    }

    return F``
}


function tickMarksComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph);

    const tickMarks = [ ];

    const constPixelsPerTick = 6;

    if (graph.renderTicks) {
        for (let i=0; i < m.graphWidth; i += constPixelsPerTick) {
            const tickHeight = (i % 60 === 0) ? 8 : 4;
            const x = m.leftMargin + i;
            tickMarks.push(
                h('line', { attrs: { x1: x, x2: x, y1: m.graphHeight, y2: m.graphHeight + tickHeight } })
            );
        }
    }

    return tickMarks
}


function tickLabelsComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph);

    const timePeriod = (graph.timeRange.end - graph.timeRange.start);

    const tickLabels = [ ];
    const constPixelsPerTick = 6;

    if (graph.renderTicks) {
        const tickCount = m.graphWidth / constPixelsPerTick;
        const secondsPerTick = timePeriod / tickCount;
        let lastSecond;

        // every 10 ticks, draw the seconds
        for (let i=0; i < m.graphWidth; i += 60) {
            const tickIdx = i / constPixelsPerTick;
            const seconds = (graph.timeRange.start + tickIdx * secondsPerTick).toFixed(1);
            if (lastSecond !== seconds) {
                tickLabels.push({ x: m.leftMargin + i, seconds });
                lastSecond = seconds;
            }
        }
    }

    return tickLabels.map((tick) => {
        return F`<text x="${tick.x}" y="${m.graphHeight + 19}">${tick.seconds}</text>`
    })
}


function timeSelectionComponent (model, graph, update) {
    if (graph.selection.type === 'range')
        return timeRangeSelectionComponent(model, graph, update)

    if (graph.selection.type === 'value')
        return timeValueSelectionComponent(model, graph, update)

    return F``
}


function timeRangeSelectionComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph);
    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start);
    const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end);

    const _mouseMove = lodash_throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect();
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth); //x position within the element.

        if (graph.selection.dragging === 'start') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);
            graph.selection.start = lerp(graph.timeRange.start, graph.timeRange.end, pos);

            // prevent dragging the start control beyond end
            if (graph.selection.start > graph.selection.end)
                graph.selection.start = graph.selection.end;

        } else if (graph.selection.dragging === 'end') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);
            graph.selection.end = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos);

            // prevent dragging the end control beyond start
            if (graph.selection.end < graph.selection.start)
                graph.selection.end = graph.selection.start;
        }

        update();
    }, 1000 / FPS);

    const _mouseUp = function () {
        graph.selection.dragging = undefined;
        document.removeEventListener('mouseup', _mouseUp);
        document.removeEventListener('mousemove', _mouseMove);
        update();
    };

    // @param String position  start | end
    const _mouseDown = function (position) {
        graph.selection.dragging = position;
        document.addEventListener('mousemove', _mouseMove, { passive: true });
        document.addEventListener('mouseup', _mouseUp);
        update();
    };

    return F`
        <g class="time-selection">

            <rect x="${m.leftMargin}" y="0" width="${startX * m.graphWidth}" height="${m.graphHeight}"
                    @on:mousedown=${()=> _mouseDown('start')}
                    style="fill: rgba(205,205,205, 0.85);"/>

            <path d="M ${m.leftMargin + startX * m.graphWidth} 12 l -5 -4 l 0 -8    l 10 0  l 0 8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  @on:mousedown=${()=> _mouseDown('start')}/>

            <line x1="${m.leftMargin + startX * m.graphWidth}"
                  x2="${m.leftMargin + startX * m.graphWidth}"
                  y1="11"
                  y2="${m.graphHeight+1}" stroke="rgb(255,64,129)"/>


            <rect x="${m.leftMargin + (endX * m.graphWidth)}" y="0" width="${m.graphWidth - (m.graphWidth*endX)}" height="${m.graphHeight}"
                    @on:mousedown=${()=> _mouseDown('end')}
                    style="fill: rgba(205,205,205, 0.85);"/>

            <path d="M ${m.leftMargin + (endX * m.graphWidth)} 12 l -5 -4 l 0 -8    l 10 0  l 0 8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  @on:mousedown=${()=> _mouseDown('end')}/>

            <line x1="${m.leftMargin + (endX * m.graphWidth)}"
                  x2="${m.leftMargin + (endX * m.graphWidth)}"
                  y1="11"
                  y2="${m.graphHeight+1}" stroke="rgb(255,64,129)"/>
        </g>`
}


function timeValueSelectionComponent (model, graph, update) {

    const _mouseMove = lodash_throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect();
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth); //x position within the element.

        const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1);
        graph.selection.time = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos);
        update();
    }, 1000 / 60);

    const _mouseUp = function () {
        graph.selection.dragging = undefined;
        document.removeEventListener('mouseup', _mouseUp);
        document.removeEventListener('mousemove', _mouseMove);
        update();
    };

    const _mouseDown = function (position) {
        graph.selection.dragging = true;
        document.addEventListener('mousemove', _mouseMove, { passive: true });
        document.addEventListener('mouseup', _mouseUp);
        update();
    };

    const m = getGraphMetrics(model, graph);

    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.time);

    const x = startX * m.graphWidth + m.leftMargin;
    const y = m.graphHeight;

    return F`
        <g class="time-selection" @on:mousedown=${_mouseDown}>
            <line x1="${x}"
                  x2="${x}"
                  y1="0"
                  y2="${m.graphHeight}" stroke="deeppink"/>

            <path d="M ${x} ${y-1} l 5 4 l 0 8    l -10 0  l 0 -8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  />
        </g>`
}


function timelineComponent$1 (model, update) {
    const _insertHook = function (vnode) {
        model.container = vnode;
    };

    if (model.container)
        model.width = model.container.elm ? model.container.elm.offsetWidth : model.container.offsetWidth;

    return F`
        <div class="graph-stack"
             @hook:insert=${_insertHook}
             style="width: 100%; display: grid; grid-template-columns: 1fr; border: ${model.border || 'none'};">
            ${model.graphs.map((g) => graphComponent(model, g, update))}
        </div>`
}

function timelineComponent (model, update) {
    return (model.renderer === 'canvas') ? timelineComponent$2(model, update) : timelineComponent$1(model, update)
}

export { timelineComponent as default };

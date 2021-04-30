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

function ft(t, e) {return document.createElement(t, e);}function ct(t, e, n) {return document.createElementNS(t, e, n);}function ut(t) {return document.createTextNode(t);}function dt(t) {return document.createComment(t);}function mt(t, e, n) {t.insertBefore(e, n);}function pt(t, e) {t.removeChild(e);}function ht(t, e) {t.appendChild(e);}function yt(t) {return t.parentNode;}function gt(t) {return t.nextSibling;}function xt(t) {return t.tagName;}function Nt(t, e) {t.textContent = e;}function St(t) {return t.textContent;}function wt(t) {return t.nodeType === 1;}function bt(t) {return t.nodeType === 3;}function Ct(t) {return t.nodeType === 8;}const H$1 = { createElement: ft, createElementNS: ct, createTextNode: ut, createComment: dt, insertBefore: mt, removeChild: pt, appendChild: ht, parentNode: yt, nextSibling: gt, tagName: xt, setTextContent: Nt, getTextContent: St, isElement: wt, isText: bt, isComment: Ct };function E$1(t, e, n, i, l) {const r = e === void 0 ? void 0 : e.key;return { sel: t, data: e, children: n, text: i, elm: l, key: r };}const F$2 = Array.isArray;function B$1(t) {return typeof t == "string" || typeof t == "number";}function K$1(t) {return t === void 0;}function k$1(t) {return t !== void 0;}const J = E$1("", {}, [], void 0, void 0);function M$1(t, e) {var n, i;const l = t.key === e.key,r = ((n = t.data) === null || n === void 0 ? void 0 : n.is) === ((i = e.data) === null || i === void 0 ? void 0 : i.is),a = t.sel === e.sel;return a && l && r;}function kt(t) {return t.sel !== void 0;}function Tt(t, e, n) {var i;const l = {};for (let r = e; r <= n; ++r) {const a = (i = t[r]) === null || i === void 0 ? void 0 : i.key;a !== void 0 && (l[a] = r);}return l;}const R$2 = ["create", "update", "remove", "destroy", "pre", "post"];function At(t, e) {let n, i;const l = { create: [], update: [], remove: [], destroy: [], pre: [], post: [] },r = e !== void 0 ? e : H$1;for (n = 0; n < R$2.length; ++n) for (l[R$2[n]] = [], i = 0; i < t.length; ++i) {const o = t[i][R$2[n]];o !== void 0 && l[R$2[n]].push(o);}function a(o) {const s = o.id ? "#" + o.id : "",d = o.className ? "." + o.className.split(" ").join(".") : "";return E$1(r.tagName(o).toLowerCase() + s + d, {}, [], void 0, o);}function m(o, s) {return function () {if (--s === 0) {const f = r.parentNode(o);r.removeChild(f, o);}};}function x(o, s) {var d, f;let c,u = o.data;if (u !== void 0) {const p = (d = u.hook) === null || d === void 0 ? void 0 : d.init;k$1(p) && (p(o), u = o.data);}const g = o.children,h = o.sel;if (h === "!") K$1(o.text) && (o.text = ""), o.elm = r.createComment(o.text);else if (h !== void 0) {const p = h.indexOf("#"),N = h.indexOf(".", p),y = p > 0 ? p : h.length,b = N > 0 ? N : h.length,$ = p !== -1 || N !== -1 ? h.slice(0, Math.min(y, b)) : h,D = o.elm = k$1(u) && k$1(c = u.ns) ? r.createElementNS(c, $, u) : r.createElement($, u);for (y < b && D.setAttribute("id", h.slice(y + 1, b)), N > 0 && D.setAttribute("class", h.slice(b + 1).replace(/\./g, " ")), c = 0; c < l.create.length; ++c) l.create[c](J, o);if (F$2(g)) for (c = 0; c < g.length; ++c) {const O = g[c];O != null && r.appendChild(D, x(O, s));} else B$1(o.text) && r.appendChild(D, r.createTextNode(o.text));const L = o.data.hook;k$1(L) && ((f = L.create) === null || f === void 0 || f.call(L, J, o), L.insert && s.push(o));} else o.elm = r.createTextNode(o.text);return o.elm;}function T(o, s, d, f, c, u) {for (; f <= c; ++f) {const g = d[f];g != null && r.insertBefore(o, x(g, u), s);}}function C(o) {var s, d;const f = o.data;if (f !== void 0) {(d = (s = f == null ? void 0 : f.hook) === null || s === void 0 ? void 0 : s.destroy) === null || d === void 0 || d.call(s, o);for (let c = 0; c < l.destroy.length; ++c) l.destroy[c](o);if (o.children !== void 0) for (let c = 0; c < o.children.length; ++c) {const u = o.children[c];u != null && typeof u != "string" && C(u);}}}function w(o, s, d, f) {for (var c, u; d <= f; ++d) {let g, h;const p = s[d];if (p != null) if (k$1(p.sel)) {C(p), g = l.remove.length + 1, h = m(p.elm, g);for (let y = 0; y < l.remove.length; ++y) l.remove[y](p, h);const N = (u = (c = p == null ? void 0 : p.data) === null || c === void 0 ? void 0 : c.hook) === null || u === void 0 ? void 0 : u.remove;k$1(N) ? N(p, h) : h();} else r.removeChild(o, p.elm);}}function A(o, s, d, f) {let c = 0,u = 0,g = s.length - 1,h = s[0],p = s[g],N = d.length - 1,y = d[0],b = d[N],$,D,L,O;for (; c <= g && u <= N;) h == null ? h = s[++c] : p == null ? p = s[--g] : y == null ? y = d[++u] : b == null ? b = d[--N] : M$1(h, y) ? (S(h, y, f), h = s[++c], y = d[++u]) : M$1(p, b) ? (S(p, b, f), p = s[--g], b = d[--N]) : M$1(h, b) ? (S(h, b, f), r.insertBefore(o, h.elm, r.nextSibling(p.elm)), h = s[++c], b = d[--N]) : M$1(p, y) ? (S(p, y, f), r.insertBefore(o, p.elm, h.elm), p = s[--g], y = d[++u]) : ($ === void 0 && ($ = Tt(s, c, g)), D = $[y.key], K$1(D) ? r.insertBefore(o, x(y, f), h.elm) : (L = s[D], L.sel !== y.sel ? r.insertBefore(o, x(y, f), h.elm) : (S(L, y, f), s[D] = void 0, r.insertBefore(o, L.elm, h.elm))), y = d[++u]);(c <= g || u <= N) && (c > g ? (O = d[N + 1] == null ? null : d[N + 1].elm, T(o, O, d, u, N, f)) : w(o, s, c, g));}function S(o, s, d) {var f, c, u, g, h;const p = (f = s.data) === null || f === void 0 ? void 0 : f.hook;(c = p == null ? void 0 : p.prepatch) === null || c === void 0 || c.call(p, o, s);const N = s.elm = o.elm,y = o.children,b = s.children;if (o === s) return;if (s.data !== void 0) {for (let $ = 0; $ < l.update.length; ++$) l.update[$](o, s);(g = (u = s.data.hook) === null || u === void 0 ? void 0 : u.update) === null || g === void 0 || g.call(u, o, s);}K$1(s.text) ? k$1(y) && k$1(b) ? y !== b && A(N, y, b, d) : k$1(b) ? (k$1(o.text) && r.setTextContent(N, ""), T(N, null, b, 0, b.length - 1, d)) : k$1(y) ? w(N, y, 0, y.length - 1) : k$1(o.text) && r.setTextContent(N, "") : o.text !== s.text && (k$1(y) && w(N, y, 0, y.length - 1), r.setTextContent(N, s.text)), (h = p == null ? void 0 : p.postpatch) === null || h === void 0 || h.call(p, o, s);}return function (s, d) {let f, c, u;const g = [];for (f = 0; f < l.pre.length; ++f) l.pre[f]();for (kt(s) || (s = a(s)), M$1(s, d) ? S(s, d, g) : (c = s.elm, u = r.parentNode(c), x(d, g), u !== null && (r.insertBefore(u, d.elm, r.nextSibling(c)), w(u, [s], 0, 0))), f = 0; f < g.length; ++f) g[f].data.hook.insert(g[f]);for (f = 0; f < l.post.length; ++f) l.post[f]();return d;};}function G$1(t, e, n) {if (t.ns = "http://www.w3.org/2000/svg", n !== "foreignObject" && e !== void 0) for (let i = 0; i < e.length; ++i) {const l = e[i].data;l !== void 0 && G$1(l, e[i].children, e[i].sel);}}function I$1(t, e, n) {let i = {},l,r,a;if (n !== void 0 ? (e !== null && (i = e), F$2(n) ? l = n : B$1(n) ? r = n : n && n.sel && (l = [n])) : e != null && (F$2(e) ? l = e : B$1(e) ? r = e : e && e.sel ? l = [e] : i = e), l !== void 0) for (a = 0; a < l.length; ++a) B$1(l[a]) && (l[a] = E$1(void 0, void 0, void 0, l[a], void 0));return t[0] === "s" && t[1] === "v" && t[2] === "g" && (t.length === 3 || t[3] === "." || t[3] === "#") && G$1(i, l, t), E$1(t, i, l, r, void 0);}function P$2(t, e) {t.data.fn = e.data.fn, t.data.args = e.data.args, e.data = t.data, e.children = t.children, e.text = t.text, e.elm = t.elm;}function $t(t) {const e = t.data,n = e.fn(...e.args);P$2(n, t);}function Et(t, e) {let n;const i = t.data,l = e.data,r = i.args,a = l.args;if (i.fn !== l.fn || r.length !== a.length) {P$2(l.fn(...a), e);return;}for (n = 0; n < a.length; ++n) if (r[n] !== a[n]) {P$2(l.fn(...a), e);return;}P$2(t, e);}const Dt = function (e, n, i, l) {return l === void 0 && (l = i, i = n, n = void 0), I$1(e, { key: n, hook: { init: $t, prepatch: Et }, fn: i, args: l });};const jt = "http://www.w3.org/1999/xlink",Ft = "http://www.w3.org/XML/1998/namespace",Y = 58,Rt = 120;function Z(t, e) {let n;const i = e.elm;let l = t.data.attrs,r = e.data.attrs;if (!l && !r) return;if (l === r) return;l = l || {}, r = r || {};for (n in r) {const a = r[n],m = l[n];m !== a && (a === !0 ? i.setAttribute(n, "") : a === !1 ? i.removeAttribute(n) : n.charCodeAt(0) !== Rt ? i.setAttribute(n, a) : n.charCodeAt(3) === Y ? i.setAttributeNS(Ft, n, a) : n.charCodeAt(5) === Y ? i.setAttributeNS(jt, n, a) : i.setAttribute(n, a));}for (n in l) n in r || i.removeAttribute(n);}const It = { create: Z, update: Z };function W$2(t, e) {let n, i;const l = e.elm;let r = t.data.class,a = e.data.class;if (!r && !a) return;if (r === a) return;r = r || {}, a = a || {};for (i in r) r[i] && !Object.prototype.hasOwnProperty.call(a, i) && l.classList.remove(i);for (i in a) n = a[i], n !== r[i] && l.classList[n ? "add" : "remove"](i);}const Pt = { create: W$2, update: W$2 };function tt(t, e, n) {if (typeof t == "function") t.call(e, n, e);else if (typeof t == "object") for (let i = 0; i < t.length; i++) tt(t[i], e, n);}function Ht(t, e) {const n = t.type,i = e.data.on;i && i[n] && tt(i[n], e, t);}function Kt() {return function t(e) {Ht(e, t.vnode);};}function X$1(t, e) {const n = t.data.on,i = t.listener,l = t.elm,r = e && e.data.on,a = e && e.elm;let m;if (n === r) return;if (n && i) if (r) for (m in n) r[m] || l.removeEventListener(m, i, !1);else for (m in n) l.removeEventListener(m, i, !1);if (r) {const x = e.listener = t.listener || Kt();if (x.vnode = e, n) for (m in r) n[m] || a.addEventListener(m, x, !1);else for (m in r) a.addEventListener(m, x, !1);}}const Xt = { create: X$1, update: X$1, destroy: X$1 };function lt(t, e) {let n, i, l;const r = e.elm;let a = t.data.props,m = e.data.props;if (!a && !m) return;if (a === m) return;a = a || {}, m = m || {};for (n in m) i = m[n], l = a[n], l !== i && (n !== "value" || r[n] !== i) && (r[n] = i);}const Qt = { create: lt, update: lt },ot = typeof window != "undefined" && window.requestAnimationFrame.bind(window) || setTimeout,Vt = function (t) {ot(function () {ot(t);});};let q = !1;function te(t, e, n) {Vt(function () {t[e] = n;});}function at(t, e) {let n, i;const l = e.elm;let r = t.data.style,a = e.data.style;if (!r && !a) return;if (r === a) return;r = r || {}, a = a || {};const m = ("delayed" in r);for (i in r) a[i] || (i[0] === "-" && i[1] === "-" ? l.style.removeProperty(i) : l.style[i] = "");for (i in a) if (n = a[i], i === "delayed" && a.delayed) for (const x in a.delayed) n = a.delayed[x], (!m || n !== r.delayed[x]) && te(l.style, x, n);else i !== "remove" && n !== r[i] && (i[0] === "-" && i[1] === "-" ? l.style.setProperty(i, n) : l.style[i] = n);}function ee(t) {let e, n;const i = t.elm,l = t.data.style;if (!l || !(e = l.destroy)) return;for (n in e) i.style[n] = e[n];}function ne(t, e) {const n = t.data.style;if (!n || !n.remove) {e();return;}q || (t.elm.offsetLeft, q = !0);let i;const l = t.elm;let r = 0;const a = n.remove;let m = 0;const x = [];for (i in a) x.push(i), l.style[i] = a[i];const T = getComputedStyle(l),C = T["transition-property"].split(", ");for (; r < C.length; ++r) x.indexOf(C[r]) !== -1 && m++;l.addEventListener("transitionend", function (w) {w.target === l && --m, m === 0 && e();});}function ie() {q = !1;}const re = { pre: ie, create: at, update: at, destroy: ee, remove: ne };

var t = f$1,o = { class: "className", for: "htmlFor", "http-equiv": "httpEquiv" };function f$1(i) {return function (n, e, u) {for (var r in e) r in o && (e[o[r]] = e[r], delete e[r]);return i(n, e, u);};}

var S$1 = 0,d$1 = 1,v$2 = 2,U = 3,A$1 = 4,h$2 = 5,z$1 = 6,R$1 = 7,a = 8,C$1 = 9,F$1 = 10,j$1 = 11,_$1 = 12,L$1 = 13,B = function (T, E) {E || (E = {});var b = E.concat || function (p, e) {return String(p) + String(e);};return E.attrToProp !== !1 && (T = t(T)), function (p) {for (var e = d$1, s = "", w = !1, Y = arguments.length, t = [], i = 0; i < p.length; i++) if (i < Y - 1) {var O = arguments[i + 1],r = W(p[i]),m = e;m === F$1 && (m = a), m === C$1 && (m = a), m === R$1 && (m = a), m === A$1 && (m = h$2), m === v$2 ? s === "/" ? (r.push([v$2, "/", O]), s = "") : r.push([v$2, O]) : m === L$1 && E.comments ? s += String(O) : m !== L$1 && r.push([S$1, m, O]), t.push.apply(t, r);} else t.push.apply(t, W(p[i]));for (var u = [null, {}, []], g = [[u, -1]], i = 0; i < t.length; i++) {var l = g[g.length - 1][0],r = t[i],e = r[0];if (e === v$2 && /^\//.test(r[1])) {var $ = g[g.length - 1][1];g.length > 1 && (g.pop(), g[g.length - 1][0][2][$] = T(l[0], l[1], l[2].length ? l[2] : void 0));} else if (e === v$2) {var Q = [r[1], {}, []];l[2].push(Q), g.push([Q, l[2].length - 1]);} else if (e === h$2 || e === S$1 && r[1] === h$2) {for (var o = "", V; i < t.length; i++) if (t[i][0] === h$2) o = b(o, t[i][1]);else if (t[i][0] === S$1 && t[i][1] === h$2) {if (typeof t[i][2] == "object" && !o) for (V in t[i][2]) t[i][2].hasOwnProperty(V) && !l[1][V] && (l[1][V] = t[i][2][V]);else o = b(o, t[i][2]);} else break;t[i][0] === j$1 && i++;for (var Z = i; i < t.length; i++) if (t[i][0] === a || t[i][0] === h$2) l[1][o] ? t[i][1] === "" || (l[1][o] = b(l[1][o], t[i][1])) : l[1][o] = N(t[i][1]);else if (t[i][0] === S$1 && (t[i][1] === a || t[i][1] === h$2)) l[1][o] ? t[i][2] === "" || (l[1][o] = b(l[1][o], t[i][2])) : l[1][o] = N(t[i][2]);else {o.length && !l[1][o] && i === Z && (t[i][0] === U || t[i][0] === _$1) && (l[1][o] = o.toLowerCase()), t[i][0] === U && i--;break;}} else if (e === h$2) l[1][r[1]] = !0;else if (e === S$1 && r[1] === h$2) l[1][r[2]] = !0;else if (e === U) {const f = r[1] || X(l[0]);if (f && g.length) {var $ = g[g.length - 1][1];g.pop(), g[g.length - 1][0][2][$] = T(l[0], l[1], l[2].length ? l[2] : void 0);}} else if (e === S$1 && r[1] === d$1) r[2] === void 0 || r[2] === null ? r[2] = "" : r[2] || (r[2] = b("", r[2])), Array.isArray(r[2][0]) ? l[2].push.apply(l[2], r[2]) : l[2].push(r[2]);else if (e === d$1) l[2].push(r[1]);else if (!(e === j$1 || e === _$1)) throw new Error("unhandled: " + e);}if (u[2].length > 1 && /^\s*$/.test(u[2][0]) && u[2].shift(), u[2].length > 2 || u[2].length === 2 && /\S/.test(u[2][1])) {if (E.createFragment) return E.createFragment(u[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag");}return Array.isArray(u[2][0]) && typeof u[2][0][0] == "string" && Array.isArray(u[2][0][2]) && (u[2][0] = T(u[2][0][0], u[2][0][1], u[2][0][2])), u[2][0];function W(M) {var n = [];e === R$1 && (e = A$1);for (var P = 0; P < M.length; P++) {var f = M.charAt(P);e === d$1 && f === "<" ? (s.length && n.push([d$1, s]), s = "", e = v$2) : f === ">" && !D$1(e) && e !== L$1 ? (e === v$2 && s.length ? n.push([v$2, s]) : e === h$2 ? n.push([h$2, s]) : e === a && s.length && n.push([a, s]), n.push([U, w]), w = !1, s = "", e = d$1) : e === L$1 && /-$/.test(s) && f === "-" ? (E.comments && n.push([a, s.substr(0, s.length - 1)]), s = "", w = !0, e = d$1) : e === v$2 && /^!--$/.test(s) ? (E.comments && n.push([v$2, s], [h$2, "comment"], [j$1]), s = f, e = L$1) : e === d$1 || e === L$1 ? s += f : e === v$2 && f === "/" && s.length ? w = !0 : e === v$2 && /\s/.test(f) ? (s.length && n.push([v$2, s]), s = "", e = A$1) : e === v$2 ? s += f : e === A$1 && /[^\s"'=/]/.test(f) ? (e = h$2, s = f) : e === A$1 && /\s/.test(f) ? (s.length && n.push([h$2, s]), n.push([_$1])) : e === h$2 && /\s/.test(f) ? (n.push([h$2, s]), s = "", e = z$1) : e === h$2 && f === "=" ? (n.push([h$2, s], [j$1]), s = "", e = R$1) : e === h$2 && f === "/" ? (w = !0, s = "", e = A$1) : e === h$2 ? s += f : (e === z$1 || e === A$1) && f === "=" ? (n.push([j$1]), e = R$1) : (e === z$1 || e === A$1) && !/\s/.test(f) ? (n.push([_$1]), /[\w-]/.test(f) ? (s += f, e = h$2) : f === "/" ? w = !0 : e = A$1) : e === R$1 && f === '"' ? e = F$1 : e === R$1 && f === "'" ? e = C$1 : e === F$1 && f === '"' ? (n.push([a, s], [_$1]), s = "", e = A$1) : e === C$1 && f === "'" ? (n.push([a, s], [_$1]), s = "", e = A$1) : e === R$1 && !/\s/.test(f) ? (e = a, P--) : e === a && /\s/.test(f) ? (n.push([a, s], [_$1]), s = "", e = A$1) : (e === a || e === C$1 || e === F$1) && (s += f);}return e === d$1 && s.length ? (n.push([d$1, s]), s = "") : e === a && s.length ? (n.push([a, s]), s = "") : e === F$1 && s.length ? (n.push([a, s]), s = "") : e === C$1 && s.length ? (n.push([a, s]), s = "") : e === h$2 && (n.push([h$2, s]), s = ""), n;}};function N(p) {return typeof p == "function" || typeof p == "string" || p && typeof p == "object" || p == null ? p : b("", p);}};function D$1(T) {return T === C$1 || T === F$1;}var K = RegExp("^(" + ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].join("|") + ")(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$");function X(T) {return K.test(T);}

var v$1 = typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {},_ = function () {if (typeof Map != "undefined") return Map;function e(t, n) {var r = -1;return t.some(function (i, o) {return i[0] === n ? (r = o, !0) : !1;}), r;}return function () {function t() {this.__entries__ = [];}return Object.defineProperty(t.prototype, "size", { get: function () {return this.__entries__.length;}, enumerable: !0, configurable: !0 }), t.prototype.get = function (n) {var r = e(this.__entries__, n),i = this.__entries__[r];return i && i[1];}, t.prototype.set = function (n, r) {var i = e(this.__entries__, n);~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);}, t.prototype.delete = function (n) {var r = this.__entries__,i = e(r, n);~i && r.splice(i, 1);}, t.prototype.has = function (n) {return !!~e(this.__entries__, n);}, t.prototype.clear = function () {this.__entries__.splice(0);}, t.prototype.forEach = function (n, r) {r === void 0 && (r = null);for (var i = 0, o = this.__entries__; i < o.length; i++) {var s = o[i];n.call(r, s[1], s[0]);}}, t;}();}(),l = typeof window != "undefined" && typeof document != "undefined" && window.document === document,f = function () {return typeof v$1 != "undefined" && v$1.Math === Math ? v$1 : typeof self != "undefined" && self.Math === Math ? self : typeof window != "undefined" && window.Math === Math ? window : Function("return this")();}(),E = function () {return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(f) : function (e) {return setTimeout(function () {return e(Date.now());}, 1e3 / 60);};}(),R = 2;function M(e, t) {var n = !1,r = !1,i = 0;function o() {n && (n = !1, e()), r && a();}function s() {E(o);}function a() {var u = Date.now();if (n) {if (u - i < R) return;r = !0;} else n = !0, r = !1, setTimeout(s, t);i = u;}return a;}var x = 20,A = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],z = typeof MutationObserver != "undefined",T = function () {function e() {this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = M(this.refresh.bind(this), x);}return e.prototype.addObserver = function (t) {~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();}, e.prototype.removeObserver = function (t) {var n = this.observers_,r = n.indexOf(t);~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();}, e.prototype.refresh = function () {var t = this.updateObservers_();t && this.refresh();}, e.prototype.updateObservers_ = function () {var t = this.observers_.filter(function (n) {return n.gatherActive(), n.hasActive();});return t.forEach(function (n) {return n.broadcastActive();}), t.length > 0;}, e.prototype.connect_ = function () {if (!l || this.connected_) return;document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), z ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0;}, e.prototype.disconnect_ = function () {if (!l || !this.connected_) return;document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1;}, e.prototype.onTransitionEnd_ = function (t) {var n = t.propertyName,r = n === void 0 ? "" : n,i = A.some(function (o) {return !!~r.indexOf(o);});i && this.refresh();}, e.getInstance = function () {return this.instance_ || (this.instance_ = new e()), this.instance_;}, e.instance_ = null, e;}(),m = function (e, t) {for (var n = 0, r = Object.keys(t); n < r.length; n++) {var i = r[n];Object.defineProperty(e, i, { value: t[i], enumerable: !1, writable: !1, configurable: !0 });}return e;},c = function (e) {var t = e && e.ownerDocument && e.ownerDocument.defaultView;return t || f;},y$1 = d(0, 0, 0, 0);function h$1(e) {return parseFloat(e) || 0;}function w(e) {for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];return t.reduce(function (r, i) {var o = e["border-" + i + "-width"];return r + h$1(o);}, 0);}function C(e) {for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {var o = i[r],s = e["padding-" + o];n[o] = h$1(s);}return n;}function S(e) {var t = e.getBBox();return d(0, 0, t.width, t.height);}function D(e) {var t = e.clientWidth,n = e.clientHeight;if (!t && !n) return y$1;var r = c(e).getComputedStyle(e),i = C(r),o = i.left + i.right,s = i.top + i.bottom,a = h$1(r.width),u = h$1(r.height);if (r.boxSizing === "border-box" && (Math.round(a + o) !== t && (a -= w(r, "left", "right") + o), Math.round(u + s) !== n && (u -= w(r, "top", "bottom") + s)), !L(e)) {var p = Math.round(a + o) - t,b = Math.round(u + s) - n;Math.abs(p) !== 1 && (a -= p), Math.abs(b) !== 1 && (u -= b);}return d(i.left, i.top, a, u);}var G = function () {return typeof SVGGraphicsElement != "undefined" ? function (e) {return e instanceof c(e).SVGGraphicsElement;} : function (e) {return e instanceof c(e).SVGElement && typeof e.getBBox == "function";};}();function L(e) {return e === c(e).document.documentElement;}function P$1(e) {return l ? G(e) ? S(e) : D(e) : y$1;}function W$1(e) {var t = e.x,n = e.y,r = e.width,i = e.height,o = typeof DOMRectReadOnly != "undefined" ? DOMRectReadOnly : Object,s = Object.create(o.prototype);return m(s, { x: t, y: n, width: r, height: i, top: n, right: t + r, bottom: i + n, left: t }), s;}function d(e, t, n, r) {return { x: e, y: t, width: n, height: r };}var j = function () {function e(t) {this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = d(0, 0, 0, 0), this.target = t;}return e.prototype.isActive = function () {var t = P$1(this.target);return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;}, e.prototype.broadcastRect = function () {var t = this.contentRect_;return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;}, e;}(),F = function () {function e(t, n) {var r = W$1(n);m(this, { target: t, contentRect: r });}return e;}(),H = function () {function e(t, n, r) {if (this.activeObservations_ = [], this.observations_ = new _(), typeof t != "function") throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;}return e.prototype.observe = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof c(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var n = this.observations_;if (n.has(t)) return;n.set(t, new j(t)), this.controller_.addObserver(this), this.controller_.refresh();}, e.prototype.unobserve = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof c(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var n = this.observations_;if (!n.has(t)) return;n.delete(t), n.size || this.controller_.removeObserver(this);}, e.prototype.disconnect = function () {this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);}, e.prototype.gatherActive = function () {var t = this;this.clearActive(), this.observations_.forEach(function (n) {n.isActive() && t.activeObservations_.push(n);});}, e.prototype.broadcastActive = function () {if (!this.hasActive()) return;var t = this.callbackCtx_,n = this.activeObservations_.map(function (r) {return new F(r.target, r.broadcastRect());});this.callback_.call(t, n, t), this.clearActive();}, e.prototype.clearActive = function () {this.activeObservations_.splice(0);}, e.prototype.hasActive = function () {return this.activeObservations_.length > 0;}, e;}(),g = typeof WeakMap != "undefined" ? new WeakMap() : new _(),O = function () {function e(t) {if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");var n = T.getInstance(),r = new H(t, n, this);g.set(this, r);}return e;}();["observe", "unobserve", "disconnect"].forEach(function (e) {O.prototype[e] = function () {var t;return (t = g.get(this))[e].apply(t, arguments);};});var k = function () {return typeof f.ResizeObserver != "undefined" ? f.ResizeObserver : O;}();

function P(o, e = {}) {const l = e.directive || "@";function m(r, i, s) {if (r === "!--") return I$1("!", i.comment);s && s.length && (s.length === 1 ? s = s[0] : s = [].concat.apply([], s));const p = Object.keys(i);if (!p || !p.length) return I$1(r, s);const f = {};for (let b = 0, x = p.length; x > b; b++) {const a = p[b];if (i[a] === "false" && (i[a] = !1), a.indexOf(l) === 0) {const k = a.slice(1).split(":");let n = f;for (let d = 0, g = k.length, O = g - 1; d < g; d++) {const u = k[d];d === O ? n[u] = i[a] : n[u] ? n = n[u] : n = n[u] = {};}} else f.attrs || (f.attrs = {}), f.attrs[a] = i[a];}return I$1(r, f, s);}const c = At(o || []),t = B(m, { comments: !0, attrToProp: !1 });return t.update = function (i, s) {return c(i, s);}, t.thunk = Dt, t;}const y = new k(function (o) {for (const e of o) {const l = JSON.parse(e.target.dataset.breakpoints);let m = 0,c = "";for (const t of Object.keys(l)) {const r = l[t];e.contentRect.width >= r && r > m && (c = t, m = r);}for (const t of Object.keys(l)) t === c ? e.target.classList.contains(t) || e.target.classList.add(t) : e.target.classList.contains(t) && e.target.classList.remove(t);}});function v(o, e) {if (e.elm.dataset && e.elm.dataset.breakpoints) try {JSON.parse(e.elm.dataset.breakpoints), y.observe(e.elm);} catch (l) {} else e.elm instanceof Element && y.unobserve(e.elm);}function V(o) {o.elm instanceof Element && y.unobserve(o.elm);}var W = { create: v, update: v, destroy: V },I = P([It, Xt, Pt, Qt, re, W]);

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

    return I`<canvas width="${model.width}"
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

    return I`
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
        return I``

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
    return I`<g class="grid-minor" style="stroke: ${graph.gridLines.vertical.minorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function verticalGridLinesMajor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return I``

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
    return I`<g class="grid-major" style="stroke: ${graph.gridLines.vertical.majorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function gridLines (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.horizontal)
        return I``

    const m = getGraphMetrics(model, graph);

    const gridLines = [ ];
    const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1);
    for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
        gridLines.push(I`<line x1="${m.leftMargin}" x2="${m.leftMargin + m.graphWidth}" y1="${y}" y2="${y}"/>`);
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1);

    return I`<g class="grid-horiz"
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

    return I`
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
        return I`<text x="2" y="${m.graphHeight + m.bottomMargin - 8}" style="fill: rgba(0, 0, 0, 0.7); text-anchor: start; pointer-events: none;">t: ${t}s</text>`
    }

    return I``
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
        return I`<text x="${tick.x}" y="${m.graphHeight + 19}">${tick.seconds}</text>`
    })
}


function timeSelectionComponent (model, graph, update) {
    if (graph.selection.type === 'range')
        return timeRangeSelectionComponent(model, graph, update)

    if (graph.selection.type === 'value')
        return timeValueSelectionComponent(model, graph, update)

    return I``
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

    return I`
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

    return I`
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

    return I`
        <div class="graph-stack"
             @hook:insert=${_insertHook}
             style="width: 100%; display: grid; grid-template-columns: 1fr; border: ${model.border || 'none'};">
            ${model.graphs.map((g) => graphComponent(model, g, update))}
        </div>`
}

function timelineComponent (model, update) {
    return (model.renderer === 'canvas') ? timelineComponent$2(model, update) : timelineComponent$1(model, update)
}

export default timelineComponent;

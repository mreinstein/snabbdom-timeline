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

var fe = typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {};function G(e, t, r, i, s) {const n = t === void 0 ? void 0 : t.key;return { sel: e, data: t, children: r, text: i, elm: s, key: n };}const ee = Array.isArray;function U(e) {return typeof e == "string" || typeof e == "number";}function xe(e) {return document.createElement(e);}function Re(e, t) {return document.createElementNS(e, t);}function Se(e) {return document.createTextNode(e);}function Me(e) {return document.createComment(e);}function Le(e, t, r) {e.insertBefore(t, r);}function Ce(e, t) {e.removeChild(t);}function Ne(e, t) {e.appendChild(t);}function ke(e) {return e.parentNode;}function ze(e) {return e.nextSibling;}function Pe(e) {return e.tagName;}function je(e, t) {e.textContent = t;}function De(e) {return e.textContent;}function Fe(e) {return e.nodeType === 1;}function Be(e) {return e.nodeType === 3;}function $e(e) {return e.nodeType === 8;}const We = { createElement: xe, createElementNS: Re, createTextNode: Se, createComment: Me, insertBefore: Le, removeChild: Ce, appendChild: Ne, parentNode: ke, nextSibling: ze, tagName: Pe, setTextContent: je, getTextContent: De, isElement: Fe, isText: Be, isComment: $e };function te(e) {return e === void 0;}function L(e) {return e !== void 0;}const le = G("", {}, [], void 0, void 0);function I(e, t) {return e.key === t.key && e.sel === t.sel;}function He(e) {return e.sel !== void 0;}function Ie(e, t, r) {var i;const s = {};for (let n = t; n <= r; ++n) {const o = (i = e[n]) === null || i === void 0 ? void 0 : i.key;o !== void 0 && (s[o] = n);}return s;}const Y = ["create", "update", "remove", "destroy", "pre", "post"];function qe(e, t) {let r, i;const s = { create: [], update: [], remove: [], destroy: [], pre: [], post: [] },n = t !== void 0 ? t : We;for (r = 0; r < Y.length; ++r) for (s[Y[r]] = [], i = 0; i < e.length; ++i) {const a = e[i][Y[r]];a !== void 0 && s[Y[r]].push(a);}function o(a) {const f = a.id ? "#" + a.id : "",l = a.className ? "." + a.className.split(" ").join(".") : "";return G(n.tagName(a).toLowerCase() + f + l, {}, [], void 0, a);}function h(a, f) {return function () {if (--f === 0) {const p = n.parentNode(a);n.removeChild(p, a);}};}function y(a, f) {var l, p;let m,c = a.data;if (c !== void 0) {const g = (l = c.hook) === null || l === void 0 ? void 0 : l.init;L(g) && (g(a), c = a.data);}const _ = a.children,w = a.sel;if (w === "!") te(a.text) && (a.text = ""), a.elm = n.createComment(a.text);else if (w !== void 0) {const g = w.indexOf("#"),O = w.indexOf(".", g),d = g > 0 ? g : w.length,T = O > 0 ? O : w.length,b = g !== -1 || O !== -1 ? w.slice(0, Math.min(d, T)) : w,k = a.elm = L(c) && L(m = c.ns) ? n.createElementNS(m, b) : n.createElement(b);for (d < T && k.setAttribute("id", w.slice(d + 1, T)), O > 0 && k.setAttribute("class", w.slice(T + 1).replace(/\./g, " ")), m = 0; m < s.create.length; ++m) s.create[m](le, a);if (ee(_)) for (m = 0; m < _.length; ++m) {const H = _[m];H != null && n.appendChild(k, y(H, f));} else U(a.text) && n.appendChild(k, n.createTextNode(a.text));const z = a.data.hook;L(z) && ((p = z.create) === null || p === void 0 || p.call(z, le, a), z.insert && f.push(a));} else a.elm = n.createTextNode(a.text);return a.elm;}function v(a, f, l, p, m, c) {for (; p <= m; ++p) {const _ = l[p];_ != null && n.insertBefore(a, y(_, c), f);}}function u(a) {var f, l;const p = a.data;if (p !== void 0) {(l = (f = p == null ? void 0 : p.hook) === null || f === void 0 ? void 0 : f.destroy) === null || l === void 0 || l.call(f, a);for (let m = 0; m < s.destroy.length; ++m) s.destroy[m](a);if (a.children !== void 0) for (let m = 0; m < a.children.length; ++m) {const c = a.children[m];c != null && typeof c != "string" && u(c);}}}function S(a, f, l, p) {for (var m, c; l <= p; ++l) {let _, w;const g = f[l];if (g != null) if (L(g.sel)) {u(g), _ = s.remove.length + 1, w = h(g.elm, _);for (let d = 0; d < s.remove.length; ++d) s.remove[d](g, w);const O = (c = (m = g == null ? void 0 : g.data) === null || m === void 0 ? void 0 : m.hook) === null || c === void 0 ? void 0 : c.remove;L(O) ? O(g, w) : w();} else n.removeChild(a, g.elm);}}function E(a, f, l, p) {let m = 0,c = 0,_ = f.length - 1,w = f[0],g = f[_],O = l.length - 1,d = l[0],T = l[O],b,k,z,H;for (; m <= _ && c <= O;) w == null ? w = f[++m] : g == null ? g = f[--_] : d == null ? d = l[++c] : T == null ? T = l[--O] : I(w, d) ? (A(w, d, p), w = f[++m], d = l[++c]) : I(g, T) ? (A(g, T, p), g = f[--_], T = l[--O]) : I(w, T) ? (A(w, T, p), n.insertBefore(a, w.elm, n.nextSibling(g.elm)), w = f[++m], T = l[--O]) : I(g, d) ? (A(g, d, p), n.insertBefore(a, g.elm, w.elm), g = f[--_], d = l[++c]) : (b === void 0 && (b = Ie(f, m, _)), k = b[d.key], te(k) ? n.insertBefore(a, y(d, p), w.elm) : (z = f[k], z.sel !== d.sel ? n.insertBefore(a, y(d, p), w.elm) : (A(z, d, p), f[k] = void 0, n.insertBefore(a, z.elm, w.elm))), d = l[++c]);(m <= _ || c <= O) && (m > _ ? (H = l[O + 1] == null ? null : l[O + 1].elm, v(a, H, l, c, O, p)) : S(a, f, m, _));}function A(a, f, l) {var p, m, c, _, w;const g = (p = f.data) === null || p === void 0 ? void 0 : p.hook;(m = g == null ? void 0 : g.prepatch) === null || m === void 0 || m.call(g, a, f);const O = f.elm = a.elm,d = a.children,T = f.children;if (a === f) return;if (f.data !== void 0) {for (let b = 0; b < s.update.length; ++b) s.update[b](a, f);(_ = (c = f.data.hook) === null || c === void 0 ? void 0 : c.update) === null || _ === void 0 || _.call(c, a, f);}te(f.text) ? L(d) && L(T) ? d !== T && E(O, d, T, l) : L(T) ? (L(a.text) && n.setTextContent(O, ""), v(O, null, T, 0, T.length - 1, l)) : L(d) ? S(O, d, 0, d.length - 1) : L(a.text) && n.setTextContent(O, "") : a.text !== f.text && (L(d) && S(O, d, 0, d.length - 1), n.setTextContent(O, f.text)), (w = g == null ? void 0 : g.postpatch) === null || w === void 0 || w.call(g, a, f);}return function (f, l) {let p, m, c;const _ = [];for (p = 0; p < s.pre.length; ++p) s.pre[p]();for (He(f) || (f = o(f)), I(f, l) ? A(f, l, _) : (m = f.elm, c = n.parentNode(m), y(l, _), c !== null && (n.insertBefore(c, l.elm, n.nextSibling(m)), S(c, [f], 0, 0))), p = 0; p < _.length; ++p) _[p].data.hook.insert(_[p]);for (p = 0; p < s.post.length; ++p) s.post[p]();return l;};}function ue(e, t, r) {if (e.ns = "http://www.w3.org/2000/svg", r !== "foreignObject" && t !== void 0) for (let i = 0; i < t.length; ++i) {const s = t[i].data;s !== void 0 && ue(s, t[i].children, t[i].sel);}}function J(e, t, r) {var i = {},s,n,o;if (r !== void 0 ? (t !== null && (i = t), ee(r) ? s = r : U(r) ? n = r : r && r.sel && (s = [r])) : t != null && (ee(t) ? s = t : U(t) ? n = t : t && t.sel ? s = [t] : i = t), s !== void 0) for (o = 0; o < s.length; ++o) U(s[o]) && (s[o] = G(void 0, void 0, void 0, s[o], void 0));return e[0] === "s" && e[1] === "v" && e[2] === "g" && (e.length === 3 || e[3] === "." || e[3] === "#") && ue(i, s, e), G(e, i, s, n, void 0);}function K(e, t) {e.data.fn = t.data.fn, e.data.args = t.data.args, t.data = e.data, t.children = e.children, t.text = e.text, t.elm = e.elm;}function Ge(e) {const t = e.data,r = t.fn.apply(void 0, t.args);K(r, e);}function Ue(e, t) {let r;const i = e.data,s = t.data,n = i.args,o = s.args;if (i.fn !== s.fn || n.length !== o.length) {K(s.fn.apply(void 0, o), t);return;}for (r = 0; r < o.length; ++r) if (n[r] !== o[r]) {K(s.fn.apply(void 0, o), t);return;}K(e, t);}const Ye = function (t, r, i, s) {return s === void 0 && (s = i, i = r, r = void 0), J(t, { key: r, hook: { init: Ge, prepatch: Ue }, fn: i, args: s });};var Je = Ke,ce = { class: "className", for: "htmlFor", "http-equiv": "httpEquiv" };function Ke(e) {return function (t, r, i) {for (var s in r) s in ce && (r[ce[s]] = r[s], delete r[s]);return e(t, r, i);};}var D = 0,N = 1,M = 2,X = 3,C = 4,x = 5,ne = 6,P = 7,R = 8,F = 9,B = 10,q = 11,j = 12,$ = 13,Xe = function (e, t) {t || (t = {});var r = t.concat || function (s, n) {return String(s) + String(n);};return t.attrToProp !== !1 && (e = Je(e)), function (s) {for (var n = N, o = "", h = !1, y = arguments.length, v = [], u = 0; u < s.length; u++) if (u < y - 1) {var S = arguments[u + 1],E = g(s[u]),A = n;A === B && (A = R), A === F && (A = R), A === P && (A = R), A === C && (A = x), A === M ? o === "/" ? (E.push([M, "/", S]), o = "") : E.push([M, S]) : A === $ && t.comments ? o += String(S) : A !== $ && E.push([D, A, S]), v.push.apply(v, E);} else v.push.apply(v, g(s[u]));for (var a = [null, {}, []], f = [[a, -1]], u = 0; u < v.length; u++) {var l = f[f.length - 1][0],E = v[u],n = E[0];if (n === M && /^\//.test(E[1])) {var p = f[f.length - 1][1];f.length > 1 && (f.pop(), f[f.length - 1][0][2][p] = e(l[0], l[1], l[2].length ? l[2] : void 0));} else if (n === M) {var m = [E[1], {}, []];l[2].push(m), f.push([m, l[2].length - 1]);} else if (n === x || n === D && E[1] === x) {for (var c = "", _; u < v.length; u++) if (v[u][0] === x) c = r(c, v[u][1]);else if (v[u][0] === D && v[u][1] === x) {if (typeof v[u][2] == "object" && !c) for (_ in v[u][2]) v[u][2].hasOwnProperty(_) && !l[1][_] && (l[1][_] = v[u][2][_]);else c = r(c, v[u][2]);} else break;v[u][0] === q && u++;for (var w = u; u < v.length; u++) if (v[u][0] === R || v[u][0] === x) l[1][c] ? v[u][1] === "" || (l[1][c] = r(l[1][c], v[u][1])) : l[1][c] = i(v[u][1]);else if (v[u][0] === D && (v[u][1] === R || v[u][1] === x)) l[1][c] ? v[u][2] === "" || (l[1][c] = r(l[1][c], v[u][2])) : l[1][c] = i(v[u][2]);else {c.length && !l[1][c] && u === w && (v[u][0] === X || v[u][0] === j) && (l[1][c] = c.toLowerCase()), v[u][0] === X && u--;break;}} else if (n === x) l[1][E[1]] = !0;else if (n === D && E[1] === x) l[1][E[2]] = !0;else if (n === X) {const b = E[1] || Ve(l[0]);if (b && f.length) {var p = f[f.length - 1][1];f.pop(), f[f.length - 1][0][2][p] = e(l[0], l[1], l[2].length ? l[2] : void 0);}} else if (n === D && E[1] === N) E[2] === void 0 || E[2] === null ? E[2] = "" : E[2] || (E[2] = r("", E[2])), Array.isArray(E[2][0]) ? l[2].push.apply(l[2], E[2]) : l[2].push(E[2]);else if (n === N) l[2].push(E[1]);else if (!(n === q || n === j)) throw new Error("unhandled: " + n);}if (a[2].length > 1 && /^\s*$/.test(a[2][0]) && a[2].shift(), a[2].length > 2 || a[2].length === 2 && /\S/.test(a[2][1])) {if (t.createFragment) return t.createFragment(a[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag");}return Array.isArray(a[2][0]) && typeof a[2][0][0] == "string" && Array.isArray(a[2][0][2]) && (a[2][0] = e(a[2][0][0], a[2][0][1], a[2][0][2])), a[2][0];function g(O) {var d = [];n === P && (n = C);for (var T = 0; T < O.length; T++) {var b = O.charAt(T);n === N && b === "<" ? (o.length && d.push([N, o]), o = "", n = M) : b === ">" && !Ze(n) && n !== $ ? (n === M && o.length ? d.push([M, o]) : n === x ? d.push([x, o]) : n === R && o.length && d.push([R, o]), d.push([X, h]), h = !1, o = "", n = N) : n === $ && /-$/.test(o) && b === "-" ? (t.comments && d.push([R, o.substr(0, o.length - 1)]), o = "", h = !0, n = N) : n === M && /^!--$/.test(o) ? (t.comments && d.push([M, o], [x, "comment"], [q]), o = b, n = $) : n === N || n === $ ? o += b : n === M && b === "/" && o.length ? h = !0 : n === M && /\s/.test(b) ? (o.length && d.push([M, o]), o = "", n = C) : n === M ? o += b : n === C && /[^\s"'=/]/.test(b) ? (n = x, o = b) : n === C && /\s/.test(b) ? (o.length && d.push([x, o]), d.push([j])) : n === x && /\s/.test(b) ? (d.push([x, o]), o = "", n = ne) : n === x && b === "=" ? (d.push([x, o], [q]), o = "", n = P) : n === x && b === "/" ? (h = !0, o = "", n = C) : n === x ? o += b : (n === ne || n === C) && b === "=" ? (d.push([q]), n = P) : (n === ne || n === C) && !/\s/.test(b) ? (d.push([j]), /[\w-]/.test(b) ? (o += b, n = x) : b === "/" ? h = !0 : n = C) : n === P && b === '"' ? n = B : n === P && b === "'" ? n = F : n === B && b === '"' ? (d.push([R, o], [j]), o = "", n = C) : n === F && b === "'" ? (d.push([R, o], [j]), o = "", n = C) : n === P && !/\s/.test(b) ? (n = R, T--) : n === R && /\s/.test(b) ? (d.push([R, o], [j]), o = "", n = C) : (n === R || n === F || n === B) && (o += b);}return n === N && o.length ? (d.push([N, o]), o = "") : n === R && o.length ? (d.push([R, o]), o = "") : n === B && o.length ? (d.push([R, o]), o = "") : n === F && o.length ? (d.push([R, o]), o = "") : n === x && (d.push([x, o]), o = ""), d;}};function i(s) {return typeof s == "function" || typeof s == "string" || s && typeof s == "object" || s == null ? s : r("", s);}};function Ze(e) {return e === F || e === B;}var Qe = RegExp("^(" + ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].join("|") + ")(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$");function Ve(e) {return Qe.test(e);}function et(e, t = {}) {const r = t.directive || "@";function i(o, h, y) {if (o === "!--") return J("!", h.comment);y && y.length && (y.length === 1 ? y = y[0] : y = [].concat.apply([], y));const v = Object.keys(h);if (!v || !v.length) return J(o, y);const u = {};for (let S = 0, E = v.length; E > S; S++) {const A = v[S];if (h[A] === "false" && (h[A] = !1), A.indexOf(r) === 0) {const a = A.slice(1).split(":");let f = u;for (let l = 0, p = a.length, m = p - 1; l < p; l++) {const c = a[l];l === m ? f[c] = h[A] : f[c] ? f = f[c] : f = f[c] = {};}} else u.attrs || (u.attrs = {}), u.attrs[A] = h[A];}return J(o, u, y);}const s = qe(e || []),n = Xe(i, { comments: !0, attrToProp: !1 });return n.update = function (h, y) {return s(h, y);}, n.thunk = Ye, n;}const tt = "http://www.w3.org/1999/xlink",nt = "http://www.w3.org/XML/1998/namespace",de = 58,rt = 120;function he(e, t) {var r,i = t.elm,s = e.data.attrs,n = t.data.attrs;if (!s && !n) return;if (s === n) return;s = s || {}, n = n || {};for (r in n) {const o = n[r],h = s[r];h !== o && (o === !0 ? i.setAttribute(r, "") : o === !1 ? i.removeAttribute(r) : r.charCodeAt(0) !== rt ? i.setAttribute(r, o) : r.charCodeAt(3) === de ? i.setAttributeNS(nt, r, o) : r.charCodeAt(5) === de ? i.setAttributeNS(tt, r, o) : i.setAttribute(r, o));}for (r in s) r in n || i.removeAttribute(r);}const it = { create: he, update: he };function pe(e, t) {var r,i,s = t.elm,n = e.data.class,o = t.data.class;if (!n && !o) return;if (n === o) return;n = n || {}, o = o || {};for (i in n) n[i] && !Object.prototype.hasOwnProperty.call(o, i) && s.classList.remove(i);for (i in o) r = o[i], r !== n[i] && s.classList[r ? "add" : "remove"](i);}const st = { create: pe, update: pe };function ve(e, t) {var r,i,s,n = t.elm,o = e.data.props,h = t.data.props;if (!o && !h) return;if (o === h) return;o = o || {}, h = h || {};for (r in h) i = h[r], s = o[r], s !== i && (r !== "value" || n[r] !== i) && (n[r] = i);}const ot = { create: ve, update: ve };var me = typeof window != "undefined" && window.requestAnimationFrame.bind(window) || setTimeout,at = function (e) {me(function () {me(e);});},re = !1;function ft(e, t, r) {at(function () {e[t] = r;});}function ge(e, t) {var r,i,s = t.elm,n = e.data.style,o = t.data.style;if (!n && !o) return;if (n === o) return;n = n || {}, o = o || {};var h = ("delayed" in n);for (i in n) o[i] || (i[0] === "-" && i[1] === "-" ? s.style.removeProperty(i) : s.style[i] = "");for (i in o) if (r = o[i], i === "delayed" && o.delayed) for (const y in o.delayed) r = o.delayed[y], (!h || r !== n.delayed[y]) && ft(s.style, y, r);else i !== "remove" && r !== n[i] && (i[0] === "-" && i[1] === "-" ? s.style.setProperty(i, r) : s.style[i] = r);}function lt(e) {var t,r,i = e.elm,s = e.data.style;if (!s || !(t = s.destroy)) return;for (r in t) i.style[r] = t[r];}function ut(e, t) {var r = e.data.style;if (!r || !r.remove) {t();return;}re || (e.elm.offsetLeft, re = !0);var i,s = e.elm,n = 0,o,h = r.remove,y = 0,v = [];for (i in h) v.push(i), s.style[i] = h[i];o = getComputedStyle(s);for (var u = o["transition-property"].split(", "); n < u.length; ++n) v.indexOf(u[n]) !== -1 && y++;s.addEventListener("transitionend", function (S) {S.target === s && --y, y === 0 && t();});}function ct() {re = !1;}const dt = { pre: ct, create: ge, update: ge, destroy: lt, remove: ut };function ye(e, t, r) {if (typeof e == "function") e.call(t, r, t);else if (typeof e == "object") for (var i = 0; i < e.length; i++) ye(e[i], t, r);}function ht(e, t) {var r = e.type,i = t.data.on;i && i[r] && ye(i[r], t, e);}function pt() {return function e(t) {ht(t, e.vnode);};}function ie(e, t) {var r = e.data.on,i = e.listener,s = e.elm,n = t && t.data.on,o = t && t.elm,h;if (r === n) return;if (r && i) if (n) for (h in r) n[h] || s.removeEventListener(h, i, !1);else for (h in r) s.removeEventListener(h, i, !1);if (n) {var y = t.listener = e.listener || pt();if (y.vnode = t, r) for (h in n) r[h] || o.addEventListener(h, y, !1);else for (h in n) o.addEventListener(h, y, !1);}}const vt = { create: ie, update: ie, destroy: ie };var se = typeof fe != "undefined" ? fe : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {},be = function () {if (typeof Map != "undefined") return Map;function e(t, r) {var i = -1;return t.some(function (s, n) {return s[0] === r ? (i = n, !0) : !1;}), i;}return function () {function t() {this.__entries__ = [];}return Object.defineProperty(t.prototype, "size", { get: function () {return this.__entries__.length;}, enumerable: !0, configurable: !0 }), t.prototype.get = function (r) {var i = e(this.__entries__, r),s = this.__entries__[i];return s && s[1];}, t.prototype.set = function (r, i) {var s = e(this.__entries__, r);~s ? this.__entries__[s][1] = i : this.__entries__.push([r, i]);}, t.prototype.delete = function (r) {var i = this.__entries__,s = e(i, r);~s && i.splice(s, 1);}, t.prototype.has = function (r) {return !!~e(this.__entries__, r);}, t.prototype.clear = function () {this.__entries__.splice(0);}, t.prototype.forEach = function (r, i) {i === void 0 && (i = null);for (var s = 0, n = this.__entries__; s < n.length; s++) {var o = n[s];r.call(i, o[1], o[0]);}}, t;}();}(),oe = typeof window != "undefined" && typeof document != "undefined" && window.document === document,Z = function () {return typeof se != "undefined" && se.Math === Math ? se : typeof self != "undefined" && self.Math === Math ? self : typeof window != "undefined" && window.Math === Math ? window : Function("return this")();}(),mt = function () {return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Z) : function (e) {return setTimeout(function () {return e(Date.now());}, 1e3 / 60);};}(),gt = 2;function yt(e, t) {var r = !1,i = !1,s = 0;function n() {r && (r = !1, e()), i && h();}function o() {mt(n);}function h() {var y = Date.now();if (r) {if (y - s < gt) return;i = !0;} else r = !0, i = !1, setTimeout(o, t);s = y;}return h;}var bt = 20,_t = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],wt = typeof MutationObserver != "undefined",Et = function () {function e() {this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = yt(this.refresh.bind(this), bt);}return e.prototype.addObserver = function (t) {~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();}, e.prototype.removeObserver = function (t) {var r = this.observers_,i = r.indexOf(t);~i && r.splice(i, 1), !r.length && this.connected_ && this.disconnect_();}, e.prototype.refresh = function () {var t = this.updateObservers_();t && this.refresh();}, e.prototype.updateObservers_ = function () {var t = this.observers_.filter(function (r) {return r.gatherActive(), r.hasActive();});return t.forEach(function (r) {return r.broadcastActive();}), t.length > 0;}, e.prototype.connect_ = function () {if (!oe || this.connected_) return;document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), wt ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: !0, childList: !0, characterData: !0, subtree: !0 })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0;}, e.prototype.disconnect_ = function () {if (!oe || !this.connected_) return;document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1;}, e.prototype.onTransitionEnd_ = function (t) {var r = t.propertyName,i = r === void 0 ? "" : r,s = _t.some(function (n) {return !!~i.indexOf(n);});s && this.refresh();}, e.getInstance = function () {return this.instance_ || (this.instance_ = new e()), this.instance_;}, e.instance_ = null, e;}(),_e = function (e, t) {for (var r = 0, i = Object.keys(t); r < i.length; r++) {var s = i[r];Object.defineProperty(e, s, { value: t[s], enumerable: !1, writable: !1, configurable: !0 });}return e;},W = function (e) {var t = e && e.ownerDocument && e.ownerDocument.defaultView;return t || Z;},we = V(0, 0, 0, 0);function Q(e) {return parseFloat(e) || 0;}function Ee(e) {for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];return t.reduce(function (i, s) {var n = e["border-" + s + "-width"];return i + Q(n);}, 0);}function Ot(e) {for (var t = ["top", "right", "bottom", "left"], r = {}, i = 0, s = t; i < s.length; i++) {var n = s[i],o = e["padding-" + n];r[n] = Q(o);}return r;}function At(e) {var t = e.getBBox();return V(0, 0, t.width, t.height);}function Tt(e) {var t = e.clientWidth,r = e.clientHeight;if (!t && !r) return we;var i = W(e).getComputedStyle(e),s = Ot(i),n = s.left + s.right,o = s.top + s.bottom,h = Q(i.width),y = Q(i.height);if (i.boxSizing === "border-box" && (Math.round(h + n) !== t && (h -= Ee(i, "left", "right") + n), Math.round(y + o) !== r && (y -= Ee(i, "top", "bottom") + o)), !Rt(e)) {var v = Math.round(h + n) - t,u = Math.round(y + o) - r;Math.abs(v) !== 1 && (h -= v), Math.abs(u) !== 1 && (y -= u);}return V(s.left, s.top, h, y);}var xt = function () {return typeof SVGGraphicsElement != "undefined" ? function (e) {return e instanceof W(e).SVGGraphicsElement;} : function (e) {return e instanceof W(e).SVGElement && typeof e.getBBox == "function";};}();function Rt(e) {return e === W(e).document.documentElement;}function St(e) {return oe ? xt(e) ? At(e) : Tt(e) : we;}function Mt(e) {var t = e.x,r = e.y,i = e.width,s = e.height,n = typeof DOMRectReadOnly != "undefined" ? DOMRectReadOnly : Object,o = Object.create(n.prototype);return _e(o, { x: t, y: r, width: i, height: s, top: r, right: t + i, bottom: s + r, left: t }), o;}function V(e, t, r, i) {return { x: e, y: t, width: r, height: i };}var Lt = function () {function e(t) {this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = V(0, 0, 0, 0), this.target = t;}return e.prototype.isActive = function () {var t = St(this.target);return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;}, e.prototype.broadcastRect = function () {var t = this.contentRect_;return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;}, e;}(),Ct = function () {function e(t, r) {var i = Mt(r);_e(this, { target: t, contentRect: i });}return e;}(),Nt = function () {function e(t, r, i) {if (this.activeObservations_ = [], this.observations_ = new be(), typeof t != "function") throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_ = t, this.controller_ = r, this.callbackCtx_ = i;}return e.prototype.observe = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof W(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var r = this.observations_;if (r.has(t)) return;r.set(t, new Lt(t)), this.controller_.addObserver(this), this.controller_.refresh();}, e.prototype.unobserve = function (t) {if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");if (typeof Element == "undefined" || !(Element instanceof Object)) return;if (!(t instanceof W(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');var r = this.observations_;if (!r.has(t)) return;r.delete(t), r.size || this.controller_.removeObserver(this);}, e.prototype.disconnect = function () {this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);}, e.prototype.gatherActive = function () {var t = this;this.clearActive(), this.observations_.forEach(function (r) {r.isActive() && t.activeObservations_.push(r);});}, e.prototype.broadcastActive = function () {if (!this.hasActive()) return;var t = this.callbackCtx_,r = this.activeObservations_.map(function (i) {return new Ct(i.target, i.broadcastRect());});this.callback_.call(t, r, t), this.clearActive();}, e.prototype.clearActive = function () {this.activeObservations_.splice(0);}, e.prototype.hasActive = function () {return this.activeObservations_.length > 0;}, e;}(),Oe = typeof WeakMap != "undefined" ? new WeakMap() : new be(),Ae = function () {function e(t) {if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");var r = Et.getInstance(),i = new Nt(t, r, this);Oe.set(this, i);}return e;}();["observe", "unobserve", "disconnect"].forEach(function (e) {Ae.prototype[e] = function () {var t;return (t = Oe.get(this))[e].apply(t, arguments);};});var kt = function () {return typeof Z.ResizeObserver != "undefined" ? Z.ResizeObserver : Ae;}();const ae = new kt(function (e) {for (const t of e) {const r = JSON.parse(t.target.dataset.breakpoints);let i = 0,s = "";for (const n of Object.keys(r)) {const o = r[n];t.contentRect.width >= o && o > i && (s = n, i = o);}for (const n of Object.keys(r)) n === s ? t.target.classList.contains(n) || t.target.classList.add(n) : t.target.classList.contains(n) && t.target.classList.remove(n);}});function Te(e, t) {if (t.elm.dataset && t.elm.dataset.breakpoints) try {JSON.parse(t.elm.dataset.breakpoints), ae.observe(t.elm);} catch (r) {} else t.elm instanceof Element && ae.unobserve(t.elm);}function zt(e) {ae.unobserve(e.elm);}var Pt = { create: Te, update: Te, destroy: zt },jt = et([it, vt, st, ot, dt, Pt]);

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

    return jt`<canvas width="${model.width}"
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

    return jt`
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
        return jt``

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
    return jt`<g class="grid-minor" style="stroke: ${graph.gridLines.vertical.minorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function verticalGridLinesMajor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return jt``

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
    return jt`<g class="grid-major" style="stroke: ${graph.gridLines.vertical.majorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function gridLines (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.horizontal)
        return jt``

    const m = getGraphMetrics(model, graph);

    const gridLines = [ ];
    const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1);
    for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
        gridLines.push(jt`<line x1="${m.leftMargin}" x2="${m.leftMargin + m.graphWidth}" y1="${y}" y2="${y}"/>`);
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1);

    return jt`<g class="grid-horiz"
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

    return jt`
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
        return jt`<text x="2" y="${m.graphHeight + m.bottomMargin - 8}" style="fill: rgba(0, 0, 0, 0.7); text-anchor: start; pointer-events: none;">t: ${t}s</text>`
    }

    return jt``
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
        return jt`<text x="${tick.x}" y="${m.graphHeight + 19}">${tick.seconds}</text>`
    })
}


function timeSelectionComponent (model, graph, update) {
    if (graph.selection.type === 'range')
        return timeRangeSelectionComponent(model, graph, update)

    if (graph.selection.type === 'value')
        return timeValueSelectionComponent(model, graph, update)

    return jt``
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

    return jt`
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

    return jt`
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

    return jt`
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

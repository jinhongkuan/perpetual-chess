/* @license
 * Copyright (c) 2017, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */
var Chess = function (r) {
    function e(r) {
        "undefined" == typeof r && (r = !1), (ar = new Array(128)), (lr = { w: x, b: x }), (pr = U), (sr = { w: 0, b: 0 }), (cr = x), (vr = 0), (gr = 1), (hr = []), r || (dr = {}), u(i());
    }
    function n() {
        t(H);
    }
    function t(r, n) {
        "undefined" == typeof n && (n = !1);
        var t = r.split(/\s+/),
            f = t[0],
            a = 0;
        if (!o(r).valid) return !1;
        e(n);
        for (var p = 0; p < f.length; p++) {
            var s = f.charAt(p);
            if ("/" === s) a += 8;
            else if (O(s)) a += parseInt(s, 10);
            else {
                var c = "a" > s ? U : Q;
                l({ type: s.toLowerCase(), color: c }, R(a)), a++;
            }
        }
        return (
            (pr = t[1]),
            t[2].indexOf("K") > -1 && (sr.w |= er.KSIDE_CASTLE),
            t[2].indexOf("Q") > -1 && (sr.w |= er.QSIDE_CASTLE),
            t[2].indexOf("k") > -1 && (sr.b |= er.KSIDE_CASTLE),
            t[2].indexOf("q") > -1 && (sr.b |= er.QSIDE_CASTLE),
            (cr = "-" === t[3] ? x : fr[t[3]]),
            (vr = parseInt(t[4], 10)),
            (gr = parseInt(t[5], 10)),
            u(i()),
            !0
        );
    }
    function o(r) {
        var e = {
                0: "No errors.",
                1: "FEN string must contain six space-delimited fields.",
                2: "6th field (move number) must be a positive integer.",
                3: "5th field (half move counter) must be a non-negative integer.",
                4: "4th field (en-passant square) is invalid.",
                5: "3rd field (castling availability) is invalid.",
                6: "2nd field (side to move) is invalid.",
                7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
                8: "1st field (piece positions) is invalid [consecutive numbers].",
                9: "1st field (piece positions) is invalid [invalid piece].",
                10: "1st field (piece positions) is invalid [row too large].",
                11: "Illegal en-passant square",
            },
            n = r.split(/\s+/);
        if (6 !== n.length) return { valid: !1, error_number: 1, error: e[1] };
        if (isNaN(n[5]) || parseInt(n[5], 10) <= 0) return { valid: !1, error_number: 2, error: e[2] };
        if (isNaN(n[4]) || parseInt(n[4], 10) < 0) return { valid: !1, error_number: 3, error: e[3] };
        if (!/^(-|[abcdefgh][36])$/.test(n[3])) return { valid: !1, error_number: 4, error: e[4] };
        if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(n[2])) return { valid: !1, error_number: 5, error: e[5] };
        if (!/^(w|b)$/.test(n[1])) return { valid: !1, error_number: 6, error: e[6] };
        var t = n[0].split("/");
        if (8 !== t.length) return { valid: !1, error_number: 7, error: e[7] };
        for (var o = 0; o < t.length; o++) {
            for (var i = 0, f = !1, u = 0; u < t[o].length; u++)
                if (isNaN(t[o][u])) {
                    if (!/^[prnbqkPRNBQK]$/.test(t[o][u])) return { valid: !1, error_number: 9, error: e[9] };
                    (i += 1), (f = !1);
                } else {
                    if (f) return { valid: !1, error_number: 8, error: e[8] };
                    (i += parseInt(t[o][u], 10)), (f = !0);
                }
            if (8 !== i) return { valid: !1, error_number: 10, error: e[10] };
        }
        return ("3" == n[3][1] && "w" == n[1]) || ("6" == n[3][1] && "b" == n[1]) ? { valid: !1, error_number: 11, error: e[11] } : { valid: !0, error_number: 0, error: e[0] };
    }
    function i() {
        for (var r = 0, e = "", n = fr.a8; n <= fr.h1; n++) {
            if (null == ar[n]) r++;
            else {
                r > 0 && ((e += r), (r = 0));
                var t = ar[n].color,
                    o = ar[n].type;
                e += t === U ? o.toUpperCase() : o.toLowerCase();
            }
            (n + 1) & 136 && (r > 0 && (e += r), n !== fr.h1 && (e += "/"), (r = 0), (n += 8));
        }
        var i = "";
        sr[U] & er.KSIDE_CASTLE && (i += "K"), sr[U] & er.QSIDE_CASTLE && (i += "Q"), sr[Q] & er.KSIDE_CASTLE && (i += "k"), sr[Q] & er.QSIDE_CASTLE && (i += "q"), (i = i || "-");
        var f = cr === x ? "-" : R(cr);
        return [e, pr, i, f, vr, gr].join(" ");
    }
    function f(r) {
        for (var e = 0; e < r.length; e += 2) "string" == typeof r[e] && "string" == typeof r[e + 1] && (dr[r[e]] = r[e + 1]);
        return dr;
    }
    function u(r) {
        hr.length > 0 || (r !== H ? ((dr.SetUp = "1"), (dr.FEN = r)) : (delete dr.SetUp, delete dr.FEN));
    }
    function a(r) {
        var e = ar[fr[r]];
        return e ? { type: e.type, color: e.color } : null;
    }
    function l(r, e) {
        if (!("type" in r && "color" in r)) return !1;
        if (-1 === W.indexOf(r.type.toLowerCase())) return !1;
        if (!(e in fr)) return !1;
        var n = fr[e];
        return r.type == F && lr[r.color] != x && lr[r.color] != n ? !1 : ((ar[n] = { type: r.type, color: r.color }), r.type === F && (lr[r.color] = n), u(i()), !0);
    }
    function p(r) {
        var e = a(r);
        return (ar[fr[r]] = null), e && e.type === F && (lr[e.color] = x), u(i()), e;
    }
    function s(r, e, n, t, o) {
        var i = { color: pr, from: e, to: n, flags: t, piece: r[e].type };
        return o && ((i.flags |= er.PROMOTION), (i.promotion = o)), r[n] ? (i.captured = r[n].type) : t & er.EP_CAPTURE && (i.captured = $), i;
    }
    function c(r) {
        function e(r, e, n, t, o) {
            if (r[n].type !== $ || (w(t) !== ir && w(t) !== nr)) e.push(s(r, n, t, o));
            else for (var i = [G, M, B, j], f = 0, u = i.length; u > f; f++) e.push(s(r, n, t, o, i[f]));
        }
        var n = [],
            t = pr,
            o = N(t),
            i = { b: or, w: tr },
            f = fr.a8,
            u = fr.h1,
            a = !1,
            l = "undefined" != typeof r && "legal" in r ? r.legal : !0;
        if ("undefined" != typeof r && "square" in r) {
            if (!(r.square in fr)) return [];
            (f = u = fr[r.square]), (a = !0);
        }
        for (var p = f; u >= p; p++)
            if (136 & p) p += 7;
            else {
                var c = ar[p];
                if (null != c && c.color === t)
                    if (c.type === $) {
                        var v = p + z[t][0];
                        if (null == ar[v]) {
                            e(ar, n, p, v, er.NORMAL);
                            var v = p + z[t][1];
                            i[t] === w(p) && null == ar[v] && e(ar, n, p, v, er.BIG_PAWN);
                        }
                        for (g = 2; 4 > g; g++) {
                            var v = p + z[t][g];
                            136 & v || (null != ar[v] && ar[v].color === o ? e(ar, n, p, v, er.CAPTURE) : v === cr && e(ar, n, p, cr, er.EP_CAPTURE));
                        }
                    } else
                        for (var g = 0, E = J[c.type].length; E > g; g++)
                            for (var b = J[c.type][g], v = p; ; ) {
                                if (((v += b), 136 & v)) break;
                                if (null != ar[v]) {
                                    if (ar[v].color === t) break;
                                    e(ar, n, p, v, er.CAPTURE);
                                    break;
                                }
                                if ((e(ar, n, p, v, er.NORMAL), "n" === c.type || "k" === c.type)) break;
                            }
            }
        if (!a || u === lr[t]) {
            if (sr[t] & er.KSIDE_CASTLE) {
                var _ = lr[t],
                    y = _ + 2;
                null != ar[_ + 1] || null != ar[y] || h(o, lr[t]) || h(o, _ + 1) || h(o, y) || e(ar, n, lr[t], y, er.KSIDE_CASTLE);
            }
            if (sr[t] & er.QSIDE_CASTLE) {
                var _ = lr[t],
                    y = _ - 2;
                null != ar[_ - 1] || null != ar[_ - 2] || null != ar[_ - 3] || h(o, lr[t]) || h(o, _ - 1) || h(o, y) || e(ar, n, lr[t], y, er.QSIDE_CASTLE);
            }
        }
        if (!l) return n;
        for (var m = [], p = 0, E = n.length; E > p; p++) S(n[p]), d(t) || m.push(n[p]), C();
        return m;
    }
    function v(r, e) {
        var n = "";
        if (r.flags & er.KSIDE_CASTLE) n = "O-O";
        else if (r.flags & er.QSIDE_CASTLE) n = "O-O-O";
        else {
            var t = T(r, e);
            r.piece !== $ && (n += r.piece.toUpperCase() + t), r.flags & (er.CAPTURE | er.EP_CAPTURE) && (r.piece === $ && (n += R(r.from)[0]), (n += "x")), (n += R(r.to)), r.flags & er.PROMOTION && (n += "=" + r.promotion.toUpperCase());
        }
        return S(r), E() && (n += b() ? "#" : "+"), C(), n;
    }
    function g(r) {
        return r.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
    }
    function h(r, e) {
        for (var n = fr.a8; n <= fr.h1; n++)
            if (136 & n) n += 7;
            else if (null != ar[n] && ar[n].color === r) {
                var t = ar[n],
                    o = n - e,
                    i = o + 119;
                if (V[i] & (1 << Y[t.type])) {
                    if (t.type === $) {
                        if (o > 0) {
                            if (t.color === U) return !0;
                        } else if (t.color === Q) return !0;
                        continue;
                    }
                    if ("n" === t.type || "k" === t.type) return !0;
                    for (var f = X[i], u = n + f, a = !1; u !== e; ) {
                        if (null != ar[u]) {
                            a = !0;
                            break;
                        }
                        u += f;
                    }
                    if (!a) return !0;
                }
            }
        return !1;
    }
    function d(r) {
        return h(N(r), lr[r]);
    }
    function E() {
        return d(pr);
    }
    function b() {
        return E() && 0 === c().length;
    }
    function _() {
        return !E() && 0 === c().length;
    }
    function y() {
        for (var r = {}, e = [], n = 0, t = 0, o = fr.a8; o <= fr.h1; o++)
            if (((t = (t + 1) % 2), 136 & o)) o += 7;
            else {
                var i = ar[o];
                i && ((r[i.type] = i.type in r ? r[i.type] + 1 : 1), i.type === B && e.push(t), n++);
            }
        if (2 === n) return !0;
        if (3 === n && (1 === r[B] || 1 === r[j])) return !0;
        if (n === r[B] + 2) {
            for (var f = 0, u = e.length, o = 0; u > o; o++) f += e[o];
            if (0 === f || f === u) return !0;
        }
        return !1;
    }
    function m() {
        for (var r = [], e = {}, n = !1; ; ) {
            var t = C();
            if (!t) break;
            r.push(t);
        }
        for (;;) {
            var o = i().split(" ").slice(0, 4).join(" ");
            if (((e[o] = o in e ? e[o] + 1 : 1), e[o] >= 3 && (n = !0), !r.length)) break;
            S(r.pop());
        }
        return n;
    }
    function A(r) {
        hr.push({ move: r, kings: { b: lr.b, w: lr.w }, turn: pr, castling: { b: sr.b, w: sr.w }, ep_square: cr, half_moves: vr, move_number: gr });
    }
    function S(r) {
        var e = pr,
            n = N(e);
        if (
            (A(r),
            (ar[r.to] = ar[r.from]),
            (ar[r.from] = null),
            r.flags & er.EP_CAPTURE && (pr === Q ? (ar[r.to - 16] = null) : (ar[r.to + 16] = null)),
            r.flags & er.PROMOTION && (ar[r.to] = { type: r.promotion, color: e }),
            ar[r.to].type === F)
        ) {
            if (((lr[ar[r.to].color] = r.to), r.flags & er.KSIDE_CASTLE)) {
                var t = r.to - 1,
                    o = r.to + 1;
                (ar[t] = ar[o]), (ar[o] = null);
            } else if (r.flags & er.QSIDE_CASTLE) {
                var t = r.to + 1,
                    o = r.to - 2;
                (ar[t] = ar[o]), (ar[o] = null);
            }
            sr[e] = "";
        }
        if (sr[e])
            for (var i = 0, f = ur[e].length; f > i; i++)
                if (r.from === ur[e][i].square && sr[e] & ur[e][i].flag) {
                    sr[e] ^= ur[e][i].flag;
                    break;
                }
        if (sr[n])
            for (var i = 0, f = ur[n].length; f > i; i++)
                if (r.to === ur[n][i].square && sr[n] & ur[n][i].flag) {
                    sr[n] ^= ur[n][i].flag;
                    break;
                }
        (cr = r.flags & er.BIG_PAWN ? ("b" === pr ? r.to - 16 : r.to + 16) : x), r.piece === $ ? (vr = 0) : r.flags & (er.CAPTURE | er.EP_CAPTURE) ? (vr = 0) : vr++, pr === Q && gr++, (pr = N(pr));
    }
    function C() {
        var r = hr.pop();
        if (null == r) return null;
        var e = r.move;
        (lr = r.kings), (pr = r.turn), (sr = r.castling), (cr = r.ep_square), (vr = r.half_moves), (gr = r.move_number);
        var n = pr,
            t = N(pr);
        if (((ar[e.from] = ar[e.to]), (ar[e.from].type = e.piece), (ar[e.to] = null), e.flags & er.CAPTURE)) ar[e.to] = { type: e.captured, color: t };
        else if (e.flags & er.EP_CAPTURE) {
            var o;
            (o = n === Q ? e.to - 16 : e.to + 16), (ar[o] = { type: $, color: t });
        }
        if (e.flags & (er.KSIDE_CASTLE | er.QSIDE_CASTLE)) {
            var i, f;
            e.flags & er.KSIDE_CASTLE ? ((i = e.to + 1), (f = e.to - 1)) : e.flags & er.QSIDE_CASTLE && ((i = e.to - 2), (f = e.to + 1)), (ar[i] = ar[f]), (ar[f] = null);
        }
        return e;
    }
    function T(r, e) {
        for (var n = c({ legal: !e }), t = r.from, o = r.to, i = r.piece, f = 0, u = 0, a = 0, l = 0, p = n.length; p > l; l++) {
            var s = n[l].from,
                v = n[l].to,
                g = n[l].piece;
            i === g && t !== s && o === v && (f++, w(t) === w(s) && u++, L(t) === L(s) && a++);
        }
        return f > 0 ? (u > 0 && a > 0 ? R(t) : R(t).charAt(a > 0 ? 1 : 0)) : "";
    }
    function I() {
        for (var r = "   +------------------------+\n", e = fr.a8; e <= fr.h1; e++) {
            if ((0 === L(e) && (r += " " + "87654321"[w(e)] + " |"), null == ar[e])) r += " . ";
            else {
                var n = ar[e].type,
                    t = ar[e].color,
                    o = t === U ? n.toUpperCase() : n.toLowerCase();
                r += " " + o + " ";
            }
            (e + 1) & 136 && ((r += "|\n"), (e += 8));
        }
        return (r += "   +------------------------+\n"), (r += "     a  b  c  d  e  f  g  h\n");
    }
    function P(r, e) {
        var n = g(r);
        if (e) {
            var t = n.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
            if (t)
                var o = t[1],
                    i = t[2],
                    f = t[3],
                    u = t[4];
        }
        for (var a = c(), l = 0, p = a.length; p > l; l++) {
            if (n === g(v(a[l])) || (e && n === g(v(a[l], !0)))) return a[l];
            if (!(!t || (o && o.toLowerCase() != a[l].piece) || fr[i] != a[l].from || fr[f] != a[l].to || (u && u.toLowerCase() != a[l].promotion))) return a[l];
        }
        return null;
    }
    function w(r) {
        return r >> 4;
    }
    function L(r) {
        return 15 & r;
    }
    function R(r) {
        var e = L(r),
            n = w(r);
        return "abcdefgh".substring(e, e + 1) + "87654321".substring(n, n + 1);
    }
    function N(r) {
        return r === U ? Q : U;
    }
    function O(r) {
        return -1 !== "0123456789".indexOf(r);
    }
    function k(r) {
        var e = q(r);
        (e.san = v(e, !1)), (e.to = R(e.to)), (e.from = R(e.from));
        var n = "";
        for (var t in er) er[t] & e.flags && (n += rr[t]);
        return (e.flags = n), e;
    }
    function q(r) {
        var e = r instanceof Array ? [] : {};
        for (var n in r) "object" == typeof n ? (e[n] = q(r[n])) : (e[n] = r[n]);
        return e;
    }
    function D(r) {
        return r.replace(/^\s+|\s+$/g, "");
    }
    function K(r) {
        for (var e = c({ legal: !1 }), n = 0, t = pr, o = 0, i = e.length; i > o; o++) {
            if ((S(e[o]), !d(t)))
                if (r - 1 > 0) {
                    var f = K(r - 1);
                    n += f;
                } else n++;
            C();
        }
        return n;
    }
    var Q = "b",
        U = "w",
        x = -1,
        $ = "p",
        j = "n",
        B = "b",
        M = "r",
        G = "q",
        F = "k",
        W = "pnbrqkPNBRQK",
        H = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        Z = ["1-0", "0-1", "1/2-1/2", "*"],
        z = { b: [16, 32, 17, 15], w: [-16, -32, -17, -15] },
        J = { n: [-18, -33, -31, -14, 18, 33, 31, 14], b: [-17, -15, 17, 15], r: [-16, 1, 16, -1], q: [-17, -16, -15, 1, 17, 16, 15, -1], k: [-17, -16, -15, 1, 17, 16, 15, -1] },
        V = [
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            24,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            2,
            24,
            2,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            53,
            56,
            53,
            2,
            0,
            0,
            0,
            0,
            0,
            0,
            24,
            24,
            24,
            24,
            24,
            24,
            56,
            0,
            56,
            24,
            24,
            24,
            24,
            24,
            24,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            53,
            56,
            53,
            2,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            2,
            24,
            2,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            24,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            0,
            20,
            0,
            0,
            20,
            0,
            0,
            0,
            0,
            0,
            0,
            24,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
        ],
        X = [
            17,
            0,
            0,
            0,
            0,
            0,
            0,
            16,
            0,
            0,
            0,
            0,
            0,
            0,
            15,
            0,
            0,
            17,
            0,
            0,
            0,
            0,
            0,
            16,
            0,
            0,
            0,
            0,
            0,
            15,
            0,
            0,
            0,
            0,
            17,
            0,
            0,
            0,
            0,
            16,
            0,
            0,
            0,
            0,
            15,
            0,
            0,
            0,
            0,
            0,
            0,
            17,
            0,
            0,
            0,
            16,
            0,
            0,
            0,
            15,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            17,
            0,
            0,
            16,
            0,
            0,
            15,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            17,
            0,
            16,
            0,
            15,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            17,
            16,
            15,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            0,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -15,
            -16,
            -17,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -15,
            0,
            -16,
            0,
            -17,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -15,
            0,
            0,
            -16,
            0,
            0,
            -17,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -15,
            0,
            0,
            0,
            -16,
            0,
            0,
            0,
            -17,
            0,
            0,
            0,
            0,
            0,
            0,
            -15,
            0,
            0,
            0,
            0,
            -16,
            0,
            0,
            0,
            0,
            -17,
            0,
            0,
            0,
            0,
            -15,
            0,
            0,
            0,
            0,
            0,
            -16,
            0,
            0,
            0,
            0,
            0,
            -17,
            0,
            0,
            -15,
            0,
            0,
            0,
            0,
            0,
            0,
            -16,
            0,
            0,
            0,
            0,
            0,
            0,
            -17,
        ],
        Y = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 },
        rr = { NORMAL: "n", CAPTURE: "c", BIG_PAWN: "b", EP_CAPTURE: "e", PROMOTION: "p", KSIDE_CASTLE: "k", QSIDE_CASTLE: "q" },
        er = { NORMAL: 1, CAPTURE: 2, BIG_PAWN: 4, EP_CAPTURE: 8, PROMOTION: 16, KSIDE_CASTLE: 32, QSIDE_CASTLE: 64 },
        nr = 7,
        tr = 6,
        or = 1,
        ir = 0,
        fr = {
            a8: 0,
            b8: 1,
            c8: 2,
            d8: 3,
            e8: 4,
            f8: 5,
            g8: 6,
            h8: 7,
            a7: 16,
            b7: 17,
            c7: 18,
            d7: 19,
            e7: 20,
            f7: 21,
            g7: 22,
            h7: 23,
            a6: 32,
            b6: 33,
            c6: 34,
            d6: 35,
            e6: 36,
            f6: 37,
            g6: 38,
            h6: 39,
            a5: 48,
            b5: 49,
            c5: 50,
            d5: 51,
            e5: 52,
            f5: 53,
            g5: 54,
            h5: 55,
            a4: 64,
            b4: 65,
            c4: 66,
            d4: 67,
            e4: 68,
            f4: 69,
            g4: 70,
            h4: 71,
            a3: 80,
            b3: 81,
            c3: 82,
            d3: 83,
            e3: 84,
            f3: 85,
            g3: 86,
            h3: 87,
            a2: 96,
            b2: 97,
            c2: 98,
            d2: 99,
            e2: 100,
            f2: 101,
            g2: 102,
            h2: 103,
            a1: 112,
            b1: 113,
            c1: 114,
            d1: 115,
            e1: 116,
            f1: 117,
            g1: 118,
            h1: 119,
        },
        ur = {
            w: [
                { square: fr.a1, flag: er.QSIDE_CASTLE },
                { square: fr.h1, flag: er.KSIDE_CASTLE },
            ],
            b: [
                { square: fr.a8, flag: er.QSIDE_CASTLE },
                { square: fr.h8, flag: er.KSIDE_CASTLE },
            ],
        },
        ar = new Array(128),
        lr = { w: x, b: x },
        pr = U,
        sr = { w: 0, b: 0 },
        cr = x,
        vr = 0,
        gr = 1,
        hr = [],
        dr = {};
    return (
        t("undefined" == typeof r ? H : r),
        {
            WHITE: U,
            BLACK: Q,
            PAWN: $,
            KNIGHT: j,
            BISHOP: B,
            ROOK: M,
            QUEEN: G,
            KING: F,
            SQUARES: (function () {
                for (var r = [], e = fr.a8; e <= fr.h1; e++) 136 & e ? (e += 7) : r.push(R(e));
                return r;
            })(),
            FLAGS: rr,
            load: function (r) {
                return t(r);
            },
            reset: function () {
                return n();
            },
            moves: function (r) {
                for (var e = c(r), n = [], t = 0, o = e.length; o > t; t++) n.push("undefined" != typeof r && "verbose" in r && r.verbose ? k(e[t]) : v(e[t], !1));
                return n;
            },
            in_check: function () {
                return E();
            },
            in_checkmate: function () {
                return b();
            },
            in_stalemate: function () {
                return _();
            },
            in_draw: function () {
                return vr >= 60 || _() || y() || m();
            },
            insufficient_material: function () {
                return y();
            },
            in_threefold_repetition: function () {
                return m();
            },
            game_over: function () {
                return vr >= 60 || b() || _() || y() || m();
            },
            validate_fen: function (r) {
                return o(r);
            },
            fen: function () {
                return i();
            },
            board: function () {
                for (var r = [], e = [], n = fr.a8; n <= fr.h1; n++) e.push(null == ar[n] ? null : { type: ar[n].type, color: ar[n].color }), (n + 1) & 136 && (r.push(e), (e = []), (n += 8));
                return r;
            },
            pgn: function (r) {
                var e = "object" == typeof r && "string" == typeof r.newline_char ? r.newline_char : "\n",
                    n = "object" == typeof r && "number" == typeof r.max_width ? r.max_width : 0,
                    t = [],
                    o = !1;
                for (var i in dr) t.push("[" + i + ' "' + dr[i] + '"]' + e), (o = !0);
                o && hr.length && t.push(e);
                for (var f = []; hr.length > 0; ) f.push(C());
                for (var u = [], a = ""; f.length > 0; ) {
                    var l = f.pop();
                    hr.length || "b" !== l.color ? "w" === l.color && (a.length && u.push(a), (a = gr + ".")) : (a = gr + ". ..."), (a = a + " " + v(l, !1)), S(l);
                }
                if ((a.length && u.push(a), "undefined" != typeof dr.Result && u.push(dr.Result), 0 === n)) return t.join("") + u.join(" ");
                for (var p = 0, i = 0; i < u.length; i++) p + u[i].length > n && 0 !== i ? (" " === t[t.length - 1] && t.pop(), t.push(e), (p = 0)) : 0 !== i && (t.push(" "), p++), t.push(u[i]), (p += u[i].length);
                return t.join("");
            },
            load_pgn: function (r, e) {
                function o(r) {
                    return r.replace(/\\/g, "\\");
                }
                function i(r) {
                    for (var e in r) return !0;
                    return !1;
                }
                function u(r, e) {
                    for (var n = "object" == typeof e && "string" == typeof e.newline_char ? e.newline_char : "\r?\n", t = {}, i = r.split(new RegExp(o(n))), f = "", u = "", a = 0; a < i.length; a++)
                        (f = i[a].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, "$1")), (u = i[a].replace(/^\[[A-Za-z]+\s"(.*)"\]$/, "$1")), D(f).length > 0 && (t[f] = u);
                    return t;
                }
                var a = "undefined" != typeof e && "sloppy" in e ? e.sloppy : !1,
                    l = "object" == typeof e && "string" == typeof e.newline_char ? e.newline_char : "\r?\n",
                    p = new RegExp("^(\\[(.|" + o(l) + ")*\\])(" + o(l) + ")*1.(" + o(l) + "|.)*$", "g"),
                    s = r.replace(p, "$1");
                "[" !== s[0] && (s = ""), n();
                var c = u(s, e);
                for (var v in c) f([v, c[v]]);
                if ("1" === c.SetUp && !("FEN" in c && t(c.FEN, !0))) return !1;
                var g = r.replace(s, "").replace(new RegExp(o(l), "g"), " ");
                g = g.replace(/(\{[^}]+\})+?/g, "");
                for (var h = /(\([^\(\)]+\))+?/g; h.test(g); ) g = g.replace(h, "");
                (g = g.replace(/\d+\.(\.\.)?/g, "")), (g = g.replace(/\.\.\./g, "")), (g = g.replace(/\$\d+/g, ""));
                var d = D(g).split(new RegExp(/\s+/));
                d = d.join(",").replace(/,,+/g, ",").split(",");
                for (var E = "", b = 0; b < d.length - 1; b++) {
                    if (((E = P(d[b], a)), null == E)) return !1;
                    S(E);
                }
                if (((E = d[d.length - 1]), Z.indexOf(E) > -1)) i(dr) && "undefined" == typeof dr.Result && f(["Result", E]);
                else {
                    if (((E = P(E, a)), null == E)) return !1;
                    S(E);
                }
                return !0;
            },
            header: function () {
                return f(arguments);
            },
            ascii: function () {
                return I();
            },
            turn: function () {
                return pr;
            },
            move: function (r, e) {
                var n = "undefined" != typeof e && "sloppy" in e ? e.sloppy : !1,
                    t = null;
                if ("string" == typeof r) t = P(r, n);
                else if ("object" == typeof r)
                    for (var o = c(), i = 0, f = o.length; f > i; i++)
                        if (!(r.from !== R(o[i].from) || r.to !== R(o[i].to) || ("promotion" in o[i] && r.promotion !== o[i].promotion))) {
                            t = o[i];
                            break;
                        }
                if (!t) return null;
                var u = k(t);
                return S(t), u;
            },
            undo: function () {
                var r = C();
                return r ? k(r) : null;
            },
            clear: function () {
                return e();
            },
            put: function (r, e) {
                return l(r, e);
            },
            get: function (r) {
                return a(r);
            },
            remove: function (r) {
                return p(r);
            },
            perft: function (r) {
                return K(r);
            },
            square_color: function (r) {
                if (r in fr) {
                    var e = fr[r];
                    return (w(e) + L(e)) % 2 === 0 ? "light" : "dark";
                }
                return null;
            },
            history: function (r) {
                for (var e = [], n = [], t = "undefined" != typeof r && ("verbose" in r) && r.verbose; hr.length > 0; ) e.push(C());
                for (; e.length > 0; ) {
                    var o = e.pop();
                    n.push(t ? k(o) : v(o)), S(o);
                }
                return n;
            },
        }
    );
};
"undefined" != typeof exports && (exports.Chess = Chess),
    "undefined" != typeof define &&
        define(function () {
            return Chess;
        });

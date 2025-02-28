/*! chessboard.js v0.3.0 | (c) 2013 Chris Oakman | MIT License chessboardjs.com/license */
(function () {
    function l(f) {
        return "string" !== typeof f ? !1 : -1 !== f.search(/^[a-h][1-8]$/);
    }
    function Q(f) {
        if ("string" !== typeof f) return !1;
        f = f.replace(/ .+$/, "");
        f = f.split("/");
        if (8 !== f.length) return !1;
        for (var b = 0; 8 > b; b++) if ("" === f[b] || 8 < f[b].length || -1 !== f[b].search(/[^kqrbnpKQRNBP1-8]/)) return !1;
        return !0;
    }
    function F(f) {
        if ("object" !== typeof f) return !1;
        for (var b in f)
            if (!0 === f.hasOwnProperty(b)) {
                var n;
                (n = !0 !== l(b)) || ((n = f[b]), (n = "string" !== typeof n ? !1 : -1 !== n.search(/^[bw][KQRNBP]$/)), (n = !0 !== n));
                if (n) return !1;
            }
        return !0;
    }
    function K(f) {
        if (!0 !== Q(f)) return !1;
        f = f.replace(/ .+$/, "");
        f = f.split("/");
        for (var b = {}, n = 8, m = 0; 8 > m; m++) {
            for (var l = f[m].split(""), r = 0, w = 0; w < l.length; w++)
                if (-1 !== l[w].search(/[1-8]/))
                    var I = parseInt(l[w], 10),
                        r = r + I;
                else {
                    var I = b,
                        F = B[r] + n,
                        A;
                    A = l[w];
                    A = A.toLowerCase() === A ? "b" + A.toUpperCase() : "w" + A.toUpperCase();
                    I[F] = A;
                    r++;
                }
            n--;
        }
        return b;
    }
    function L(f) {
        if (!0 !== F(f)) return !1;
        for (var b = "", n = 8, m = 0; 8 > m; m++) {
            for (var l = 0; 8 > l; l++) {
                var r = B[l] + n;
                !0 === f.hasOwnProperty(r) ? ((r = f[r].split("")), (r = "w" === r[0] ? r[1].toUpperCase() : r[1].toLowerCase()), (b += r)) : (b += "1");
            }
            7 !== m && (b += "/");
            n--;
        }
        b = b.replace(/11111111/g, "8");
        b = b.replace(/1111111/g, "7");
        b = b.replace(/111111/g, "6");
        b = b.replace(/11111/g, "5");
        b = b.replace(/1111/g, "4");
        b = b.replace(/111/g, "3");
        return (b = b.replace(/11/g, "2"));
    }
    var B = "abcdefgh".split("");
    window.ChessBoard =
        window.ChessBoard ||
        function (f, b) {
            function n() {
                return "xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g, function (a) {
                    return ((16 * Math.random()) | 0).toString(16);
                });
            }
            function m(a) {
                return JSON.parse(JSON.stringify(a));
            }
            function X(a) {
                a = a.split(".");
                return { major: parseInt(a[0], 10), minor: parseInt(a[1], 10), patch: parseInt(a[2], 10) };
            }
            function r(a, e, c) {
                if (!0 === b.hasOwnProperty("showErrors") && !1 !== b.showErrors) {
                    var d = "ChessBoard Error " + a + ": " + e;
                    "console" === b.showErrors && "object" === typeof console && "function" === typeof console.log
                        ? (console.log(d), 2 <= arguments.length && console.log(c))
                        : "alert" === b.showErrors
                        ? (c && (d += "\n\n" + JSON.stringify(c)), window.alert(d))
                        : "function" === typeof b.showErrors && b.showErrors(a, e, c);
                }
            }
            function w(a) {
                return "fast" === a || "slow" === a ? !0 : parseInt(a, 10) + "" !== a + "" ? !1 : 0 <= a;
            }
            function I() {
                for (var a = 0; a < B.length; a++)
                    for (var b = 1; 8 >= b; b++) {
                        var c = B[a] + b;
                        s[c] = c + "-" + n();
                    }
                b = "KQRBNP".split("");
                for (a = 0; a < b.length; a++) {
                    var c = "w" + b[a],
                        d = "b" + b[a];
                    M[c] = c + "-" + n();
                    M[d] = d + "-" + n();
                }
            }
            function ga() {
                var a = '<div class="' + h.chessboard + '">';
                !0 === b.sparePieces && (a += '<div class="' + h.sparePieces + " " + h.sparePiecesTop + '"></div>');
                a += '<div class="' + h.board + '"></div>';
                !0 === b.sparePieces && (a += '<div class="' + h.sparePieces + " " + h.sparePiecesBottom + '"></div>');
                return a + "</div>";
            }
            function A(a) {
                "black" !== a && (a = "white");
                var e = "",
                    c = m(B),
                    d = 8;
                "black" === a && (c.reverse(), (d = 1));
                for (var C = "white", f = 0; 8 > f; f++) {
                    for (var e = e + ('<div class="' + h.row + '">'), k = 0; 8 > k; k++) {
                        var g = c[k] + d,
                            e = e + ('<div class="' + h.square + " " + h[C] + " square-" + g + '" style="width: ' + p + "px; height: " + p + 'px" id="' + s[g] + '" data-square="' + g + '">');
                        if (!0 === b.showNotation) {
                            if (("white" === a && 1 === d) || ("black" === a && 8 === d)) e += '<div class="' + h.notation + " " + h.alpha + '">' + c[k] + "</div>";
                            0 === k && (e += '<div class="' + h.notation + " " + h.numeric + '">' + d + "</div>");
                        }
                        e += "</div>";
                        C = "white" === C ? "black" : "white";
                    }
                    e += '<div class="' + h.clearfix + '"></div></div>';
                    C = "white" === C ? "black" : "white";
                    "white" === a ? d-- : d++;
                }
                return e;
            }
            function Y(a) {
                if ("function" === typeof b.pieceTheme) return b.pieceTheme(a);
                if ("string" === typeof b.pieceTheme) return b.pieceTheme.replace(/{piece}/g, a);
                r(8272, "Unable to build image source for cfg.pieceTheme.");
                return "";
            }
            function D(a, b, c) {
                var d = '<img src="' + Y(a) + '" ';
                c && "string" === typeof c && (d += 'id="' + c + '" ');
                d += 'alt="" class="' + h.piece + '" data-piece="' + a + '" style="width: ' + p + "px;height: " + p + "px;";
                !0 === b && (d += "display:none;");
                return d + '" />';
            }
            function N(a) {
                var b = "wK wQ wR wB wN wP".split(" ");
                "black" === a && (b = "bK bQ bR bB bN bP".split(" "));
                a = "";
                for (var c = 0; c < b.length; c++) a += D(b[c], !1, M[b[c]]);
                return a;
            }
            function ha(a, e, c, d) {
                a = $("#" + s[a]);
                var C = a.offset(),
                    f = $("#" + s[e]);
                e = f.offset();
                var k = n();
                $("body").append(D(c, !0, k));
                var g = $("#" + k);
                g.css({ display: "", position: "absolute", top: C.top, left: C.left });
                a.find("." + h.piece).remove();
                g.animate({'left': e.left, 'top' : e.top}, {
                    duration: b.moveSpeed,
                    queue: false,
                    complete: function () {
                        f.append(D(c));
                        g.remove();
                        "function" === typeof d && d();
                    },
                }).animate({ 'opacity' : 0}, {
                    duration: b.blinkSpeed / 15 * 4 ,
                    queue: true,
                    complete: function () {

                    },
                }).animate({ 'opacity' : 1}, {
                    duration: b.blinkSpeed / 15 * 3 ,
                    queue: true,
                    complete: function () {

                    },
                }).animate({ 'opacity' : 0}, {
                    duration: b.blinkSpeed / 15 * 2 ,
                    queue: true,
                    complete: function () {

                    },
                }).animate({ 'opacity' : 1}, {
                    duration: b.blinkSpeed / 15 * 6 ,
                    queue: true,
                    complete: function () {

                    },
                });
            }
            function ia(a, e, c) {
                var d = $("#" + M[a]).offset(),
                    f = $("#" + s[e]);
                e = f.offset();
                var g = n();
                $("body").append(D(a, !0, g));
                var k = $("#" + g);
                k.css({ display: "", position: "absolute", left: d.left, top: d.top });
                k.animate(e, {
                    duration: {'left': e.left, 'top' : e.top},
                    complete: function () {
                        f.find("." + h.piece).remove();
                        f.append(D(a));
                        k.remove();
                        "function" === typeof c && c();
                    },
                });
            }
            function ja(a, e, c) {
                function d() {
                    f++;
                    if (f === a.length && (G(), !0 === b.hasOwnProperty("onMoveEnd") && "function" === typeof b.onMoveEnd)) b.onMoveEnd(m(e), m(c));
                }
                for (var f = 0, g = 0; g < a.length; g++)
                {
                    "clear" === a[g].type && $("#" + s[a[g].square] + " ." + h.piece).fadeOut(b.trashSpeed, d),
                        "add" === a[g].type &&
                            !0 !== b.sparePieces &&
                            $("#" + s[a[g].square])
                                .append(D(a[g].piece, !0))
                                .find("." + h.piece)
                                .animate({'opacity' : 0, queue : true}, 200, function(){
                               
                                }).animate({'opacity' : 1, queue : true}, 200, function(){
                               
                                }),
                        "add" === a[g].type && !0 === b.sparePieces && ia(a[g].piece, a[g].square, d),
                        "move" === a[g].type && ha(a[g].source, a[g].destination, a[g].piece, d);

                }
            }
            function ka(a, b) {
                a = a.split("");
                var c = B.indexOf(a[0]) + 1,
                    d = parseInt(a[1], 10);
                b = b.split("");
                var g = B.indexOf(b[0]) + 1,
                    f = parseInt(b[1], 10),
                    c = Math.abs(c - g),
                    d = Math.abs(d - f);
                return c >= d ? c : d;
            }
            function la(a) {
                for (var b = [], c = 0; 8 > c; c++)
                    for (var d = 0; 8 > d; d++) {
                        var g = B[c] + (d + 1);
                        a !== g && b.push({ square: g, distance: ka(a, g) });
                    }
                b.sort(function (a, b) {
                    return a.distance - b.distance;
                });
                a = [];
                for (c = 0; c < b.length; c++) a.push(b[c].square);
                return a;
            }
            // Initialize 
            function G(i=false) {
                if (i)
                {
                    
                }
                x.find("." + h.piece).remove();
                for (var a in g) 
                {

                        !0 === g.hasOwnProperty(a) && $("#" + s[a]).append(D(g[a], !1, 'piece_' + s[a]));
                        i && $("#piece_" +s[a]).animate({'opacity' : 0}, {duration : 0, queue : true}) && window.setTimeout(function(i) { $("#piece_" +i)
                        .animate({'opacity' : 1}, {duration : 200, queue : true});
                    }, Math.random() * 2000, s[a]) ;

                }

                   
      
            }
            function R() {
                x.html(A(u));
                G(i=true);
                !0 === b.sparePieces && ("white" === u ? (S.html(N("black")), T.html(N("white"))) : (S.html(N("white")), T.html(N("black"))));
            }
            function O(a) {
                var e = m(g),
                    c = m(a),
                    d = L(e),
                    f = L(c);
                if (d !== f) {
                    if (!0 === b.hasOwnProperty("onChange") && "function" === typeof b.onChange) b.onChange(e, c);
                    g = a;
                }
            }
            function U(a, b) {
                for (var c in J)
                    if (!0 === J.hasOwnProperty(c)) {
                        var d = J[c];
                        if (a >= d.left && a < d.left + p && b >= d.top && b < d.top + p) return c;
                    }
                return "offboard";
            }
            function V() {
                x.find("." + h.square).removeClass(h.highlight1 + " " + h.highlight2);
            }
            function ma() {
                function a() {
                    G();
                    y.css("display", "none");
                    if (!0 === b.hasOwnProperty("onSnapbackEnd") && "function" === typeof b.onSnapbackEnd) b.onSnapbackEnd(E, t, m(g), u);
                }
                if ("spare" === t) Z();
                else {
                    V();
                    var e = $("#" + s[t]).offset();
                    y.animate(e, { duration: b.snapbackSpeed, complete: a });
                    z = !1;
                }
            }
            function Z() {
                V();
                var a = m(g);
                delete a[t];
                O(a);
                G();
                y.fadeOut(b.trashSpeed);
                z = !1;
            }
            function na(a) {
                V();
                var e = m(g);
                delete e[t];
                e[a] = E;
                O(e);
                e = $("#" + s[a]).offset();
                y.animate(e, {
                    duration: b.snapSpeed,
                    complete: function () {
                        G();
                        y.css("display", "none");
                        if (!0 === b.hasOwnProperty("onSnapEnd") && "function" === typeof b.onSnapEnd) b.onSnapEnd(t, a, E);
                    },
                });
                z = !1;
            }
            function P(a, e, c, d) {
                if ("function" !== typeof b.onDragStart || !1 !== b.onDragStart(a, e, m(g), u)) {
                    z = !0;
                    E = e;
                    t = a;
                    H = "spare" === a ? "offboard" : a;
                    J = {};
                    for (var f in s) !0 === s.hasOwnProperty(f) && (J[f] = $("#" + s[f]).offset());
                    y.attr("src", Y(e)).css({ display: "", position: "absolute", left: c - p / 2, top: d - p / 2 });
                    "spare" !== a &&
                        $("#" + s[a])
                            .addClass(h.highlight1)
                            .find("." + h.piece)
                            .css("display", "none");
                }
            }
            function aa(a, e) {
                y.css({ left: a - p / 2, top: e - p / 2 });
                var c = U(a, e);
                if (c !== H) {
                    !0 === l(H) && $("#" + s[H]).removeClass(h.highlight2);
                    !0 === l(c) && $("#" + s[c]).addClass(h.highlight2);
                    if ("function" === typeof b.onDragMove) b.onDragMove(c, H, t, E, m(g), u);
                    H = c;
                }
            }
            function ba(a) {
                var e = "drop";
                "offboard" === a && "snapback" === b.dropOffBoard && (e = "snapback");
                "offboard" === a && "trash" === b.dropOffBoard && (e = "trash");
                if (!0 === b.hasOwnProperty("onDrop") && "function" === typeof b.onDrop) {
                    var c = m(g);
                    "spare" === t && !0 === l(a) && (c[a] = E);
                    !0 === l(t) && "offboard" === a && delete c[t];
                    !0 === l(t) && !0 === l(a) && (delete c[t], (c[a] = E));
                    var d = m(g),
                        c = b.onDrop(t, a, E, c, d, u);
                    if ("snapback" === c || "trash" === c) e = c;
                }
                "snapback" === e ? ma() : "trash" === e ? Z() : "drop" === e && na(a);
            }
            function oa(a) {
                a.preventDefault();
            }
            function pa(a) {
                if (!0 === b.draggable) {
                    var e = $(this).attr("data-square");
                    !0 === l(e) && !0 === g.hasOwnProperty(e) && P(e, g[e], a.pageX, a.pageY);
                }
            }
            function qa(a) {
                if (!0 === b.draggable) {
                    var e = $(this).attr("data-square");
                    !0 === l(e) && !0 === g.hasOwnProperty(e) && ((a = a.originalEvent), P(e, g[e], a.changedTouches[0].pageX, a.changedTouches[0].pageY));
                }
            }
            function ra(a) {
                if (!0 === b.sparePieces) {
                    var e = $(this).attr("data-piece");
                    P("spare", e, a.pageX, a.pageY);
                }
            }
            function sa(a) {
                if (!0 === b.sparePieces) {
                    var e = $(this).attr("data-piece");
                    a = a.originalEvent;
                    P("spare", e, a.changedTouches[0].pageX, a.changedTouches[0].pageY);
                }
            }
            function ca(a) {
                !0 === z && aa(a.pageX, a.pageY);
            }
            function ta(a) {
                !0 === z && (a.preventDefault(), aa(a.originalEvent.changedTouches[0].pageX, a.originalEvent.changedTouches[0].pageY));
            }
            function da(a) {
                !0 === z && ((a = U(a.pageX, a.pageY)), ba(a));
            }
            function ua(a) {
                !0 === z && ((a = U(a.originalEvent.changedTouches[0].pageX, a.originalEvent.changedTouches[0].pageY)), ba(a));
            }
            function va(a) {
                if (!1 === z && !0 === b.hasOwnProperty("onMouseoverSquare") && "function" === typeof b.onMouseoverSquare && ((a = $(a.currentTarget).attr("data-square")), !0 === l(a))) {
                    var e = !1;
                    !0 === g.hasOwnProperty(a) && (e = g[a]);
                    b.onMouseoverSquare(a, e, m(g), u);
                }
            }
            function wa(a) {
                if (!1 === z && !0 === b.hasOwnProperty("onMouseoutSquare") && "function" === typeof b.onMouseoutSquare && ((a = $(a.currentTarget).attr("data-square")), !0 === l(a))) {
                    var e = !1;
                    !0 === g.hasOwnProperty(a) && (e = g[a]);
                    b.onMouseoutSquare(a, e, m(g), u);
                }
            }
            function xa() {
                $("body").on("mousedown mousemove", "." + h.piece, oa);
                x.on("mousedown", "." + h.square, pa);
                v.on("mousedown", "." + h.sparePieces + " ." + h.piece, ra);
                x.on("mouseenter", "." + h.square, va);
                x.on("mouseleave", "." + h.square, wa);
                !0 === (navigator && navigator.userAgent && -1 !== navigator.userAgent.search(/MSIE/))
                    ? ((document.ondragstart = function () {
                          return !1;
                      }),
                      $("body").on("mousemove", ca),
                      $("body").on("mouseup", da))
                    : ($(window).on("mousemove", ca), $(window).on("mouseup", da));
                !0 === "ontouchstart" in document.documentElement && (x.on("touchstart", "." + h.square, qa), v.on("touchstart", "." + h.sparePieces + " ." + h.piece, sa), $(window).on("touchmove", ta), $(window).on("touchend", ua));
            }
            function ya() {
                v.html(ga());
                x = v.find("." + h.board);
                !0 === b.sparePieces && ((S = v.find("." + h.sparePiecesTop)), (T = v.find("." + h.sparePiecesBottom)));
                var a = n();
                $("body").append(D("wP", !0, a));
                y = $("#" + a);
                ea = parseInt(x.css("borderLeftWidth"), 10);
                q.resize();


            }
            b = b || {};
            // Define starting state 
            var fa = K("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"),
                h = {
                    alpha: "alpha-d2270",
                    black: "black-3c85d",
                    board: "board-b72b1",
                    chessboard: "chessboard-63f37",
                    clearfix: "clearfix-7da63",
                    highlight1: "highlight1-32417",
                    highlight2: "highlight2-9c5d2",
                    notation: "notation-322f9",
                    numeric: "numeric-fc462",
                    piece: "piece-417db",
                    row: "row-5277c",
                    sparePieces: "spare-pieces-7492f",
                    sparePiecesBottom: "spare-pieces-bottom-ae20f",
                    sparePiecesTop: "spare-pieces-top-4028b",
                    square: "square-55d63",
                    white: "white-1e1d7",
                },
                v,
                x,
                y,
                S,
                T,
                q = {},
                ea = 2,
                u = "white",
                g = {},
                p,
                E,
                H,
                t,
                z = !1,
                M = {},
                s = {},
                J;
            q.clear = function (a) {
                q.position({}, a);
            };
            q.destroy = function () {
                v.html("");
                y.remove();
                v.unbind();
            };
            q.fen = function () {
                return q.position("fen");
            };
            q.flip = function () {
                q.orientation("flip");
            };
            q.move = function () {
                if (0 !== arguments.length) {
                    for (var a = !0, b = {}, c = 0; c < arguments.length; c++)
                        if (!1 === arguments[c]) a = !1;
                        else {
                            var d;
                            d = arguments[c];
                            "string" !== typeof d ? (d = !1) : ((d = d.split("-")), (d = 2 !== d.length ? !1 : !0 === l(d[0]) && !0 === l(d[1])));
                            !0 !== d ? r(2826, "Invalid move passed to the move method.", arguments[c]) : ((d = arguments[c].split("-")), (b[d[0]] = d[1]));
                        }
                    var c = g,
                        c = m(c),
                        f;
                    for (f in b) !0 === b.hasOwnProperty(f) && !0 === c.hasOwnProperty(f) && ((d = c[f]), delete c[f], (c[b[f]] = d));
                    b = c;
                    q.position(b, a);
                    return b;
                }
            };
            q.orientation = function (a) {
                if (0 === arguments.length) return u;
                "white" === a || "black" === a ? ((u = a), R()) : "flip" === a ? ((u = "white" === u ? "black" : "white"), R()) : r(5482, "Invalid value passed to the orientation method.", a);
            };
            q.position = function (a, b) {
                if (0 === arguments.length) return m(g);
                if ("string" === typeof a && "fen" === a.toLowerCase()) return L(g);
                !1 !== b && (b = !0);
                "string" === typeof a && "start" === a.toLowerCase() && (a = m(fa));
                !0 === Q(a) && (a = K(a));
                if (!0 !== F(a)) r(6482, "Invalid value passed to the position method.", a);
                else if (!0 === b) {
                    var c = g,
                        d = a,
                        c = m(c),
                        d = m(d),
                        f = [],
                        h = {},
                        k;
                    for (k in d) !0 === d.hasOwnProperty(k) && !0 === c.hasOwnProperty(k) && c[k] === d[k] && (delete c[k], delete d[k]);

                    for (k in d)
                        if (!0 === d.hasOwnProperty(k)) {
                            var l;
                            a: {
                                l = c;
                                for (var n = d[k], s = la(k), p = 0; p < s.length; p++) {
                                    var q = s[p];
                                    if (!0 === l.hasOwnProperty(q) && l[q] === n) {
                                        l = q;
                                        break a;
                                    }
                                }
                                l = !1;
                            }
                            !1 !== l && (f.push({ type: "move", source: l, destination: k, piece: d[k] }), delete c[l], delete d[k], (h[k] = !0));
                        }
                    for (k in d) !0 === d.hasOwnProperty(k) && (f.push({ type: "add", square: k, piece: d[k] }), delete d[k]);

                    for (k in c) !0 === c.hasOwnProperty(k) && !0 !== h.hasOwnProperty(k) && (f.push({ type: "clear", square: k, piece: c[k] }), delete c[k]);
                    ja(f, g, a);
                    O(a);
                } else O(a), G();
            };
            q.resize = function () {
                var a = parseInt(v.css("width"), 10);
                if (!a || 0 >= a) p = 0;
                else {
                    for (a -= 1; 0 !== a % 8 && 0 < a; ) a--;
                    p = a / 8;
                }
                x.css("width", 8 * p + "px");
                y.css({ height: p, width: p });
                !0 === b.sparePieces && v.find("." + h.sparePieces).css("paddingLeft", p + ea + "px");
                R();
            };
            q.start = function (a) {
                
                q.position("start", a);
            };
            var W;
            if (
                (W =
                    !0 ===
                    (function () {
                        if ("string" === typeof f) {
                            if ("" === f) return window.alert("ChessBoard Error 1001: The first argument to ChessBoard() cannot be an empty string.\n\nExiting..."), !1;
                            var a = document.getElementById(f);
                            if (!a) return window.alert('ChessBoard Error 1002: Element with id "' + f + '" does not exist in the DOM.\n\nExiting...'), !1;
                            v = $(a);
                        } else if (((v = $(f)), 1 !== v.length)) return window.alert("ChessBoard Error 1003: The first argument to ChessBoard() must be an ID or a single DOM node.\n\nExiting..."), !1;
                        if (!window.JSON || "function" !== typeof JSON.stringify || "function" !== typeof JSON.parse) return window.alert("ChessBoard Error 1004: JSON does not exist. Please include a JSON polyfill.\n\nExiting..."), !1;
                        if ((a = typeof window.$))
                            if ((a = $.fn))
                                if ((a = $.fn.jquery))
                                    var a = $.fn.jquery,
                                        b = "1.7.0",
                                        a = X(a),
                                        b = X(b),
                                        a = !0 === 1e8 * a.major + 1e4 * a.minor + a.patch >= 1e8 * b.major + 1e4 * b.minor + b.patch;
                        return a ? !0 : (window.alert("ChessBoard Error 1005: Unable to find a valid version of jQuery. Please include jQuery 1.7.0 or higher on the page.\n\nExiting..."), !1);
                    })())
            ) {
                if ("string" === typeof b || !0 === F(b)) b = { position: b };
                "black" !== b.orientation && (b.orientation = "white");
                u = b.orientation;
                !1 !== b.showNotation && (b.showNotation = !0);
                !0 !== b.draggable && (b.draggable = !1);
                "trash" !== b.dropOffBoard && (b.dropOffBoard = "snapback");
                !0 !== b.sparePieces && (b.sparePieces = !1);
                !0 === b.sparePieces && (b.draggable = !0);
                if (!0 !== b.hasOwnProperty("pieceTheme") || ("string" !== typeof b.pieceTheme && "function" !== typeof b.pieceTheme)) b.pieceTheme = "img/chesspieces/wikipedia/{piece}.svg";
                if (!0 !== b.hasOwnProperty("appearSpeed") || !0 !== w(b.appearSpeed)) b.appearSpeed = 50;
                if (!0 !== b.hasOwnProperty("moveSpeed") || !0 !== w(b.moveSpeed)) b.moveSpeed = 300;
                if (!0 !== b.hasOwnProperty("blinkSpeed") || !0 !== w(b.moveSpeed)) b.blinkSpeed = 300;
                if (!0 !== b.hasOwnProperty("snapbackSpeed") || !0 !== w(b.snapbackSpeed)) b.snapbackSpeed = 50;
                if (!0 !== b.hasOwnProperty("snapSpeed") || !0 !== w(b.snapSpeed)) b.snapSpeed = 25;
                if (!0 !== b.hasOwnProperty("trashSpeed") || !0 !== w(b.trashSpeed)) b.trashSpeed = 100;
                !0 === b.hasOwnProperty("position") &&
                    ("start" === b.position ? (g = m(fa)) : !0 === Q(b.position) ? (g = K(b.position)) : !0 === F(b.position) ? (g = m(b.position)) : r(7263, "Invalid value passed to config.position.", b.position));
                W = !0;
            }
            W && (I(), ya(), xa());
            return q;
        };
    window.ChessBoard.fenToObj = K;
    window.ChessBoard.objToFen = L;

})();

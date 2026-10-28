/* ================================================================== */
/* AXONE — main.js · vanilla, no dependencies, no external requests    */
/* 1 i18n · 2 theme · 3 lang · 4 burger · 5 nav spy · 6 smooth-scroll   */
/* 7 reveal · 8 counters · 9 weight bar · 10 gallery+lightbox · 11 hero */
/* Coverage content comes from js/analyses.js (rendered in step 0).    */
/* ================================================================== */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------- 1. I18N DICTIONARY ---------------------- */
  var FR = {
    "skip":"Aller au contenu",
    "nav.about":"À propos","nav.research":"Recherche","nav.method":"Méthodologie","nav.contact":"Contact",
    "hero.badge":"Une analyse approfondie chaque mois",
    "hero.title":"Axone — Recherche actions indépendante",
    "hero.sub":"Des valorisations publiées en accès libre.",
    "hero.cta1":"Lire la dernière analyse","hero.cta2":"Télécharger le dernier pitchbook",
    "hero.covering":"Univers de couverture",
    "hero.m1":"Couverture","hero.m2":"Méthodes par valeur","hero.m3":"Établi à partir de","hero.m3v":"Documents publics",
    "about.eyebrow":"À propos","about.title":"Ce qu'est Axone",
    "about.p1":"Axone, c'est la recherche actions indépendante de Rezi Sabashvili. Chaque valeur est analysée comme en banque — DCF, comparables boursiers, transactions précédentes et synthèse en football field — entièrement à partir de documents publics.",
    "about.p2":"Chaque analyse est livrée avec son modèle Excel et son pitchbook : hypothèses, bridges et sensibilités sont ouverts. Aucune boîte noire — le WACC est construit de bas en haut, l'EBIT est défini de façon cohérente, et la cible pondère explicitement chaque méthode.",
    "research.eyebrow":"Recherche","research.title":"Couverture","research.published":"Publié","research.soon":"À venir",
    "research.read":"Lire l'analyse →","research.statusSoon":"Bientôt",
    // shared deep-dive labels (per-analysis text lives in js/analyses.js)
    "dd.target":"Cible","dd.upside":"Potentiel","dd.current":"Cours actuel",
    "dd.s1":"Prix cible","dd.s2":"Potentiel vs cours","dd.thesisT":"Thèse d'investissement",
    "dd.hideG":"Masquer les exhibits",
    "dd.dlT":"Téléchargements","dd.dlPitch":"Pitchbook complet","dd.dlModel":"Modèle sous-jacent",
    "method.eyebrow":"Méthodologie","method.title":"Comment chaque valeur est valorisée",
    "method.lede":"Trois méthodes indépendantes, triangulées en une cible unique.",
    "method.c1t":"Flux de trésorerie actualisés","method.c1":"FCF désendettés actualisés au WACC ; valeur terminale recoupée via croissance de Gordon et multiple de sortie EV/EBITDA. EBIT = résultat opérationnel courant, fiscalisé à un taux normalisé de 25%.",
    "method.c2t":"Construction du WACC","method.c2":"Coût des fonds propres via CAPM (taux sans risque, bêta endetté, prime de risque), combiné au coût de la dette après impôt à la structure cible. Dette nette en norme IFRS-16.",
    "method.c3t":"Comparables boursiers","method.c3":"EV/EBITDA et EV/Ventes face à un échantillon de pairs sélectionné, comparé à la médiane pour isoler la décote ou la prime intégrée.",
    "method.c4t":"Transactions précédentes","method.c4":"Multiples de transactions de contrôle issus de M&A sectoriels comparables, posant un plancher de rachat aux côtés du DCF stand-alone.",
    "method.c5t":"Somme des parties","method.c5":"Pour les groupes multi-activités, chaque pôle est valorisé sur l'EV/EBIT de ses propres pairs cotés, puis les valeurs sont additionnées en valeur d'entreprise et ramenées aux capitaux propres, ce qui rend explicite toute décote de conglomérat.",
    "method.c6t":"Banques : actualisation des dividendes & P/TBV vs RoTE","method.c6":"Les dépôts et la dette sont la matière première d'une banque : VE, WACC et FCFF ne s'appliquent pas. La valeur vient du capital distribuable : un DDM sur le capital excédentaire au coût des fonds propres du CAPM, un P/TBV justifié = (RoTE − g) / (Ke − g), et des comparables et précédents lus en P/TBV face au RoTE.",
    "method.blend":"La cible mixte pondère trois méthodes, adaptées au modèle économique de chaque valeur, avec une grille de sensibilité à deux entrées (taux d'actualisation × hypothèse terminale) publiée pour chaque valeur.",
    "pipe.eyebrow":"Pipeline","pipe.title":"Prochaines analyses","pipe.lede":"Une par mois. Dans l'ordre :",
    "sub.eyebrow":"Restez informé","sub.title":"Soyez notifié des nouvelles analyses",
    "sub.lede":"Un e-mail à chaque nouvelle analyse publiée. Pas de spam — désinscription à tout moment.",
    "sub.label":"Adresse e-mail","sub.btn":"Me notifier",
    "contact.title":"Contact & liens","contact.portfolio":"Portfolio",
    "contact.disc":"À but pédagogique uniquement. Ne constitue ni un conseil en investissement, ni une offre, ni une sollicitation. Établi à partir de documents publics."
  };
  /* ------------------ 0. RENDER FROM js/analyses.js ---------------- */
  // Each block is written in English with a data-i18n key; the French text
  // is registered in FR, so the language switch below works unchanged.
  var DATA = window.AXONE_DATA || { published: [], upcoming: [] };
  var PUB = DATA.published, UP = DATA.upcoming;
  var LATEST = PUB[PUB.length - 1];
  var TODO = "TODO";
  function has(v) { return v != null && v !== ""; }
  function val(v) { return has(v) ? v : TODO; }
  // register FR text for a key, return the EN text for the markup
  function tr(key, o) {
    o = o || {};
    FR[key] = has(o.fr) ? o.fr : TODO;
    return has(o.en) ? o.en : TODO;
  }
  function nb(s) { return String(val(s)).replace(/ /g, "&nbsp;"); }
  function pct(v) { return has(v) ? (v >= 0 ? "+" : "−") + Math.abs(v) + "%" : TODO; }
  function eur(v) { return has(v) ? "€" + v : TODO; }
  function upCls(v) { return has(v) && v < 0 ? "neg" : "pos"; }
  function showLabel(a, lang) {
    var n = a.exhibits ? a.exhibits.en.length : 0;
    return (lang === "fr" ? "En savoir plus — voir les {n} exhibits" : "Learn more — view all {n} exhibits").replace("{n}", n);
  }
  function count(v, pre, suf, dec) {
    if (!has(v)) return TODO;
    return '<span class="count" data-to="' + v + '"' +
      (pre ? ' data-prefix="' + pre + '"' : "") + (suf ? ' data-suffix="' + suf + '"' : "") +
      (dec ? ' data-dec="' + dec + '"' : "") + ">" + (pre || "") + "0" + (suf || "") + "</span>";
  }

  function renderCoverage() {
    var pub = $("#cov-published"), soon = $("#cov-soon");
    if (pub) pub.innerHTML = PUB.map(function (a) {
      return '<a class="cov cov--live" href="#' + a.id + '" data-reveal>' +
        '<span class="cov__no">' + a.no + "</span>" +
        '<span class="cov__body">' +
          '<span class="cov__name">' + a.name + ' <span class="tk">(' + nb(a.ticker) + ")</span></span>" +
          '<span class="cov__meta">' +
            '<span class="chip chip--' + String(val(a.rating)).toLowerCase() + '">' + val(a.rating) + "</span>" +
            '<span class="cov__num"><span data-i18n="dd.target">Target</span> ' + eur(a.target) +
              ' · <span class="' + upCls(a.upside) + '">' + pct(a.upside) + "</span></span>" +
          "</span>" +
          '<span class="cov__tag" data-i18n="' + a.id + '.tag">' + tr(a.id + ".tag", a.tag) + "</span>" +
        "</span>" +
        '<span class="cov__go" data-i18n="research.read">Read deep-dive →</span></a>';
    }).join("");
    if (soon) soon.innerHTML = UP.map(function (u) {
      return '<li class="cov cov--soon" data-reveal>' +
        '<span class="cov__no">' + u.no + "</span>" +
        '<span class="cov__body">' +
          '<span class="cov__name">' + u.name + ' <span class="tk">(' + nb(u.ticker) + ")</span></span>" +
          '<span class="cov__tag" data-i18n="up.' + u.id + '.tag">' + tr("up." + u.id + ".tag", u.tag) + "</span>" +
        "</span>" +
        '<span class="cov__status" data-i18n="research.statusSoon">Soon</span></li>';
    }).join("");
    // hide the "Coming soon" label when nothing is queued
    if (soon && !UP.length && soon.previousElementSibling) soon.previousElementSibling.hidden = true;
  }

  function renderDeepDive(a, i) {
    var k = a.id, m = a.metric || {};
    FR[k + ".eyebrow"] = "Analyse phare · " + a.no;
    FR[k + ".showG"] = showLabel(a, "fr");
    var thesis = (a.thesis || []).map(function (t, j) {
      var n = j + 1;
      return '<li data-reveal><b data-i18n="' + k + ".t" + n + 'b">' + tr(k + ".t" + n + "b", t.b) + "</b>" +
        '<span data-i18n="' + k + ".t" + n + '">' + tr(k + ".t" + n, t.t) + "</span></li>";
    }).join("");
    var f = a.files || {}, dlName = "Axone — " + a.short + " (" + a.ticker + ") — ";
    return '<section class="section' + (i % 2 ? " section--alt" : "") + '" id="' + k + '" aria-labelledby="' + k + '-title">' +
      '<div class="container">' +
        '<p class="eyebrow" data-reveal data-i18n="' + k + '.eyebrow">Featured analysis · ' + a.no + "</p>" +
        '<div class="dd-head" data-reveal>' +
          '<div class="dd-head__id">' +
            '<h2 class="h2" id="' + k + '-title">' + a.name + ' <span class="tk">(' + val(a.ticker) + ")</span></h2>" +
            '<span class="chip chip--' + String(val(a.rating)).toLowerCase() + '">' + val(a.rating) + "</span>" +
          "</div>" +
          '<p class="dd-head__line">' +
            '<span data-i18n="dd.target">Target</span> ' + eur(a.target) +
            ' <span class="dot">·</span> ' +
            '<span class="' + upCls(a.upside) + '"><span data-i18n="dd.upside">Upside</span> ' + pct(a.upside) + "</span>" +
            ' <span class="dot">·</span> ' +
            '<span data-i18n="dd.current">Current</span> ' + eur(a.current) +
          "</p>" +
        "</div>" +
        '<ul class="stats" aria-label="Key statistics">' +
          '<li data-reveal><span class="stats__v">' + count(a.target, "€") + '</span><span class="stats__l" data-i18n="dd.s1">Target price</span></li>' +
          '<li data-reveal><span class="stats__v ' + upCls(a.upside) + '">' + (has(a.upside) ? count(Math.abs(a.upside), a.upside >= 0 ? "+" : "−", "%") : TODO) + '</span><span class="stats__l" data-i18n="dd.s2">Upside to current</span></li>' +
          '<li data-reveal><span class="stats__v">' + count(m.value, "", "%", m.dec) + '</span><span class="stats__l" data-i18n="' + k + '.s3">' + tr(k + ".s3", m.label) + "</span></li>" +
          '<li data-reveal><span class="stats__v" data-i18n="' + k + '.s4v">' + tr(k + ".s4v", a.method) + '</span><span class="stats__l" data-i18n="' + k + '.s4">' + tr(k + ".s4", a.methodDetail) + "</span></li>" +
        "</ul>" +
        '<h3 class="h3" data-reveal data-i18n="dd.thesisT">Investment thesis</h3>' +
        '<ul class="thesis">' + thesis + "</ul>" +
        '<div class="learn" data-reveal>' +
          '<button class="learn__btn" id="' + k + '-gallery-toggle" data-gallery="' + k + '" type="button" aria-expanded="false" aria-controls="' + k + '-gallery">' +
            '<span data-i18n="' + k + '.showG">' + showLabel(a, "en") + "</span>" +
            '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
          "</button>" +
          '<div class="gallery" id="' + k + '-gallery" hidden>' +
            '<div class="gallery__grid" id="' + k + '-gallery-grid" data-gallery="' + k + '"></div>' +
          "</div>" +
        "</div>" +
        '<h3 class="h3" data-reveal data-i18n="dd.dlT">Downloads</h3>' +
        '<div class="dl-row" data-reveal>' +
          '<a class="btn btn--outline" href="' + val(f.pitch) + '" download="' + dlName + 'Pitchbook.pptx">' +
            '<span data-i18n="dd.dlPitch">Full pitchbook</span><span class="btn__ext">.pptx</span></a>' +
          '<a class="btn btn--outline" href="' + val(f.model) + '" download="' + dlName + 'Valuation Model.xlsx">' +
            '<span data-i18n="dd.dlModel">Underlying model</span><span class="btn__ext">.xlsx</span></a>' +
        "</div>" +
      "</div></section>";
  }

  function renderBlend() {
    var el = $("#blend-list"); if (!el) return;
    var seg = ["dcf", "comps", "prec"]; // colour slots 1-2-3
    el.innerHTML = PUB.map(function (a) {
      var w = a.weights || [];
      return '<div class="blend__item">' +
        '<p class="subhead blend__name"><span class="cov__no">' + a.no + "</span> " + a.short + ' <span class="tk">(' + nb(a.ticker) + ")</span></p>" +
        '<div class="wbar" aria-hidden="true">' + w.map(function (x, j) {
          return '<span class="wbar__seg wbar__seg--' + seg[j % 3] + '" data-w="' + (has(x.w) ? x.w : 0) + '"></span>';
        }).join("") + "</div>" +
        '<ul class="wkey">' + w.map(function (x, j) {
          var key = "method.w." + a.id + "." + j;
          return '<li><i class="sw sw--' + seg[j % 3] + '"></i><b>' + (has(x.w) ? x.w + "%" : TODO) + "</b> " +
            '<span data-i18n="' + key + '">' + tr(key, x.label) + "</span></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }

  function renderPipeline() {
    var el = $("#pipe-list"); if (!el) return;
    el.innerHTML = UP.map(function (u) {
      return '<li data-reveal><span class="pipe__no">' + u.no + "</span><div>" +
        '<span class="pipe__name">' + u.name + ' <span class="tk">(' + nb(u.ticker) + ")</span></span>" +
        '<span class="pipe__note" data-i18n="up.' + u.id + '.note">' + tr("up." + u.id + ".note", u.note) + "</span></div></li>";
    }).join("");
  }

  function renderHero() {
    var cyc = $("#hero-cycle");
    if (cyc) cyc.innerHTML = PUB.map(function (a) { return a.short; })
      .concat(UP.map(function (u) { return u.name; }))
      .map(function (n, i) { return '<span class="text-cycle__word' + (i ? "" : " is-active") + '">' + n + "</span>"; }).join("");
    if (!LATEST) return;
    var cta = $("#hero-latest"); if (cta) cta.setAttribute("href", "#" + LATEST.id);
    var dl = $("#hero-pitch");
    if (dl && LATEST.files) {
      dl.setAttribute("href", LATEST.files.pitch);
      dl.setAttribute("download", "Axone — " + LATEST.short + " (" + LATEST.ticker + ") — Pitchbook.pptx");
    }
    var p3 = $("#about-p3"), first = PUB[0];
    if (p3 && first) {
      var f = first.name + " (" + nb(first.ticker) + ")", l = LATEST.name + " (" + nb(LATEST.ticker) + ")";
      p3.innerHTML = "One deep-dive per month, minimum. First published: " + f + ". Latest: " + l + ".";
      FR["about.p3"] = "Une analyse approfondie par mois, au minimum. Première publiée : " + f + ". Dernière : " + l + ".";
    }
  }

  renderCoverage();
  var dd = $("#deep-dives");
  if (dd) dd.innerHTML = PUB.map(renderDeepDive).join("");
  renderBlend();
  renderPipeline();
  renderHero();

  // English originals captured from the DOM so we can switch back.
  var EN = {};
  var nodes = $$("[data-i18n]");
  nodes.forEach(function (el) { EN[el.getAttribute("data-i18n")] = el.innerHTML; });

  function applyLang(lang) {
    var dict = lang === "fr" ? FR : EN;
    nodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    root.setAttribute("lang", lang);
    try { localStorage.setItem("axone-lang", lang); } catch (e) {}
    var cur = $(".lang-cur"), oth = $(".lang-oth");
    if (cur && oth) { cur.textContent = lang.toUpperCase(); oth.textContent = lang === "fr" ? "EN" : "FR"; }
    // refresh gallery captions + learn-more toggle labels
    buildGallery();
    $$(".learn__btn[data-gallery]").forEach(syncToggle);
  }

  /* ---------------------------- 2. THEME -------------------------- */
  var themeBtn = $("#theme-toggle");
  function syncTheme() {
    var d = root.getAttribute("data-theme") === "dark";
    if (themeBtn) { themeBtn.setAttribute("aria-pressed", d); themeBtn.setAttribute("aria-label", d ? "Switch to light theme" : "Switch to dark theme"); }
  }
  syncTheme();
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("axone-theme", next); } catch (e) {}
    syncTheme();
  });

  /* ----------------------------- 3. LANG -------------------------- */
  var langBtn = $("#lang-toggle");
  if (langBtn) langBtn.addEventListener("click", function () {
    applyLang(root.getAttribute("lang") === "fr" ? "en" : "fr");
  });

  /* ---------------------------- 4. BURGER ------------------------- */
  var burger = $("#nav-burger"), nav = $("#primary-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
    });
  }

  /* --------------------------- 5. NAV SPY ------------------------- */
  var links = $$(".nav-link");
  var byId = {}; links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });
  var map = { about:"about", research:"research", pipeline:"research", methodology:"methodology", contact:"contact" };
  PUB.forEach(function (a) { map[a.id] = "research"; });
  var watched = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (watched.length) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var t = byId[map[e.target.id]]; if (t) t.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    watched.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------ 6. SMOOTH SCROLL ---------------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var h = a.getAttribute("href"); if (h.length < 2) return;
      var t = document.getElementById(h.slice(1)); if (!t) return;
      e.preventDefault();
      var hh = parseInt(getComputedStyle(root).getPropertyValue("--header-h"), 10) || 66;
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - hh - 14, behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* --------------------------- 7. REVEAL -------------------------- */
  var reveals = $$("[data-reveal]");
  if (reduced) { reveals.forEach(function (el) { el.classList.add("in"); }); }
  else {
    var ro = new IntersectionObserver(function (es, o) {
      es.forEach(function (e, i) {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
          e.target.classList.add("in"); o.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* -------------------------- 8. COUNTERS ------------------------- */
  function runCount(el) {
    var to = parseFloat(el.getAttribute("data-to"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var sep = (root.getAttribute("lang") === "fr" && dec > 0) ? "," : ".";
    if (reduced) { el.textContent = pre + to.toFixed(dec).replace(".", sep) + suf; return; }
    var start = performance.now(), dur = 1200;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (to * eased).toFixed(dec).replace(".", sep) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  $$(".count").forEach(function (el) {
    var io = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(el); o.disconnect(); } });
    }, { threshold: .5 });
    io.observe(el);
  });

  /* ------------------------- 9. WEIGHT BAR ------------------------ */
  $$(".wbar").forEach(function (wbar) {
    var wio = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          $$(".wbar__seg", wbar).forEach(function (s, i) {
            setTimeout(function () { s.style.width = s.getAttribute("data-w") + "%"; }, reduced ? 0 : i * 150);
          });
          o.disconnect();
        }
      });
    }, { threshold: .4 });
    wio.observe(wbar);
  });

  /* -------------------- 10. GALLERY + LIGHTBOX -------------------- */
  // One gallery per analysis; the lightbox browses the gallery it was opened from.
  var byKey = {}; PUB.forEach(function (a) { byKey[a.id] = a; });
  function caps(a) { var x = a.exhibits || { en: [], fr: [] }; return root.getAttribute("lang") === "fr" ? x.fr : x.en; }
  function exSrc(a, id) { return a.exhibits.dir + "chart_" + id + ".png"; }

  function buildGallery() {
    $$(".gallery__grid[data-gallery]").forEach(function (grid) {
      var a = byKey[grid.getAttribute("data-gallery")]; if (!a) return;
      grid.innerHTML = caps(a).map(function (cap, i) {
        var id = String(i + 1).padStart(2, "0");
        return '<figure class="ex">' +
          '<button class="ex__btn" type="button" data-i="' + i + '" aria-label="Open exhibit ' + id + '">' +
          '<img src="' + exSrc(a, id) + '" alt="' + cap.replace(/"/g, "") + '" loading="lazy" ' +
          'onerror="this.closest(\'.ex__btn\').classList.add(\'miss\');this.onerror=null;" /></button>' +
          '<figcaption><span class="ex__no">' + id + '</span>' + cap + '</figcaption></figure>';
      }).join("");
    });
  }
  buildGallery();

  function syncToggle(btn) {
    var k = btn.getAttribute("data-gallery"), wrap = document.getElementById(k + "-gallery");
    if (!wrap) return;
    var dict = root.getAttribute("lang") === "fr" ? FR : EN;
    btn.querySelector("span").innerHTML = wrap.hidden
      ? (dict[k + ".showG"] || EN[k + ".showG"]) : (dict["dd.hideG"] || "Hide exhibits");
  }
  $$(".learn__btn[data-gallery]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = document.getElementById(btn.getAttribute("data-gallery") + "-gallery");
      var open = wrap.hidden; wrap.hidden = !open;
      btn.setAttribute("aria-expanded", open);
      syncToggle(btn);
    });
  });

  // Lightbox
  var lb = $("#lightbox"), lbImg = $(".lb__img", lb), lbCap = $(".lb__cap", lb), cur = -1, lastFocus = null;
  var curA = null, curGrid = null;
  function exBtn(i) { return curGrid ? $('.ex__btn[data-i="' + i + '"]', curGrid) : null; }
  function show(i) {
    var n = caps(curA).length; cur = (i + n) % n;
    var id = String(cur + 1).padStart(2, "0");
    var btn = exBtn(cur);
    if (btn && btn.classList.contains("miss")) { return; } // skip placeholders
    lbImg.src = exSrc(curA, id);
    lbImg.alt = caps(curA)[cur];
    lbCap.innerHTML = '<span class="ex__no">' + id + "</span>" + caps(curA)[cur];
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb__close", lb).focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  function step(d) { var n = caps(curA).length; for (var k = 0; k < n; k++) { cur += d; var b = exBtn((cur + n) % n); if (b && !b.classList.contains("miss")) { show(cur); return; } } }
  $$(".gallery__grid[data-gallery]").forEach(function (grid) {
    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".ex__btn"); if (!b || b.classList.contains("miss")) return;
      curA = byKey[grid.getAttribute("data-gallery")]; curGrid = grid;
      open(parseInt(b.getAttribute("data-i"), 10));
    });
  });
  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) close();
      else if (e.target.hasAttribute("data-prev")) step(-1);
      else if (e.target.hasAttribute("data-next")) step(1);
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1);
    });
  }

  /* ----------------------- 12. text cycle ------------------------- */
  (function () {
    var words = $$(".text-cycle__word");
    if (words.length < 2 || reduced) return;
    var i = 0;
    setInterval(function () {
      words[i].classList.remove("is-active");
      i = (i + 1) % words.length;
      words[i].classList.add("is-active");
    }, 2200);
  })();

  /* --------------------- 13. subscribe form ----------------------- */
  (function () {
    var form = $("#subscribe-form");
    if (!form) return;
    var input = $("#sub-email"), msg = $("#sub-msg"), btn = $("button", form);
    // Owner inbox that receives each subscriber (already public in the footer).
    var OWNER = "rezi.sabashvili@outlook.com";
    // The link included in the confirmation email = wherever this site is hosted.
    var SITE = location.origin + location.pathname;

    var COPY = {
      en: {
        subject: "Axone — subscription confirmed",
        auto: "Thank you for subscribing to Axone.\n\n"
            + "You'll receive an email whenever a new equity research deep-dive is published.\n\n"
            + "The site: " + SITE + "\n\n"
            + "— Rezi Sabashvili · Axone Equity Research",
        ok: "You're subscribed — please check your inbox.",
        err: "Something went wrong. Please try again later.",
        invalid: "Please enter a valid email address.",
        sending: "Sending…"
      },
      fr: {
        subject: "Axone — inscription confirmée",
        auto: "Merci de votre inscription à Axone.\n\n"
            + "Vous recevrez un e-mail à chaque nouvelle analyse publiée.\n\n"
            + "Le site : " + SITE + "\n\n"
            + "— Rezi Sabashvili · Axone Equity Research",
        ok: "Inscription enregistrée — vérifiez votre boîte mail.",
        err: "Une erreur est survenue. Réessayez plus tard.",
        invalid: "Veuillez saisir une adresse e-mail valide.",
        sending: "Envoi…"
      }
    };
    function copy() { return root.getAttribute("lang") === "fr" ? COPY.fr : COPY.en; }
    function setMsg(t, state) {
      if (!msg) return;
      msg.textContent = t;
      msg.classList.remove("sub-msg--ok", "sub-msg--err");
      if (state === "ok") msg.classList.add("sub-msg--ok");
      else if (state === "err") msg.classList.add("sub-msg--err");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var c = copy();
      var email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg(c.invalid, "err"); input.focus(); return; }

      if (btn) btn.disabled = true;
      setMsg(c.sending, null);

      var data = new FormData();
      data.append("email", email);
      data.append("language", root.getAttribute("lang") === "fr" ? "fr" : "en");
      data.append("site", SITE);
      data.append("_subject", c.subject);
      // FormSubmit emails this text back to the subscriber, in the site's language.
      data.append("_autoresponse", c.auto);
      data.append("_captcha", "false");
      data.append("_template", "table");

      fetch("https://formsubmit.co/ajax/" + OWNER, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () { setMsg(c.ok, "ok"); form.reset(); })
        .catch(function () { setMsg(c.err, "err"); })
        .then(function () { if (btn) btn.disabled = false; });
    });
  })();

  /* ------------------------ year + initial lang ------------------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  if (root.getAttribute("lang") === "fr") applyLang("fr");
})();

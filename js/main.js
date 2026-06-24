/* ================================================================== */
/* AXONE — main.js · vanilla, no dependencies, no external requests    */
/* 1 i18n · 2 theme · 3 lang · 4 burger · 5 nav spy · 6 smooth-scroll   */
/* 7 reveal · 8 counters · 9 weight bar · 10 gallery+lightbox · 11 hero */
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
    "hero.sub":"Des valorisations de qualité institutionnelle, publiées en accès libre.",
    "hero.cta1":"Lire la dernière analyse","hero.cta2":"Télécharger le pitchbook",
    "hero.m1":"Couverture","hero.m2":"Méthodes par valeur","hero.m3":"Établi à partir de","hero.m3v":"Documents publics",
    "about.eyebrow":"À propos","about.title":"Ce qu'est Axone",
    "about.p1":"Axone, c'est la recherche actions indépendante de Rezi Sabashvili. Chaque valeur est analysée comme en banque — DCF, comparables boursiers, transactions précédentes et synthèse en football field — entièrement à partir de documents publics.",
    "about.p2":"Chaque analyse est livrée avec son modèle Excel et son pitchbook : hypothèses, bridges et sensibilités sont ouverts. Aucune boîte noire — le WACC est construit de bas en haut, l'EBIT est défini de façon cohérente, et la cible pondère explicitement chaque méthode.",
    "about.p3":"Une analyse approfondie par mois, au minimum. Première publiée : Pernod Ricard SA (RI&nbsp;FP).",
    "research.eyebrow":"Recherche","research.title":"Couverture","research.published":"Publié","research.soon":"À venir",
    "research.read":"Lire l'analyse →","research.tagPernod":"Consommation · Spiritueux",
    "research.tagLvmh":"Luxe · Somme des parties","research.tagAsml":"Semi-conducteurs · Géopolitique","research.tagBank":"Banques · P/B vs ROE",
    "research.statusSoon":"Bientôt",
    "pernod.eyebrow":"Analyse phare · 01","pernod.target":"Cible","pernod.upside":"Potentiel","pernod.current":"Cours actuel",
    "pernod.s1":"Prix cible","pernod.s2":"Potentiel vs cours","pernod.s4v":"Mixte","pernod.s4":"DCF / Comps / Précédents",
    "pernod.thesisT":"Thèse d'investissement",
    "pernod.t1b":"Décote d'environ 24% vs les pairs","pernod.t1":" — 8,1x EV/EBITDA contre une médiane de 12,4x, malgré la position de n°2 mondial et un portefeuille premium (Jameson, Absolut, Martell, Chivas).",
    "pernod.t2b":"FY26 année de transition, la croissance repart","pernod.t2":" — ventes nettes organiques T3 à +0,1% après un S1 mou ; guidance +3% à +6% organique p.a. sur FY27–29.",
    "pernod.t3b":"Désendettement net","pernod.t3":" — dette nette/EBITDA de ~3,4x à ~2,0x d'ici FY30, sur ~80% de conversion en cash.",
    "pernod.t4b":"Le M&A pose un plancher de valeur","pernod.t4":" — les précédents dans les spiritueux à ~16,9x EV/EBITDA médian impliquent une valeur avec prime de contrôle au-dessus de 108 €.",
    "pernod.showG":"En savoir plus — voir les 12 exhibits","pernod.hideG":"Masquer les exhibits",
    "pernod.dlT":"Téléchargements","pernod.dlPitch":"Pitchbook complet","pernod.dlModel":"Modèle sous-jacent",
    "method.eyebrow":"Méthodologie","method.title":"Comment chaque valeur est valorisée",
    "method.lede":"Trois méthodes indépendantes, triangulées en une cible unique.",
    "method.c1t":"Flux de trésorerie actualisés","method.c1":"FCF désendettés actualisés au WACC ; valeur terminale recoupée via croissance de Gordon et multiple de sortie EV/EBITDA. EBIT = résultat opérationnel courant, fiscalisé à un taux normalisé de 25%.",
    "method.c2t":"Construction du WACC","method.c2":"Coût des fonds propres via CAPM (taux sans risque, bêta endetté, prime de risque), combiné au coût de la dette après impôt à la structure cible. Dette nette en norme IFRS-16.",
    "method.c3t":"Comparables boursiers","method.c3":"EV/EBITDA et EV/Ventes face à un échantillon de pairs sélectionné, comparé à la médiane pour isoler la décote ou la prime intégrée.",
    "method.c4t":"Transactions précédentes","method.c4":"Multiples de transactions de contrôle issus de M&A sectoriels comparables, posant un plancher de rachat aux côtés du DCF stand-alone.",
    "method.blend":"La cible mixte pondère chaque méthode, avec une grille de sensibilité à deux entrées (WACC × hypothèse terminale) publiée pour chaque valeur.",
    "method.wDcf":"DCF","method.wComps":"Comparables","method.wPrec":"Précédents",
    "pipe.eyebrow":"Pipeline","pipe.title":"Prochaines analyses","pipe.lede":"Une par mois. Dans l'ordre :",
    "pipe.lvmh":"Luxe — somme des parties entre mode & maroquinerie, vins & spiritueux, montres.",
    "pipe.asml":"Semi-conducteurs — monopole EUV face à la cyclicité et aux restrictions d'export.",
    "pipe.bank":"Une banque — valorisée en P/B vs ROE, dividend discount model et P/E plutôt qu'en DCF.",
    "contact.title":"Contact & liens","contact.portfolio":"Portfolio",
    "contact.disc":"À but pédagogique uniquement. Ne constitue ni un conseil en investissement, ni une offre, ni une sollicitation. Établi à partir de documents publics."
  };
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
    // refresh gallery captions + learn-more toggle label
    buildGallery();
    var gt = $("#gallery-toggle"), gw = $("#gallery");
    if (gt && gw) gt.querySelector("span").innerHTML = gw.hidden
      ? (dict["pernod.showG"] || EN["pernod.showG"]) : (dict["pernod.hideG"] || "Hide exhibits");
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
  var map = { about:"about", research:"research", pernod:"research", pipeline:"research", methodology:"methodology", contact:"contact" };
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
  var wbar = $("#wbar");
  if (wbar) {
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
  }

  /* -------------------- 10. GALLERY + LIGHTBOX -------------------- */
  var CAP_EN = ["Valuation summary (football field)","EV/EBITDA vs peers","Multiples vs peer median","M&A precedents","EV→equity bridge","WACC build-up","Net sales trajectory","Margin expansion","Net sales by region","Deleveraging path","Implied value by method","DCF sensitivity heatmap"];
  var CAP_FR = ["Synthèse de valorisation (football field)","EV/EBITDA vs pairs","Multiples vs médiane des pairs","Précédents M&A","Bridge VE→capitaux propres","Construction du WACC","Trajectoire des ventes nettes","Expansion des marges","Ventes nettes par région","Trajectoire de désendettement","Valeur implicite par méthode","Heatmap de sensibilité du DCF"];
  function caps() { return root.getAttribute("lang") === "fr" ? CAP_FR : CAP_EN; }

  var grid = $("#gallery-grid");
  function buildGallery() {
    if (!grid) return;
    var c = caps();
    grid.innerHTML = c.map(function (cap, i) {
      var id = String(i + 1).padStart(2, "0");
      return '<figure class="ex">' +
        '<button class="ex__btn" type="button" data-i="' + i + '" aria-label="Open exhibit ' + id + '">' +
        '<img src="assets/img/chart_' + id + '.png" alt="' + cap.replace(/"/g, "") + '" loading="lazy" ' +
        'onerror="this.closest(\'.ex__btn\').classList.add(\'miss\');this.onerror=null;" /></button>' +
        '<figcaption><span class="ex__no">' + id + '</span>' + cap + '</figcaption></figure>';
    }).join("");
  }
  buildGallery();

  var gToggle = $("#gallery-toggle"), gWrap = $("#gallery");
  if (gToggle && gWrap) {
    gToggle.addEventListener("click", function () {
      var open = gWrap.hidden; gWrap.hidden = !open;
      gToggle.setAttribute("aria-expanded", open);
      var dict = root.getAttribute("lang") === "fr" ? FR : EN;
      gToggle.querySelector("span").innerHTML = open
        ? (dict["pernod.hideG"] || "Hide exhibits") : (dict["pernod.showG"] || EN["pernod.showG"]);
    });
  }

  // Lightbox
  var lb = $("#lightbox"), lbImg = $(".lb__img", lb), lbCap = $(".lb__cap", lb), cur = -1, lastFocus = null;
  function show(i) {
    var n = caps().length; cur = (i + n) % n;
    var id = String(cur + 1).padStart(2, "0");
    var btn = $('.ex__btn[data-i="' + cur + '"]');
    if (btn && btn.classList.contains("miss")) { return; } // skip placeholders
    lbImg.src = "assets/img/chart_" + id + ".png";
    lbImg.alt = caps()[cur];
    lbCap.innerHTML = '<span class="ex__no">' + id + "</span>" + caps()[cur];
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb__close", lb).focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  function step(d) { var n = caps().length; for (var k = 0; k < n; k++) { cur += d; var b = $('.ex__btn[data-i="' + ((cur + n) % n) + '"]'); if (b && !b.classList.contains("miss")) { show(cur); return; } } }
  if (grid) grid.addEventListener("click", function (e) {
    var b = e.target.closest(".ex__btn"); if (!b || b.classList.contains("miss")) return;
    open(parseInt(b.getAttribute("data-i"), 10));
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

  /* ------------------------ year + initial lang ------------------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  if (root.getAttribute("lang") === "fr") applyLang("fr");
})();

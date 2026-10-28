/* ================================================================== */
/* AXONE — analyses.js · the single source of truth for coverage       */
/* main.js renders from this file: hero, About, Coverage, deep-dives,  */
/* Methodology weights, Pipeline. No HTML to copy for a new analysis.  */
/*                                                                     */
/* TO PUBLISH A NEW ANALYSIS                                           */
/*  1. Copy the pitchbook / model into assets/docs/ and the exhibits   */
/*     as assets/img/<id>/chart_01.png, chart_02.png, ...              */
/*  2. Append an object to `published` (copy the TEMPLATE at the end   */
/*     of this file). Array order = numbering; the LAST entry is the   */
/*     "latest" one (hero buttons + About point to it).                */
/*  3. Remove the company from `upcoming` and renumber what is left.   */
/*  Any text field is { en: "...", fr: "..." }. A value left null      */
/*  renders a visible "TODO" on the page.                              */
/* ================================================================== */
window.AXONE_DATA = {
  published: [
    /* ---------------------------- 01 · PERNOD ---------------------------- */
    {
      id: "pernod", no: "01",
      name: "Pernod Ricard SA", short: "Pernod Ricard", ticker: "RI FP",
      tag: { en: "Consumer staples · Spirits", fr: "Consommation · Spiritueux" },
      rating: "BUY", target: 108, upside: 68, current: "64",
      metric: { label: { en: "WACC", fr: "WACC" }, value: 7.3, dec: 1 },
      method: { en: "Blended", fr: "Mixte" },
      methodDetail: { en: "DCF / Comps / Precedents", fr: "DCF / Comps / Précédents" },
      weights: [
        { w: 50, label: { en: "DCF", fr: "DCF" } },
        { w: 35, label: { en: "Trading comps", fr: "Comparables" } },
        { w: 15, label: { en: "Precedents", fr: "Précédents" } }
      ],
      thesis: [
        { b: { en: "Trading at a ~24% discount to peers", fr: "Décote d'environ 24% vs les pairs" },
          t: { en: " — 8.1x EV/EBITDA vs a 12.4x peer median, despite the #2 global position and a premium portfolio (Jameson, Absolut, Martell, Chivas).",
               fr: " — 8,1x EV/EBITDA contre une médiane de 12,4x, malgré la position de n°2 mondial et un portefeuille premium (Jameson, Absolut, Martell, Chivas)." } },
        { b: { en: "FY26 transition year, growth resuming", fr: "FY26 année de transition, la croissance repart" },
          t: { en: " — Q3 organic net sales +0.1% after a soft H1; guidance +3% to +6% organic p.a. over FY27–29.",
               fr: " — ventes nettes organiques T3 à +0,1% après un S1 mou ; guidance +3% à +6% organique p.a. sur FY27–29." } },
        { b: { en: "Clear deleveraging", fr: "Désendettement net" },
          t: { en: " — net debt/EBITDA from ~3.4x to ~2.0x by FY30, on ~80% cash conversion.",
               fr: " — dette nette/EBITDA de ~3,4x à ~2,0x d'ici FY30, sur ~80% de conversion en cash." } },
        { b: { en: "M&amp;A floors valuation", fr: "Le M&A pose un plancher de valeur" },
          t: { en: " — spirits precedents at ~16.9x median EV/EBITDA imply control-premium value above €108.",
               fr: " — les précédents dans les spiritueux à ~16,9x EV/EBITDA médian impliquent une valeur avec prime de contrôle au-dessus de 108 €." } }
      ],
      exhibits: {
        dir: "assets/img/",
        en: ["Valuation summary (football field)","EV/EBITDA vs peers","Multiples vs peer median","M&A precedents","EV→equity bridge","WACC build-up","Net sales trajectory","Margin expansion","Net sales by region","Deleveraging path","Implied value by method","DCF sensitivity heatmap"],
        fr: ["Synthèse de valorisation (football field)","EV/EBITDA vs pairs","Multiples vs médiane des pairs","Précédents M&A","Bridge VE→capitaux propres","Construction du WACC","Trajectoire des ventes nettes","Expansion des marges","Ventes nettes par région","Trajectoire de désendettement","Valeur implicite par méthode","Heatmap de sensibilité du DCF"]
      },
      files: { pitch: "assets/docs/Pernod_Ricard_Pitchbook.pptx", model: "assets/docs/Pernod_Ricard_Model.xlsx" }
    },

    /* ----------------------------- 02 · LVMH ----------------------------- */
    {
      id: "lvmh", no: "02",
      name: "LVMH", short: "LVMH", ticker: "MC FP",
      tag: { en: "Luxury · Sum-of-the-parts", fr: "Luxe · Somme des parties" },
      rating: "BUY", target: 505, upside: 30, current: "388.10",
      metric: { label: { en: "WACC", fr: "WACC" }, value: 8.1, dec: 1 },
      method: { en: "Blended", fr: "Mixte" },
      methodDetail: { en: "DCF / SOTP / Precedents", fr: "DCF / SOTP / Précédents" },
      weights: [
        { w: 50, label: { en: "DCF", fr: "DCF" } },
        { w: 35, label: { en: "Sum-of-the-parts", fr: "Somme des parties" } },
        { w: 15, label: { en: "Precedents", fr: "Précédents" } }
      ],
      thesis: [
        { b: { en: "Quality at a discount", fr: "La qualité avec une décote" },
          t: { en: " — 11.9x EV/EBIT 2026E vs a 16.5x median for core luxury peers, a 28% discount; the shares are down 40% year to date and 41% below their 52-week high.",
               fr: " — 11,9x EV/EBIT 2026E contre une médiane de 16,5x pour les pairs du luxe, soit 28% de décote ; le titre recule de 40% depuis le début de l'année et cote 41% sous son plus haut sur 52 semaines." } },
        { b: { en: "Diversification at work", fr: "La diversification joue son rôle" },
          t: { en: " — group organic growth held at +2% over 9M 2026 while Fashion & Leather Goods fell 2%: Watches & Jewelry (+8%) and Selective Retailing (+6%) took over, and Fashion still earned a 34.1% margin in H1 2026.",
               fr: " — croissance organique du groupe maintenue à +2% sur 9 mois 2026 malgré le recul de 2% de Mode & Maroquinerie : Montres & Joaillerie (+8%) et Distribution sélective (+6%) prennent le relais, et la Mode dégage encore 34,1% de marge au S1 2026." } },
        { b: { en: "Fortress balance sheet", fr: "Un bilan forteresse" },
          t: { en: " — net financial debt of €8.2bn, only 0.4x EBITDA (AA- / Aa3); €68bn of unlevered FCF over FY27E–FY31E funds rising dividends and buybacks, with net cash by FY28E.",
               fr: " — dette financière nette de 8,2 Md€, soit 0,4x l'EBITDA (AA- / Aa3) ; 68 Md€ de FCF désendetté sur FY27E–FY31E financent des dividendes et des rachats croissants, avec une trésorerie nette dès FY28E." } },
        { b: { en: "Fashion reset is a free option", fr: "Le redressement de la Mode, une option gratuite" },
          t: { en: " — we only rebuild the Fashion margin to 36.5% by FY30E, against 39.9% in FY23; a faster creative turnaround or a China recovery would be upside to our €505 target.",
               fr: " — nous ne remontons la marge de la Mode qu'à 36,5% d'ici FY30E, contre 39,9% en FY23 ; un redressement créatif plus rapide ou une reprise en Chine offrirait un potentiel au-delà de notre cible de 505 €." } }
      ],
      exhibits: {
        dir: "assets/img/lvmh/",
        en: ["Net sales by business group","Net sales trajectory","PRO and PRO margin","Valuation summary (football field)","EV→equity bridge (Gordon case)","WACC build-up","DCF sensitivity heatmap","EV/EBIT vs core luxury peers","Discount on every multiple","Sum-of-the-parts EV","Luxury M&A precedents","Implied value by method","Net financial debt and leverage"],
        fr: ["Ventes nettes par groupe d'activités","Trajectoire des ventes nettes","Résultat opérationnel courant et marge","Synthèse de valorisation (football field)","Bridge VE→capitaux propres (cas Gordon)","Construction du WACC","Heatmap de sensibilité du DCF","EV/EBIT vs pairs du luxe","Décote sur chaque multiple","Somme des parties (VE)","Précédents M&A dans le luxe","Valeur implicite par méthode","Dette financière nette et levier"]
      },
      files: { pitch: "assets/docs/LVMH_Pitchbook.pptx", model: "assets/docs/LVMH_Model.xlsx" }
    },

    /* ------------------------------ 03 · BNP ----------------------------- */
    {
      id: "bnp", no: "03",
      name: "BNP Paribas SA", short: "BNP Paribas", ticker: "BNP FP",
      tag: { en: "Banks · P/B vs ROE · Dividend discount", fr: "Banques · P/B vs ROE · Actualisation des dividendes" },
      rating: "BUY", target: 113, upside: 35, current: "83.52",
      // A bank has no WACC: the discount rate is the cost of equity (CAPM on the French OAT).
      metric: { label: { en: "Cost of equity", fr: "Coût des fonds propres" }, value: 11.8, dec: 1 },
      method: { en: "Blended", fr: "Mixte" },
      methodDetail: { en: "DDM / Comps / Precedents", fr: "DDM / Comps / Précédents" },
      weights: [
        { w: 50, label: { en: "Dividend discount", fr: "Actualisation des dividendes" } },
        { w: 35, label: { en: "Trading comps (P/TBV vs RoTE)", fr: "Comparables (P/TBV vs RoTE)" } },
        { w: 15, label: { en: "Precedents", fr: "Précédents" } }
      ],
      thesis: [
        { b: { en: "French risk, not BNP risk", fr: "Un risque France, pas un risque BNP" },
          t: { en: " — the shares fell from €114 to €83.52 as the OAT crossed 5%, yet France is only 26% of revenues and 10% of 2025 pre-tax income, with about €20bn of French government bonds (€16bn at amortised cost).",
               fr: " — le titre est passé de 114 € à 83,52 € quand l'OAT a franchi 5%, alors que la France ne pèse que 26% des revenus et 10% du résultat avant impôt 2025, pour environ 20 Md€ d'obligations d'État françaises (dont 16 Md€ au coût amorti)." } },
        { b: { en: "Earnings compounding", fr: "Des résultats qui se composent" },
          t: { en: " — net income from €12.2bn in FY25 to €16.2bn in FY28E (9.8% CAGR), RoTE from 11.6% to 13.7%; our EPS stays within 3% of consensus every year to FY29E.",
               fr: " — résultat net de 12,2 Md€ en FY25 à 16,2 Md€ en FY28E (TCAM de 9,8%), RoTE de 11,6% à 13,7% ; notre BPA reste à moins de 3% du consensus chaque année jusqu'en FY29E." } },
        { b: { en: "A capital return machine", fr: "Une machine à redistribuer le capital" },
          t: { en: " — CET1 at 13.0%, 257bp above requirements: BNP can return all profit not needed for RWA growth, €10.1bn on FY27E results, an 11% yield on today's market value.",
               fr: " — CET1 à 13,0%, 257 pb au-dessus des exigences : BNP peut distribuer tout le résultat non requis par la croissance des RWA, soit 10,1 Md€ sur les résultats FY27E, un rendement de 11% sur la capitalisation actuelle." } },
        { b: { en: "A mispriced cost of equity", fr: "Un coût des fonds propres mal évalué" },
          t: { en: " — at 0.85x tangible book the market prices a 15.9% cost of equity, 4.1 points above a CAPM already built on the stressed OAT; our €113 target only assumes 1.15x TBV.",
               fr: " — à 0,85x l'actif net tangible, le marché intègre un coût des fonds propres de 15,9%, 4,1 points au-dessus d'un CAPM déjà fondé sur l'OAT sous tension ; notre cible de 113 € ne suppose que 1,15x la TBV." } }
      ],
      exhibits: {
        dir: "assets/img/bnp/",
        en: ["Revenues by division","Net income and RoTE","EPS vs consensus","Valuation summary (football field)","Excess-capital DDM","Cost of equity: CAPM vs market-implied","Sensitivity: Ke × RoTE and implied Ke","P/TBV vs RoTE regression","P/TBV vs peers","Bank M&A precedents","P/TBV paid per 10 points of RoTE","Implied value by method","Distributions and payout ratio"],
        fr: ["Revenus par pôle","Résultat net et RoTE","BPA vs consensus","Synthèse de valorisation (football field)","DDM sur capital excédentaire","Coût des fonds propres : CAPM vs implicite","Sensibilité : Ke × RoTE et Ke implicite","Régression P/TBV vs RoTE","P/TBV vs pairs","Précédents M&A bancaires","P/TBV payé par 10 points de RoTE","Valeur implicite par méthode","Distributions et taux de distribution"]
      },
      files: { pitch: "assets/docs/BNP_Paribas_Pitchbook.pptx", model: "assets/docs/BNP_Paribas_Model.xlsx" }
    }
  ],

  /* Coverage "Coming soon" and Pipeline both render from this list, in order. */
  upcoming: [
    {
      id: "asml", no: "04",
      name: "ASML", ticker: "ASML NA",
      tag: { en: "Semiconductors · Geopolitics", fr: "Semi-conducteurs · Géopolitique" },
      note: { en: "Semiconductors — EUV monopoly vs cyclicality and export restrictions.",
              fr: "Semi-conducteurs — monopole EUV face à la cyclicité et aux restrictions d'export." }
    }
  ]
};

/* --------------------------- TEMPLATE ---------------------------------
{
  id: "xxx", no: "05",                       // anchor #xxx, coverage number
  name: "Company SA", short: "Company", ticker: "XX FP",
  tag: { en: "Sector · Angle", fr: "Secteur · Angle" },
  rating: "BUY",                             // BUY / HOLD / SELL
  target: null, upside: null, current: null, // € target, % upside, current price (string)
  metric: { label: { en: "WACC", fr: "WACC" }, value: null, dec: 1 },
  method: { en: "Blended", fr: "Mixte" },
  methodDetail: { en: "DCF / Comps / Precedents", fr: "DCF / Comps / Précédents" },
  weights: [ { w: null, label: { en: "DCF", fr: "DCF" } }, ... ],   // 3 entries
  thesis: [ { b: { en: "", fr: "" }, t: { en: " — ...", fr: " — ..." } }, ... ], // 4 entries
  exhibits: { dir: "assets/img/xxx/", en: ["..."], fr: ["..."] },  // chart_01.png ...
  files: { pitch: "assets/docs/Xxx_Pitchbook.pptx", model: "assets/docs/Xxx_Model.xlsx" }
}
------------------------------------------------------------------------ */

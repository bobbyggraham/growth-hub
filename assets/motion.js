/* ============================================================
   FSG GROWTH HUB — GROWTH IN MOTION
   One file, every week. Built Sunday from Bobby's Wire label,
   reviewed Monday, posted here. Newest week on top.
   Renders:
     #ghMotionFeature  gold "This Week" spotlight (rotates the week's cards)
     #ghMotionGrid     every card, behind the Growth chip only
   Standard look = the Growth in Motion card. Navy. Gold. Done.
   People first: cards sign "— Bobby" only, no title. Wallpapers carry no
   name, title, or stamp. It's theirs once they save it.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- DATA ----------------
     week:  Monday of the posting week, YYYY-MM-DD
     cards: lane (RESULTS|PEOPLE|VISION|DEVELOPMENT|EXECUTION|FINANCE|VALUE),
            standard (the line), move (the technique), tone (navy|deep|light)  */
  var WEEKS = [
    /* ================= ADD NEW APPROVED WEEKS HERE (newest first) =================
       Paste the week block Paula hands you after Monday review right below
       this marker. Nothing else in this file changes.
       ============================================================================ */
    { week: "2026-10-05", cards: [
      { lane: "VALUE",       tone: "navy", standard: "Do the right thing. When you screw up, own it and fix it.", move: "Call the customer before they call you. Name the miss, bring the fix, set the date." },
      { lane: "PEOPLE",      tone: "deep", standard: "Surround yourself with people who expect you to be better.", move: "Pick one person who pushes you. Put 30 minutes on the calendar this week and bring a real problem." },
      { lane: "EXECUTION",   tone: "navy", standard: "Stop negotiating with yourself on the non-negotiables.", move: "The hardest promise to keep is the one you made to yourself. Write it down. Do it first." },
      { lane: "DEVELOPMENT", tone: "deep", standard: "Know your non-negotiables. Mine start the night before.", move: "Early to bed, early to rise. Win the morning before the inbox wakes up." },
      { lane: "EXECUTION",   tone: "navy",  standard: "Stop thinking about the problem. Attack it.", move: "Identify it. Own it. Eliminate it. Pick the deal you've been circling and make the call today." },
      { lane: "VISION",      tone: "light", standard: "The way forward isn't around it. It's through it.", move: "Write down the story you tell about why that account won't move. Then go prove it wrong." },
      { lane: "RESULTS",     tone: "deep",  standard: "Show up when you don't feel like it. That's when it counts.", move: "Make the same miss twice and it's a choice. Name one lesson from last week and run it this week." },
      { lane: "PEOPLE",      tone: "light", standard: "Say less. Mean more.", move: "Slow down. Pause after the number. Let the customer fill the silence." }
    ]},
    { week: "2026-09-28", cards: [
      { lane: "RESULTS",     tone: "navy",  standard: "Luck doesn't fill a pipeline. Monday morning does.", move: "Block the first hour. Make the calls before the inbox makes them for you." },
      { lane: "EXECUTION",   tone: "deep",  standard: "Five deals half-worked is zero deals closed.", move: "Run The Filter: Vital? Matters? What happens if it never gets done? Then finish one." },
      { lane: "PEOPLE",      tone: "light", standard: "Make the customer the hero. We're the guide with the flashlight.", move: "Every call answers one question: how do we help you succeed?" },
      { lane: "DEVELOPMENT", tone: "navy",  standard: "Growth is built in layers. Skip one and the whole thing leans.", move: "Call. Meeting. Walk. Proposal. Proof. In that order, every time." },
      { lane: "VALUE",       tone: "light", standard: "Don't announce the win. Deliver it.", move: "Proof travels farther than promises. Send yours through the Proof Builder." },
      { lane: "VISION",      tone: "deep",  standard: "Stop explaining the blank. Fill it.", move: "A great excuse is still an empty Engage record. Log it. Move it. Close it." },
      { lane: "PEOPLE",      tone: "navy",  standard: "Listen longer than you pitch.", move: "Ask one more question than feels comfortable. That's where the real scope lives." },
      { lane: "RESULTS",     tone: "deep",  standard: "#18 in the nation was earned one job at a time.", move: "EC&M's Top Electrical Contractors list. Protect it. Land the next one. Expand." },
      { lane: "EXECUTION",   tone: "navy", standard: "Lock in. Focused effort beats divided attention.", move: "Identify what matters. Execute at your highest level. Finish it right. Hold the standard. Next target, same standard." }
    ]}
  ];

  var ROTATE_MS = 6500;

  /* ---------------- helpers ---------------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function weekLabel(iso) { var p = iso.split("-"); return "Week of " + MONTHS[+p[1] - 1] + " " + (+p[2]); }
  function todayISO() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Current week = newest week that has started. Future weeks stay hidden until their Monday.
  var today = todayISO();
  var live = WEEKS.filter(function (w) { return w.week <= today; })
                  .sort(function (a, b) { return a.week < b.week ? 1 : -1; });
  if (!live.length) return;
  var current = live[0];

  /* ---------------- CSS ---------------- */
  var css = ""
    + ".gim-mark{flex:none}"
    + "#ghMotionFeature{margin:6px 0 30px;}"
    + ".gim-feat{position:relative;border-radius:16px;padding:3px;background:linear-gradient(120deg,#ebb018,#f6d27a,#ebb018);background-size:220% 220%;animation:gimShine 6s ease-in-out infinite;box-shadow:0 0 0 0 rgba(235,176,24,.55);}"
    + ".gim-feat.pulse{animation:gimShine 6s ease-in-out infinite,gimPulse 2.4s ease-out 1;}"
    + "@keyframes gimShine{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}"
    + "@keyframes gimPulse{0%{box-shadow:0 0 0 0 rgba(235,176,24,.55)}100%{box-shadow:0 0 0 18px rgba(235,176,24,0)}}"
    + ".gim-inner{background:#0b1421;border-radius:13px;padding:22px 22px 18px;color:#fff;overflow:hidden;}"
    + ".gim-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px;}"
    + ".gim-badge{display:inline-flex;align-items:center;gap:8px;background:#ebb018;color:#0b1421;font:800 11px/1 'Open Sans',Arial,sans-serif;letter-spacing:2.5px;padding:8px 12px;border-radius:999px;}"
    + ".gim-badge i{width:8px;height:8px;border-radius:50%;background:#0b1421;animation:gimBlink 1.6s ease-in-out infinite;}"
    + "@keyframes gimBlink{0%,100%{opacity:1}50%{opacity:.25}}"
    + ".gim-wk{font:600 12px/1 'Open Sans',Arial,sans-serif;letter-spacing:2px;color:#c5d9fa;text-transform:uppercase;}"
    + ".gim-stage{position:relative;min-height:230px;}"
    + ".gim-slide{position:absolute;inset:0;opacity:0;transform:translateY(10px);transition:opacity .55s ease,transform .55s ease;pointer-events:none;}"
    + ".gim-slide.on{position:relative;opacity:1;transform:none;pointer-events:auto;}"
    + ".gim-lab{font:800 10.5px/1 'Open Sans',Arial,sans-serif;letter-spacing:3px;color:#ebb018;margin-bottom:8px;}"
    + ".gim-lane{display:inline-block;margin-left:10px;background:rgba(235,176,24,.14);color:#ebb018;border:1px solid rgba(235,176,24,.5);padding:3px 8px;border-radius:4px;letter-spacing:2px;}"
    + ".gim-std{font:700 clamp(24px,4.4vw,38px)/1.08 Oswald,'Arial Narrow',Arial,sans-serif;text-transform:uppercase;margin:0 0 16px;color:#fff;}"
    + ".gim-move{font:400 15px/1.55 'Open Sans',Arial,sans-serif;color:#c5d9fa;margin:0;max-width:640px;}"
    + ".gim-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px;}"
    + ".gim-dots{display:flex;gap:6px;align-items:center;}"
    + ".gim-dot{width:28px;height:28px;border:0;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;}"
    + ".gim-dot span{display:block;width:8px;height:8px;border-radius:50%;background:#365aa0;transition:all .3s;}"
    + ".gim-dot.on span{width:22px;border-radius:4px;background:#ebb018;}"
    + ".gim-acts{display:flex;gap:8px;flex-wrap:wrap;}"
    + ".gim-btn{font:700 12px/1 'Open Sans',Arial,sans-serif;letter-spacing:1px;border-radius:999px;padding:11px 16px;min-height:40px;cursor:pointer;border:1.5px solid #ebb018;background:transparent;color:#ebb018;transition:all .2s;}"
    + ".gim-btn:hover,.gim-btn:focus-visible{background:#ebb018;color:#0b1421;}"
    + ".gim-btn.solid{background:#ebb018;color:#0b1421;}"
    + ".gim-btn.solid:hover{background:#f6d27a;}"
    + ".gim-bar{height:3px;background:rgba(197,217,250,.15);border-radius:2px;margin-top:14px;overflow:hidden;}"
    + ".gim-bar b{display:block;height:100%;width:0;background:#ebb018;}"
    + ".gim-bar b.run{transition:width " + ROTATE_MS + "ms linear;width:100%;}"
    + ".gim-sign{font:400 11px/1.4 'Open Sans',Arial,sans-serif;color:#718dbc;margin-top:10px;}"
    /* mini cards (Growth chip) */
    + ".card.gim-mini{background:#133865;color:#fff;border:1px solid #133865;}"
    + ".card.gim-mini.t-deep{background:#0b1421;border-color:#0b1421;}"
    + ".card.gim-mini.t-light{background:#ededed;color:#133865;border-color:#d8d8d8;}"
    + ".card.gim-mini h3{font-family:Oswald,'Arial Narrow',Arial,sans-serif;text-transform:uppercase;font-size:19px;line-height:1.12;color:inherit;}"
    + ".card.gim-mini p{color:#c5d9fa;}"
    + ".card.gim-mini.t-light p{color:#0b1421;}"
    + ".card.gim-mini .gim-top{display:flex;justify-content:space-between;align-items:center;font:800 10px/1 'Open Sans',Arial,sans-serif;letter-spacing:2px;color:#ebb018;margin-bottom:10px;}"
    + ".card.gim-mini .card-cta{color:#ebb018;}"
    + ".card.gim-mini.t-light .card-cta,.card.gim-mini.t-light .gim-top{color:#365aa0;}"
    /* overlay */
    + ".gim-ovl{position:fixed;inset:0;background:rgba(11,20,33,.82);display:none;align-items:center;justify-content:center;padding:18px;z-index:9999;}"
    + ".gim-ovl.open{display:flex;}"
    + ".gim-big{position:relative;width:min(540px,100%);aspect-ratio:4/5;max-height:92vh;border-radius:14px;padding:clamp(22px,6vw,44px);box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;background:#133865;color:#fff;overflow:auto;}"
    + ".gim-big.t-deep{background:#0b1421;}.gim-big.t-light{background:#ededed;color:#133865;}"
    + ".gim-big .gim-std{color:inherit;font-size:clamp(26px,6vw,42px);}"
    + ".gim-big.t-light .gim-move{color:#0b1421;}.gim-big.t-light .gim-sign{color:#365aa0;}"
    + ".gim-x{position:absolute;top:8px;right:8px;width:44px;height:44px;border:0;background:transparent;color:inherit;font-size:28px;cursor:pointer;}"
    + ".gim-rule{height:2px;background:#ebb018;margin:14px 0 10px;}"
    + ".gim-who{font:800 15px/1.2 'Open Sans',Arial,sans-serif;}"
    + ".gim-ple{font:700 11px/1 Nunito,'Open Sans',Arial,sans-serif;letter-spacing:3px;color:#ebb018;}"
    + ".gim-dl{position:relative;width:min(560px,100%);max-height:92vh;overflow:auto;background:#0b1421;color:#fff;border-radius:14px;padding:26px 22px 20px;box-sizing:border-box;border:2px solid #ebb018;}"
    + ".gim-dl .gim-x{color:#fff;}"
    + ".gim-dl-img{display:block;width:100%;height:auto;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.4);-webkit-touch-callout:default;}"
    + ".gim-dl-img.ph{width:auto;max-width:100%;max-height:56vh;margin:0 auto;}"
    + "@media (max-width:480px){.gim-long{display:none}}"
    + "@media (prefers-reduced-motion: reduce){.gim-feat,.gim-badge i{animation:none}.gim-slide{transition:none}.gim-bar b.run{transition:none}}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function mark(light) {
    var d1 = light ? "#133865" : "#ffffff", d2 = light ? "#718dbc" : "#c5d9fa";
    var pts = [[60,14,d1],[99.8,37,d2],[99.8,83,d1],[60,106,d2],[20.2,83,d1],[20.2,37,d2]];
    var s = '<svg class="gim-mark" width="30" height="30" viewBox="0 0 120 120" aria-hidden="true">';
    pts.forEach(function (p) { s += '<line x1="60" y1="60" x2="' + p[0] + '" y2="' + p[1] + '" stroke="#718dbc" stroke-width="6"/>'; });
    pts.forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="' + p[2] + '"/>'; });
    return s + '<circle cx="60" cy="60" r="22" fill="#ebb018"/></svg>';
  }

  /* ---------------- overlay ---------------- */
  var ovl = document.createElement("div");
  ovl.className = "gim-ovl";
  ovl.setAttribute("role", "dialog");
  ovl.setAttribute("aria-modal", "true");
  ovl.setAttribute("aria-label", "Growth in Motion card");
  document.body.appendChild(ovl);
  var lastFocus = null;
  function openCard(week, i) {
    var c = week.cards[i], light = c.tone === "light";
    lastFocus = document.activeElement;
    ovl.innerHTML = '<div class="gim-big t-' + esc(c.tone || "navy") + '">'
      + '<button class="gim-x" aria-label="Close">&times;</button>'
      + '<div style="display:flex;align-items:center;gap:10px;">' + mark(light) + '<span class="gim-wk" style="color:inherit;opacity:.85">Growth in Motion · ' + pad(i + 1) + '</span></div>'
      + '<div><div class="gim-lab">THE STANDARD<span class="gim-lane">' + esc(c.lane) + '</span></div>'
      + '<h3 class="gim-std">' + esc(c.standard) + '</h3>'
      + '<div class="gim-lab">THE MOVE</div><p class="gim-move">' + esc(c.move) + '</p></div>'
      + '<div><div class="gim-rule"></div><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;flex-wrap:wrap;">'
      + '<div class="gim-who">— Bobby</div>'
      + '<span class="gim-ple">PROTECT · LAND · EXPAND</span></div>'
      + '<div class="gim-sign">Prepared by Lumen | FSG Business Development AI</div>'
      + '<button class="gim-btn solid" data-act="dl" style="margin-top:14px;align-self:flex-start">Download</button></div></div>';
    ovl._card = { week: week, i: i };
    ovl.classList.add("open");
    ovl.querySelector(".gim-x").focus();
  }
  function closeCard() { ovl.classList.remove("open"); ovl.innerHTML = ""; ovl._card = null; ovl._gim = null; if (lastFocus) lastFocus.focus(); lastFocus = null; }
  ovl.addEventListener("click", function (e) { if (e.target === ovl || e.target.classList.contains("gim-x")) closeCard(); });
  ovl.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCard(); });
  /* ---------------- download: phone + desktop wallpaper PNGs ---------------- */
  var SIZES = {
    phone:   { w: 1290, h: 2796, label: "Phone wallpaper" },
    desktop: { w: 2560, h: 1440, label: "Desktop wallpaper" }
  };
  var TONES = {
    navy:  { bg: "#133865", fg: "#ffffff", sub: "#c5d9fa", meta: "#c5d9fa", d1: "#ffffff", d2: "#c5d9fa" },
    deep:  { bg: "#0b1421", fg: "#ffffff", sub: "#c5d9fa", meta: "#c5d9fa", d1: "#ffffff", d2: "#c5d9fa" },
    light: { bg: "#ededed", fg: "#133865", sub: "#0b1421", meta: "#365aa0", d1: "#133865", d2: "#718dbc" }
  };
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load("700 100px Oswald"), document.fonts.load("400 50px 'Open Sans'"),
      document.fonts.load("800 50px 'Open Sans'"), document.fonts.load("800 50px Nunito")
    ]).catch(function () {});
  }
  function spaced(ctx, text, x, y, sp) {
    for (var k = 0; k < text.length; k++) { ctx.fillText(text[k], x, y); x += ctx.measureText(text[k]).width + sp; }
    return x;
  }
  function spacedW(ctx, text, sp) { var w = 0; for (var k = 0; k < text.length; k++) w += ctx.measureText(text[k]).width + sp; return w - sp; }
  function wrap(ctx, text, maxW) {
    var words = text.split(" "), lines = [], line = "";
    words.forEach(function (w) { var t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line);
    return lines;
  }
  function drawMark(ctx, cx, cy, s, t, alpha) {
    ctx.save(); ctx.globalAlpha = alpha == null ? 1 : alpha;
    var r = s * 0.383, pts = [[-90, t.d1], [-30, t.d2], [30, t.d1], [90, t.d2], [150, t.d1], [210, t.d2]];
    ctx.strokeStyle = "#718dbc"; ctx.lineWidth = s * 0.05;
    pts.forEach(function (p) { var a = p[0] * Math.PI / 180; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)); ctx.stroke(); });
    pts.forEach(function (p) { var a = p[0] * Math.PI / 180; ctx.fillStyle = p[1]; ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), s * 0.092, 0, 7); ctx.fill(); });
    ctx.fillStyle = "#ebb018"; ctx.beginPath(); ctx.arc(cx, cy, s * 0.183, 0, 7); ctx.fill();
    ctx.restore();
  }
  function renderCard(week, i, kind) {
    var c = week.cards[i], t = TONES[c.tone] || TONES.navy, S = SIZES[kind];
    var cv = document.createElement("canvas"); cv.width = S.w; cv.height = S.h;
    var ctx = cv.getContext("2d"), phone = kind === "phone";
    var M = phone ? 110 : 200, maxW = phone ? S.w - 2 * M : 1560;
    ctx.fillStyle = t.bg; ctx.fillRect(0, 0, S.w, S.h);
    if (!phone) drawMark(ctx, S.w - 330, S.h / 2, 760, t, 0.10);
    ctx.textBaseline = "alphabetic";

    // Standard sizing: shrink until it fits in a sane number of lines
    var stdSize = phone ? 132 : 118, lines;
    do { ctx.font = "700 " + stdSize + "px Oswald, 'Arial Narrow', Arial, sans-serif"; lines = wrap(ctx, c.standard.toUpperCase(), maxW); if (lines.length <= (phone ? 6 : 4)) break; stdSize -= 6; } while (stdSize > 60);
    var moveSize = phone ? 54 : 46; ctx.font = "400 " + moveSize + "px 'Open Sans', Arial, sans-serif";
    var mLines = wrap(ctx, c.move, phone ? maxW : 1300);

    // Header (lockup)
    var y = phone ? 820 : 200;   // phone: clears the lock-screen clock
    drawMark(ctx, M + 50, y, 100, t);
    ctx.fillStyle = t.fg; ctx.font = "800 44px Nunito, 'Open Sans', Arial, sans-serif";
    spaced(ctx, "GROWTH", M + 130, y - 4, 5);
    ctx.fillStyle = t.meta; ctx.font = "800 38px Nunito, 'Open Sans', Arial, sans-serif";
    spaced(ctx, "HUB", M + 132, y + 40, 22);

    // Body
    y += phone ? 190 : 170;
    ctx.fillStyle = "#ebb018"; ctx.fillRect(M, y, 130, 10);
    ctx.fillStyle = t.meta; ctx.font = "600 30px 'Open Sans', Arial, sans-serif";
    spaced(ctx, "GROWTH IN MOTION · " + pad(i + 1) + "  ·  " + weekLabel(week.week).toUpperCase(), M + 160, y + 12, 4);
    y += 100;
    ctx.fillStyle = "#ebb018"; ctx.font = "800 28px 'Open Sans', Arial, sans-serif";
    var lx = spaced(ctx, "THE STANDARD", M, y, 6) + 24;
    var lw = spacedW(ctx, c.lane, 4) + 32;
    ctx.strokeStyle = "#ebb018"; ctx.lineWidth = 2; ctx.strokeRect(lx, y - 32, lw, 44);
    spaced(ctx, c.lane, lx + 16, y, 4);
    y += 30 + stdSize;
    ctx.fillStyle = t.fg; ctx.font = "700 " + stdSize + "px Oswald, 'Arial Narrow', Arial, sans-serif";
    lines.forEach(function (ln, k) { ctx.fillText(ln, M, y + k * stdSize * 1.06); });
    y += (lines.length - 1) * stdSize * 1.06 + (phone ? 110 : 90);
    ctx.fillStyle = "#ebb018"; ctx.font = "800 28px 'Open Sans', Arial, sans-serif";
    spaced(ctx, "THE MOVE", M, y, 6);
    y += 30 + moveSize;
    ctx.fillStyle = t.sub; ctx.font = "400 " + moveSize + "px 'Open Sans', Arial, sans-serif";
    mLines.forEach(function (ln, k) { ctx.fillText(ln, M, y + k * moveSize * 1.4); });

    // Footer
    var fy = S.h - (phone ? 330 : 200);
    ctx.fillStyle = "#ebb018"; ctx.fillRect(M, fy, phone ? maxW : S.w - 2 * M, 3);
    // Wallpapers are the person's, not ours: no name, no title, no stamp.
    ctx.fillStyle = "#ebb018"; ctx.font = "800 30px Nunito, 'Open Sans', Arial, sans-serif";
    spaced(ctx, "PROTECT · LAND · EXPAND", M, fy + 80, 6);
    return new Promise(function (res) { cv.toBlob(function (b) { res(b); }, "image/png"); });
  }

  var dlFile = null, dlUrl = null;
  function openDownload(week, i) {
    lastFocus = lastFocus || document.activeElement;
    ovl.innerHTML = '<div class="gim-dl"><button class="gim-x" aria-label="Close">&times;</button>'
      + '<div class="gim-lab" style="margin-bottom:6px">DOWNLOAD · GROWTH IN MOTION ' + pad(i + 1) + '</div>'
      + '<h3 class="gim-std" style="font-size:24px;margin-bottom:14px">Save it to Photos or set it as your wallpaper.</h3>'
      + '<div class="gim-acts" style="margin-bottom:14px"><button class="gim-btn solid" data-dl="phone">Phone wallpaper</button><button class="gim-btn" data-dl="desktop">Desktop wallpaper</button></div>'
      + '<div class="gim-dl-out"></div></div>';
    ovl.classList.add("open");
    ovl.querySelector('[data-dl="phone"]').focus();
    ovl._gim = { week: week, i: i };
    make("phone");
  }
  function make(kind) {
    var st = ovl._gim, out = ovl.querySelector(".gim-dl-out"); if (!st || !out) return;
    ovl.querySelectorAll("[data-dl]").forEach(function (b) { b.classList.toggle("solid", b.getAttribute("data-dl") === kind); });
    out.innerHTML = '<div class="gim-sign">Building your ' + SIZES[kind].label.toLowerCase() + '…</div>';
    fontsReady().then(function () { return renderCard(st.week, st.i, kind); }).then(function (blob) {
      if (!blob) { out.innerHTML = '<div class="gim-sign">Couldn\'t build the image on this browser.</div>'; return; }
      if (dlUrl) URL.revokeObjectURL(dlUrl);
      dlUrl = URL.createObjectURL(blob);
      var name = "growth-in-motion-" + st.week.week + "-" + pad(st.i + 1) + "-" + kind + ".png";
      try { dlFile = new File([blob], name, { type: "image/png" }); } catch (e) { dlFile = null; }
      var canShare = !!(dlFile && navigator.canShare && navigator.canShare({ files: [dlFile] }));
      out.innerHTML = '<img class="gim-dl-img' + (kind === "phone" ? " ph" : "") + '" src="' + dlUrl + '" alt="Growth in Motion card, ' + esc(SIZES[kind].label) + '">'
        + '<div class="gim-acts" style="margin-top:12px">'
        + (canShare ? '<button class="gim-btn solid" data-save="share">Save to Photos</button>' : '')
        + '<a class="gim-btn' + (canShare ? '' : ' solid') + '" href="' + dlUrl + '" download="' + name + '" style="text-decoration:none;display:inline-flex;align-items:center">Download PNG</a></div>'
        + '<div class="gim-sign">On iPhone: tap Save to Photos, or press and hold the image. Then Photos › Share › Use as Wallpaper.</div>';
    });
  }
  ovl.addEventListener("click", function (e) {
    var k = e.target.getAttribute && e.target.getAttribute("data-dl");
    if (k) { make(k); return; }
    if (e.target.getAttribute && e.target.getAttribute("data-save") === "share" && dlFile) {
      navigator.share({ files: [dlFile], title: "Growth in Motion" }).catch(function () {});
    }
    if (e.target.getAttribute && e.target.getAttribute("data-act") === "dl" && ovl._card) {
      openDownload(ovl._card.week, ovl._card.i);
    }
  });

  /* ---------------- grid: every card, Growth chip only ---------------- */
  var grid = document.getElementById("ghMotionGrid");
  if (grid) {
    var html = "";
    live.forEach(function (w) {
      w.cards.forEach(function (c, i) {
        var tags = "growth in motion motivation standard move development " + c.lane + " " + c.standard + " " + c.move + " " + weekLabel(w.week);
        html += '<a href="#" class="card gim-mini t-' + esc(c.tone || "navy") + '" data-section="tools" data-chip-only="true" data-gim-week="' + esc(w.week) + '" data-gim-i="' + i + '" data-tags="' + esc(tags.toLowerCase()) + '">'
          + '<div class="gim-top"><span>' + esc(c.lane) + '</span><span>' + esc(weekLabel(w.week)) + ' · ' + pad(i + 1) + '</span></div>'
          + '<h3>' + esc(c.standard) + '</h3>'
          + '<p>' + esc(c.move) + '</p>'
          + '<span class="card-cta">Open card</span></a>';
      });
    });
    grid.innerHTML = html;
    grid.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest(".gim-mini") : null;
      if (!a) return;
      e.preventDefault();
      var w = live.filter(function (x) { return x.week === a.getAttribute("data-gim-week"); })[0];
      if (w) openCard(w, +a.getAttribute("data-gim-i"));
    });
  }

  /* ---------------- feature: this week, gold, in motion ---------------- */
  var feat = document.getElementById("ghMotionFeature");
  if (!feat) return;
  var n = current.cards.length, idx = 0, timer = null, paused = false;
  var slides = "", dots = "";
  current.cards.forEach(function (c, i) {
    slides += '<div class="gim-slide' + (i === 0 ? " on" : "") + '" aria-hidden="' + (i === 0 ? "false" : "true") + '">'
      + '<div class="gim-lab">THE STANDARD · ' + pad(i + 1) + '/' + pad(n) + '<span class="gim-lane">' + esc(c.lane) + '</span></div>'
      + '<h3 class="gim-std">' + esc(c.standard) + '</h3>'
      + '<div class="gim-lab">THE MOVE</div><p class="gim-move">' + esc(c.move) + '</p></div>';
    dots += '<button class="gim-dot' + (i === 0 ? " on" : "") + '" aria-label="Card ' + (i + 1) + '"><span></span></button>';
  });
  feat.innerHTML = '<div class="gim-feat pulse"><div class="gim-inner" aria-roledescription="carousel" aria-label="Growth in Motion this week">'
    + '<div class="gim-head"><div style="display:flex;align-items:center;gap:12px;">' + mark(false)
    + '<span class="gim-badge"><i></i>THIS WEEK<span class="gim-long">&nbsp;· GROWTH IN MOTION</span></span></div>'
    + '<span class="gim-wk">' + esc(weekLabel(current.week)) + '</span></div>'
    + '<div class="gim-stage" aria-live="polite">' + slides + '</div>'
    + '<div class="gim-bar"><b></b></div>'
    + '<div class="gim-foot"><div class="gim-dots">' + dots + '</div>'
    + '<div class="gim-acts"><button class="gim-btn" data-act="pause">Pause</button>'
    + '<button class="gim-btn" data-act="download">Download</button>'
    + '<button class="gim-btn solid" data-act="all">All ' + n + ' cards &rarr;</button></div></div>'
    + '<div class="gim-sign">— Bobby &nbsp;|&nbsp; Prepared by Lumen | FSG Business Development AI</div>'
    + '</div></div>';

  var slideEls = feat.querySelectorAll(".gim-slide"), dotEls = feat.querySelectorAll(".gim-dot");
  var bar = feat.querySelector(".gim-bar b"), pauseBtn = feat.querySelector('[data-act="pause"]');
  function show(i) {
    idx = (i + n) % n;
    for (var k = 0; k < n; k++) {
      slideEls[k].classList.toggle("on", k === idx);
      slideEls[k].setAttribute("aria-hidden", k === idx ? "false" : "true");
      dotEls[k].classList.toggle("on", k === idx);
    }
    restartBar();
  }
  function restartBar() {
    bar.classList.remove("run"); void bar.offsetWidth;
    if (paused || reduceMotion) return;
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (!paused && timer) bar.classList.add("run"); }); });
  }
  function start() { stop(); if (!paused && !reduceMotion) timer = setInterval(function () { show(idx + 1); }, ROTATE_MS); restartBar(); }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  if (reduceMotion) { paused = true; pauseBtn.textContent = "Next"; }

  for (var d = 0; d < dotEls.length; d++) (function (k) { dotEls[k].addEventListener("click", function () { show(k); start(); }); })(d);
  feat.addEventListener("mouseenter", function () { stop(); bar.classList.remove("run"); });
  feat.addEventListener("mouseleave", start);
  feat.addEventListener("focusin", function () { stop(); bar.classList.remove("run"); });
  feat.addEventListener("focusout", start);
  feat.querySelector(".gim-stage").addEventListener("click", function () { openCard(current, idx); });
  feat.querySelector(".gim-stage").style.cursor = "pointer";

  feat.addEventListener("click", function (e) {
    var act = e.target.getAttribute && e.target.getAttribute("data-act");
    if (!act) return;
    if (act === "pause") {
      if (reduceMotion) { show(idx + 1); return; }
      paused = !paused; pauseBtn.textContent = paused ? "Play" : "Pause";
      paused ? (stop(), bar.classList.remove("run")) : start();
    } else if (act === "download") {
      stop(); bar.classList.remove("run");
      openDownload(current, idx);
    } else if (act === "all") {
      var chip = document.querySelector('.tag-chip[data-filter="tools"]');
      if (chip) chip.click();
      var sec = document.getElementById("tools");
      if (sec) sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  });
  start();
})();

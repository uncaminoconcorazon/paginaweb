/* ==========================================================================
   Efectos "wow" de After Effects, seek-safe (GSAP, deterministas). Úsalos sobre un momento que ya existe
   (un drop, un pago, un golpe): el efecto subraya lo que pasa, no lo reemplaza.

   MKW.shockwave(tl, container, x, y, t, {color, size, width, dur})   anillo que se expande y se apaga
   MKW.shake(tl, sel, t, {amp, dur, seed})                             sacudida corta de cámara (usa un wrapper
                                                                        DENTRO de #cam, no el #cam de MKC.auto)
   MKW.speedLines(tl, container, x, y, t, {n, color, dur, seed})       líneas de velocidad radiales (zambullidas)
   MKW.blurPulse(tl, sel, t, {amt, dur})                               desenfoque de movimiento en un empuje
   MKW.roll(tl, el, from, to, t, {dur})                                cifra que rueda dígito a dígito ("8,90" → "31,61")
   MKW.sweep(tl, el, t, {dur, color})                                  barrido de luz sobre un elemento (logo, titular)
   Sonidos: márcalos en beats.json "eventos" (onda → "golpe"/"impacto", confeti → "brillo") para que Mezcla.auto los ponga.
   ========================================================================== */
(function (root) {
  const MKW = {};
  const $ = (s) => (typeof s === "string" ? document.querySelector(s) : s);
  const rng = (seed) => { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); };

  MKW.shockwave = (tl, container, x, y, t, { color = "#fa4616", size = 900, width = 10, dur = 0.7, alpha = 0.9 } = {}) => {
    const r = document.createElement("div");
    Object.assign(r.style, { position: "absolute", left: x - size / 2 + "px", top: y - size / 2 + "px", width: size + "px", height: size + "px",
      borderRadius: "50%", border: `${width}px solid ${color}`, pointerEvents: "none", opacity: 0 });
    $(container).appendChild(r);
    tl.fromTo(r, { scale: 0.05, opacity: alpha }, { scale: 1, opacity: 0, duration: dur, ease: "expo.out", immediateRender: false }, t);
    tl.set(r, { opacity: 0 }, 0);
    return r;
  };

  MKW.shake = (tl, sel, t, { amp = 14, dur = 0.32, seed = 7 } = {}) => {
    const R = rng(seed), n = 6, kf = [];
    for (let i = 0; i < n; i++) { const k = 1 - i / n; kf.push({ x: (R() - 0.5) * 2 * amp * k, y: (R() - 0.5) * 2 * amp * k, rotation: (R() - 0.5) * 0.6 * k, duration: dur / (n + 1) }); }
    kf.push({ x: 0, y: 0, rotation: 0, duration: dur / (n + 1) });
    tl.to(sel, { keyframes: kf, ease: "none" }, t);
  };

  MKW.speedLines = (tl, container, x, y, t, { n = 34, color = "rgba(250,70,22,.55)", dur = 0.5, seed = 3 } = {}) => {
    const R = rng(seed), box = $(container);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + R() * 0.15, len = 220 + R() * 420, l = document.createElement("i");
      Object.assign(l.style, { position: "absolute", left: x + "px", top: y + "px", width: len + "px", height: 3 + R() * 3 + "px", background: color,
        borderRadius: "3px", transformOrigin: "0 50%", transform: `rotate(${a}rad)`, opacity: 0, pointerEvents: "none" });
      box.appendChild(l);
      const d0 = 80 + R() * 160, d1 = 900 + R() * 500;
      tl.fromTo(l, { x: Math.cos(a) * d0, y: Math.sin(a) * d0, scaleX: 0.2, opacity: 0.95 },
        { x: Math.cos(a) * d1, y: Math.sin(a) * d1, scaleX: 1, opacity: 0, duration: dur * (0.7 + R() * 0.5), ease: "power2.in", immediateRender: false }, t + R() * 0.08);
      tl.set(l, { opacity: 0 }, 0);
    }
  };

  MKW.blurPulse = (tl, sel, t, { amt = 14, dur = 0.38 } = {}) => {
    tl.fromTo(sel, { filter: "blur(0px)" }, { keyframes: [{ filter: `blur(${amt}px)`, duration: dur * 0.5, ease: "power2.in" }, { filter: "blur(0px)", duration: dur * 0.5, ease: "power2.out" }], immediateRender: false }, t);
  };

  // Cada carácter es una columna que rueda del carácter viejo al nuevo (alinea a la derecha). El elemento queda con
  // spans .mkw-c; dale una fuente tabular o monoespaciada para que no baile.
  MKW.roll = (tl, el, from, to, t, { dur = 0.7, stagger = 0.05 } = {}) => {
    const e = $(el), L = Math.max(from.length, to.length), a = from.padStart(L, " "), b = to.padStart(L, " ");
    e.innerHTML = [...a].map((c, i) => `<span class="mkw-c" style="display:inline-block;position:relative;overflow:hidden;vertical-align:top;height:1.1em;line-height:1.1em">` +
      `<span style="display:block">${c === " " ? "&nbsp;" : c}</span><span style="display:block">${b[i] === " " ? "&nbsp;" : b[i]}</span></span>`).join("");
    [...e.children].forEach((c, i) => { if (a[i] !== b[i]) tl.fromTo(c.children, { yPercent: 0 }, { yPercent: -100, duration: dur, ease: "expo.inOut", immediateRender: false }, t + (L - 1 - i) * stagger); });
  };

  MKW.sweep = (tl, el, t, { dur = 0.9, color = "rgba(255,255,255,.75)", width = 180 } = {}) => {
    const host = $(el); if (getComputedStyle(host).position === "static") host.style.position = "relative"; host.style.overflow = "hidden";   // no rompe un elemento absoluto
    const s = document.createElement("i");
    Object.assign(s.style, { position: "absolute", top: "-20%", bottom: "-20%", left: 0, width: width + "px", pointerEvents: "none",
      background: `linear-gradient(100deg, transparent, ${color}, transparent)`, transform: "skewX(-18deg)", opacity: 0 });
    host.appendChild(s);
    tl.fromTo(s, { x: -width * 1.5, opacity: 1 }, { x: host.offsetWidth + width, opacity: 1, duration: dur, ease: "power2.inOut", immediateRender: false }, t);
    tl.set(s, { opacity: 0 }, t + dur);
    tl.set(s, { opacity: 0 }, 0);
  };

  root.MKW = MKW;
})(window);

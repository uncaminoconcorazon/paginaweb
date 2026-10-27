/* ==========================================================================
   Cámara y emojis automáticos desde plan/beats.json (seek-safe, GSAP).
   La misma lista que mueve la cámara la lee mezcla.py (Mezcla.auto) para poner su whoosh:
   ningún zoom queda mudo y ningún sonido queda sin su movimiento.

   beats.json:
     "camara": [[t, x, y, s, d, "golpe"?], …]   en t empieza un movimiento de d s que encuadra el punto (x, y)
                                                 del mundo a escala s (s sube = zoom in, baja = zoom out).
                                                 x puede ser un selector ("#boton") e y un desplazamiento en px de
                                                 mundo: la cámara apunta al centro REAL del elemento (medido en el DOM
                                                 antes de animar), así no depende de coordenadas sacadas de una captura.
                                                 "golpe" = al llegar, un empujón corto (impacto, palabra que cae).
     "emojis": [[t, tFuera, "🎉", x, y, tam?], …]  emoji de Apple HD (scripts/emoji_hd.py) en coordenadas de pantalla.

   MKC.auto(tl, "#cam", B.camara, { W: 1920, H: 1080 })
     · d ≤ 0.7 → golpe de UI (expo.inOut, frena en seco); d > 0.7 → viaje que respira (power3.inOut).
     · entre dos movimientos, deriva casi imperceptible (+1.2 % de escala) para que nunca quede quieto.
     · #cam usa transform-origin 0 0 (como en references/look-premium.md).
   MKC.emojis(tl, B.emojis, "#fx", { base: "assets/emoji/" })  crea un <img class="mka-emoji"> por emoji y lo anima
     con MKA.emoji (necesita kit/apple.js). Si no hay PNG HD, usa el texto (se ve borroso en 4K: corre emoji_hd.py).
   ========================================================================== */
(function (root) {
  const MKC = {};
  const $ = (s) => (typeof s === "string" ? document.querySelector(s) : s);
  const code = (e) => [...e].map((c) => c.codePointAt(0)).filter((c) => c !== 0xfe0f).map((c) => c.toString(16)).join("-");

  MKC.auto = (tl, cam, shots, { W = 1920, H = 1080, deriva = 0.012, empujon = 0.035 } = {}) => {
    const el = $(cam);
    if (!el || !shots || !shots.length) return;
    tl.set(el, { transformOrigin: "0 0" }, 0);
    // selectores → centro del elemento en coordenadas del mundo (se mide con #cam sin transformar)
    const t0 = el.style.transform; el.style.transform = "none";
    const base = el.getBoundingClientRect();
    shots = shots.map((sh) => {
      if (typeof sh[1] !== "string") return sh;
      const r = $(sh[1]).getBoundingClientRect(), dy = typeof sh[2] === "number" ? sh[2] : 0;
      return [sh[0], r.left - base.left + r.width / 2, r.top - base.top + r.height / 2 + dy, ...sh.slice(3)];
    });
    el.style.transform = t0;
    MKC.shots = shots;   // resueltos, por si otra capa quiere saber dónde está la cámara
    const pose = ([, x, y, s]) => ({ x: W / 2 - x * s, y: H / 2 - y * s, scale: s });
    const [first] = shots;
    tl.set(el, pose(first), 0);
    shots.forEach((sh, i) => {
      const [t, x, y, s, d = 0.6, kind] = sh;
      if (i > 0 || t > 0) tl.to(el, { ...pose(sh), duration: d, ease: d <= 0.7 ? "expo.inOut" : "power3.inOut" }, t);
      const llega = t + (i === 0 && t === 0 ? 0 : d);
      if (kind === "golpe") tl.to(el, { scale: s * (1 + empujon), x: W / 2 - x * s * (1 + empujon), y: H / 2 - y * s * (1 + empujon),
        duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1 }, llega);
      const next = shots[i + 1];
      const libre = (next ? next[0] : llega + 3) - llega - (kind === "golpe" ? 0.24 : 0);
      if (libre > 0.4) {   // deriva lenta hacia el mismo punto: vivo sin cambiar el encuadre
        const s2 = s * (1 + deriva * Math.min(1, libre / 2));
        tl.to(el, { scale: s2, x: W / 2 - x * s2, y: H / 2 - y * s2, duration: libre, ease: "none" }, llega + (kind === "golpe" ? 0.24 : 0));
      }
    });
  };

  MKC.emojis = (tl, lista, container, { base = "assets/emoji/", tam = 190 } = {}) => {
    const box = $(container);
    if (!box || !lista) return [];
    return lista.map(([t, tOut, e, x, y, size = tam], i) => {
      const img = new Image();
      img.className = "mka-emoji mkc-emoji"; img.alt = e; img.decoding = "sync";
      img.src = base + code(e) + ".png";
      Object.assign(img.style, { left: x - size / 2 + "px", top: y - size / 2 + "px", width: size + "px", height: size + "px", font: "inherit" });
      img.onerror = () => {   // sin PNG HD: texto de la fuente (avisa en consola)
        const s = document.createElement("div"); s.className = "mka-emoji"; s.textContent = e;
        Object.assign(s.style, { left: img.style.left, top: img.style.top, fontSize: size + "px" });
        img.replaceWith(s); console.warn(`[MKC] falta ${base}${code(e)}.png: corre scripts/emoji_hd.py`);
      };
      box.appendChild(img);
      root.MKA.emoji(tl, img, t, tOut, { r0: i % 2 ? 16 : -18, r1: i % 2 ? -6 : 6, shake: /😵|😰|😱/.test(e) ? 2 : 0 });
      return img;
    });
  };

  root.MKC = MKC;
})(window);

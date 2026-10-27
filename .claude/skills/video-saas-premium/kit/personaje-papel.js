/* ==========================================================================
   Personaje de papel (anfitrión del video): SVG recortado con borde blanco de sticker,
   brazos de 2 piezas y poses para GSAP. Determinista: todo vive en el timeline.

   const p = Personaje(document.querySelector("#host"), {               // rasgos (todos opcionales)
     piel: "#e2b48f", pelo: "#1f1b19", peinado: "rulos",               // rulos · corto · largo · calvo
     gorra: "#c9b99c",            // color de gorra de béisbol, o null
     ropa: "#17191d", cuello: "polo",                                    // polo · redondo
     pantalon: "#3a3d44", zapatillas: "#fafafa", lentes: false, chapitas: true });
   p.pose(tl, "saluda", 1.2);   p.saludo(tl, 1.6, 3);   p.respira(tl, 0, 18);   p.parpadea(tl, 2.3);   p.salto(tl, 4, 40);
   Poses: neutral · saluda · señala · sorprendido · piensa · celebra · sostiene · lanza
   Puntos útiles (en coordenadas del SVG 520×720, escala con el contenedor): manos en "sostiene" ≈ (260, 426),
   cabeza ≈ (260, 246), pies ≈ y 658. Contenedor recomendado: 450×623 px (escala 0.865).
   ========================================================================== */
(function (global) {
  const W = 12, ARM = 46, ARM_O = ARM + W * 2, BORDE = "#ffffff";
  const oscurece = (hex, k = 0.86) => "#" + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, "0")).join("");

  function svg(o) {
    const sk = `stroke="${BORDE}" stroke-width="${W}" stroke-linejoin="round" paint-order="stroke"`;
    const brazo = (lado, capa) => {
      const x = lado === "r" ? 342 : 178, col = capa === "o" ? BORDE : o.ropa, w = capa === "o" ? ARM_O : ARM;
      const mano = capa === "o" ? `<circle cx="${x}" cy="536" r="${24 + W}" fill="${BORDE}"/>` : `<circle cx="${x}" cy="536" r="24" fill="${o.piel}"/>`;
      return `<g class="${lado}-sh"><line x1="${x}" y1="372" x2="${x}" y2="452" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
        <g class="${lado}-el"><line x1="${x}" y1="452" x2="${x}" y2="514" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>${mano}</g></g>`;
    };
    // hair behind the head (outlined), hair on top of the head (no outline)
    let detras = "", encima = "";
    if (o.peinado === "rulos") {
      detras = `<g fill="${o.pelo}"><circle cx="150" cy="212" r="38"/><circle cx="140" cy="262" r="34"/><circle cx="370" cy="212" r="38"/><circle cx="380" cy="262" r="34"/><circle cx="160" cy="302" r="28"/><circle cx="360" cy="302" r="28"/>${o.gorra ? "" : `<circle cx="190" cy="140" r="40"/><circle cx="260" cy="122" r="44"/><circle cx="330" cy="140" r="40"/>`}</g>`;
      encima = `<g fill="${o.pelo}"><circle cx="172" cy="178" r="30"/><circle cx="214" cy="170" r="30"/><circle cx="258" cy="166" r="30"/><circle cx="302" cy="170" r="30"/><circle cx="346" cy="178" r="30"/><circle cx="158" cy="222" r="24"/><circle cx="362" cy="222" r="24"/>${o.gorra ? "" : `<circle cx="196" cy="146" r="34"/><circle cx="260" cy="134" r="36"/><circle cx="324" cy="146" r="34"/>`}</g>`;
    } else if (o.peinado === "largo") {
      detras = `<path d="M150 190 q-20 120 -6 210 q40 18 60 -6 l0 -150 h112 l0 150 q20 24 60 6 q14 -90 -6 -210 q-50 -90 -110 -90 q-60 0 -110 90z" fill="${o.pelo}"/>`;
      encima = `<path d="M150 214 q8 -96 110 -98 q102 2 110 98 q-40 -40 -110 -44 q-70 4 -110 44z" fill="${o.pelo}"/>`;
    } else if (o.peinado === "corto") {
      encima = `<path d="M150 230 q-4 -112 110 -116 q114 4 110 116 q-18 -50 -40 -62 q-60 18 -140 0 q-22 12 -40 62z" fill="${o.pelo}"/>`;
    }
    const gorra = o.gorra ? `<g ${sk}><path d="M150 176 q6 -96 110 -98 q104 2 110 98 z" fill="${o.gorra}"/>
        <path d="M160 174 q100 -26 230 -4 q22 4 26 16 q-130 26 -256 -12z" fill="${oscurece(o.gorra)}"/></g>
        <path d="M260 82 v90" stroke="${oscurece(o.gorra, 0.8)}" stroke-width="4"/><circle cx="260" cy="80" r="7" fill="${oscurece(o.gorra)}"/>` : "";
    const cuello = o.cuello === "polo"
      ? `<path d="M232 334 l28 52 l28 -52" fill="none" stroke="${oscurece(o.ropa, 1.6)}" stroke-width="10" stroke-linejoin="round"/><circle cx="260" cy="410" r="5" fill="${oscurece(o.ropa, 2)}"/><circle cx="260" cy="440" r="5" fill="${oscurece(o.ropa, 2)}"/>`
      : `<path d="M226 334 q34 30 68 0" fill="none" stroke="${oscurece(o.ropa, 1.6)}" stroke-width="10" stroke-linecap="round"/>`;
    const lentes = o.lentes ? `<g fill="none" stroke="${o.pelo}" stroke-width="6"><circle cx="218" cy="244" r="28"/><circle cx="302" cy="244" r="28"/><path d="M246 244 h28"/></g>` : "";
    return `
  <svg viewBox="0 0 520 720" style="width:100%;height:100%;overflow:visible">
    <defs><filter id="pp-sh" x="-25%" y="-20%" width="150%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#17191d" flood-opacity=".16"/></filter></defs>
    <ellipse class="piso" cx="260" cy="676" rx="122" ry="14" fill="#17191d" opacity=".08"/>
    <g class="cuerpo" filter="url(#pp-sh)">
      <g ${sk}>
        <rect x="205" y="520" width="44" height="122" rx="14" fill="${o.pantalon}"/><rect x="271" y="520" width="44" height="122" rx="14" fill="${o.pantalon}"/>
        <rect x="190" y="626" width="68" height="32" rx="15" fill="${o.zapatillas}"/><rect x="262" y="626" width="68" height="32" rx="15" fill="${o.zapatillas}"/>
      </g>
      ${brazo("l", "o")}${brazo("l", "f")}
      <g ${sk}><path d="M170 380 q0 -40 50 -48 h80 q50 8 50 48 v170 q0 18 -18 18 h-144 q-18 0 -18 -18z" fill="${o.ropa}"/></g>
      ${cuello}
      ${brazo("r", "o")}${brazo("r", "f")}
      <g class="cabeza">
        <g ${sk}>${detras}<ellipse cx="260" cy="246" rx="112" ry="116" fill="${o.piel}"/></g>
        ${encima}${gorra}
        <g class="ojos"><ellipse cx="218" cy="244" rx="11" ry="14" fill="#17191d"/><ellipse cx="302" cy="244" rx="11" ry="14" fill="#17191d"/></g>
        ${lentes}
        <path class="cejas" d="M196 210 q22 -10 42 0 M282 210 q22 -10 42 0" stroke="${o.pelo === "none" ? "#3a3d44" : o.pelo}" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M252 268 q8 10 16 0" stroke="${oscurece(o.piel, 0.8)}" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path class="b-sonrie" d="M232 300 q28 18 56 0" stroke="#7a3f33" stroke-width="7" stroke-linecap="round" fill="none"/>
        <ellipse class="b-o" cx="260" cy="304" rx="13" ry="16" fill="#7a3f33" opacity="0"/>
        <path class="b-plana" d="M240 304 h40" stroke="#7a3f33" stroke-width="7" stroke-linecap="round" opacity="0"/>
        ${o.chapitas ? `<circle cx="196" cy="282" r="13" fill="#e89a86" opacity=".45"/><circle cx="324" cy="282" r="13" fill="#e89a86" opacity=".45"/>` : ""}
      </g>
    </g>
  </svg>`;
  }

  // degrees (SVG: positive = clockwise). r = arm on the right of the screen.
  const POSES = {
    neutral:     { rSh: -8,   rEl: 0,   lSh: 8,   lEl: 0,   cab: 0,  cejas: 0,   boca: "sonrie" },
    saluda:      { rSh: -150, rEl: -25, lSh: 10,  lEl: 0,   cab: -5, cejas: -4,  boca: "sonrie" },
    señala:      { rSh: -95,  rEl: -5,  lSh: 12,  lEl: 0,   cab: 6,  cejas: -2,  boca: "sonrie" },
    sorprendido: { rSh: -140, rEl: 30,  lSh: 140, lEl: -30, cab: 0,  cejas: -12, boca: "o" },
    piensa:      { rSh: -20,  rEl: 150, lSh: 10,  lEl: 0,   cab: 8,  cejas: -6,  boca: "plana" },
    celebra:     { rSh: -165, rEl: -10, lSh: 165, lEl: 10,  cab: 0,  cejas: -8,  boca: "o" },
    sostiene:    { rSh: 30,   rEl: 70,  lSh: -30, lEl: -70, cab: 4,  cejas: -3,  boca: "sonrie" },
    lanza:       { rSh: -120, rEl: -40, lSh: -10, lEl: -20, cab: -6, cejas: -4,  boca: "sonrie" },
  };
  POSES.senala = POSES["señala"];   // alias sin ñ, por si la página no declara <meta charset="utf-8">
  const DEF = { piel: "#e2b48f", pelo: "#2b2420", peinado: "corto", gorra: null, ropa: "#17191d", cuello: "redondo",
                pantalon: "#3a3d44", zapatillas: "#fafafa", lentes: false, chapitas: true };

  function Personaje(el, rasgos = {}) {
    const o = { ...DEF, ...rasgos };
    el.innerHTML = svg(o);
    const q = s => el.querySelectorAll(s), set = (s, v) => gsap.set(q(s), v);
    // svgOrigin = the SVG's own coordinates (everything is drawn in absolute coords, so the elbow follows the shoulder)
    set(".r-sh", { svgOrigin: "342 372" }); set(".l-sh", { svgOrigin: "178 372" });
    set(".r-el", { svgOrigin: "342 452" }); set(".l-el", { svgOrigin: "178 452" });
    set(".cabeza", { svgOrigin: "260 340" }); set(".cuerpo", { svgOrigin: "260 660" });
    const bocas = ["sonrie", "o", "plana"];
    const api = {
      el, POSES, rasgos: o,
      ahora(name) { const p = POSES[name]; set(".r-sh", { rotation: p.rSh }); set(".r-el", { rotation: p.rEl }); set(".l-sh", { rotation: p.lSh });
        set(".l-el", { rotation: p.lEl }); set(".cabeza", { rotation: p.cab }); set(".cejas", { y: p.cejas });
        bocas.forEach(b => set(".b-" + b, { opacity: b === p.boca ? 1 : 0 })); return api; },
      pose(tl, name, at, dur = 0.42, ease = "back.out(1.6)") {
        const p = POSES[name];
        tl.to(q(".r-sh"), { rotation: p.rSh, duration: dur, ease }, at).to(q(".r-el"), { rotation: p.rEl, duration: dur, ease }, at + 0.04)
          .to(q(".l-sh"), { rotation: p.lSh, duration: dur, ease }, at).to(q(".l-el"), { rotation: p.lEl, duration: dur, ease }, at + 0.04)
          .to(q(".cabeza"), { rotation: p.cab, duration: dur * 1.2, ease: "power2.out" }, at).to(q(".cejas"), { y: p.cejas, duration: 0.2 }, at);
        bocas.forEach(b => tl.set(q(".b-" + b), { opacity: b === p.boca ? 1 : 0 }, at + 0.08));
        return api;
      },
      saludo(tl, at, veces = 3) { tl.to(q(".r-el"), { rotation: "-=35", duration: 0.16, ease: "sine.inOut", yoyo: true, repeat: veces * 2 - 1 }, at); return api; },
      respira(tl, t0, t1) { const n = Math.max(1, Math.round((t1 - t0) / 1.5));
        tl.fromTo(q(".cuerpo"), { scaleY: 1, y: 0 }, { scaleY: 1.012, y: -4, duration: (t1 - t0) / n / 2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1 }, t0); return api; },
      parpadea(tl, at) { tl.to(q(".ojos ellipse"), { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.06, yoyo: true, repeat: 1 }, at); return api; },
      salto(tl, at, alto = 40) { tl.to(q(".cuerpo"), { y: -alto, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, at)
          .to(q(".piso"), { scale: 0.8, transformOrigin: "50% 50%", duration: 0.22, yoyo: true, repeat: 1 }, at); return api; },
    };
    return api.ahora("neutral");
  }
  global.Personaje = Personaje;
})(window);

#!/usr/bin/env python3
"""Mezcla los SFX (y opcionalmente voz y música) desde los MISMOS tiempos que lee la animación.

Uso típico: el proyecto tiene plan/beats.json (única fuente de tiempos) y un plan/sonido.py corto que
convierte cada evento en sonidos:

    import json, sys; sys.path.insert(0, "<skill>/scripts")
    from mezcla import Mezcla
    B = json.load(open("plan/beats.json"))
    m = Mezcla(B["dur"], "assets/sfx/listos")            # carpeta de anclar_sfx.py (con anclas.json)
    for n in B["notas"]:
        m.cue(n["atrapa"], "papel-atrapa", -8)            # el CONTACTO del sonido cae en ese segundo
        m.cue(n["dobla"], "papel-dobla", -13, max=0.25)    # max = recorta con un fade del 40 % (nunca un corte seco)
    m.cue(12.0, "tono", -20, semi=4)                      # semi = semitonos (escalas: tonos que suben = melodía)
    m.voz("assets/audio/vo-mix.mp3", db=0)                # de audio_tools.py vo-mix (lanzamiento/SaaS: sí por defecto)
    m.musica("assets/audio/music-mix.mp3", db=0)          # de audio_tools.py music / music-fit (ya agachada bajo la voz)
    m.auto(B, json.load(open("plan/roles.json")))         # cámara, emojis y eventos de beats.json suenan solos
    m.render("motion/assets/audio/mezcla.wav")            # master −15 LUFS, pico ≤ −1.5 dB

CLI: python3 mezcla.py cues.json salida.wav   con  {"dur": 20, "sonidos": "assets/sfx/listos",
     "cues": [[t, "nombre", db, semi, max], ...], "voz": {"archivo": ..., "db": 0}, "musica": {"archivo": ..., "db": -24}}

Reglas: efectos del material que se ve (references/sfx.md), 6–12 dB bajo la voz y por encima de la música;
lanzamiento/SaaS lleva voz y música; cada sonido con su cola entera; master −15 LUFS.
Aire (v4, crítica "los sfx van rapidísimo… se escucha mal"): un sonido por evento y ≥ 0.3 s entre eventos. Al
renderizar se avisa de los que caen más juntos, de las capas apiladas en el mismo cuadro, de los segundos con
más de 3 eventos y, al revés, de los huecos de más de 2.5 s y de una media menor a 0.7 eventos por segundo
(crítica de una prueba: 8 efectos en 26 s sonaron sosos). Una ráfaga a propósito (un contador, sellos seguidos) se declara: m.rafaga(t0, t1).
"""
import json, os, re, subprocess, sys
import numpy as np

SR = 48000

def _load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    if not raw: sys.exit(f"no pude leer {p}")
    return np.frombuffer(raw, np.float32).copy()

def _lufs(p):
    m = subprocess.run(["ffmpeg", "-nostats", "-i", p, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", m)[-1])

def _pitch(x, semi):
    if not semi: return x
    f = 2 ** (semi / 12); return np.interp(np.arange(0, len(x) - 1, f), np.arange(len(x)), x).astype(np.float32)

class Mezcla:
    def __init__(self, dur, carpeta, aire=0.3):
        self.dur, self.dir, self.aire, self.rafagas = float(dur), carpeta, aire, []
        anc = os.path.join(carpeta, "anclas.json")
        self.anclas = json.load(open(anc)) if os.path.exists(anc) else {}
        self.cues, self.cache, self.extra = [], {}, []

    def cue(self, t, nombre, db=-12, semi=0, max=None, ancla="anchor"):
        """ancla="anchor": el contacto cae en t (golpes, clics, pops). ancla="peak": el punto más fuerte cae en t
        (whooshes, risers: el sonido crece hacia el momento)."""
        self.cues.append((float(t), nombre, db, semi, max, ancla)); return self

    def auto(self, B, roles, orden=("revela", "logo", "golpe", "clic", "emoji", "zoom-in", "zoom-out", "paneo")):
        """Sonido automático desde los MISMOS tiempos que mueven la animación (plan/beats.json):
          B["camara"]  [[t, x, y, s, d, "golpe"?], …] → cada movimiento suena según su tipo: zoom-in (s sube),
                       zoom-out (s baja) o paneo; su pico cae a mitad del movimiento; "golpe" suena al llegar.
          B["emojis"]  [[t, tFuera, "🎉", x, y], …]   → "emoji" en t.
          B["eventos"] {"clic": [t…], "revela": [t…], "logo": [t…], …} → ese rol en cada t.
          B["rafagas"] [[t0, t1], …] → tramos donde se permite apilar (riser → drop, tap → éxito → emoji, reversa → logo).
        roles (plan/roles.json): {"zoom-in": {"sonidos": ["a", "b"], "db": -17, "ancla": "peak", "largo": true}, …}
          · las variantes se alternan para no sonar a ametralladora; "largo": elige el sonido cuyo largo se
            parece más al del movimiento; "semi": [0, 2, 4…] sube de tono en cada repetición.
        Aire automático: si dos eventos caen a menos de self.aire s, gana el que va antes en `orden` (el resultado
        suena, el adorno calla) salvo dentro de una ráfaga declarada. Devuelve cuántos puso y cuántos calló."""
        for a, b in B.get("rafagas", []): self.rafaga(a, b)   # tramos donde se apilan a propósito (drop, pago, logo)
        cand = []
        prev_s = None
        for i, sh in enumerate(B.get("camara", [])):
            t, _, _, sc, d = (list(sh) + [0.6])[:5]
            kind = sh[5] if len(sh) > 5 else None
            if prev_s is not None:
                r = sc / prev_s
                cand.append(("zoom-in" if r > 1.05 else "zoom-out" if r < 0.95 else "paneo", t + d * 0.5, d))
            if kind == "golpe": cand.append(("golpe", t + (d if prev_s is not None else 0), 0))
            prev_s = sc
        for e in B.get("emojis", []): cand.append(("emoji", e[0], 0))
        for rol, ts in (B.get("eventos") or {}).items():
            for t in ts: cand.append((rol, t, 0))
        rank = {r: k for k, r in enumerate(orden)}
        cand = [c for c in cand if c[0] in roles]
        cand.sort(key=lambda c: (rank.get(c[0], len(orden)), c[1]))
        libre = lambda t: not any(a <= t <= b for a, b in self.rafagas)
        puestos, callados, uso = [], [], {}
        for rol, t, d in cand:
            if libre(t) and any(abs(t - u) < self.aire for _, u, _ in puestos): callados.append((rol, t)); continue
            puestos.append((rol, t, d))
        for rol, t, d in sorted(puestos, key=lambda c: c[1]):
            R = roles[rol]; ops = R["sonidos"]; k = uso.get(rol, 0); uso[rol] = k + 1
            if R.get("largo") and d:
                n = min(ops, key=lambda o: abs(self.anclas.get(o, {}).get("dur", d) - d * 1.3) + 0.05 * ((ops.index(o) - k) % len(ops)))
            else:
                n = ops[k % len(ops)]
            semi = R.get("semi", [0])[k % len(R.get("semi", [0]))]
            self.cue(t, n, R.get("db", -16), semi, R.get("max"), R.get("ancla", "anchor"))
        print(f"auto: {len(puestos)} sonidos desde beats.json · {len(callados)} callados por aire"
              + (f" ({', '.join(f'{r}@{t:.2f}' for r, t in callados[:6])})" if callados else ""))
        return len(puestos), callados

    def rafaga(self, t0, t1): self.rafagas.append((t0, t1)); return self   # tramo donde se permiten eventos juntos

    def revisar(self):
        """Avisos de aire: no detiene el render, pero léelos antes de mostrar."""
        ts = sorted(t for t, *_ in self.cues); libre = lambda t: not any(a <= t <= b for a, b in self.rafagas)
        juntos = [(a, b) for a, b in zip(ts, ts[1:]) if b - a < self.aire and libre(b)]
        capas = [(a, b) for a, b in juntos if b - a < 0.05]
        picos = sorted({int(t) for t in ts if sum(1 for u in ts if int(u) == int(t)) > 3 and libre(t)})
        if ts: print(f"aire: {len(ts)} eventos · {len(ts) / self.dur:.1f}/s de media · mínimo entre dos {min((b - a for a, b in zip(ts, ts[1:])), default=0):.2f} s")
        huecos = [(a, b) for a, b in zip(ts, ts[1:]) if b - a > 2.5 and b < self.dur - 4]
        if ts and len(ts) / self.dur < 0.7:
            print(f"  ⚠ pocos eventos ({len(ts) / self.dur:.1f}/s): en un lanzamiento o comercial cada beat visible lleva su sonido (~1–1.5/s en la acción)")
        for a, b in huecos[:6]: print(f"  ⚠ {a:.2f}–{b:.2f} s sin sonidos: ¿no pasa nada en pantalla ahí?")
        for a, b in [x for x in juntos if x not in capas][:8]: print(f"  ⚠ {a:.2f} y {b:.2f} s: menos de {self.aire} s entre eventos")
        for a, b in capas[:8]: print(f"  ⚠ {a:.2f} s: dos capas en el mismo cuadro (¿golpe + sub en algo que no es el momento grande?)")
        for s in picos[:8]: print(f"  ⚠ segundo {s}: más de 3 eventos")
        return not (juntos or picos)

    def voz(self, archivo, db=0, t=0): self.extra.append((archivo, db, t)); return self
    def musica(self, archivo, db=-24, t=0): self.extra.append((archivo, db, t)); return self

    def _snd(self, n):
        if n not in self.cache:
            for ext in (".wav", ".mp3"):
                p = os.path.join(self.dir, n + ext)
                if os.path.exists(p): self.cache[n] = _load(p); break
            else: sys.exit(f"falta el sonido {n} en {self.dir}")
        return self.cache[n]

    def render(self, dst, lufs=-15.0):
        self.revisar()
        out = np.zeros(int(self.dur * SR) + SR, np.float32)
        for t, n, db, semi, mx, ancla in self.cues:
            x = _pitch(self._snd(n), semi)
            if mx:
                k = min(len(x), int(mx * SR)); x = x[:k].copy(); f = max(int(0.03 * SR), int(k * 0.4))
                x[-f:] *= np.linspace(1, 0, f) ** 1.5
            a = int(round((t - self.anclas.get(n, {}).get(ancla, 0) / 2 ** (semi / 12)) * SR))
            if a < 0: x = x[-a:]; a = 0
            out[a:a + len(x)] += x[:max(0, len(out) - a)] * 10 ** (db / 20)
        for f, db, t in self.extra:
            x = _load(f); a = int(t * SR); out[a:a + len(x)] += x[:max(0, len(out) - a)] * 10 ** (db / 20)
        out = out[:int(self.dur * SR)]; fo = int(0.4 * SR); out[-fo:] *= np.linspace(1, 0, fo)
        os.makedirs(os.path.dirname(os.path.abspath(dst)), exist_ok=True)
        tmp = dst + ".pre.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", tmp], input=out.tobytes())
        g = lufs - _lufs(tmp)
        for _ in range(6):   # the limiter eats a little loudness: re-measure and correct until within 0.15 LU
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"volume={g:.2f}dB,alimiter=limit=0.84:attack=1:release=40:level=false",
                            "-ar", str(SR), "-ac", "2", dst])
            d = lufs - _lufs(dst)
            if abs(d) < 0.15: break
            g += d
        os.remove(tmp)
        print(f"{len(self.cues)} sonidos → {dst} ({_lufs(dst):.1f} LUFS)")
        return dst

if __name__ == "__main__":
    if len(sys.argv) < 3: sys.exit(__doc__)
    c = json.load(open(sys.argv[1])); m = Mezcla(c["dur"], c.get("sonidos", "assets/sfx/listos"))
    for q in c["cues"]: m.cue(*q)
    if c.get("auto"): m.auto(json.load(open(c["auto"]["beats"])), json.load(open(c["auto"]["roles"])))
    if c.get("voz"): m.voz(c["voz"]["archivo"], c["voz"].get("db", 0))
    if c.get("musica"): m.musica(c["musica"]["archivo"], c["musica"].get("db", -24))
    m.render(sys.argv[2])

#!/usr/bin/env python3
"""¿El video se mueve o se queda quieto? Mide el ritmo de un render antes de mostrarlo.

  python3 ritmo.py renders/borrador-v1.mp4            # informe + veredicto
  python3 ritmo.py renders/borrador-v1.mp4 --max-quieto 1.2

Mide, a 10 cuadros por segundo, cuánto cambia la imagen entre cuadros y reporta:
  · los tramos QUIETOS (casi nada cambia durante más de --max-quieto s, por defecto 1.2 s);
  · el % del video que está quieto;
  · los cambios grandes (cortes, transiciones, golpes de cámara) y cada cuánto llegan.
Un video "básico" casi siempre tiene un tramo quieto de 3 s o más y menos de un cambio grande cada 4 s.
Veredicto: FALLA si hay un tramo quieto de más de 2× el máximo o si más del 25 % está quieto. El cierre
(logo o CTA para leer) puede quedarse quieto hasta 3.5 s al final y no cuenta.
Los tramos quietos a propósito (dejar leer un CTA) se justifican en progreso.md; todo lo demás se arregla.
"""
import argparse, subprocess, sys
import numpy as np

ap = argparse.ArgumentParser(); ap.add_argument("video"); ap.add_argument("--max-quieto", type=float, default=1.2); a = ap.parse_args()
W, H, FPS = 160, 90, 10
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", a.video, "-vf", f"fps={FPS},scale={W}:{H},format=gray", "-f", "rawvideo", "-"], capture_output=True).stdout
f = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
if len(f) < 3: sys.exit("no pude leer el video")
d = np.abs(np.diff(f, axis=0)).mean(axis=(1, 2))          # mean change per frame step (0–255)
t = np.arange(1, len(f)) / FPS
quiet = d < 0.6                                            # ~nothing moves (breathing a few px still counts as motion)
runs, start = [], None
for i, q in enumerate(np.r_[quiet, False]):
    if q and start is None: start = i
    if not q and start is not None:
        if (i - start) / FPS >= a.max_quieto: runs.append((start / FPS, i / FPS))
        start = None
big = t[(d > 12) & np.r_[True, d[1:] > d[:-1]]]            # big changes (cuts / fast moves), peak frames only
big = big[np.r_[True, np.diff(big) > 0.4]] if len(big) else big
dur = len(f) / FPS
# quiet time = only stretches of 0.8 s or more (a short pause to read is fine)
q_time, st = 0.0, None
for i, q in enumerate(np.r_[quiet, False]):
    if q and st is None: st = i
    if not q and st is not None:
        if (i - st) / FPS >= 0.8: q_time += (i - st) / FPS
        st = None
q_pct = 100 * q_time / dur
print(f"cambios grandes: {len(big)} (uno cada {dur / max(1, len(big)):.1f} s): " + ", ".join(f"{x:.1f}" for x in big[:30]))
# the closing hold (logo / CTA to read) may stay still up to 3.5 s at the very end
cierre = [(s, e) for s, e in runs if e >= dur - 0.4 and e - s <= 3.5]
for s, e in runs: print(f"  QUIETO {s:5.1f}–{e:5.1f} s ({e - s:.1f} s)" + ("  ← cierre, se permite" if (s, e) in cierre else ""))
if cierre: q_pct -= 100 * sum(e - s for s, e in cierre) / dur
longest = max([e - s for s, e in runs if (s, e) not in cierre], default=0)
print(f"duración {dur:.1f} s · quieto {q_pct:.0f} % del tiempo (sin el cierre) · tramo quieto más largo {longest:.1f} s · movimiento medio {d.mean():.1f}")
fail = longest > 2 * a.max_quieto or q_pct > 25
print("VEREDICTO:", "FALLA → mueve la cámara en esos tramos, mete un momento nuevo o acorta" if fail else "ok")
sys.exit(1 if fail else 0)

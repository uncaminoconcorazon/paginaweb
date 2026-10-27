#!/usr/bin/env python3
"""Hoja de contacto de un rango, con el tiempo en cada cuadro.

  python3 hoja.py video.mp4 desde hasta [--fps 4] [--cols 8] [--out hoja.jpg]
Revisa lo que pasa ENTRE cuadros clave: encimados, cosas cortadas por el borde, saltos, cámara quieta.
"""
import argparse, io, subprocess
from PIL import Image, ImageDraw, ImageFont
a = argparse.ArgumentParser(); a.add_argument("video"); a.add_argument("desde", type=float); a.add_argument("hasta", type=float)
a.add_argument("--fps", type=float, default=4); a.add_argument("--cols", type=int, default=8); a.add_argument("--out"); o = a.parse_args()
raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(o.desde), "-to", str(o.hasta), "-i", o.video, "-vf", f"fps={o.fps},scale=384:-2",
                      "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True).stdout
frames, i = [], 0
while (j := raw.find(b"\x89PNG", i + 1)) != -1 or i < len(raw):
    chunk = raw[i:j] if j != -1 else raw[i:]
    if chunk.startswith(b"\x89PNG"): frames.append(Image.open(io.BytesIO(chunk)).convert("RGB"))
    if j == -1: break
    i = j
w, h = frames[0].size; rows = -(-len(frames) // o.cols)
sheet = Image.new("RGB", (o.cols * w, rows * h), "black"); d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 18)
except OSError: font = ImageFont.load_default()
for k, f in enumerate(frames):
    x, y = k % o.cols * w, k // o.cols * h; sheet.paste(f, (x, y))
    t = f"{o.desde + k / o.fps:.2f}s"; d.rectangle([x + 4, y + 4, x + 74, y + 28], fill="black"); d.text((x + 9, y + 6), t, fill="white", font=font)
out = o.out or o.video.rsplit(".", 1)[0] + f"-hoja-{o.desde:g}-{o.hasta:g}.jpg"
sheet.save(out, quality=85); print(out)

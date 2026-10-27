#!/usr/bin/env python3
"""Emojis de Apple en HD para el render 4K (la fuente del sistema solo llega a 160 px).

    python3 emoji_hd.py motion/assets/emoji 🎉 💸 🌎 😌        # → motion/assets/emoji/<código>.png (640 px)
    python3 emoji_hd.py motion/assets/emoji --lista plan/beats.json   # todos los de "emojis" del plan

Por qué: `.mka-emoji` con texto usa "Apple Color Emoji", cuyo bitmap más grande es de 160 px. A 190 px en una
composición 1080p, el render 4K lo estira ×2.4 y sale borroso. Aquí cada emoji se dibuja a 160 px con la fuente
de TU Mac, se agranda ×4 con Real-ESRGAN (ONNX, se baja una vez a ~/.cache/motion-kit, 67 MB) y queda en caché.
Si no hay onnxruntime o no se pudo bajar el modelo, agranda con Lanczos y lo avisa.

En la composición: <img class="mka-emoji" src="assets/emoji/1f389.png"> (mismo MKA.emoji de siempre).
Las imágenes salen de la fuente de tu sistema: úsalas en tus videos, no las redistribuyas.
Necesita Pillow con raqm (el /usr/bin/python3 de macOS lo trae) y, para el agrandado IA, onnxruntime + numpy.
"""
import json, os, sys, urllib.request

FONT = "/System/Library/Fonts/Apple Color Emoji.ttc"
MODEL_URL = "https://huggingface.co/jonathanst29/tinier-upscale-models/resolve/main/realesrgan-x4plus.onnx"
CACHE = os.path.expanduser("~/.cache/motion-kit")


def codigo(e):
    return "-".join(f"{ord(c):x}" for c in e if ord(c) not in (0xFE0F,))


DIBUJA = r"""
import sys
from PIL import Image, ImageDraw, ImageFont
f = ImageFont.truetype(sys.argv[1], 160, layout_engine=ImageFont.Layout.RAQM)
im = Image.new("RGBA", (420, 240), (0, 0, 0, 0)); ImageDraw.Draw(im).text((40, 40), sys.argv[2], font=f, embedded_color=True)
bb = im.getbbox(); sys.exit(3) if not bb else im.crop(bb).save(sys.argv[3])
"""


def dibujar(e):
    """160 px con la fuente del sistema. Banderas y secuencias (🇵🇪, 👩‍💻) necesitan Pillow con raqm: si este Python no
    lo tiene (el /usr/bin/python3 de macOS), dibuja con otro que sí (Homebrew) y aquí solo se agranda."""
    import subprocess, tempfile
    from PIL import Image, features
    pys = ([sys.executable] if features.check("raqm") else []) + ["/opt/homebrew/bin/python3", "/usr/local/bin/python3", "python3"]
    tmp = tempfile.mktemp(suffix=".png")
    for py in pys:
        try:
            if subprocess.run([py, "-c", DIBUJA, FONT, e, tmp], capture_output=True).returncode == 0:
                im = Image.open(tmp).convert("RGBA"); os.remove(tmp); return im
        except FileNotFoundError:
            continue
    sys.exit(f"no pude dibujar {e!r}: hace falta un Python con Pillow + raqm (brew install python; pip install pillow)")


def sesion():
    try:
        import onnxruntime as ort
    except ImportError:
        return None
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, "realesrgan-x4plus.onnx")
    if not os.path.exists(p):
        print("bajando el modelo de agrandado (67 MB, una sola vez)…")
        try: urllib.request.urlretrieve(MODEL_URL, p + ".part"); os.rename(p + ".part", p)
        except Exception as ex: print(f"  no se pudo bajar ({ex}); uso Lanczos"); return None
    return ort.InferenceSession(p, providers=["CPUExecutionProvider"])


def agrandar(im, s):
    from PIL import Image
    if s is None:
        return im.resize((im.width * 4, im.height * 4), Image.LANCZOS)
    import numpy as np
    pad = 8   # margen para que el borde no salga con artefactos
    base = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0)); base.paste(im, (pad, pad))
    a = np.asarray(base).astype(np.float32) / 255
    rgb, al = a[..., :3], a[..., 3:]
    def run(x):  # HWC 0..1 → HWC ×4
        y = s.run(None, {s.get_inputs()[0].name: x.transpose(2, 0, 1)[None]})[0][0]
        return np.clip(y.transpose(1, 2, 0), 0, 1)
    up_rgb = run(rgb * al + (1 - al) * 1.0)          # color sobre blanco (el modelo no entiende alfa)
    up_al = run(np.repeat(al, 3, axis=2))[..., :1]   # el alfa se agranda aparte, como imagen gris
    rgb2 = np.clip((up_rgb - (1 - up_al)) / np.maximum(up_al, 1e-3), 0, 1)   # quita el blanco del borde
    out = np.concatenate([rgb2, up_al], axis=2)
    img = Image.fromarray((out * 255 + 0.5).astype("uint8"))
    return img.crop((pad * 4, pad * 4, img.width - pad * 4, img.height - pad * 4))


def main():
    if len(sys.argv) < 3: sys.exit(__doc__)
    dst, args = sys.argv[1], sys.argv[2:]
    if args[0] == "--lista":
        B = json.load(open(args[1])); args = sorted({x[2] for x in B.get("emojis", [])})
    os.makedirs(dst, exist_ok=True)
    s = None if all(os.path.exists(os.path.join(dst, codigo(e) + ".png")) for e in args) else sesion()
    if s is None and not all(os.path.exists(os.path.join(dst, codigo(e) + ".png")) for e in args):
        print("⚠ sin onnxruntime: agrando con Lanczos (más blando). Instálalo con: pip install onnxruntime")
    for e in args:
        p = os.path.join(dst, codigo(e) + ".png")
        if os.path.exists(p): print(f"{e} ya está ({p})"); continue
        agrandar(dibujar(e), s).save(p); print(f"{e} → {p}")


if __name__ == "__main__":
    main()

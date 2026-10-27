#!/usr/bin/env python3
"""plan/beats.json (la ÚNICA fuente de tiempos) → <composición>/beats.js (window.BEATS).

  python3 beats_js.py plan/beats.json motion/beats.js
La composición lo carga con <script src="beats.js"></script> y la mezcla (mezcla.py) lee el mismo JSON:
retimear = editar un archivo y volver a correr los dos."""
import json, sys, os
src = sys.argv[1] if len(sys.argv) > 1 else "plan/beats.json"; dst = sys.argv[2] if len(sys.argv) > 2 else "motion/beats.js"
open(dst, "w").write("// generado desde plan/beats.json, no editar a mano\nwindow.BEATS = " + json.dumps(json.load(open(src)), ensure_ascii=False) + ";\n")
print("ok", dst)

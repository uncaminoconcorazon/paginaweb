# Memoria del proyecto, tablero y revisión

Un video se hace en varias sesiones y con varias rondas de críticas. Sin memoria, cada chat nuevo vuelve a cometer los errores ya corregidos. La skill guarda tres cosas en la carpeta del proyecto.

## 1. `gusto.md`: el estilo y las reglas aprendidas
Copia `plantillas/gusto.md` al empezar. Llénalo **con valores concretos** (hex, px, ms, archivos, dB) en el momento en que algo se aprueba: concepto, personaje, paleta, tipografía, movimiento, sonido.

La sección **"Reglas aprendidas" solo se agrega**: cada crítica de la persona se escribe como regla general, no como el arreglo puntual.
| Dijo | Regla |
|---|---|
| "el último sfx se corta muy rápido" | Ningún sonido termina con un corte: fade del 40 % de lo que queda; los de cierre van con su cola entera. |
| "le faltan cosas wow" | Cada frase es un mundo nuevo: gancho con material real, transiciones del material, un momento de escala, un remate. |

**Al retomar un proyecto** (chat nuevo o contexto resumido): lee `gusto.md` completo, después `progreso.md`, y recién ahí sigue. Todo lo nuevo usa solo la paleta, las fuentes, los movimientos y los sonidos de `gusto.md`, y cumple sus reglas.

## 2. `progreso.md`: dónde estamos
Copia `plantillas/progreso.md`. Se **sobrescribe** después de cada paso, cada decisión y antes de cada render largo: fase, versión actual, lo hecho, el siguiente paso concreto, las críticas abiertas y lo aprobado con fecha.

## 3. `tablero.html`: el estilo que se aprueba de un vistazo
Antes del animatic, copia `plantillas/tablero.html` (y `kit/personaje-papel.js` si hay personaje) y llena **solo** su objeto `DATA`: concepto, paleta, fuentes con una frase real del guion, personaje en sus poses, cuadros clave cuando existan, la tabla de sonido y los sí/no. Sácale una captura para revisarlo tú y después ábreselo a la persona. Tiene los mismos valores que `gusto.md`.

## 4. Una sola fuente de tiempos: `plan/beats.json`
Todos los momentos del video (cuándo cae cada cosa, cuándo se escribe cada titular, cuándo golpea cada sello) viven en `plan/beats.json`.
- La composición los lee: `python3 <skill>/scripts/beats_js.py plan/beats.json motion/beats.js` y `<script src="beats.js">`.
- El sonido los lee: `plan/sonido.py` con `Mezcla` (`scripts/mezcla.py`).
- Retimear = editar un número y volver a correr los dos. El sonido no se desfasa nunca de la imagen.

## 5. Revisión entre cuadros
Los snapshots sueltos no muestran lo que pasa entre ellos. Después de cada render:
```bash
npx hyperframes check .
python3 <skill>/scripts/hoja.py renders/borrador-v2.mp4 0 20 --fps 4      # toda la pieza, con el tiempo en cada cuadro
python3 <skill>/scripts/hoja.py renders/borrador-v2.mp4 2.4 3.4 --fps 12  # una transición, cuadro a cuadro
```
Busca: algo que se queda en pantalla cuando ya no debería, texto encimado o tapado, UI cortada por el borde, cámara quieta más de 1 s, un corte seco, el borde del mundo en un zoom. Arregla y vuelve a mirar el mismo rango antes de mostrar.

## 6. Versiones
Cada render que ve la persona es `renders/borrador-vN.mp4` (nunca sobrescribas uno que ya vio). Guarda la composición de cada versión que la persona vio en `versiones/vNN/` (index.html, beats, mezcla) antes de una reescritura grande. Con varias músicas: `renders/borrador-vN-musica-{A,B,C}.mp4` (un render + remux).

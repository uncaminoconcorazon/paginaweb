---
name: video-saas-premium
description: "Crea videos de motion graphics premium (nivel Apple / Figma, 4K60) para un producto, SaaS, app o marca a partir de su web, su Instagram y una idea, sin plantilla. Investiga la marca y su UI real, decide qué trabajo tiene que hacer el video (y a quién le vende) y propone 3 conceptos propios, anti \"AI slop\", también comerciales de funciones para quien compra. Recrea la UI 1:1, compone en zonas fijas con transiciones push y una cámara al ritmo de la pieza, y entrega el video SIN voz generada ni efectos de sonido (esta instalación los omite a propósito); si la persona trae su propia música o voz, se monta sobre el mismo render. Úsala cuando digan \"hazme un video saas de tu link\", \"video de lanzamiento\", \"comercial de mi app\", \"promo de mi app\", \"motion graphics de mi producto\", \"video estilo Apple\" o \"le falta wow\"."
---

# Video SaaS premium (v4.2)

> **Esta instalación NO usa ElevenLabs ni efectos de sonido (SFX).** Se eliminaron los scripts y guías de SFX y de voz/música generada. Ignora todo paso, regla o mención de ElevenLabs, packs de SFX, foley, `Mezcla.auto`, `roles.json`, `pack_sfx`, `preparar_pack` o whooshes automáticos. Tampoco ofrezcas armar un pack ni pidas API keys de ElevenLabs. El video se entrega visual; si la persona trae música o voz propias, móntalas sin generar nada. La cámara automática, los emojis HD y los efectos visuales `wow` siguen disponibles.

Convierte **un link (web, Instagram…) + una idea** en un video de motion graphics hecho **a la medida de ese producto**.

**No hay una estructura fija.** Cada video sale de un proceso creativo sobre *ese* producto: la forma, la duración, el formato, si lleva voz, qué detalles visuales usa y con qué herramientas se hace se deciden en el concepto. Si dos videos de productos distintos se parecen, el proceso falló.

**antes de empezar → investigación → el trabajo del video → 3 conceptos → (capturas) → tablero + animatic → construcción → sonido → QA entre cuadros → render → muestras A/B/C → final**

Todo queda en la carpeta del proyecto: `gusto.md` (estilo + reglas aprendidas de cada crítica), `progreso.md` (dónde vamos) y `plan/beats.json` (la única fuente de tiempos). **Si el proyecto ya existe, lee `gusto.md` y `progreso.md` antes que nada.** Ver [Memoria del proyecto](references/memoria.md).

Habla con la persona en su idioma y en tono cercano. Antes de cada paso largo, explica qué vas a hacer.

`<skill>` = la carpeta de este SKILL.md.

## Lo nuevo de la v4.2: cámara, emojis, efectos y sonido salen de `beats.json`

1. **Cámara automática** (`kit/camara.js`, `MKC.auto`): la lista `"camara": [[t, x, y, s, d, "golpe"?]]` de `plan/beats.json` mueve `#cam`: zoom in cuando `s` sube, zoom out cuando baja, golpes de UI (d ≤ 0.7, `expo.inOut`) o viajes (`power3.inOut`) y deriva entre movimientos. **`x` puede ser un selector** (`"#boton"`, con `y` = desplazamiento): la cámara apunta al centro real del elemento.
2. **Emojis de Apple en HD** (`scripts/emoji_hd.py` + `MKC.emojis`): la fuente del sistema llega solo a 160 px y en 4K se ve borrosa; cada emoji (banderas incluidas) se dibuja a 160 px y se agranda ×4 con Real-ESRGAN (se baja una vez a `~/.cache/motion-kit`). Van en `"emojis": [[t, tFuera, "🎉", x, y, tam]]`, cada uno provocado por algo que pasa.
3. **Sonido automático** (`Mezcla.auto(B, roles)` + `plan/roles.json`, plantilla en `plantillas/roles.json`): cada zoom in / zoom out / paneo suena con su whoosh (el de largo más parecido al movimiento, con el **pico** a mitad del viaje), cada emoji con su pop que sube de tono, y cada evento de `"eventos"` con su rol. El aire se respeta solo (gana el más importante) y `"rafagas": [[t0, t1]]` permite apilar a propósito (riser → drop, toque → éxito → emoji).
4. **Efectos "wow" de After Effects** (`kit/wow.js`, `MKW`): onda de choque, sacudida de cámara, líneas de velocidad, desenfoque en un empuje, cifras que ruedan dígito a dígito y barrido de luz, siempre sobre un momento que ya existe. **Regla**: nunca animes la misma propiedad con un resorte de entrada y una salida corta; la salida va por opacidad o en otro contenedor (si no, el objeto se queda pegado).
5. **Cualquier pack de sonidos en un paso**: `scripts/preparar_pack.py "<carpeta del pack>" assets/sfx/listos --prefijo a-` (nombres limpios, recorte, contacto y pico). Se pueden combinar varios packs con prefijos distintos (tu pack propio + otro de diseño de sonido).
6. **Escenas probadas sin voz, solo música y efectos**: un mundo 3D al que la cámara entra y sale (globo de puntos con pines, arcos y chips proyectados), un celular 3D con la **captura real** del producto en su pantalla (scroll, aros y toques dibujados en el canvas), ráfagas a pantalla completa en cada beat y el logo extruido que llega desde el fondo.

## Lo nuevo de la v4 (aprendido de críticas reales)

1. **El gancho dice el producto.** Si el video vende (un comercial para dueños de negocio, un lanzamiento), en los primeros 2–3 s se entiende **qué es** con palabras simples ("Tu tarjeta de sellos / en el celular / de tus clientes."). Un problema abstracto al inicio ("cartoncitos que se mojan") gustó como dirección pero "no da a entender el concepto".
2. **Comercial de funciones = un bloque por función**, cada una con su título, una línea de texto y su pantalla real, en **zonas fijas** (titular a la izquierda, escenario a la derecha). La función estrella tiene **su propio mundo** (mapa → radio → aviso), no una línea en una lista. Ver [Comercial de producto](references/proceso-creativo.md#c5-comercial-de-producto-para-quien-compra).
3. **La cámara va al ritmo de la pieza.** Golpes de UI decididos (0.35–0.7 s); viajes entre escenas y piezas que "respiran" de 0.8–1.1 s; después de cada frase, ≥ 1 s de resultado vivo. Un film con 13 wows en 38 s se leyó "muy rápido".
4. **Transiciones push**: la escena que sale y la que entra se mueven juntas. Nunca "sale, queda el fondo vacío, entra la otra".
5. **Sonido con aire**: un sonido por evento, ≥ 0.3 s entre eventos, sin apilar golpe + sub en cada cosa; el bus de efectos entre −12 y −20 dB. `mezcla.py` ahora avisa cuando no se cumple. Una ráfaga se declara a propósito.
7. **Un render, tres músicas**: se renderiza una vez y las otras dos mezclas se remezclan sobre el mismo video (`-c:v copy`) para que la persona elija de oído en minutos. Después, el final en 4K.
8. **Collage + transiciones motion en la parte técnica**: nada de filas genéricas de "eventos" o "peticiones". Se muestra el artefacto real (el curl de su documentación, la pantalla real) recortado en papel, inclinado, con cinta.

## 0. Antes de empezar (siempre, en tu primera respuesta)

Sin esto el resultado no llega al nivel premium. Revísalo y díselo a la persona **antes** de cualquier otra cosa.

1. Corre `python3 <skill>/scripts/preflight.py`.
2. Manda **un solo mensaje** con **todo** lo que hace falta ([plantilla](references/antes-de-empezar.md#3-el-mensaje-plantilla)):
   - **Herramientas obligatorias** que falten (Node 22+, ffmpeg, Chrome, Python con numpy y Pillow), con el comando exacto.
   - **Botanica Free SFXs**, gratis en https://mgulifes.gumroad.com/l/botanicafree, para los clics de interfaz.
   - Lo que la persona te tiene que dar: link, redes, para qué es el video, la idea y los activos de marca.
   - Lo que le pedirás más adelante: capturas de su UI, elegir concepto, voz y música.
3. **No construyas nada** hasta que lo obligatorio esté resuelto. Con el link ya puedes investigar. Lo opcional no bloquea.
4. Crea la carpeta del proyecto con `gusto.md` y `progreso.md` (desde `plantillas/`) y **llénalos desde el primer paso** (no dejes la plantilla vacía hasta la construcción): un chat nuevo tiene que poder seguir desde ahí.

Detalle completo en [Antes de empezar](references/antes-de-empezar.md).

## 1. Investigación profunda

Extrae **toda** la información real posible, no solo el hero de la web:
- la web completa (con `scripts/brand_from_url.py` para colores, tipografías, logo y capturas);
- Instagram y otras redes: bio, posts, reels, cómo se mueve la marca y qué preguntan los clientes;
- tiendas de apps, reseñas, competencia;
- el producto real, y **su código si es local** (los textos exactos de la UI, de las notificaciones y de los pases salen de ahí);
- los activos que ya existan: logo completo, mascota, `.riv`, `.lottie`, guía de estilo.

El resultado va en `investigacion/dossier.md`: hechos con fuente, citas textuales y lo que no sabemos. **Revisa qué funciones están de verdad en producción**: si el video muestra algo que todavía no está desplegado, díselo a la persona antes de publicar. Cómo hacerlo en [Investigación](references/investigacion.md).

## 2. El trabajo del video

Antes de pensar en efectos, responde en `investigacion/brief.md`:
- dónde se va a ver;
- quién lo ve y en qué estado (scrolleando sin sonido, en una landing, en un pitch);
- **quién compra** (si no es quien lo ve, el video le habla al que paga: el dueño del negocio, no su cliente);
- qué tiene que entender en los primeros 3 s, sentir y hacer después;
- **¿qué puede hacer el movimiento por este producto que una captura o un texto no pueden?**

De esa respuesta sale el concepto.

## 3. Tres conceptos (la persona elige)

Sigue [Proceso creativo](references/proceso-creativo.md). Propón **3 conceptos que difieran en mecanismo Y en estructura**. Cada uno define su forma, duración, formato y ritmo, voz sí/no, herramientas, detalles visuales y personalidad sonora. "Problema → solución" es una opción más, no la base.

- **¿Te pasaron una referencia?** Analízala primero, imagen **y sonido** (`scripts/analizar_referencia.py` + `scripts/sfx_referencia.py`). Coméntale qué la hace funcionar, sus momentos "wow" y cómo los traducirías al material de esta marca ([C3](references/proceso-creativo.md#c3-cuando-te-pasan-una-referencia)). Toma de la referencia **la técnica**, no su mundo: si es oscura y la marca vive en claro, va en claro.
- Cada ficha dice **qué se ve en el primer cuadro** (el gancho, que dice el producto si el video vende) y **la lista de momentos "wow" con su segundo**: uno cada 3–4 s, cada uno defendible con la marca ([Wow](references/wow.md)).
- Revisa `~/.video-saas-premium/historial.md`: no repitas la forma ni el mecanismo de los últimos videos.
- Pasa la **prueba del intercambio**: si pones el logo de un competidor y el concepto sigue funcionando, es slop.
- Aplica [Cómo piensa un video premium](references/proceso-creativo.md#c2-cómo-piensa-un-video-premium-no-es-estructura-es-criterio) y decide los **detalles Apple** con [C4](references/proceso-creativo.md#c4-detalles-apple-emojis-tipeo-vidrio-cuándo-sí-y-cuándo-no).
- Recomienda uno, explica por qué con el brief en la mano y **deja que la persona elija**. Si te dio libertad, elige tú, construye y muéstrale el borrador diciendo qué decidiste.

## 4. Capturas de la UI real (si el concepto muestra interfaz)

Envía una lista corta y concreta de capturas (qué pantalla, en qué estado, claro u oscuro) y **espera**. Lo público lo capturas tú; si el código es local, copia los textos de ahí. Mide, muestrea los colores y copia los textos exactos para recrear 1:1. Nunca inventes una UI que existe. Ver [Capturas de UI](references/capturas-ui.md).

## 5. Tablero de estilo y animatic

1. **Tablero** (`plantillas/tablero.html`): paleta, tipografía con una frase real, el personaje en sus poses si hay, **las zonas fijas del cuadro**, la tabla de sonido y los sí/no. Lo revisas con una captura y se lo abres a la persona. Los mismos valores van a `gusto.md`.
2. **Animatic**: **6–8 cuadros fijos clave** del concepto (`npx hyperframes snapshot . --at …`). Es el momento barato para corregir el rumbo.

## 6. Construye con las herramientas que el concepto pidió

HyperFrames es siempre el motor de render (determinista, 4K60). Encima se usan **solo** las capas que el concepto necesita:

| El concepto necesita | Herramienta |
|---|---|
| UI real, tipografía, cámara, transiciones de zoom | GSAP + `kit/premium.js`, `kit/motion-kit.js`, `MKA.zoomThrough` |
| El mundo físico sin video, 3D, logo extruido | Three.js · `kit/three-stage.js` |
| UI que se sienta física (hojas, tarjetas, notificaciones tipo iOS) | Motion (motion.dev) · `MKL.spring` en `kit/capas.js` |
| Cámara (zoom in/out en cada beat) y emojis HD desde `beats.json` | `kit/camara.js` (`MKC.auto`, `MKC.emojis`) + `scripts/emoji_hd.py` |
| Onda de choque, sacudida, líneas de velocidad, cifras que ruedan, barrido de luz | `kit/wow.js` (`MKW`) |
| Emojis de Apple, tipeo con cursor, burbuja que golpea, confeti, vidrio | `kit/apple.js` + `kit/apple.css` |
| Personaje o intro que la marca ya tiene en Rive | Rive · `MKL.rive` en `kit/capas.js` (con `start` o con `clock` para recortar) |
| Animaciones ya hechas (After Effects / LottieFiles) | Lottie (adaptador nativo de HyperFrames) |
| Alguien que actúe la historia | Personaje de papel · `kit/personaje-papel.js` ([Personaje](references/personaje.md)) |

Detalle, código y límites en [Herramientas](references/herramientas.md). Lo visual en [Look premium](references/look-premium.md) y la API en [Kit](references/kit.md).

**Versión fija de HyperFrames: `npx --yes hyperframes@0.8.164`** en `init`, `check`, `snapshot` y `render` (es con la que se probó el kit). No uses `npx hyperframes` a secas ni la versión que diga otra skill instalada.

```bash
npx --yes hyperframes@0.8.164 init motion --non-interactive --example=blank
cp -R <skill>/kit motion/kit
```

**Composición (v4):**
- Los tiempos salen de `plan/beats.json` (`scripts/beats_js.py plan/beats.json motion/beats.js`); nunca escribas segundos sueltos en la composición y en la mezcla por separado.
- **Zonas fijas** desde el primer cuadro: si hay titular y escenario, el titular vive en su columna (p. ej. x 140–900) y el escenario en la otra (centro x ~1340). El collage va en ranuras libres alrededor del sujeto, nunca sobre el titular, la barra de estado ni el contenido de la pantalla.
- **Transiciones push**: sale y entra en el mismo tween (`x: -1920` y `1920 → 0`, 0.5 s `power3.inOut`) o un corte escondido en un movimiento. Una forma de la marca que llena el cuadro (el punto que crece, el sello) también vale.
- Si la marca trae un **intro de Rive con su logo y lema**, el cierre es ese intro: no le pongas otro logo ni otro lema encima.
- El **logo real completo**, nunca recompuesto (ícono + texto por separado) ni más chico que el resto.

Verifica con `npx hyperframes check .` (**content_overlap = 0**, contraste ok), **snapshots** de los cuadros clave y, después de cada render, la **hoja entre cuadros** (`scripts/hoja.py render.mp4 0 20 --fps 4`; una transición a `--fps 12`). Busca texto encimado, UI cortada, dos cosas compitiendo, momentos estáticos, cortes duros, flashes, cuadros vacíos en una transición, un texto que hereda el color de la escena (blanco sobre una etiqueta blanca) y el borde del mundo en un zoom.

## 7. Sonido (desactivado en esta instalación)

No se generan voz, música ni efectos. Entrega el video mudo. Solo si la persona trae su propia música o voz con licencia, móntala con `ffmpeg` sobre el render final y verifica el nivel (−15 LUFS aprox.). No preguntes por ElevenLabs.

## 8. Render, muestras y cierre

```bash
# borrador (siempre a 60 fps)
npx --yes hyperframes@0.8.164 render . --fps 60 --quality standard -o ../renders/borrador-vN-musica-A.mp4
# las otras músicas sobre el MISMO render (minutos, no otro render)
ffmpeg -i ../renders/borrador-vN-musica-A.mp4 -i mezcla-B.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest ../renders/borrador-vN-musica-B.mp4
# final, cuando elige
npx --yes hyperframes@0.8.164 render . --resolution 4k --fps 60 --quality delivery -o ../renders/<nombre>-4k.mp4
# preview para mandar por chat (< 45 MB): 1080p60 crf 18
ffmpeg -i <nombre>-4k.mp4 -vf scale=1920:1080:flags=lanczos -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart <nombre>-preview-1080p.mp4
```

Antes de mostrar cualquier borrador: `ritmo.py` en ok, hoja entre cuadros revisada y la autocrítica de [El listón](#el-listón-se-verifica-antes-de-mostrar-aunque-la-persona-te-haya-dado-libertad) hecha. Compón a 1920×1080 (o 1080×1920 en vertical); el final sale en 4K. Cuéntale a la persona qué pasa en cada momento. Cada crítica va a `gusto.md` como regla (sección 7) antes de arreglarla. Guarda la composición de cada versión que vio en `versiones/vNN/`. Al final, añade una línea a `~/.video-saas-premium/historial.md` con producto, forma, mecanismo, herramientas, duración, formato y las críticas que hubo.

## El listón (se verifica antes de mostrar, aunque la persona te haya dado libertad)

1. **Gancho en el primer cuadro**: lo más fuerte ya está en pantalla, grande y moviéndose desde el segundo 0, ocupando al menos la mitad del cuadro. **Si es texto, mide ≥ 120 px de alto de letra a 1920×1080** (un titular de 40 px a un lado de un celular no es un gancho). **Nada cortado por el borde en el segundo 0** (el logo, el celular, la barra de estado), salvo un recorte deliberado y grande. Mídelo en el snapshot del segundo 0. **Si el video vende, a los 3 s ya se entiende qué es el producto.**
2. **Cámara viva y al ritmo de la pieza**: golpes de UI de 0.35–0.7 s (`expo.inOut` / `power4.inOut`, frenan en seco); viajes entre escenas y piezas narrativas de 0.8–1.1 s; deriva casi imperceptible entre movimientos. Ningún tramo quieto de más de 1.2 s salvo el cierre (hasta 3.5 s). Después de cada frase, ≥ 1 s de resultado vivo para leerla. **Siempre a 60 fps.**
3. **El protagonista ocupa el cuadro**: si el foco es la UI, llena al menos el 60 % del ancho mientras se usa (en un bloque de función con titular, el escenario llena su mitad). **Titulares de bloque ≥ 96 px y texto de lectura ≥ 34 px** a 1920×1080: en redes se ve en un celular. Dentro de cada bloque pasa algo (la UI reacciona, entra un detalle, la cámara entra o sale); un bloque de 4 s con los mismos cuadros se lee como diapositiva.
4. **Un momento "wow" cada 3–4 s** que nace del concepto ([Wow](references/wow.md)). Un texto que aparece, un zoom, un resaltado, un clic o el logo apareciendo **no** son wow.
5. **Zonas fijas y cero choques**: `check` sin content_overlap, nada encima del titular ni de la pantalla, transiciones push sin cuadros vacíos (mira la transición a `--fps 12`).
6. **Revisión objetiva**: `scripts/ritmo.py render.mp4` dice **ok** y la hoja entre cuadros no muestra nada encimado, cortado o pegado de más.
7. **Sonido con aire, pero sin quedarse corto**: `mezcla.py` sin avisos (o solo en ráfagas declaradas), un sonido por evento, nada al entrar tarjetas, el último sonido entero. **En un lanzamiento, cada beat visible tiene su sonido**: ~1–1.5 eventos por segundo durante la acción (8 efectos en 26 s suena soso; 94 en 38 s, atropellado).
8. **Autocrítica**: lee "Cómo leer las críticas" como si la persona ya hubiera visto el render. Si alguna fila aplica, arréglala primero.
9. El **tablero de estilo** se hace siempre, también en modo autónomo.

## Lo que hace premium a un video (y lo que lo vuelve "AI slop")

- **Una idea verdadera sobre ese producto**: decoración no es creatividad.
- **La interfaz es la real**, recreada 1:1. Una "terminal oscura cualquiera" o filas genéricas de "eventos" delatan a la IA.
- **Movimiento con intención**: cámara que sigue cada acción, transiciones que nacen de lo que pasó, resortes físicos donde la UI lo pide, 3D real.
- **Una idea por plano**, a un ritmo que se pueda leer, en zonas que no chocan.
- **Detalles Apple solo con causa.**
- **Nunca flashes blancos** ni cuadros vacíos entre escenas.
- **Sonido del material, con aire**, sin tapar la voz.
- **Solo hechos.**

## Cómo leer las críticas

| Dicen | Significa | Haz |
|---|---|---|
| "se ve AI slop" | UI o componentes genéricos, decoración (contadores, etiquetas "01 /") | Usa capturas reales; quita lo que no defienda una razón de esta marca |
| "se ve slop la parte técnica / del API" | Filas genéricas, una consola inventada | El artefacto real (su doc, su curl, su pantalla) en collage, con transiciones motion |
| "se ve horrible / barato" | Texto grande, flashes, fades planos, todo estático | Vuelve al look premium: tipografía pequeña, barridos, cámara, 3D, resortes |
| "no me convence" | Concepto débil | Vuelve al paso 2: otro trabajo del video u otra observación |
| "no da a entender el concepto" | El gancho cuenta un problema y no el producto | Los primeros 3 s dicen qué es, en palabras del dueño |
| "recalca las features" / "que sea un comercial" | Funciones mezcladas o en lista | Un bloque por función con título + pantalla; la estrella con su propio mundo |
| "se parece al anterior / siempre es igual" | Repetiste forma o mecanismo | Revisa el historial y propone formas que no hayas usado |
| "no se entiende / va muy rápido" | Varias ideas por plano, sin respiro | Una idea por plano; ≥ 1 s de resultado tras cada frase; viajes de 0.8–1.1 s; alarga el video si hace falta |
| "va muy lento / aburre" | Planos largos sin energía | Transiciones de zoom, música con pulso y cortes a tempo |
| "hay cosas que colisionan" / "se sobreponen" | Sin zonas | Zonas fijas; collage en ranuras libres; `check` sin content_overlap |
| "suena soso / le falta sonido" | Pocos eventos (o solo música) | Cada beat visible con su sonido, ~1–1.5 por segundo en la acción |
| "los sfx van rapidísimo / se escucha mal" | Demasiados eventos y capas | Un sonido por evento, ≥ 0.3 s de aire, sin golpe + sub en todo, bus más bajo |
| "los sfx no me convencen / suenan slop" | Sonidos de "efecto" o sintéticos | Pack de timbres acústicos reales del material; nada de síntesis digital |
| "suena muy fuerte / el efecto es brusco" | Foley encima y movimiento latigazo | Foley −10 dB como textura; ese viaje con `power2`/`sine` y más largo |
| "la voz / música está fea" | Elegiste por ellos | Muestras A/B/C sobre el mismo render |
| "no está sincronizado" | Voz colocada por estimación | Marcas de tiempo por palabra y `sayIn` |
| "le falta wow" / "la referencia tenía más cosas" | Un solo set con buen movimiento | Tabla "en la referencia → en el nuestro" y momentos wow del material ([Wow](references/wow.md)) |
| "sus sfx son mejores" | No sabes qué tienen distinto | `sfx_referencia.py ref.mp4 out/ --comparar tu.mp4` |
| "el sonido se corta" | Fade de milisegundos | Fade del 40 % (`mezcla.py`); el último sonido suena entero |
| "el logo sale más chico" | Logo recompuesto | El SVG completo real, a su tamaño |
| "me gusta pero…" | Concepto aprobado | Arregla solo lo que piden |

Errores conocidos y soluciones: [Errores comunes](references/errores-comunes.md).

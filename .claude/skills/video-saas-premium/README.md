# video-saas-premium

Skill para **Claude Code** y **Codex** que convierte **tu producto (web, Instagram) + una idea** en un video de motion graphics con nivel de estudio (estilo Apple / Figma), renderizado en **4K a 60 fps**.

**No usa una plantilla.** Cada video sale de un proceso creativo sobre *tu* producto:

```
lo que necesitas → investigación (web, redes, reseñas, tu UI) → el trabajo del video → 3 conceptos → capturas → animatic → construcción → sonido → 4K
```

Guía completa y videos de ejemplo: **[rayyan.pe/skills/video-saas-premium](https://rayyan.pe/skills/video-saas-premium)**

## Antes de instalar: lo que necesitas

La skill lo revisa sola al empezar (`scripts/preflight.py`) y te dice qué falta y cómo instalarlo. Para que lo tengas claro desde ya:

**Obligatorio (sin esto no hay video)**
- **Claude Code** o **Codex**.
- **Node 22+**, **ffmpeg**, **Google Chrome** (o Chromium) y **Python 3** con `numpy` y `Pillow` (`python3 -m pip install numpy pillow`).

**Obligatorio para el resultado premium**
- **Botanica Free SFXs**, los efectos de sonido. Gratis: [mgulifes.gumroad.com/l/botanicafree](https://mgulifes.gumroad.com/l/botanicafree) (pon $0 si pide precio). Descomprímelo en Descargas. **Sin este pack los efectos quedan pobres.**

**Necesario para voz y música**
- Una cuenta de **ElevenLabs** con tu API key guardada en el llavero (abajo). **Sin ElevenLabs no hay voz en off, ni música generada, ni pack de efectos propio**: el video va solo con texto y efectos, o con voz y música que tú traigas.

**Opcional (análisis del sonido de referencias)**
- `python3 -m pip install scipy onnxruntime`. La primera vez, `sfx_referencia.py --descargar-modelo` baja un modelo de separación de voz (66 MB). Sin esto, el análisis mide la mezcla con la voz encima.

**Bueno saber**
- En **macOS** salen los **emojis de Apple** y la tipografía SF Pro del sistema. En Linux o Windows se usan los emojis de tu sistema y Inter o Geist.

## Novedades de la v4.2
- **Cámara, emojis y sonido automáticos**: la misma lista de tiempos mueve la cámara (zoom in / zoom out en cada momento, apuntando a elementos reales), pone emojis de Apple en HD (agrandados con IA, nítidos en 4K) y coloca cada whoosh, pop y clic en su cuadro, con aire entre ellos.
- **Efectos de After Effects en código** (`kit/wow.js`): ondas de choque, sacudidas de cámara, líneas de velocidad, desenfoque de movimiento, cifras que ruedan y barridos de luz.
- **Cualquier pack de sonidos en un paso** (`preparar_pack.py`) y varios packs combinados en el mismo video, con roles en `plan/roles.json`.
- **Probada sin voz**: un video de solo música y efectos con un mundo 3D, un celular 3D con la UI real y el logo extruido.

## Novedades de la v4
- **Comerciales que venden**: el gancho dice qué es tu producto en los primeros 3 segundos y cada función tiene su bloque (título, una línea y la pantalla real), con la función estrella contada en su propio mundo. Para cuando el video le habla a quien paga.
- **Zonas fijas y transiciones push**: el titular y el escenario tienen su lugar desde el primer cuadro, nada choca (`check` sin superposiciones) y las escenas pasan juntas, sin cuadros vacíos entre una y otra.
- **Cámara al ritmo de la pieza**: golpes de UI decididos, viajes más calmos en las piezas que tienen que respirar y al menos un segundo de resultado después de cada frase.
- **Tu propio pack de efectos** (`pack_sfx.py`): pides los sonidos a ElevenLabs con timbres reales (vidrio, madera, metal, papel) y el script los limpia, afina los tonales a la tonalidad de tu música, crea variantes de tono y te arma un catálogo para elegir de oído.
- **Sonido con aire**: un sonido por evento y espacio entre ellos; `mezcla.py` te avisa si dos efectos caen demasiado juntos o si apilaste capas de más.
- **Tres músicas, un solo render**: renderizas una vez y escuchas las otras dos músicas sobre el mismo video en minutos; el 4K sale cuando eliges.
- **v4.1, tras una prueba a ciegas con una marca conocida**: gancho con texto de al menos 120 px y nada cortado en el primer cuadro, titulares de bloque de 96 px o más, algo que pase dentro de cada bloque, un mínimo de sonido en lanzamientos (`mezcla.py` avisa de huecos y de pocos eventos) y la versión de HyperFrames fija.

## Novedades de la v3
- **Momentos "wow" del material de tu marca**: gancho con material real, transiciones que nacen del material (rasgar, doblar, zambullirse), un momento de escala, golpes físicos con temblor y un remate que recontextualiza. Ninguno es plantilla: cada uno se defiende con tu marca.
- **Personaje de papel en código** (`kit/personaje-papel.js`): un anfitrión recortado con borde de sticker que atrapa, sostiene, señala y celebra. Lo armas con tus rasgos (piel, pelo, peinado, gorra, ropa, lentes) y sale igual en cada video.
- **Sonido medido, no opinado**: efectos cortos del material que se ve, debajo de la voz, sin colchón de música por defecto, eventos repetidos que suben de tono y nada cortado seco. Foley a medida con ElevenLabs (`gen_sfx.py`), cada sonido anclado a su punto de contacto (`anclar_sfx.py`) y mezclado desde el mismo archivo de tiempos que la animación (`mezcla.py`, master −15 LUFS).
- **Análisis del sonido de cualquier referencia** (`sfx_referencia.py`): separa la voz y te dice por qué sus efectos suenan mejor (música sí o no, duración, nivel, familias), y compara con tu versión.
- **Memoria por proyecto** (`gusto.md` + `progreso.md`): cada crítica tuya se vuelve una regla y un chat nuevo sigue con el mismo estilo.
- **Tablero de estilo** (`plantillas/tablero.html`) para aprobar paleta, tipografía, personaje y sonido antes del animatic, y **revisión objetiva** de cada render: hojas entre cuadros (`hoja.py`) y un medidor de ritmo (`ritmo.py`) que no deja entregar un video con tramos quietos.

## Qué la hace distinta
- **Investiga antes de diseñar**:
  - tu web completa e Instagram;
  - lo que preguntan tus clientes;
  - tu competencia;
  - tus activos (logo, mascota, animaciones).
- **Concepto a la medida, no estructura fija.** Te propone 3 conceptos con mecanismos y formas distintas, y tú eliges. Lleva un historial para no repetirse.
- **¿Tienes una referencia?** La analiza, te comenta qué la hace funcionar y cómo la aplicaría a tu producto antes de tocar nada.
- **La interfaz es la real**: te pide capturas de tu producto y las recrea 1:1. Nada de dashboards genéricos ("AI slop").
- **Movimiento con causa:**
  - un foco por plano;
  - transiciones de zoom que nacen de lo que acaba de pasar;
  - el gesto que define tu producto, repetido con resultados distintos;
  - montaje al ritmo de la música.
- **La herramienta la elige el concepto**:
  - GSAP para UI y cámara;
  - Three.js para 3D y el mundo físico (tu producto sobre una mesa real, sin personas falsas);
  - Motion para resortes tipo iOS;
  - Rive y Lottie para animaciones que ya tengas.
- **Detalles Apple, solo cuando suman:**
  - emojis que salen de algo que pasa (🎉 que revienta en confeti);
  - tipeo con cursor;
  - burbujas que "golpean" al enviarse;
  - vidrio sobre la UI.
- **Sonido que describe lo que pasa:**
  - clics de Botanica;
  - un kit natural sintetizado: teclas del celular, enviado, recibido, vibración;
  - voz en off de ElevenLabs sincronizada palabra por palabra;
  - música que entra justo cuando aparece tu producto.

## Instalar

Descarga `video-saas-premium.zip` desde [rayyan.pe/skills/video-saas-premium](https://rayyan.pe/skills/video-saas-premium) y descomprímelo en la carpeta de skills de tu agente:

**Claude Code**
```sh
unzip ~/Downloads/video-saas-premium.zip -d ~/.claude/skills/
```

**Codex**
```sh
unzip ~/Downloads/video-saas-premium.zip -d ~/.codex/skills/
```

Debe quedar `~/.claude/skills/video-saas-premium/SKILL.md` (o `~/.codex/skills/...`). Reinicia el agente después de instalar.

### ElevenLabs
Tu API key **nunca** se pega en el chat. Guárdala una vez en tu llavero:

```sh
# macOS
security add-generic-password -U -a "$USER" -s elevenlabs-api-key -w 'sk_...'
# Linux / Windows
export ELEVENLABS_API_KEY=sk_...
```

## Usar

Abre una carpeta vacía en el agente y escribe:

> hazme un video de https://tuproducto.com, mi Instagram es @tuproducto

El agente:
1. **Revisa tu equipo** y te dice en un solo mensaje todo lo que falta y lo que te va a pedir.
2. **Investiga** tu web, tus redes, tus reseñas y tu competencia, y te resume lo que entendió.
3. **Define el trabajo del video**: dónde se publica, quién lo ve y qué tiene que lograr.
4. **Te propone 3 conceptos distintos** y tú eliges.
5. **Te pide capturas** de las pantallas que salen en el concepto (⌘⇧4 + Espacio en Mac).
6. **Te muestra un animatic** (cuadros clave) antes de animar todo.
7. **Construye y revisa** el video cuadro por cuadro.
8. **Sonido**: efectos de Botanica, del kit natural y foley a medida, anclados al cuadro exacto; si hay voz o música, eliges escuchando muestras.
9. **Renderiza en 4K** y te abre el archivo.

## Qué hay dentro
- `SKILL.md`: el flujo que sigue el agente.
- `references/`:
  - antes de empezar, investigación y proceso creativo (incluye cuándo usar los detalles Apple);
  - herramientas (GSAP, Three.js y el mundo físico, Motion, Rive, Lottie, detalles Apple);
  - capturas de UI, look premium, voz y música, efectos, API del kit y errores comunes;
  - v3: momentos wow, personaje de papel y memoria del proyecto (tablero, tiempos únicos, revisión entre cuadros);
  - v4: comercial de funciones (proceso creativo C5), zonas fijas, transiciones push, pack de SFX propio y aire en la mezcla.
- `kit/`: helpers seek-safe para [HyperFrames](https://hyperframes.heygen.com):
  - `premium.js`: barridos y voz sincronizada;
  - `apple.js` + `apple.css`: zoom, tipeo, emoji, confeti, vidrio;
  - `capas.js`: resortes y Rive;
  - `three-stage.js`: 3D;
  - `motion-kit.js`;
  - `personaje-papel.js`: el personaje de papel con poses;
  - `vendor/` con Rive y Motion (MIT).
- `scripts/`:
  - `preflight.py`: revisión inicial;
  - `brand_from_url.py`: extraer la marca;
  - `analizar_referencia.py`: estudiar un video de referencia;
  - `eleven_vo.py`: voz y música con ElevenLabs;
  - `audio_tools.py`: voz sincronizada, música (`music` / `music-fit`), picos y mezcla;
  - `sfx_curate.py`: clics de Botanica por rol;
  - `pack_sfx.py`: tu propio pack de efectos con timbres reales (ElevenLabs), afinado a tu música, con variantes y catálogo para escuchar;
  - `synth_ui_sfx.py`: kit sintetizado de emergencia;
  - `sfx_referencia.py`: desarma el sonido de una referencia y compara con tu versión;
  - `gen_sfx.py` + `anclar_sfx.py` + `mezcla.py`: foley a medida, punto de contacto y mezcla desde `beats.json` (con aviso de aire entre sonidos);
  - `beats_js.py`: la única fuente de tiempos para la composición;
  - `hoja.py`: hojas de revisión entre cuadros;
  - `ritmo.py`: detecta tramos quietos en un render (el "se ve básico" medido) antes de mostrarlo.
- `plantillas/`: `gusto.md`, `progreso.md` y `tablero.html`.
- `examples/starter/`: composición mínima de partida.

## Licencia
Código bajo licencia MIT. Rive (`@rive-app/canvas-advanced`) y Motion vienen incluidos bajo su propia licencia MIT (`kit/vendor/LICENCIAS.md`).

Botanica, las tipografías, los emojis, las voces y la música son de sus autores. Úsalos en tus videos, pero no los redistribuyas. SF Pro y los emojis de Apple solo existen en macOS; Inter y Geist son OFL.

Hecha por [Rayyan](https://rayyan.pe).

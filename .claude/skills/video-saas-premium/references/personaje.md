# Personaje de papel (anfitrión del video)

`kit/personaje-papel.js`: un personaje recortado en papel, con borde blanco de sticker, sombra suave, brazos de dos piezas y 8 poses. Está hecho en código, así que es igual en cada video, se anima con precisión y no gasta créditos.

## Cuándo sí
- Videos de creadores, explicaciones y lanzamientos donde **alguien actúa la historia**: atrapa, sostiene, señala, celebra, se sorprende.
- Cuando la persona quiere "un personaje mío" o la marca no tiene mascota y el concepto pide una presencia humana.
- No reemplaza la mascota que la marca ya tiene (Rive, Lottie, ilustración): si existe, se usa esa.
- Es claramente una ilustración, así que no "finge una persona". Sigue prohibido fingir personas reales en 3D o con video generado.

## Rasgos (de una foto o de una descripción)
Pide una foto o 4 rasgos: tono de piel, pelo (color y peinado), si usa gorra o lentes, y la ropa que más usa. Haz 2–3 variantes y que elija viéndolas.

```js
const p = Personaje(document.querySelector("#yo"), {
  piel: "#e2b48f", pelo: "#1f1b19", peinado: "rulos",     // rulos · corto · largo · calvo
  gorra: "#c9b99c",                                       // color de gorra de béisbol, o null
  ropa: "#17191d", cuello: "polo",                         // polo · redondo
  pantalon: "#3a3d44", zapatillas: "#fafafa", lentes: false, chapitas: true });
```
Contenedor recomendado: 450×623 px (el SVG mide 520×720). Las manos en la pose `sostiene` quedan en (260, 426) del SVG: multiplica por 0.865 y suma la posición del contenedor para poner un objeto "en sus manos".

## Actuar
```js
p.respira(tl, 0, DUR);            // siempre: nunca más de 1 s congelado
p.parpadea(tl, 2.3);
p.pose(tl, "sostiene", 2.4);      // neutral · saluda · señala · sorprendido · piensa · celebra · sostiene · lanza
p.saludo(tl, 3.0, 3);             // mueve la mano 3 veces (después de pose "saluda")
p.salto(tl, 8.2, 46);             // salta y la sombra del piso se achica
```
- Cada cambio de pose dura 0.3–0.45 s con rebote de papel (`back.out(1.6)`); los brazos llegan 40 ms antes que los codos.
- Una pose por idea: piensa mientras se escribe el titular, sostiene para recibir, lanza para tirar, señala lo que importa, celebra en el resultado.
- El borde blanco lo separa de cualquier fondo, incluso de una palabra gigante negra detrás.

## En el tablero
`plantillas/tablero.html` lo muestra en sus poses con `DATA.personaje = { rasgos: {...}, poses: [...] }`. Se aprueba ahí, antes del animatic.

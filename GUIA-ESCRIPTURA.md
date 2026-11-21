# Guia d'escriptura i publicació a Scriptum

Aquesta guia recull totes les plantilles i normes per escriure articles de blog, definir etiquetes, muntar llibres (simples o amb capítols i episodis) i afegir pàgines especials (dedicatòries, frases aïllades, pròlegs, epílegs) des de **Zettlr**.

---

## Regles d'or (vàlides per a tots els fitxers)
1. **Noms de fitxers i carpetes:** sempre en minúscules, sense accents ni espais (fes servir guions: `el-meu-text.md`).
2. **Dates:** sempre en format `AAAA-MM-DD` (ex. `2026-11-19`).
3. **Enganxar codi a Zettlr:** fes servir **`Ctrl + Shift + V`** (*text pla*) perquè Zettlr no hi afegeixi barres `\` davant dels símbols.
4. **Imatges:** desa-les a `c:\Antigravity\Scriptum\public\imatges\` (ex. `foto.jpg`) i insereix-les dins de qualsevol text amb:
   ```markdown
   ![Descripció de la imatge](/imatges/foto.jpg)
   ```
5. **Publicar al web (`https://scriptum.minimmon.cat`):** desa els fitxers, obre **GitHub Desktop**, escriu un resum curt del canvi → **Commit to main** → **Push origin**. En ~1 minut serà online.

---

## 1. Publicar una entrada al Blog
- **Carpeta:** `src/content/blog/`
- **Fitxer:** `nom-de-l-article.md`

```markdown
---
title: "Títol de l'article"
description: "Resum breu d'una o dues línies per a la targeta del blog."
pubDate: 2026-11-19
author: "Scriptum"
tags: ["família", "sentiments"]
image: "/imatges/miniatura-article.jpg"
featured: false
---

Aquí comença el cos de l'article...
```

> **Miniatura de la fitxa del blog:** el camp `image` és opcional. Si l'afegeixes, mostrarà una miniatura panoràmica (16:9) a la fitxa de l'article (al Blog, als filtres d'etiquetes i a la portada), i pots tornar a posar la mateixa imatge dins del text allà on vulguis.

---

## 2. Editar les definicions de les Etiquetes
- **Fitxer:** `src/content/etiquetes/etiquetes.md`

Només cal afegir `## nom-etiqueta` i escriure la definició a sota:

```markdown
## família
Històries, records i reflexions al voltant dels vincles familiars.
```

> Les etiquetes coincideixen encara que canviïs accents o majúscules (`família` = `familia`).

---

## 3. Llibres i relats: com organitzar-los

Cada llibre té la seva pròpia carpeta dins de `src/content/relats/` (ex. `src/content/relats/el-meu-llibre/`).
Tots els fitxers `.md` d'aquell llibre han de tenir **exactament el mateix `llibreId`** (el nom de la carpeta) i el mateix `llibre` (el títol visible).

### Tots els camps disponibles a la capçalera d'un llibre

| Camp | Obligatori? | Per a què serveix |
|---|---|---|
| `title` | **Sí** | Títol de la pàgina, capítol o episodi |
| `llibre` | **Sí** | Nom complet del llibre (igual a tots els fitxers del llibre) |
| `llibreId` | **Sí** | Identificador sense espais ni accents (igual al nom de la carpeta) |
| `data` | **Sí** | Data en format `AAAA-MM-DD` |
| `ordre` | Recomanat | Número que marca l'ordre exacte de lectura (`0`, `1`, `1.5`, `2`, `10`…) |
| `capitol` | Opcional | Número de capítol (en llibres simples serveix d'ordre i etiqueta `Capítol X`) |
| `tipus` | Opcional | Aspecte de la pàgina: `capitol` (per defecte), `dedicatoria`, `epigraf`, `proleg`, `epileg`, `nota` |
| `seccio` | Opcional | Agrupa diversos episodis sota un encapçalament a l'índex (ex. `"Capítol I — El viatge"`) |
| `etiqueta` | Opcional | Subtítol personalitzat (ex. `"Episodi 1"`, `"Interludi"`). Si no el poses, s'assigna sol segons `tipus`/`capitol` |
| `estat` | Opcional | `"en-curs"` (per defecte) o `"acabat"`. N'hi ha prou de posar `estat: "acabat"` en un sol fitxer del llibre per marcar-lo com a **Obra completa** |
| `publicacio` | Opcional | Controla les dates: si un llibre ja estava acabat abans d'Scriptum (`estat: "acabat"`), mostra només **`Edició: dd-mm-aaaa`** del primer fitxer i ignora les dates dels capítols. Si està `en-curs`, mostra **`Data d'inici: dd-mm-aaaa`** i la data pròpia de cada capítol. Quan acabis un llibre publicat per entregues, posa `estat: "acabat"` + `publicacio: "entregues"` perquè mostri **`Data d'inici`** i **`Data final`** mantenint la data de cada capítol |
| `portada` | Opcional | Ruta de la portada del llibre (ex. `"/imatges/portada-llibre.jpg"`). N'hi ha prou de posar-ho en un sol fitxer del llibre (recomanat format vertical 2:3 o 3:4) |
| `descripcioLlibre` | Opcional | Descripció **global** del llibre (surt a la portada, a la biblioteca i a la capçalera de l'índex). N'hi ha prou de posar-la en un sol fitxer, així no es repeteix amb la `sinopsi` del Capítol 1 |
| `sinopsi` | Opcional | Resum curt **d'aquest capítol o episodi concret** |
| `tempsLectura` | Opcional | Es calcula **automàticament** (~200 paraules/minut) tant al blog com als llibres. Només cal posar-lo si vols forçar un valor manual |

---

### Plantilla A — Pàgina de Dedicatòria (pàgina en blanc centrada)
Fitxer suggerit: `00-dedicatoria.md`

```markdown
---
title: "Dedicatòria"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
tipus: "dedicatoria"
ordre: 0
data: 2026-11-19
---

Per a qui sap trobar silenci entre les paraules.
```

### Plantilla B — Frase aïllada / Epígraf (al principi o entre capítols)
Fitxer suggerit: `01b-frase.md` *(fixa't en `ordre: 1.5` per col·locar-la entremig de l'1 i el 2!)*

```markdown
---
title: "El silenci del vent"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
tipus: "epigraf"
ordre: 1.5
data: 2026-11-19
---

«No tot allò que s'atura deixa d'avançar.»

— Autor / Refranys
```

### Plantilla C — Pròleg, Epíleg o Nota de l'autor
Fitxer suggerit: `00b-proleg.md` (o `99-epileg.md`)

```markdown
---
title: "Pròleg"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
tipus: "proleg"
ordre: 0.5
data: 2026-11-19
tempsLectura: "3 min"
---

Abans d'entrar en aquesta història...
```
*(Canvia `tipus: "proleg"` per `"epileg"` o `"nota"` segons convingui.)*

### Plantilla D — Llibre simple (Capítol 1, Capítol 2…)
Fitxer suggerit: `capitol-01.md`

```markdown
---
title: "Títol del capítol"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
capitol: 1
data: 2026-11-19
sinopsi: "Breu sinopsi del capítol."
tempsLectura: "5 min"
---

Aquí comença el text del capítol...
```

### Plantilla E — Llibre amb Capítols i Episodis (2 nivells)
Per a un llibre amb, per exemple, 2 capítols i diversos episodis dins de cada capítol:

**Capítol I — Episodi 1** (`cap1-ep1.md`):
```markdown
---
title: "La partida"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
seccio: "Capítol I — El camí"
etiqueta: "Episodi 1"
ordre: 1
data: 2026-11-19
sinopsi: "Resum del llibre o de l'episodi."
tempsLectura: "6 min"
---

Text del primer episodi...
```

**Capítol I — Episodi 2** (`cap1-ep2.md`):
```markdown
---
title: "La tempesta"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
seccio: "Capítol I — El camí"
etiqueta: "Episodi 2"
ordre: 2
data: 2026-11-19
tempsLectura: "5 min"
---

Text del segon episodi...
```

**Capítol II — Episodi 1** (`cap2-ep1.md`):
```markdown
---
title: "El retorn"
llibre: "Nom del Llibre"
llibreId: "nom-del-llibre"
seccio: "Capítol II — La tornada"
etiqueta: "Episodi 1"
ordre: 3
data: 2026-11-19
tempsLectura: "7 min"
---

Text del primer episodi del segon capítol...
```

> **Truc per a `ordre`:** Si numeres amb passos de 10 (`10`, `20`, `30`…) o fas servir decimals (`1.5`, `2.5`), sempre podràs intercalar una dedicatòria, una frase aïllada o un episodi nou sense haver de renumerar la resta!

---

## 4. Inserir imatges (mida normal, mida concreta i peu de foto)

Desa sempre les imatges dins de `c:\Antigravity\Scriptum\public\imatges\` (sense posar `public` a la ruta).

### Mida automàtica (Markdown estàndard)
```markdown
![Descripció de la imatge](/imatges/foto.jpg)
```

### Mida concreta en píxels (p. ex. 400 px d'ample)
```html
<img src="/imatges/foto.jpg" alt="Descripció de la imatge" width="400" />
```

### Mida en percentatge de la columna de text (p. ex. 60%)
```html
<img src="/imatges/foto.jpg" alt="Descripció de la imatge" style="width: 60%;" />
```

### Imatge amb el text al voltant (esquerra o dreta)
Posa aquesta línia abans del paràgraf que vols que envolti la imatge, **deixant sempre una línia en blanc entre la imatge i el paràgraf** (si no hi ha línia en blanc, Markdown tracta el paràgraf com a HTML i no aplica cursives ni marges):

- **Imatge a l'esquerra, text a la dreta:**
```html
<img src="/imatges/foto.jpg" alt="Descripció de la imatge" width="280" class="img-esquerra" />

Aquí comença el paràgraf que envoltarà la imatge...
```

- **Imatge a la dreta, text a l'esquerra:**
```html
<img src="/imatges/foto.jpg" alt="Descripció de la imatge" width="280" class="img-dreta" />

Aquí comença el paràgraf que envoltarà la imatge...
```

*(En ordinador i tauleta el text envolta la imatge amb marge net; en mòbil es centra automàticament perquè el text no quedi massa estret.)*

### Imatge amb peu de foto en cursiva
```html
<figure style="text-align: center; margin: 2rem auto;">
  <img src="/imatges/foto.jpg" alt="Descripció de la imatge" width="420" style="margin-bottom: 0.5rem;" />
  <figcaption style="font-size: 0.85rem; opacity: 0.75; font-style: italic;">Text del peu de foto.</figcaption>
</figure>
```

> **Recordatori:** totes les imatges queden centrades, amb vores arrodonides i adaptades automàticament a pantalles de mòbil. Quan enganxis aquests blocs a Zettlr, fes servir **`Ctrl + Shift + V`** (*text pla*).

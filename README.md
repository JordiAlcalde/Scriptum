# Scriptum

> **Espai literari, relats per capítols i blog personal.**

Un espai cuidat, tipogràficament relaxat i enfocat a la lectura assossegada de novel·les per lliuraments i articles d'opinió.

---

## 🚀 Com engegar el projecte localment

1. Obre una terminal a la carpeta `c:\Antigravity\Scriptum`.
2. Executa:
   ```bash
   npm install
   npm run dev
   ```
   *(O simplement fes doble clic al fitxer `start.bat`)*
3. Obre el teu navegador a [http://localhost:4321](http://localhost:4321).

---

## ✍️ Com afegir nous continguts

### 1. Afegir un nou Capítol d'un Llibre existent
Ves a `src/content/relats/croniques-del-silenci/` i crea un fitxer nou com ara `capitol-04.md`:

```markdown
---
title: "El títol del capítol"
llibre: "Cròniques del silenci"
llibreId: "croniques-del-silenci"
capitol: 4
data: 2026-11-21
sinopsi: "Un petit resum d'una línia per a l'índex..."
tempsLectura: "5 min"
---

El teu text en Markdown comença aquí...
```

### 2. Començar un Llibre nou
1. Dins de `src/content/relats/`, crea una carpeta nova amb el nom del llibre (ex: `la-veu-del-mar/`).
2. Crea-hi el primer capítol `capitol-01.md`:
   - Canvia `llibreId: "la-veu-del-mar"`.
   - Posa el títol del llibre a `llibre: "La veu del mar"`.
   - Posa `capitol: 1`.
3. Automàticament es crearà la fitxa del llibre a la biblioteca i el seu índex!

### 3. Publicar un Article al Blog
Dins de `src/content/blog/`, crea un fitxer `.md` (ex: `el-meu-article.md`):

```markdown
---
title: "Títol de l'article"
description: "Resum breu de què tracta..."
pubDate: 2026-11-20
author: "Scriptum"
tags: ["literatura", "apunts"]
featured: false
---

El cos de l'article en Markdown...
```

---

## 🎨 Tipografia i Lector Immersiu

El lector de **Scriptum** inclou:
* **Mida de lletra ajustable:** Botons $A^-$ / $A^+$ per adaptar la mida del text.
* **Modes de lectura:**
  - 📜 **Paper:** Fons clar natural d'estil llibre imprès.
  - ☕ **Sèpia:** To càlid ideal per a llargues sessions de lectura.
  - 🌙 **Nocturn:** Contrast fosc suau per a lectura a les fosques.
* **Capitular:** La primera lletra de cada capítol s'engalana automàticament en gran estil clàssic.
* **Barra de progrés:** Indica visualment el percentatge llegit del capítol mentre fas scroll.
* **Navegació entre capítols:** Botons automàtics per anar al capítol anterior i següent.

---

## 📦 Connexió amb GitHub

Pots vincular aquest projecte a GitHub fàcilment amb **GitHub Desktop**:
1. Obre **GitHub Desktop**.
2. Ves a **File > Add local repository...**
3. Tria la carpeta `C:\Antigravity\Scriptum`.
4. Si et demana inicialitzar-lo com a repositori git, fes clic a **Create a repository**.
5. Fes clic a **Publish repository** per pujar-lo al teu compte de GitHub!

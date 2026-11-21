---
name: sinopsis-scriptum
description: >-
  Genera, revisa i escriu sinopsis literàries en català per a articles del blog
  (`description`), capítols/episodis (`sinopsi`) i descripcions globals de llibres
  (`descripcioLlibre`) dins del projecte Scriptum. Activa aquesta skill sempre que
  l'usuari demani crear, proposar o millorar sinopsis o descripcions dels seus textos.
---

# Generador de Sinopsis Literàries per a Scriptum

## Propòsit
Ajudar en Jordi Alcalde a redactar sinopsis i descripcions breus, evocadores i fidels al seu estil literari en català per als continguts de **Scriptum** (`src/content/blog/` i `src/content/relats/`).

## Camps del frontmatter segons el tipus de text
- **Article del blog** (`src/content/blog/*.md`): camp `description`
- **Capítol o episodi concret** (`src/content/relats/<llibre>/*.md`): camp `sinopsi`
- **Descripció global d'un llibre** (en un sol fitxer del llibre, habitualment el primer): camp `descripcioLlibre`

## Regles d'estil
1. **Idioma i veu:** català natural, cuidat, càlid i literari, coherent amb la prosa de l'autor (sense artificialitats ni tòpics comercials).
2. **Longitud ideal:**
   - **Capítol / episodi (`sinopsi`) o article (`description`):** 1–2 frases, entre **100 i 175 caràcters** aprox., perquè llueixin netes a les targetes i a l'índex sense tallar-se.
   - **Descripció global de llibre (`descripcioLlibre`):** 2–3 frases, entre **150 i 260 caràcters** aprox., que captin l'esperit general de l'obra.
3. **Sense *spoilers*:** despertar curiositat, situar l'atmosfera, el personatge o el tema, però sense revelar girs ni desenllaços finals.
4. **Sense cometes tipogràfiques conflictives dins YAML:** si la frase conté cometes dobles `"`, evitar-les o usar cometes baixes `«...»` dins el camp YAML `"..."`.
5. **Respectar el criteri de l'autor:** no omplir automàticament fitxers amb `sinopsi: ""` que l'usuari hagi deixat buits deliberadament — treballar **només** sobre el fitxer, llibre o conjunt que l'usuari demani explícitament.

## Flux de treball obligatori
1. **Llegir el text sencer** del fitxer (o dels fitxers del llibre si es demana una `descripcioLlibre`).
2. **Proposar 2 o 3 variants curtes** (per exemple: una més evocadora/poètica, una més directa/narrativa i una de més breu) indicant el recompte aproximat de caràcters.
3. **Esperar sempre el vistiplau de l'usuari** (o els seus retocs) **abans** d'editar el fitxer `.md`.
4. **Quan l'usuari aprovi una opció**, actualitzar exclusivament el camp corresponent del frontmatter (`sinopsi`, `description` o `descripcioLlibre`) sense tocar ni una sola coma del cos literari del text.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Site vitrine statique pour **HADRUN** (Hospitalisation à Domicile La Réunion), hébergé sur GitHub Pages à `https://cyberoot84.github.io/` → futur domaine `hadrun.fr`.

## Local development

```powershell
# Démarrer le serveur local (depuis la racine du projet)
npx serve -p 3030 .
# → http://localhost:3030
```

Aucun build, bundler ou compilation. Les modifications de fichiers sont visibles immédiatement après rechargement du navigateur.

## Architecture

Site **100% statique** : HTML + CSS + JS vanilla, pas de framework.

```
index.html              Page principale (hero, soins, parcours, bénéfices, FAQ, contact)
pages/
  pathologies.html      Catalogue détaillé des pathologies prises en charge
  professionnels.html   Page dédiée aux prescripteurs / médecins
  recrutement.html      Offres et formulaire de recrutement
mentions-legales.html   Mentions légales + RGPD + cookies
carte-liens.html        Outil interne — carte des liens SVG drag/pan/zoom + export draw.io
css/style.css           Feuille de style unique — variables CSS + responsive
js/main.js              Script unique — nav mobile, AOS, counters, FAQ, formulaire contact
images/                 favicon.svg, logo.png, parcours-had.webp
contact.php             Endpoint formulaire POST (serveur PHP requis en prod)
```

## CSS — conventions

Toutes les couleurs passent par des variables CSS dans `:root` de `style.css` :

| Variable | Valeur | Usage |
|---|---|---|
| `--primary` | `#1D3461` | Bleu marine principal |
| `--primary-dark` | `#111F3D` | Fonds sombres (header, footer) |
| `--rose` | `#C94070` | Accent rose (CTAs, highlights) |

Breakpoints responsive : `1024px` (tablette) et `768px` (mobile).

Les animations d'apparition utilisent la classe `[data-aos]` + `IntersectionObserver` dans `main.js`. Les éléments restent invisibles (`opacity:0`) jusqu'à ce qu'ils entrent dans le viewport → vérifier que les éléments en bas de page reçoivent bien la classe `.visible`.

## Contacts et coordonnées

- Téléphone : `0262 71 97 50` / `tel:+262262719750`
- Email admission : `admission@hadrun.fr`
- MSS : `admission@hadrun.mssante.fr` (affiché en texte brut, sans lien)
- Email général : `contact@hadrun.fr`

## Formulaire de contact

Le formulaire dans `index.html` (section `#contact`) est un **placeholder** : une annotation `⚠ Mettre iframe formulaire Bluefiles à la place` est déjà présente au-dessus. Le formulaire actuel poste vers `contact.php`.

## À faire / points d'attention

- `images/parcours-had.webp` — image du parcours patient en 6 étapes, doit être fournie manuellement
- `images/icon-192.png` et `icon-512.png` — icônes PWA manquantes (référencées dans `manifest.json`)
- Le formulaire de contact doit être remplacé par un iframe Bluefiles

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

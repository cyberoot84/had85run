# Graph Report - .  (2026-06-10)

## Corpus Check
- Corpus is ~17,062 words - fits in a single context window. You may not need a graph.

## Summary
- 77 nodes · 122 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.94)
- Token cost: 12,000 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Service HAD & Admission|Service HAD & Admission]]
- [[_COMMUNITY_Interface JavaScript|Interface JavaScript]]
- [[_COMMUNITY_Infrastructure & Conformite|Infrastructure & Conformite]]
- [[_COMMUNITY_Configuration PWA|Configuration PWA]]
- [[_COMMUNITY_Identite Visuelle Logo|Identite Visuelle Logo]]
- [[_COMMUNITY_Parcours Patient HAD|Parcours Patient HAD]]
- [[_COMMUNITY_Design Favicon|Design Favicon]]
- [[_COMMUNITY_Config Developpement|Config Developpement]]
- [[_COMMUNITY_Documentation README|Documentation README]]

## God Nodes (most connected - your core abstractions)
1. `Page d'accueil – HADRUN` - 21 edges
2. `Pathologies prises en charge – HADRUN` - 12 edges
3. `Mentions légales & RGPD – HADRUN` - 10 edges
4. `Hospitalisation à Domicile (HAD)` - 10 edges
5. `Espace professionnels de santé – HADRUN` - 9 edges
6. `Recrutement – HADRUN La Réunion` - 8 edges
7. `HADRUN Logo` - 7 edges
8. `Carte des liens – HADRUN` - 6 edges
9. `contact.php – endpoint formulaire POST` - 6 edges
10. `Feuille de style principale (style.css)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Politique RGPD HADRUN` --governs--> `contact.php – endpoint formulaire POST`  [INFERRED]
  mentions-legales.html → index.html
- `Carte des liens – HADRUN` --references--> `Page d'accueil – HADRUN`  [EXTRACTED]
  carte-liens.html → index.html
- `Page d'accueil – HADRUN` --references--> `Mentions légales & RGPD – HADRUN`  [EXTRACTED]
  index.html → mentions-legales.html
- `Page d'accueil – HADRUN` --references--> `Pathologies prises en charge – HADRUN`  [EXTRACTED]
  index.html → pages/pathologies.html
- `Page d'accueil – HADRUN` --references--> `Espace professionnels de santé – HADRUN`  [EXTRACTED]
  index.html → pages/professionnels.html

## Import Cycles
- None detected.

## Communities (10 total, 2 thin omitted)

### Community 0 - "Service HAD & Admission"
Cohesion: 0.24
Nodes (14): Processus d'admission HAD, Outil ADOP-HAD (HAS) – vérification éligibilité, Chimiothérapie à domicile, Hospitalisation à Domicile (HAD), HADRUN – Organisation médicale, Page d'accueil – HADRUN, Script principal (main.js), PWA manifest.json (+6 more)

### Community 1 - "Interface JavaScript"
Cohesion: 0.15
Nodes (10): aosObserver, backdrop, burger, counterObserver, feedback, form, header, nav (+2 more)

### Community 2 - "Infrastructure & Conformite"
Cohesion: 0.35
Nodes (13): Carte des liens – HADRUN, CNIL – Commission Nationale Informatique et Libertés, contact.php – endpoint formulaire POST, Politique cookies HADRUN, Feuille de style principale (style.css), Google Fonts (Poppins + Inter), Mentions légales & RGPD – HADRUN, Pathologies prises en charge – HADRUN (+5 more)

### Community 3 - "Configuration PWA"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, lang, name, short_name, start_url (+1 more)

### Community 4 - "Identite Visuelle Logo"
Cohesion: 0.54
Nodes (8): HAD RUN, Blue Color (#2B5BA8 approx), Pink/Rose Color, Home Healthcare / HAD, HADRUN Logo, House Icon, Stethoscope Icon, Hospitalisation A Domicile

### Community 5 - "Parcours Patient HAD"
Cohesion: 0.50
Nodes (8): HAD - Hospitalisation A Domicile, Parcours de prise en charge du patient en HAD, Étape 1 - Prescription, Étape 2 - Évaluation, Étape 3 - Décision, Étape 4 - Mise en place au domicile de l'HAD, Étape 5 - Réalisation des soins, Étape 6 - Fin de la prise en charge du patient

### Community 6 - "Design Favicon"
Cohesion: 0.47
Nodes (6): HADRUN Favicon, Home Healthcare / Medical Home Concept, House/Home Shape, Navy Blue Background (#1D3461), Rose/Pink Brand Color (#C94070), Stethoscope Shape

## Knowledge Gaps
- **30 isolated node(s):** `version`, `configurations`, `burger`, `nav`, `backdrop` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Page d'accueil – HADRUN` connect `Service HAD & Admission` to `Infrastructure & Conformite`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `Mentions légales & RGPD – HADRUN` connect `Infrastructure & Conformite` to `Service HAD & Admission`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `contact.php – endpoint formulaire POST` connect `Infrastructure & Conformite` to `Service HAD & Admission`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `Hospitalisation à Domicile (HAD)` (e.g. with `Processus d'admission HAD` and `Chimiothérapie à domicile`) actually correct?**
  _`Hospitalisation à Domicile (HAD)` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `version`, `configurations`, `burger` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
@AGENTS.md

# JUNO — Guide de développement

Projet de fin de Master. Application mobile web (PWA) pour apprendre l'entrepreneuriat via la construction de lampes LEGO. Chaque module guide l'utilisateur étape par étape avec des conseils entrepreneuriaux — y compris des étapes de démontage pour illustrer que reculer fait partie du processus.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS v4 |
| Polices | next/font/google (MuseoModerno, Poetsen One, Poppins) |
| Icônes | Lineicons (606 SVG inline via `<Icon />`) |
| Illustrations | PNG 3D dans `/public/illustrations/` |
| Backend | Supabase (à brancher) |
| Déploiement | Vercel |

---

## Règles de développement (OBLIGATOIRE)

### 1. Couleurs — toujours utiliser les tokens

Ne jamais écrire de couleur en dur (`#ff8c00`, `rgb(...)`, etc.).
Utiliser exclusivement les classes Tailwind du design system :

```
june-{50|100|200|300|400|500|600|700|800|900|950}   → Orange primaire
deep-{50|100|200|300|400|500|600|700|800|900|950}   → Violet secondaire
slate-{50|100|200|300|400|500|600|700|800|900|950}  → Gris tertiaire
core-{50|100|200|300|400|500|600|700|800|900|950}   → Bleu accent
mint-{50|100|200|300|400|500|600|700|800|900|950}   → Vert accent
error-{50|100|200|300|400|500|600|700|800|900|950}  → Rouge erreur
```

Couleurs de référence rapide :
- `june-600`  → Orange principal brand (#FF8C00)
- `deep-900`  → Violet foncé brand (#661C8C)
- `slate-900` → Quasi-noir (#1a1a1a)
- `slate-50`  → Quasi-blanc (#fafafa)
- `error-500` → Rouge erreur (#ff2343)
- `mint-500`  → Vert succès (#25e2ad)

### 2. Polices — toujours utiliser les classes utilitaires

```
font-poppins  → Corps de texte, paragraphes, labels (défaut du body)
font-poetsen  → Titres, noms, marque
font-museo    → Termes clés, accents, chiffres importants
```

Ne jamais écrire `font-family: "Poppins"` en inline style.
Les tailles de texte seront définies au fur et à mesure (`text-sm`, `text-xl`, etc.).

### 3. Composants — toujours réutiliser

Avant de créer un nouveau composant, vérifier s'il existe déjà :

#### Disponibles maintenant

| Composant | Import | Usage |
|---|---|---|
| `<Logo />` | `@/components/brand/Logo` | Logo JUNO (6 variantes) |
| `<Icon />` | `@/components/ui/Icon` | Icône Lineicons (606 icônes) |
| `<BottomNav />` | `@/components/ui/BottomNav` | Barre de navigation (2 variantes) |

#### `<Logo />` — variantes

```tsx
<Logo />                                      // paysage couleur (défaut)
<Logo color="blanc" />                         // fond orange
<Logo color="noir" />                          // fond transparent noir
<Logo variant="monogramme" />                  // icône seule couleur
<Logo variant="monogramme" color="blanc" />    // icône fond orange
<Logo height={32} />                           // taille custom
```

#### `<Icon />` — usage

```tsx
<Icon name="home" />
<Icon name="arrow-right" size={20} className="text-june-500" />
<Icon name="user" aria-label="Profil" />
// Catalogue : https://lineicons.com/icons (606 icônes)
```

#### `<BottomNav />` — variantes

```tsx
// Variante sombre (défaut)
<BottomNav activeTab="formation" onTabChange={setTab} />

// Variante glassmorphism (Apple-style)
<BottomNav activeTab="boutique" onTabChange={setTab} variant="glass" />
```

Onglets disponibles : `"formation"` | `"communaute"` | `"boutique"` | `"profil"`

### 4. Illustrations

16 formes 3D PNG dans `/public/illustrations/`. Utiliser via le dictionnaire :

```tsx
import Image from "next/image";
import { illustrations } from "@/lib/illustrations";

<Image src={illustrations.spiral} alt="Spirale" width={120} height={120} />
```

Clés disponibles : `ball`, `ball2`, `cone`, `cones`, `cones2`, `cube`, `cube2`,
`cylinder`, `glass`, `glasses`, `polyhedron`, `spiral`, `spiral2`, `torus`, `torus2`, `wands`

---

## Architecture des dossiers

```
src/
├── app/                    → Pages Next.js (App Router)
│   ├── globals.css         → Tokens Tailwind (couleurs, polices)
│   └── layout.tsx          → Layout racine + chargement polices
├── components/
│   ├── brand/
│   │   └── Logo.tsx        → Logo JUNO (6 variantes)
│   └── ui/
│       ├── BottomNav.tsx   → Navigation bas d'écran (dark / glass)
│       └── Icon.tsx        → Icônes Lineicons
├── lib/
│   └── illustrations.ts    → Dictionnaire des illustrations PNG
├── types/
│   └── lineicons.d.ts      → Types pour le package lineicons
public/
└── illustrations/          → 16 PNG 3D (Ball, Cone, Cube, Spiral...)
```

---

## Conventions

- **Mobile-first** : l'app est conçue pour mobile (402×870). Breakpoints Tailwind en `sm:` et `md:` pour les cas desktop.
- **Langue** : French UI. Variables et composants en anglais.
- **`"use client"`** : à ajouter uniquement quand nécessaire (useState, useEffect, events). Préférer les Server Components.
- **Images** : toujours utiliser `next/image` avec `width` et `height` explicites.
- **Accessibilité** : `aria-label` sur tous les éléments interactifs sans texte visible.
- **Pas de couleurs en dur** — voir règle n°1.
- **Pas de `font-family` inline** — voir règle n°2.

---

## Design system — référence couleurs

```
Primaire  → june    (orange)    june-600  = #FF8C00
Secondaire→ deep    (violet)    deep-900  = #661C8C
Tertiaire → slate   (gris)      slate-500 = #727272
Bleu      → core               core-500  = #00b9e2
Vert      → mint               mint-500  = #25e2ad
Erreur    → error   (rouge)     error-500 = #ff2343
```

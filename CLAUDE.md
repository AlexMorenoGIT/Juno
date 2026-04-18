# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## JUNO — contexte projet

Projet de fin de Master. PWA mobile pour apprendre l'entrepreneuriat via la construction de lampes LEGO. Chaque module guide l'utilisateur étape par étape avec des conseils entrepreneuriaux — y compris des étapes de démontage pour illustrer que reculer fait partie du processus.

Conçu mobile-first (402×870 de référence). UI en français, code (variables, composants) en anglais.

---

## Commandes

```bash
npm run dev      # Next dev server (localhost:3000)
npm run build    # Build prod (génère aussi les icônes PWA si configuré)
npm run start    # Serveur prod
npm run lint     # ESLint (flat config : eslint.config.mjs)
```

Pas de suite de tests configurée pour le moment. Pour valider un changement TypeScript sans lancer `next build` complet : `npx tsc --noEmit`.

Scripts one-shot : `scripts/generate-icons.mjs` régénère les icônes PWA à partir du monogramme.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | **Next.js 16** (App Router — voir AGENTS.md) |
| Langage | TypeScript strict |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Polices | next/font/google (MuseoModerno, Poetsen One, Poppins) |
| Icônes | Lineicons (606 SVG inline via `<Icon />`) |
| Illustrations | PNG 3D dans `/public/illustrations/` |
| Backend | Supabase (`@supabase/ssr` + `@supabase/supabase-js`) |
| Déploiement | Vercel |

---

## Architecture applicative

### Flow utilisateur

```
   /                        /welcome                     /home
┌───────────┐  installé   ┌────────────┐   auth OK    ┌────────┐
│ Install   │────────────▶│  Sheet     │─────────────▶│ Landed │
│  gate PWA │  (replace)  │  auth      │  replace     │ post-  │
└───────────┘             │  login/    │              │ auth   │
                          │  signup    │              └────────┘
                          └────────────┘
```

- **`/`** (`src/app/page.tsx`, client) : détecte si l'app tourne en standalone (PWA installée). Si oui → `router.replace("/welcome")`. Sinon → affiche les instructions d'installation iOS/Android/desktop.
- **`/welcome`** (`src/app/welcome/page.tsx`, client) : scène animée (3 cercles concentriques + éléments gravitants), bouton Suivant → sheet d'auth.
- **`/home`** (`src/app/home/page.tsx`, server) : placeholder post-auth. Appelle `supabase.auth.getUser()`, redirige vers `/welcome` si non authentifié, sinon affiche « Bienvenue {first_name} » + bouton déconnexion (`LogoutButton.tsx`).
- **`/design-system`** : vitrine interne des tokens et composants.

### Sheet d'authentification (`/welcome`)

Un seul écran gère login + signup. État interne (`mode`, `login`, `signup`, `loading`, `error`, `info`) co-localisé dans la page. Toggle `deep-900` en haut ; `<AnimatePresence mode="wait">` swap entre les deux formulaires.

- Login : `supabase.auth.signInWithPassword` → `/home`
- Signup : `supabase.auth.signUp` avec metadata `{ first_name, last_name }`. Si la session est vide (Confirm email activé dans Supabase), affiche un message demandant de désactiver le réglage.
- Validation client : mdp ≥ 6, confirmation identique, prénom/nom requis.
- Drag-to-dismiss via `useDragControls` attaché uniquement au handle (le contenu reste scrollable).

Sous-composants privés (tous en fin de `welcome/page.tsx`) : `AuthInput`, `EyeToggle`, `PrimaryBtn`, `SocialRow`, `FormFeedback`, `GoogleLogo`/`AppleLogo`/`FacebookLogo`. **Les boutons sociaux sont visuels seulement** (non branchés).

### Supabase (`src/utils/supabase/`)

Trois clients, un par contexte d'exécution :

| Fichier | Import | Contexte |
|---|---|---|
| `client.ts` | `createBrowserClient` | Client (browser). À utiliser dans les `"use client"` |
| `server.ts` | `createServerClient` (async) | Server Components. `const supabase = await createClient()` |
| `middleware.ts` | `createServerClient` | Appelé depuis `src/middleware.ts` pour rafraîchir la session sur chaque requête |

**Env vars attendues** (racine `.env.local`, et côté Vercel) :

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Le middleware Next (`src/middleware.ts`) matche toutes les routes sauf assets statiques.

### PWA

- Manifest : `public/manifest.webmanifest` (référencé dans `layout.tsx` via `metadata.manifest`).
- Service Worker : `public/sw.js` enregistré par un `<Script strategy="afterInteractive">` dans le `<head>` de `layout.tsx`.
- Splash : composant `<SplashScreen />` monté dans `<body>`, s'auto-retire après quelques centaines de ms.
- Prompt install Android : capturé avant hydratation via `window.__deferredInstallPrompt` (script `beforeInteractive` dans `layout.tsx`). Le composant `<InstallPrompt />` le consomme ensuite.
- Icônes : générées par `scripts/generate-icons.mjs` → `public/icons/`.

### Sécurité / Next config (`next.config.ts`)

- Headers globaux : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- `images.remotePatterns` autorise `<project>.supabase.co/storage/v1/object/public/**` (pour servir les uploads utilisateur via `next/image`).

---

## Design system (OBLIGATOIRE)

### 1. Couleurs — toujours via les tokens

Jamais de couleur en dur (`#ff8c00`, `rgb(...)`). Utiliser les classes Tailwind générées depuis `src/app/globals.css` (`@theme` + variables CSS `--color-*`) :

```
june-{50..950}   → Orange primaire    (june-600  = #FF8C00)
deep-{50..950}   → Violet secondaire  (deep-900  = #661C8C)
slate-{50..950}  → Gris tertiaire     (slate-900 = #1a1a1a)
core-{50..950}   → Bleu accent        (core-500  = #00b9e2)
mint-{50..950}   → Vert accent        (mint-500  = #25e2ad)
error-{50..950}  → Rouge erreur       (error-500 = #ff2343)
```

Accès direct à la variable CSS pour les cas où Tailwind ne suffit pas : `var(--color-june-600)`.

### 2. Polices

```
font-poppins   → Corps de texte (défaut du <body>)
font-poetsen   → Titres, noms, marque
font-museo     → Termes clés, accents, chiffres importants
```

Jamais de `font-family` inline.

### 3. Composants — toujours réutiliser

Vérifier dans `src/components/` avant d'en créer un nouveau.

| Composant | Import | Résumé |
|---|---|---|
| `<Logo />` | `@/components/brand/Logo` | 6 variantes (paysage/monogramme × couleur/blanc/noir) |
| `<Icon />` | `@/components/ui/Icon` | Lineicons inline (606 icônes, prop `name`) |
| `<BottomNav />` | `@/components/ui/BottomNav` | Nav bas (variants `dark`/`glass`), onglets `formation`/`communaute`/`boutique`/`profil` |
| `<InstallPrompt />` | `@/components/ui/InstallPrompt` | Utilise le `beforeinstallprompt` capturé |
| `<SplashScreen />` | `@/components/ui/SplashScreen` | Auto-monté dans le layout racine |

Lineicons : catalogue complet sur https://lineicons.com/icons. L'icône `eye` existe mais **pas `eye-slash`** — le `EyeToggle` dans `welcome/page.tsx` dessine la barre diagonale en CSS.

### 4. Illustrations 3D

Dictionnaire dans `src/lib/illustrations.ts` :

```tsx
import { illustrations } from "@/lib/illustrations";
<Image src={illustrations.spiral} alt="Spirale" width={120} height={120} />
```

Clés : `ball`, `ball2`, `cone`, `cones`, `cones2`, `cube`, `cube2`, `cylinder`, `cylindreTeal`, `glass`, `glasses`, `polyhedron`, `spiral`, `spiral2`, `torus`, `torus2`, `wands`.

Avatars utilisateur (pour la scène d'accueil) : `public/avatars/avatar-{blond,diploma,pink,red,yellow}.png`. Sources basse résolution (100–140 px natif) → toujours passer `unoptimized` + `quality={100}` si rendu à taille proche du natif.

---

## Structure des dossiers

```
src/
├── app/
│   ├── page.tsx               → Install gate PWA (client)
│   ├── layout.tsx             → Polices, manifest, SW, splash, PWA hooks
│   ├── globals.css            → @theme Tailwind + tokens couleur/police
│   ├── welcome/page.tsx       → Scène + sheet d'auth (login/signup)
│   ├── home/
│   │   ├── page.tsx           → Post-auth (server, lecture user)
│   │   └── LogoutButton.tsx   → (client) signOut + redirect
│   └── design-system/…        → Vitrine design
├── components/
│   ├── brand/Logo.tsx
│   └── ui/{BottomNav,Icon,InstallPrompt,SplashScreen}.tsx
├── lib/illustrations.ts       → Dictionnaire PNG
├── types/…                    → Types PWA + lineicons
├── utils/supabase/            → client / server / middleware
└── middleware.ts              → Délègue à utils/supabase/middleware
public/
├── illustrations/             → 3D PNG (16 formes)
├── avatars/                   → Avatars (5 fichiers)
├── icons/                     → Icônes PWA générées
├── manifest.webmanifest
├── sw.js
└── offline.html
scripts/
└── generate-icons.mjs
```

---

## Conventions

- **Mobile-first** (402×870). Breakpoints `sm:` / `md:` réservés au desktop.
- **UI en français, code en anglais.**
- **`"use client"`** uniquement si nécessaire (hooks, events). Par défaut = Server Component.
- **Images** : toujours `next/image` avec `width` / `height` explicites. `unoptimized` pour PNG déjà basse résolution.
- **Accessibilité** : `aria-label` obligatoire sur tout élément interactif sans texte visible.
- **Pas de couleurs ni de `font-family` en dur** (voir règles 1 & 2).
- **Pas de tokens inventés** : si une couleur/police manque, l'ajouter à `globals.css` — ne pas inliner.

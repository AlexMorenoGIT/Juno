import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { illustrations } from "@/lib/illustrations";
import { NavDemo } from "./NavDemo";

/* ------------------------------------------------------------------ */
/* Données                                                              */
/* ------------------------------------------------------------------ */

const colorScales = [
  {
    name: "June",
    label: "Primaire — Orange",
    shades: [
      { step: 50,  hex: "#fffbec" },
      { step: 100, hex: "#fff6d3" },
      { step: 200, hex: "#ffeaa5" },
      { step: 300, hex: "#ffd86d" },
      { step: 400, hex: "#ffbb32" },
      { step: 500, hex: "#ffa40a" },
      { step: 600, hex: "#ff8c00" },
      { step: 700, hex: "#cc6702" },
      { step: 800, hex: "#a14f0b" },
      { step: 900, hex: "#82420c" },
      { step: 950, hex: "#462004" },
    ],
  },
  {
    name: "Deep",
    label: "Secondaire — Violet",
    shades: [
      { step: 50,  hex: "#fbf5ff" },
      { step: 100, hex: "#f5e8ff" },
      { step: 200, hex: "#edd5ff" },
      { step: 300, hex: "#e0b3ff" },
      { step: 400, hex: "#cc83fd" },
      { step: 500, hex: "#b854f8" },
      { step: 600, hex: "#a532eb" },
      { step: 700, hex: "#8f21cf" },
      { step: 800, hex: "#7920a9" },
      { step: 900, hex: "#661c8c" },
      { step: 950, hex: "#440665" },
    ],
  },
  {
    name: "Slate",
    label: "Tertiaire — Gris",
    shades: [
      { step: 50,  hex: "#fafafa" },
      { step: 100, hex: "#f5f5f5" },
      { step: 200, hex: "#e6e6e6" },
      { step: 300, hex: "#d3d3d3" },
      { step: 400, hex: "#a3a3a3" },
      { step: 500, hex: "#727272" },
      { step: 600, hex: "#5b5b5b" },
      { step: 700, hex: "#404040" },
      { step: 800, hex: "#272727" },
      { step: 900, hex: "#1a1a1a" },
      { step: 950, hex: "#0b0b0b" },
    ],
  },
  {
    name: "Core",
    label: "Accent — Bleu",
    shades: [
      { step: 50,  hex: "#ebfeff" },
      { step: 100, hex: "#ccfbff" },
      { step: 200, hex: "#9ff5ff" },
      { step: 300, hex: "#5debff" },
      { step: 400, hex: "#03cef6" },
      { step: 500, hex: "#00b9e2" },
      { step: 600, hex: "#0092be" },
      { step: 700, hex: "#057499" },
      { step: 800, hex: "#0e5d7c" },
      { step: 900, hex: "#114d68" },
      { step: 950, hex: "#043348" },
    ],
  },
  {
    name: "Mint",
    label: "Accent — Vert",
    shades: [
      { step: 50,  hex: "#eafff7" },
      { step: 100, hex: "#cdfee9" },
      { step: 200, hex: "#a0fad9" },
      { step: 300, hex: "#63f2c5" },
      { step: 400, hex: "#19f2bd" },
      { step: 500, hex: "#25e2ad" },
      { step: 600, hex: "#00a47c" },
      { step: 700, hex: "#008367" },
      { step: 800, hex: "#006753" },
      { step: 900, hex: "#005545" },
      { step: 950, hex: "#003028" },
    ],
  },
  {
    name: "Error",
    label: "Sémantique — Rouge",
    shades: [
      { step: 50,  hex: "#fff0f2" },
      { step: 100, hex: "#ffdde2" },
      { step: 200, hex: "#ffc0c9" },
      { step: 300, hex: "#ff94a3" },
      { step: 400, hex: "#ff576f" },
      { step: 500, hex: "#ff2343" },
      { step: 600, hex: "#ff1a3b" },
      { step: 700, hex: "#d7001f" },
      { step: 800, hex: "#b1031c" },
      { step: 900, hex: "#920a1e" },
      { step: 950, hex: "#50000c" },
    ],
  },
];

const iconSample = [
  "home", "user", "arrow-right", "arrow-left", "chevron-right", "chevron-down",
  "search", "close", "menu", "settings", "bell", "heart",
  "star", "bookmark", "share", "download", "upload", "trash",
  "edit", "check", "info", "warning", "lock", "unlock",
  "eye", "eye-slash", "plus", "minus", "grid", "list",
  "image", "video", "mic", "headphone", "music", "play",
  "pause", "forward", "backward", "shuffle", "repeat", "volume",
  "map-marker", "map", "direction", "compass", "flag", "tag",
  "calendar", "clock", "alarm", "time", "timer", "stopwatch",
  "shopping-cart", "wallet", "credit-card", "coin", "gift", "package",
  "chat-bubble", "message", "envelope", "phone", "world", "link",
];

/* ------------------------------------------------------------------ */
/* Composants utilitaires                                              */
/* ------------------------------------------------------------------ */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-12 border-t border-slate-200">
      <h2 className="font-poetsen text-2xl text-slate-900 mb-8">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-xs">
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="monogramme" height={36} />
          <div>
            <p className="font-poetsen text-slate-900 leading-none">Design System</p>
            <p className="font-poppins text-xs text-slate-400 mt-0.5">JUNO — v1.0</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-5 font-poppins text-sm text-slate-500">
          {["couleurs", "polices", "logos", "icones", "illustrations", "navigation"].map((s) => (
            <a key={s} href={`#${s}`} className="hover:text-june-600 capitalize transition-colors">
              {s}
            </a>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24">

        {/* ── COULEURS ─────────────────────────────────────────────── */}
        <Section id="couleurs" title="Couleurs">
          <div className="space-y-10">
            {colorScales.map((scale) => (
              <div key={scale.name}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-museo font-semibold text-slate-900">{scale.name}</span>
                  <span className="font-poppins text-sm text-slate-400">{scale.label}</span>
                </div>
                <div className="flex rounded-xl overflow-hidden shadow-sm">
                  {scale.shades.map(({ step, hex }) => {
                    const isDark = step >= 500;
                    return (
                      <div
                        key={step}
                        className="flex-1 flex flex-col items-center justify-end pb-2 pt-10 gap-1 group relative transition-all hover:flex-[1.5]"
                        style={{ backgroundColor: hex }}
                        title={`${scale.name.toLowerCase()}-${step}: ${hex}`}
                      >
                        <span
                          className="font-mono text-[10px] font-medium"
                          style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}
                        >
                          {step}
                        </span>
                        <span
                          className="font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-8"
                          style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
                        >
                          {hex}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex mt-2">
                  {scale.shades.map(({ step }) => (
                    <div key={step} className="flex-1 text-center">
                      <span className="font-mono text-[10px] text-slate-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Couleurs sémantiques rapides */}
          <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-200">
            <p className="font-poppins text-sm font-medium text-slate-700 mb-4">Références rapides</p>
            <div className="flex flex-wrap gap-3">
              {[
                { token: "june-600",  hex: "#FF8C00", label: "Brand primary" },
                { token: "deep-900",  hex: "#661C8C", label: "Brand secondary" },
                { token: "slate-900", hex: "#1a1a1a", label: "Texte principal" },
                { token: "slate-500", hex: "#727272", label: "Texte secondaire" },
                { token: "slate-200", hex: "#e6e6e6", label: "Bordures" },
                { token: "error-500", hex: "#ff2343", label: "Erreur" },
                { token: "mint-500",  hex: "#25e2ad", label: "Succès" },
                { token: "core-500",  hex: "#00b9e2", label: "Info" },
              ].map(({ token, hex, label }) => (
                <div key={token} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-6 h-6 rounded-md shadow-sm shrink-0" style={{ backgroundColor: hex }} />
                  <div>
                    <p className="font-mono text-xs text-slate-700">{token}</p>
                    <p className="font-poppins text-[10px] text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── POLICES ──────────────────────────────────────────────── */}
        <Section id="polices" title="Typographies">
          <div className="space-y-6">
            {/* MuseoModerno */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Chip label="font-museo" />
                <span className="font-poppins text-sm text-slate-400">Termes clés · Accents · Chiffres</span>
              </div>
              <div className="space-y-2">
                <p className="font-museo font-bold text-5xl text-slate-900 leading-tight">Entreprendre</p>
                <p className="font-museo font-semibold text-3xl text-june-600">JUNO — Module 1</p>
                <p className="font-museo text-xl text-slate-600">Construis. Défais. Recommence.</p>
                <p className="font-museo text-sm text-slate-400">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
              </div>
            </div>

            {/* Poetsen One */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Chip label="font-poetsen" />
                <span className="font-poppins text-sm text-slate-400">Titres · Marque · Noms</span>
              </div>
              <div className="space-y-2">
                <p className="font-poetsen text-5xl text-slate-900 leading-tight">Construis ta vision</p>
                <p className="font-poetsen text-3xl text-deep-700">Le Point de Départ</p>
                <p className="font-poetsen text-xl text-slate-600">L&apos;Entrepreneuriat en LEGO</p>
                <p className="font-poetsen text-sm text-slate-400">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
              </div>
            </div>

            {/* Poppins */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Chip label="font-poppins" />
                <span className="font-poppins text-sm text-slate-400">Corps de texte · Labels · UI (défaut body)</span>
              </div>
              <div className="space-y-2">
                <p className="font-poppins font-semibold text-xl text-slate-900">Conseil entrepreneurial</p>
                <p className="font-poppins text-base text-slate-700 leading-relaxed max-w-xl">
                  Dans cette étape, tu vas assembler la base de ta lampe. Chaque pièce représente une décision stratégique — prends le temps de bien choisir ton orientation.
                </p>
                <p className="font-poppins text-sm text-slate-500">Labels, boutons, textes secondaires, annotations</p>
                <p className="font-poppins text-xs text-slate-400">Light · Regular · Medium · Semibold · Bold</p>
              </div>
            </div>

            {/* Échelle typographique suggérée */}
            <div className="bg-slate-900 rounded-2xl p-6">
              <p className="font-poppins text-sm text-slate-400 mb-5">Échelle de tailles recommandée</p>
              <div className="space-y-3">
                {[
                  { size: "text-4xl", label: "4xl — 36px", font: "font-poetsen", text: "Titre écran principal" },
                  { size: "text-3xl", label: "3xl — 30px", font: "font-poetsen", text: "Titre de module" },
                  { size: "text-2xl", label: "2xl — 24px", font: "font-museo",   text: "Termes clés & chiffres" },
                  { size: "text-xl",  label: "xl — 20px",  font: "font-poetsen", text: "Sous-titre de section" },
                  { size: "text-base",label: "base — 16px",font: "font-poppins", text: "Corps de texte principal" },
                  { size: "text-sm",  label: "sm — 14px",  font: "font-poppins", text: "Labels, boutons, captions" },
                  { size: "text-xs",  label: "xs — 12px",  font: "font-poppins", text: "Annotations, meta" },
                ].map(({ size, label, font, text }) => (
                  <div key={size} className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-slate-600 w-24 shrink-0">{label}</span>
                    <p className={`${size} ${font} text-white leading-none`}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── LOGOS ────────────────────────────────────────────────── */}
        <Section id="logos" title="Logos">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Paysage couleur */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center gap-3">
              <Logo variant="paysage" color="couleur" height={40} />
              <Chip label='variant="paysage" color="couleur"' />
            </div>
            {/* Paysage noir */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center gap-3">
              <Logo variant="paysage" color="noir" height={40} />
              <Chip label='color="noir"' />
            </div>
            {/* Paysage blanc */}
            <div className="bg-slate-200 rounded-2xl p-6 flex flex-col items-center gap-3">
              <Logo variant="paysage" color="blanc" height={40} />
              <Chip label='color="blanc"' />
            </div>
            {/* Monogramme couleur */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center gap-3">
              <Logo variant="monogramme" color="couleur" height={56} />
              <Chip label='variant="monogramme"' />
            </div>
            {/* Monogramme noir */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center gap-3">
              <Logo variant="monogramme" color="noir" height={56} />
              <Chip label='color="noir"' />
            </div>
            {/* Monogramme blanc */}
            <div className="bg-slate-200 rounded-2xl p-6 flex flex-col items-center gap-3">
              <Logo variant="monogramme" color="blanc" height={56} />
              <Chip label='color="blanc"' />
            </div>
          </div>
        </Section>

        {/* ── ICÔNES ───────────────────────────────────────────────── */}
        <Section id="icones" title="Icônes — Lineicons">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="font-poppins text-sm text-slate-500">
                606 icônes disponibles · <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">@/components/ui/Icon</code>
              </p>
              <a
                href="https://lineicons.com/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins text-xs text-june-600 hover:underline flex items-center gap-1"
              >
                Catalogue complet <Icon name="external-link" size={12} />
              </a>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
              {iconSample.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 group cursor-default"
                  title={name}
                >
                  <Icon name={name} size={22} className="text-slate-700 group-hover:text-june-600 transition-colors" />
                  <span className="font-mono text-[8px] text-slate-400 truncate w-full text-center">{name}</span>
                </div>
              ))}
            </div>
            {/* Exemples de couleurs */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="font-poppins text-xs text-slate-400 mb-3">Coloration via Tailwind</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { cls: "text-june-600",  label: "june-600"  },
                  { cls: "text-deep-700",  label: "deep-700"  },
                  { cls: "text-slate-900", label: "slate-900" },
                  { cls: "text-core-500",  label: "core-500"  },
                  { cls: "text-mint-600",  label: "mint-600"  },
                  { cls: "text-error-500", label: "error-500" },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon name="star" size={20} className={cls} />
                    <span className="font-mono text-xs text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── ILLUSTRATIONS ─────────────────────────────────────────── */}
        <Section id="illustrations" title="Illustrations 3D">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="font-poppins text-sm text-slate-500 mb-5">
              16 formes 3D · <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">@/lib/illustrations</code> · <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">/public/illustrations/</code>
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {(Object.entries(illustrations) as [string, string][]).map(([key, src]) => (
                <div key={key} className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-slate-50 group-hover:bg-june-50 transition-colors">
                    <Image
                      src={src}
                      alt={key}
                      width={48}
                      height={48}
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 text-center">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── NAVIGATION ───────────────────────────────────────────── */}
        <Section id="navigation" title="Navigation — BottomNav">
          <NavDemo />
          <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-5">
            <p className="font-poppins text-sm font-medium text-slate-700 mb-3">Usage</p>
            <pre className="font-mono text-xs text-slate-600 bg-slate-50 rounded-xl p-4 overflow-x-auto leading-relaxed">
{`import { BottomNav } from "@/components/ui/BottomNav";

// Variante sombre
<BottomNav
  activeTab="formation"
  onTabChange={(tab) => setActiveTab(tab)}
/>

// Variante glass
<BottomNav
  activeTab="boutique"
  onTabChange={(tab) => setActiveTab(tab)}
  variant="glass"
/>`}
            </pre>
          </div>
        </Section>

      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";
import { Icon } from "@/components/ui/Icon";
import { CommunauteOnboarding } from "./CommunauteOnboarding";

type NotifItem = {
  name: string;
  message: string;
  when: string;
  avatar: string;
  bg: string; // couleur du cercle derrière l'avatar
};

const NOTIFICATIONS: NotifItem[] = [
  {
    name: "Tom Chairoux",
    message: "T'a envoyé un message privé",
    when: "1h",
    avatar: "/avatars/avatar-yellow.png",
    bg: "var(--color-core-300)",
  },
  {
    name: "Clara Mienvelle",
    message: "T'a envoyé un message privé",
    when: "4h",
    avatar: "/avatars/avatar-blond.png",
    bg: "var(--color-mint-400)",
  },
  {
    name: "Luis Callegari",
    message: "A publié un nouveau projet",
    when: "2j",
    avatar: "/avatars/avatar-pink.png",
    bg: "var(--color-error-200)",
  },
];

const HERO_SLIDES = [
  "/communaute/hero/slide-1.png",
  "/communaute/hero/slide-2.png",
  "/communaute/hero/slide-3.png",
];
const HERO_INTERVAL = 3500; // ms entre 2 slides

const SIMILAR_PROFILES = [
  { name: "Baptiste", src: "/communaute/profiles/baptiste.png" },
  { name: "Lucie",    src: "/communaute/profiles/lucie.png" },
  { name: "Houssam",  src: "/communaute/profiles/houssam.png" },
  { name: "Pablo",    src: "/communaute/profiles/pablo.png" },
];

const VENUES = [
  {
    name: "Incubateur - Biarritz",
    src: "/communaute/locaux/incubateur.png",
    distance: "7.2 km",
    rating: "4.8 avis",
  },
  {
    name: "Le connecteur - Biarritz",
    src: "/communaute/locaux/connecteur.png",
    distance: "900 m",
    rating: "4.3 avis",
  },
];

const PROJECTS = [
  { title: "Nike Phantom concept",          author: "Luis Callegari",     likes: "552",  views: "1,2k", src: "/communaute/projects/nike.png" },
  { title: "NBK APP",                       author: "Vlad Forget",        likes: "201",  views: "450",  src: "/communaute/projects/nbk.png" },
  { title: "Teddy Bag - Sac randonnée",     author: "Marie Turin",        likes: "82",   views: "629",  src: "/communaute/projects/teddy.png" },
  { title: "Nobjects",                      author: "Clim Studio",        likes: "1,4k", views: "6,7k", src: "/communaute/projects/nobjects.png" },
  { title: "Kombucha packaging",            author: "Valientyna Guerner", likes: "203",  views: "678",  src: "/communaute/projects/kombucha.png" },
  { title: "Jérôme photographie / ROMISU",  author: "Jérôme Bannette",    likes: "3,2k", views: "7k",   src: "/communaute/projects/jerome.png" },
  { title: "NotDoneYet Clothes",            author: "Léonid Aguirias",    likes: "901",  views: "2,6k", src: "/communaute/projects/notdoneyet.png" },
];

const SEEN_KEY = "juno.communaute.seenOnboarding";

// Comptes dev : l'onboarding se rejoue à chaque visite, peu importe
// la valeur de localStorage.
const ALWAYS_ONBOARD_EMAILS = new Set(["alex.moreno32390@gmail.co"]);

const TAB_ROUTE: Record<NavTab, string> = {
  formation: "/formation",
  communaute: "/communaute",
  boutique: "/boutique",
  profil: "/profil",
};

export function CommunauteClient({ userEmail }: { userEmail: string | null }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tab, setTab] = useState<NavTab>("communaute");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifWrapperRef = useRef<HTMLDivElement>(null);

  // Fermer le popover sur clic en dehors
  useEffect(() => {
    if (!notifOpen) return;
    const handle = (e: MouseEvent) => {
      if (notifWrapperRef.current && !notifWrapperRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [notifOpen]);

  const forceOnboard =
    process.env.NODE_ENV !== "production" ||
    (userEmail !== null && ALWAYS_ONBOARD_EMAILS.has(userEmail));

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (forceOnboard) {
      setSeen(false);
    } else {
      const stored =
        typeof window !== "undefined" &&
        window.localStorage.getItem(SEEN_KEY) === "1";
      setSeen(stored);
    }
    setReady(true);
  }, [forceOnboard]);

  const handleOnboardingDone = () => {
    try {
      if (!forceOnboard) window.localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setSeen(true);
  };

  if (!ready) return null;
  if (!seen) return <CommunauteOnboarding onDone={handleOnboardingDone} />;

  return (
    <div
      className="bg-white overflow-y-auto overflow-x-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: -60,
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 200px)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* ── Header : localisation + cloche ─────────────────────── */}
      <header className="px-5 pt-5 flex items-center gap-3">
        {/* Tile localisation */}
        <button
          type="button"
          aria-label="Choisir la localisation"
          className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          style={{ backgroundColor: "var(--color-mint-50)" }}
        >
          <LocationGlyph />
        </button>

        {/* Texte localisation */}
        <button
          type="button"
          className="flex-1 flex flex-col items-start text-left active:opacity-80 transition-opacity"
        >
          <span className="flex items-center gap-1 font-poppins text-[13px] text-slate-500">
            Votre localisation
            <Icon name="chevron-down" size={14} className="text-slate-500" />
          </span>
          <span className="font-poppins font-bold text-[20px] text-slate-900 leading-tight">
            Bayonne
          </span>
        </button>

        {/* Cloche notifications + popover */}
        <div ref={notifWrapperRef} className="relative shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notifOpen}
            onClick={() => setNotifOpen((v) => !v)}
            className="relative h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <BellGlyph />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-0 top-full mt-3 z-50 w-[300px]"
                style={{
                  filter: "drop-shadow(0 14px 28px rgba(20,10,40,0.18))",
                }}
              >
                <NotifPopover />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Barre de recherche ─────────────────────────────────── */}
      <div className="px-5 mt-4">
        <div
          className="flex items-center gap-3 h-14 rounded-full px-5 bg-white"
          style={{ border: "1px solid var(--color-slate-200)" }}
        >
          <Icon name="search-1" size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher"
            className="flex-1 bg-transparent border-0 outline-none font-poppins text-[15px] text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="button"
            aria-label="Filtres"
            className="text-slate-700 active:scale-95 transition-transform"
          >
            <FilterGlyph />
          </button>
        </div>
      </div>

      {/* ── Carousel hero (3 slides qui changent automatiquement) ─ */}
      <div className="px-5 mt-5">
        <HeroCarousel />
      </div>

      {/* ── Profils similaires ─────────────────────────────────── */}
      <section className="mt-7 px-5">
        <header className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-[20px] text-slate-900">
            Profils similaires
          </h2>
          <button
            type="button"
            className="font-poppins text-[14px] text-slate-400 active:text-slate-600 transition-colors"
          >
            Tout voir
          </button>
        </header>

        <ul className="mt-4 flex justify-between gap-2">
          {SIMILAR_PROFILES.map((p) => (
            <li key={p.name} className="flex flex-col items-center gap-2">
              <div
                className="relative h-[72px] w-[72px] rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--color-slate-100)" }}
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="font-poppins font-semibold text-[15px] text-slate-900">
                {p.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Des locaux pour vous ───────────────────────────────── */}
      <section className="mt-7 px-5">
        <header className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-[20px] text-slate-900">
            Des locaux pour vous
          </h2>
          <button
            type="button"
            className="font-poppins text-[14px] text-slate-400 active:text-slate-600 transition-colors"
          >
            Tout voir
          </button>
        </header>

        <ul className="mt-4 grid grid-cols-2 gap-4">
          {VENUES.map((v) => (
            <li key={v.name} className="flex flex-col">
              <div
                className="relative w-full overflow-hidden rounded-[20px]"
                style={{
                  aspectRatio: "1 / 1",
                  backgroundColor: "var(--color-slate-100)",
                }}
              >
                <Image
                  src={v.src}
                  alt={v.name}
                  fill
                  sizes="(max-width: 460px) 50vw, 200px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="mt-3 font-poppins font-bold text-[16px] text-slate-900 truncate">
                {v.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 font-poppins text-[13px] text-slate-400">
                <span>{v.distance}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-slate-300" />
                <StarGlyph />
                <span>{v.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Projets ────────────────────────────────────────────── */}
      <section className="mt-7 px-5">
        <header className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-[20px] text-slate-900">
            Projets
          </h2>
          <button
            type="button"
            className="font-poppins text-[14px] text-slate-400 active:text-slate-600 transition-colors"
          >
            Tout voir
          </button>
        </header>

        <ul className="mt-4 flex flex-col gap-6">
          {PROJECTS.map((p) => (
            <li key={p.title} className="flex flex-col">
              <div
                className="relative w-full overflow-hidden rounded-[20px]"
                style={{
                  aspectRatio: "1 / 1",
                  backgroundColor: "var(--color-slate-100)",
                }}
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(max-width: 460px) 100vw, 460px"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-poppins font-bold text-[16px] text-slate-900 truncate">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 font-poppins text-[13px] text-slate-500 truncate">
                    {p.author}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 font-poppins text-[13px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FlameGlyph />
                    {p.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <EyeGlyph />
                    {p.views}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div
        className="fixed inset-x-4 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <BottomNav
          activeTab={tab}
          onTabChange={(t) => {
            setTab(t);
            if (t !== "communaute") router.push(TAB_ROUTE[t]);
          }}
          variant="dark"
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   NotifPopover — liste de notifications déroulée depuis la cloche
   ────────────────────────────────────────────────────────────── */

function NotifPopover() {
  return (
    <ul className="flex flex-col gap-2">
      {NOTIFICATIONS.map((n) => (
        <li
          key={n.name}
          className="flex items-center gap-3 bg-white rounded-2xl px-3 py-3"
          style={{ border: "1px solid var(--color-slate-200)" }}
        >
          <div
            className="relative h-11 w-11 rounded-full overflow-hidden shrink-0"
            style={{ backgroundColor: n.bg }}
          >
            <Image
              src={n.avatar}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-poppins font-bold text-[14px] text-slate-900 truncate">
              {n.name}
            </div>
            <div className="font-poppins text-[12px] text-slate-400 truncate">
              {n.message}
            </div>
          </div>
          <span className="font-poppins text-[12px] text-slate-400 shrink-0">
            {n.when}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ──────────────────────────────────────────────────────────────
   HeroCarousel — 3 images qui s'enchaînent en fondu
   ────────────────────────────────────────────────────────────── */

function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, HERO_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[24px]" style={{ aspectRatio: "704 / 306" }}>
      <motion.div
        className="flex h-full"
        style={{ width: `${HERO_SLIDES.length * 100}%` }}
        animate={{ x: `-${index * (100 / HERO_SLIDES.length)}%` }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {HERO_SLIDES.map((src, i) => (
          <div key={src} className="relative h-full" style={{ width: `${100 / HERO_SLIDES.length}%` }}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 460px) 100vw, 460px"
              className="object-cover"
              priority={i === 0}
              unoptimized
            />
          </div>
        ))}
      </motion.div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Glyphes — logo localisation + bouton filtres
   ────────────────────────────────────────────────────────────── */

function LocationGlyph() {
  // Vuesax — outline/airdrop (mint-700 #00A47C)
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" aria-hidden>
      <path d="M11.2118 12.8378C10.483 12.8378 9.79164 12.5575 9.25907 12.0343C8.577 11.3522 8.30605 10.3712 8.53029 9.40882C8.76387 8.42776 9.54871 7.64291 10.5298 7.40932C11.4828 7.17574 12.4638 7.44673 13.1552 8.13813C13.8467 8.82954 14.1083 9.80125 13.884 10.7636C13.6504 11.7447 12.8656 12.5295 11.8845 12.763C11.6603 12.8098 11.4361 12.8378 11.2118 12.8378ZM11.2118 8.72677C11.0997 8.72677 10.9782 8.74544 10.8661 8.77347C10.399 8.8856 10.0159 9.26864 9.90376 9.73581C9.7823 10.2217 9.9131 10.6982 10.2588 11.0346C10.6045 11.3803 11.0717 11.5017 11.5669 11.3896C12.034 11.2775 12.4171 10.8944 12.5292 10.4272C12.6507 9.94136 12.5199 9.46489 12.1742 9.12853C11.9126 8.86691 11.5762 8.72677 11.2118 8.72677Z" fill="#00A47C"/>
      <path d="M5.62506 16.79C5.45688 16.79 5.27935 16.7247 5.14854 16.6032C3.33593 14.9214 2.29883 12.5482 2.29883 10.0815C2.29883 5.1669 6.29778 1.16797 11.2124 1.16797C16.127 1.16797 20.1259 5.1669 20.1259 10.0815C20.1259 12.5668 19.1262 14.8653 17.3136 16.5752C17.0333 16.8368 16.5848 16.8275 16.3232 16.5472C16.0616 16.2669 16.0709 15.8184 16.3512 15.5568C17.8835 14.1179 18.7244 12.1838 18.7244 10.0909C18.7244 5.95176 15.3515 2.57882 11.2124 2.57882C7.07328 2.57882 3.70033 5.95176 3.70033 10.0909C3.70033 12.2025 4.55057 14.1459 6.10157 15.5848C6.38187 15.8464 6.40056 16.2949 6.13895 16.5752C5.9988 16.7153 5.81193 16.79 5.62506 16.79Z" fill="#00A47C"/>
      <path d="M14.9499 14.2955C14.7817 14.2955 14.6042 14.2301 14.4733 14.1086C14.193 13.847 14.1744 13.3985 14.4453 13.1182C15.2208 12.296 15.6506 11.2122 15.6506 10.091C15.6506 7.64303 13.6605 5.66225 11.2218 5.66225C8.78323 5.66225 6.7931 7.65237 6.7931 10.091C6.7931 11.2215 7.22289 12.296 7.99839 13.1182C8.26001 13.3985 8.25066 13.847 7.97036 14.1086C7.69006 14.3702 7.24158 14.3609 6.97997 14.0806C5.96154 12.9968 5.3916 11.5766 5.3916 10.091C5.3916 6.87687 8.00773 4.26074 11.2218 4.26074C14.436 4.26074 17.0521 6.87687 17.0521 10.091C17.0521 11.5766 16.4915 12.9968 15.4637 14.0806C15.3236 14.2208 15.1367 14.2955 14.9499 14.2955Z" fill="#00A47C"/>
      <path d="M12.5577 21.2563H9.87612C8.81098 21.2563 7.86729 20.6584 7.40946 19.7054C6.95164 18.7523 7.07311 17.6404 7.73649 16.8089L9.08193 15.1364C9.60516 14.4824 10.3807 14.1086 11.2216 14.1086C12.0625 14.1086 12.838 14.4824 13.3612 15.1364L14.7066 16.8089C15.37 17.6404 15.5008 18.7523 15.0336 19.7054C14.5571 20.6584 13.6135 21.2563 12.5577 21.2563ZM10.1658 16.0054L8.82032 17.6778C8.4933 18.0889 8.4279 18.6215 8.66148 19.0887C8.88572 19.5652 9.34354 19.8455 9.86677 19.8455H12.5483C13.0715 19.8455 13.5294 19.5652 13.7536 19.0887C13.9779 18.6122 13.9218 18.0889 13.5948 17.6778L12.2493 16.0054C11.7448 15.37 10.6796 15.37 10.1658 16.0054Z" fill="#00A47C"/>
    </svg>
  );
}

function BellGlyph() {
  // MDI bell-notification-outline (slate-950 + dot june-600)
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M15.3381 13.7235L15.3381 9.52571C14.9345 9.60644 14.5309 9.68716 14.1272 9.68716H13.7236L13.7236 14.5308L5.65094 14.5308L5.65094 8.8799C5.65094 6.61955 7.42692 4.84357 9.68727 4.84357C9.768 3.79412 10.2524 2.90613 10.8982 2.17959C10.656 1.85668 10.1716 1.6145 9.68727 1.6145C8.79928 1.6145 8.07274 2.34104 8.07274 3.22903V3.47121C5.65094 4.19775 4.03641 6.37737 4.03641 8.8799L4.03641 13.7235L2.42187 15.338L2.42187 16.1453L16.9527 16.1453L16.9527 15.338L15.3381 13.7235ZM8.07274 16.9526C8.07274 17.8405 8.79928 18.5671 9.68727 18.5671C10.5753 18.5671 11.3018 17.8405 11.3018 16.9526L8.07274 16.9526Z" fill="#0B0B0B"/>
      <circle cx="14.5298" cy="3.7673" r="2.69089" fill="#FF8C00"/>
    </svg>
  );
}

function FlameGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path d="M3.47161 4.58461L3.47018 4.58575L3.46882 4.58704L3.47161 4.58461ZM9.79167 4.46897C9.74749 4.4274 9.69848 4.39102 9.64563 4.36059C9.57083 4.3176 9.48779 4.29005 9.40165 4.27964C9.31551 4.26924 9.2281 4.27619 9.14483 4.30008C9.06155 4.32398 8.98418 4.36429 8.91749 4.41854C8.85081 4.47279 8.79622 4.53982 8.75712 4.61549C8.53841 5.03627 8.23677 5.41074 7.8695 5.71742C7.92567 5.40842 7.95399 5.09521 7.95414 4.78138C7.95532 3.82666 7.69739 2.88869 7.20662 2.06296C6.71585 1.23724 6.00976 0.553248 5.16025 0.0806395C5.06667 0.0288378 4.96114 0.0011012 4.85357 3.21208e-05C4.74601 -0.00103696 4.63992 0.0245966 4.54528 0.0745275C4.45064 0.124458 4.37054 0.19705 4.3125 0.28549C4.25445 0.37393 4.22037 0.475319 4.21345 0.580144C4.17792 1.168 4.02054 1.74269 3.75084 2.2694C3.48115 2.79611 3.10475 3.26387 2.64446 3.64434L2.49813 3.76059C2.0168 4.07684 1.59076 4.46669 1.23635 4.91519C0.685443 5.5929 0.303813 6.38663 0.121725 7.23343C-0.0603623 8.08023 -0.0378979 8.95682 0.187337 9.79366C0.412572 10.6305 0.834381 11.4046 1.41932 12.0546C2.00425 12.7045 2.73622 13.2125 3.55718 13.5381C3.65357 13.5766 3.75818 13.5913 3.86176 13.5809C3.96535 13.5706 4.06474 13.5355 4.15117 13.4788C4.23759 13.4221 4.30839 13.3454 4.35732 13.2557C4.40626 13.1659 4.43182 13.0658 4.43175 12.9641C4.4313 12.8984 4.42064 12.833 4.40014 12.7704C4.25809 12.249 4.21718 11.7062 4.27953 11.1702C4.88032 12.2767 5.8447 13.1537 7.01762 13.6604C7.16079 13.7229 7.32264 13.7314 7.4718 13.684C8.39851 13.3919 9.23334 12.8733 9.89697 12.1775C10.5606 11.4816 11.031 10.6316 11.2635 9.70822C11.4959 8.78484 11.4827 7.81875 11.2251 6.90175C10.9675 5.98475 10.4741 5.1473 9.79167 4.46897ZM7.31244 12.4241C6.75899 12.1502 6.27077 11.7656 5.87953 11.2954C5.48828 10.8251 5.20277 10.2797 5.04155 9.69466C4.99231 9.49767 4.95423 9.29817 4.92746 9.09708C4.90933 8.96902 4.85066 8.8497 4.75967 8.7558C4.66867 8.66189 4.5499 8.59811 4.41996 8.57336C4.37993 8.56565 4.33922 8.5618 4.29842 8.56186C4.18683 8.56182 4.0772 8.59051 3.98059 8.64504C3.88398 8.69958 3.8038 8.77802 3.74814 8.87247C3.22133 9.75974 2.95639 10.7721 2.9827 11.7974C2.51936 11.4456 2.13213 11.0076 1.84345 10.5086C1.55477 10.0096 1.37038 9.45963 1.30097 8.89055C1.23156 8.32147 1.27851 7.74459 1.4391 7.19336C1.59968 6.64212 1.87072 6.12749 2.23648 5.67929C2.51421 5.32704 2.84924 5.02167 3.22823 4.77535C3.24464 4.76501 3.26038 4.75369 3.27535 4.74145C3.27535 4.74145 3.46374 4.58923 3.47018 4.58575C4.37475 3.83864 5.0181 2.83462 5.31063 1.71356C6.00242 2.33803 6.4637 3.16807 6.62285 4.07479C6.782 4.9815 6.63011 5.91417 6.19077 6.72795C6.13273 6.83654 6.10892 6.95948 6.12234 7.08127C6.13577 7.20306 6.18583 7.31824 6.26622 7.41228C6.3466 7.50632 6.4537 7.575 6.57402 7.60967C6.69433 7.64434 6.82247 7.64344 6.94226 7.60709C7.91482 7.30939 8.77063 6.7279 9.39451 5.94087C9.76946 6.48168 10.0146 7.09815 10.1117 7.74433C10.2087 8.39051 10.1552 9.04974 9.95504 9.67291C9.7549 10.2961 9.41334 10.8671 8.95578 11.3435C8.49823 11.8198 7.93651 12.1892 7.31244 12.4241Z" fill="currentColor"/>
    </svg>
  );
}

function EyeGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.37468 8.23224C1.31912 8.08256 1.31912 7.91792 1.37468 7.76824C1.91581 6.45614 2.83435 5.33427 4.01386 4.54484C5.19336 3.75541 6.58071 3.33398 8.00001 3.33398C9.41932 3.33398 10.8067 3.75541 11.9862 4.54484C13.1657 5.33427 14.0842 6.45614 14.6253 7.76824C14.6809 7.91792 14.6809 8.08256 14.6253 8.23224C14.0842 9.54434 13.1657 10.6662 11.9862 11.4556C10.8067 12.2451 9.41932 12.6665 8.00001 12.6665C6.58071 12.6665 5.19336 12.2451 4.01386 11.4556C2.83435 10.6662 1.91581 9.54434 1.37468 8.23224Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StarGlyph() {
  // Iconly fill star (#F2B90D)
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M12.8585 10.2756C12.6726 10.4557 12.5872 10.7162 12.6295 10.9717L13.2675 14.5021C13.3213 14.8013 13.195 15.1041 12.9446 15.2771C12.6992 15.4565 12.3727 15.478 12.105 15.3345L8.92689 13.6769C8.81638 13.6181 8.69368 13.5865 8.5681 13.5829H8.37364C8.30619 13.5929 8.24017 13.6145 8.1799 13.6475L5.00106 15.313C4.84391 15.3919 4.66596 15.4199 4.49159 15.3919C4.06679 15.3115 3.78335 14.9068 3.85295 14.4799L4.49159 10.9494C4.53392 10.6918 4.44853 10.4299 4.26268 10.2469L1.67154 7.73542C1.45483 7.52517 1.37949 7.20944 1.47851 6.92457C1.57467 6.64041 1.82008 6.43303 2.11643 6.38639L5.68275 5.86902C5.95399 5.84104 6.19223 5.676 6.31421 5.43202L7.88569 2.21014C7.92301 2.13838 7.97108 2.07236 8.02921 2.01639L8.09379 1.96616C8.12751 1.92885 8.16626 1.89799 8.20932 1.87288L8.28753 1.84418L8.40952 1.79395H8.71162C8.98142 1.82193 9.21894 1.98338 9.34308 2.22449L10.9354 5.43202C11.0502 5.66667 11.2733 5.82956 11.5309 5.86902L15.0973 6.38639C15.3986 6.42945 15.6505 6.63754 15.7503 6.92457C15.8443 7.21231 15.7632 7.52804 15.5422 7.73542L12.8585 10.2756Z" fill="#F2B90D"/>
    </svg>
  );
}

function FilterGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <line x1="3" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="3" y1="17" x2="6" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

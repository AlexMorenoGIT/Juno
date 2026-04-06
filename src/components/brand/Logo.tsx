import { useId } from "react";

type LogoVariant = "monogramme" | "paysage";
type LogoColor = "blanc" | "noir" | "couleur";

interface LogoProps {
  variant?: LogoVariant;
  color?: LogoColor;
  className?: string;
  /** Remplace la taille par défaut (height en px). Conserve le ratio. */
  height?: number;
}

/**
 * Logo JUNO — 6 variantes
 *
 * variant  : "monogramme" (icône seule) | "paysage" (logo complet, défaut)
 * color    : "blanc"   → fond orange, formes blanches
 *            "noir"    → formes noires, fond transparent
 *            "couleur" → formes june-600 + deep-900, fond transparent (défaut)
 *
 * Usage :
 *   <Logo />                                      // paysage couleur
 *   <Logo variant="monogramme" color="blanc" />   // badge orange
 *   <Logo variant="paysage" color="noir" height={32} />
 */
export function Logo({
  variant = "paysage",
  color = "couleur",
  className = "",
  height,
}: LogoProps) {
  const uid = useId().replace(/:/g, "");

  if (variant === "monogramme") {
    return <Monogramme color={color} className={className} height={height} />;
  }

  return (
    <LogoPaysage color={color} className={className} height={height} uid={uid} />
  );
}

/* ------------------------------------------------------------------ */
/* Monogramme                                                           */
/* ------------------------------------------------------------------ */

function Monogramme({
  color,
  className,
  height,
}: {
  color: LogoColor;
  className: string;
  height?: number;
}) {
  // "blanc" a un fond et un viewBox carré (84×84)
  if (color === "blanc") {
    const h = height ?? 84;
    const w = h;
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 84 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="JUNO"
        role="img"
      >
        <rect width="84" height="84" fill="#FF8C00" />
        <path
          d="M42.2609 51.7602C32.4501 51.7056 24.8389 43.6097 25.0025 34.0776C25.1722 24.4849 33.1227 16.7343 42.8548 17.007C52.5869 17.2797 59.8345 25.1878 59.7193 34.5866C59.6042 44.0096 51.9506 51.8208 42.2609 51.7602ZM41.6731 27.739C37.8494 28.145 35.2921 31.5809 35.7406 35.1926C36.189 38.8042 39.4492 41.4282 43.1033 41.0343C46.7573 40.6404 49.4418 37.3256 48.9995 33.6049C48.5814 30.1023 45.4605 27.339 41.6731 27.739Z"
          fill="white"
        />
        <path
          d="M54.4109 67.5157L30.317 67.5218L30.3351 57.7594L54.4048 57.7655L54.4109 67.5157Z"
          fill="white"
        />
      </svg>
    );
  }

  // "noir" et "couleur" : viewBox 35×51, fond transparent
  const h = height ?? 51;
  const w = Math.round((35 / 51) * h);

  const topColor = color === "noir" ? "#0B0B0B" : "#FF8C00";
  const bottomColor = color === "noir" ? "#0B0B0B" : "#661C8C";

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 35 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JUNO"
      role="img"
    >
      <path
        d="M17.261 34.7601C7.45013 34.7056 -0.161027 26.6097 0.00258893 17.0775C0.172264 7.48482 8.12277 -0.265711 17.8549 0.00698183C27.587 0.279674 34.8345 8.18776 34.7194 17.5866C34.6043 27.0096 26.9507 34.8207 17.261 34.7601ZM16.6732 10.739C12.8494 11.145 10.2922 14.5809 10.7406 18.1926C11.189 21.8042 14.4492 24.4281 18.1033 24.0342C21.7574 23.6403 24.4419 20.3256 23.9995 16.6049C23.5814 13.1023 20.4606 10.339 16.6732 10.739Z"
        fill={topColor}
      />
      <path
        d="M29.4108 50.5157L5.31689 50.5218L5.33507 40.7594L29.4047 40.7655L29.4108 50.5157Z"
        fill={bottomColor}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Logo paysage                                                         */
/* ------------------------------------------------------------------ */

function LogoPaysage({
  color,
  className,
  height,
  uid,
}: {
  color: LogoColor;
  className: string;
  height?: number;
  uid: string;
}) {
  // "blanc" a un fond et un viewBox 202×84
  if (color === "blanc") {
    const h = height ?? 84;
    const w = Math.round((202 / 84) * h);
    const clipId = `clip-paysage-blanc-${uid}`;
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 202 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="JUNO"
        role="img"
      >
        <rect width="202" height="84" fill="#FF8C00" />
        <g clipPath={`url(#${clipId})`}>
          <path d="M107.299 50.4987C107.281 60.352 99.676 68.1995 90.0409 68.3025C80.4057 68.4055 72.4552 60.6913 72.4492 50.8865V33.416L83.0781 33.4099L83.0902 51.0804C83.2296 54.9163 86.3686 57.7099 90.0409 57.6129C93.7131 57.516 96.6461 54.4679 96.6461 50.5774L96.6582 33.0827C96.6643 23.4112 104.845 15.9212 114.274 16.0546C123.703 16.1879 131.575 24.0111 131.442 33.7493V50.941H120.813V33.7311C120.879 29.9376 118.068 26.9562 114.395 26.7562C110.723 26.5563 107.336 29.2468 107.33 33.0524L107.293 50.5047L107.299 50.4987Z" fill="white" />
          <path d="M40.6411 33.3857V51.244C40.9077 55.0496 44.1073 57.7583 47.7735 57.5644C51.4397 57.3705 54.1969 54.3769 54.1969 50.5653L54.1848 25.7685H40.629L40.635 16H64.8259L64.8198 50.8744C64.8198 60.4307 57.1662 68.0479 47.8159 68.26C38.4474 68.4721 30.5333 61.267 30.0121 51.7167L30 33.3857H40.6411Z" fill="white" />
          <path d="M155.536 50.8138C145.725 50.7592 138.114 42.6633 138.277 33.1312C138.447 23.5385 146.397 15.7879 156.129 16.0606C165.862 16.3333 173.109 24.2414 172.994 33.6402C172.879 43.0632 165.225 50.8744 155.536 50.8138ZM154.948 26.7926C151.124 27.1986 148.567 30.6345 149.015 34.2462C149.464 37.8578 152.724 40.4818 156.378 40.0879C160.032 39.694 162.717 36.3792 162.274 32.6585C161.856 29.1559 158.735 26.3926 154.948 26.7926Z" fill="white" />
          <path d="M167.685 66.5693L143.592 66.5754L143.61 56.813L167.679 56.819L167.685 66.5693Z" fill="white" />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="143" height="52.2964" fill="white" transform="translate(30 16)" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  // "noir" et "couleur" : viewBox 143×53, fond transparent
  const h = height ?? 53;
  const w = Math.round((143 / 53) * h);
  const clipId = `clip-paysage-${color}-${uid}`;

  const mainColor = color === "noir" ? "#0B0B0B" : "#FF8C00";
  const accentColor = color === "noir" ? "#0B0B0B" : "#661C8C";

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 143 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JUNO"
      role="img"
    >
      <g clipPath={`url(#${clipId})`}>
        <path d="M77.2993 34.4987C77.2811 44.352 69.676 52.1995 60.0409 52.3025C50.4057 52.4055 42.4552 44.6913 42.4492 34.8865V17.416L53.0781 17.4099L53.0902 35.0804C53.2296 38.9163 56.3686 41.7099 60.0409 41.6129C63.7131 41.516 66.6461 38.4679 66.6461 34.5774L66.6582 17.0827C66.6643 7.4112 74.845 -0.0787535 84.2741 0.0545629C93.7033 0.187879 101.575 8.01113 101.442 17.7493V34.941H90.8127V17.7311C90.8794 13.9376 88.0676 10.9562 84.3953 10.7562C80.7231 10.5563 77.3356 13.2468 77.3296 17.0524L77.2932 34.5047L77.2993 34.4987Z" fill={mainColor} />
        <path d="M10.6411 17.3857V35.244C10.9077 39.0496 14.1073 41.7583 17.7735 41.5644C21.4397 41.3705 24.1969 38.3769 24.1969 34.5653L24.1848 9.76846H10.629L10.635 0H34.8259L34.8198 34.8744C34.8198 44.4307 27.1662 52.0479 17.8159 52.26C8.44741 52.4721 0.533266 45.267 0.0121197 35.7167L0 17.3857H10.6411Z" fill={mainColor} />
        <path d="M125.536 34.8138C115.725 34.7592 108.114 26.6633 108.277 17.1312C108.447 7.53846 116.397 -0.212076 126.129 0.0606165C135.862 0.333309 143.109 8.2414 142.994 17.6402C142.879 27.0632 135.225 34.8744 125.536 34.8138ZM124.948 10.7926C121.124 11.1986 118.567 14.6345 119.015 18.2462C119.464 21.8578 122.724 24.4818 126.378 24.0879C130.032 23.694 132.717 20.3792 132.274 16.6585C131.856 13.1559 128.735 10.3926 124.948 10.7926Z" fill={mainColor} />
        <path d="M137.686 50.5693L113.592 50.5754L113.61 40.813L137.679 40.819L137.686 50.5693Z" fill={accentColor} />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="143" height="52.2964" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

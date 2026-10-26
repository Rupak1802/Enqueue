"use client";
import { useId } from "react";

interface LogoProps {
  variant?: "full" | "mark" | "icon";
  height?: number;
}

export default function EnqueueLogo({ variant = "mark", height = 40 }: LogoProps) {
  const uid = useId().replace(/:/g, "");

  const dims = {
    full: { w: 260, h: 130 },
    mark: { w: 252, h: 52 },
    icon: { w: 52,  h: 52 },
  };

  const { w, h } = dims[variant];
  const W = (w / h) * height;
  const H = height;

  const mg = `mg_${uid}`;
  const mi = `mi_${uid}`;
  const tg = `tg_${uid}`;
  const sh = `sh_${uid}`;
  const gl = `gl_${uid}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={W} height={H} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Enqueue">
      <defs>
        <linearGradient id={mg} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="30%"  stopColor="#d0d0d0" />
          <stop offset="60%"  stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#c8c8c8" />
        </linearGradient>
        <linearGradient id={mi} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#888888" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#555555" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={tg} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#42C8D6" />
          <stop offset="100%" stopColor="#257a84" />
        </linearGradient>
        <filter id={sh} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
        </filter>
        <filter id={gl} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Bird Logo Image (Monogram Replacement) */}
      <g filter={`url(#${sh})`}>
        {/* We use an SVG image tag to embed the PNG. 
            mixBlendMode is set to 'screen' assuming a dark background, 
            or 'multiply' if it's a white background that needs to be removed.
            Feel free to adjust the mixBlendMode or filter if the background color differs. */}
        <image 
          href="/fonts/logo.png" 
          x="-5" 
          y="0" 
          width="54" 
          height="54" 
          preserveAspectRatio="xMidYMid meet"
          style={{ mixBlendMode: 'screen' }} 
        />
      </g>

      {/* Triangle accent */}
      <g filter={`url(#${gl})`}>
        <polygon points="26,38 34,38 30,31" fill={`url(#${tg})`} />
        <polygon points="28,37 32,37 30,33" fill="#ffffff" fillOpacity="0.25" />
      </g>

      {/* ENQUEUE wordmark */}
      {(variant === "mark" || variant === "full") && (
        <g transform="translate(58, 38)">
          <text
            fontFamily="'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="32"
            fontWeight="800"
            letterSpacing="0.1em"
            fill="#ffffff"
          >
            ENQUEUE
          </text>
        </g>
      )}

      {/* Tagline */}
      {variant === "full" && (
        <g transform="translate(0, 60)">
          <line x1="0" y1="10" x2="40" y2="10" stroke="#42C8D6" strokeWidth="0.8" strokeOpacity="0.6" />
          <text x="130" y="14" textAnchor="middle" fontFamily="'CommitMono', monospace"
            fontSize="9" fontWeight="400" letterSpacing="4" fill="#42C8D6" fillOpacity="0.75">
            BUILD BEYOND LIMITS
          </text>
          <line x1="220" y1="10" x2="260" y2="10" stroke="#42C8D6" strokeWidth="0.8" strokeOpacity="0.6" />
        </g>
      )}
    </svg>
  );
}

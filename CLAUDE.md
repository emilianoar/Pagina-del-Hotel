# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Hotel Avenida La Plata, a 1-star hotel in La Plata, Argentina. Redesigned in Feb 2026 with navy/gold brand identity based on the official logo.

## Technology Stack

- **Languages**: HTML5, CSS3, Vanilla JavaScript
- **No frameworks or build tools** - Pure static site
- **Image formats**: JPG (room photos), WebP (optimized carousel), PNG (logo)
- **Font**: Inter (self-hosted via @font-face)
- **CSS**: Custom properties, clamp(), CSS Grid, 3 breakpoints

## Design System (Feb 2026 Redesign)

### Color Palette (from logo)
| Token | Hex | Usage |
|---|---|---|
| `--navy-dark` | `#0f1d35` | Footer, overlays |
| `--navy` | `#1a2a4a` | Nav, headings |
| `--gold` | `#c9a84c` | Accents, CTA, star |
| `--gold-light` | `#e8d5a0` | Subtle highlights |
| `--cream` | `#faf8f3` | Alternating section bg |
| `--white` | `#ffffff` | Main background |

### Responsive Breakpoints (simplified)
| Breakpoint | Changes |
|---|---|
| **>1024px** | Full layout, gallery 3 col, nav with links |
| **<=1024px** | Hamburger menu, gallery 2 col, stacked sections |
| **<=768px** | Adjusted grids, full-width carousel |
| **<=500px** | Gallery 1 col, full-width buttons |

## Page Sections (top to bottom)

1. **Nav** - Fixed navy bar: logo (`logo hotel 2026.png`) + gold title + links + language flags + hamburger (mobile)
2. **Hero** - Full-viewport `20251216_125319.jpg` with navy gradient overlay, centered logo + star + title + CTA
3. **Sobre Nosotros** - 2-col grid: text | `sobre-nosotros-optimized.webp`
4. **Galería de Habitaciones** - CSS grid 3-col with 7 room photos, gradient labels, lightbox on click
5. **Desayuno** - 2-col grid: text | 2 breakfast photos (`20251018_083531.jpg`, `20251018_083646.jpg`)
6. **Comodidades** - 6 SVG amenity icon cards + 4 text paragraphs + image carousel with arrows
7. **Horarios/Contacto** - Info cards (gold left border) + 4 contact cards + full-width Google Maps
8. **Footer** - Navy dark, 3 columns: logo+name | address/contact | nav links

## Key Features

1. **Image Carousel**: 16 images (10 optimized WebP + 6 JPG room photos), prev/next arrows, dots, swipe, autoplay
2. **Multi-language**: ES (default), EN, POR - translation via class matching in `translate()` function
3. **Lightbox**: Gallery images open in full-screen overlay with prev/next + keyboard navigation
4. **Hamburger Menu**: Mobile nav overlay, animated icon, closes on link click
5. **WhatsApp Float**: Always visible on mobile, scroll-triggered on desktop
6. **SEO**: Schema.org Hotel, Open Graph, Twitter Cards, sitemap, robots.txt

## Translation System

- All translatable elements have unique CSS classes (e.g., `titulo-sobre-nosotros`, `texto1-comodidades`)
- `translate(idioma)` iterates all DOM elements, matches class to `traduccion` object keys
- Translation classes must be on **leaf text elements only** (no children with their own text)
- Language selectors exist in both desktop nav and mobile nav overlay

## Project Structure

```
/
├── index.html              # Main page (all sections)
├── styles.css              # Complete stylesheet (custom properties, all sections, responsive)
├── main.js                 # Carousel, WhatsApp, hamburger, lightbox, translations
├── CLAUDE.md               # This file
├── robots.txt              # SEO crawling rules
├── sitemap.xml             # Site structure
├── Imagenes/
│   ├── logo hotel 2026.png          # Official hotel logo with star
│   ├── sobre-nosotros-optimized.webp # About section image
│   ├── WhatsApp_Logo_2-1.webp       # WhatsApp float icon
│   ├── 20251216_125319.jpg          # Hero bg + gallery (room with AC/TV)
│   ├── 20251216_125312.jpg          # Gallery (marble bathroom)
│   ├── 20251218_173138.jpg          # Gallery (classic room, wood floor)
│   ├── 20251218_173506.jpg          # Gallery (classic wide view)
│   ├── 20251226_095519.jpg          # Gallery (family room, bunk bed)
│   ├── 20251226_095840.jpg          # Gallery (double room with TV)
│   ├── 20251226_100059.jpg          # Gallery (twin room, pink)
│   ├── 20251018_083531.jpg          # Breakfast buffet main
│   ├── 20251018_083646.jpg          # Breakfast buffet wide
│   └── carousel-optimized/          # 10 optimized WebP carousel images
```

## Important Guidelines

1. **Maintain Static Nature**: No frameworks, bundlers, or npm packages
2. **DO NOT use CSS preload/onload pattern** - It breaks on Chrome Android. Use direct `<link rel="stylesheet">`
3. **Image Format**: New room photos are JPG (1.8-4.5MB each). Carousel uses optimized WebP
4. **JavaScript**: Vanilla JS only, no libraries
5. **Translations**: Keep class-based system. Add new keys to `traduccion` object in main.js
6. **SEO**: Update sitemap.xml and structured data when adding new content

## Images NOT used (>5MB, excluded from repo)

- `20180416_192958.jpg` (6.7MB)
- `20180626_115829.jpg` (5.0MB)
- `20251018_083603.jpg` (5.1MB)
- `20251021_071629.jpg` (7.1MB)

## Repository & Deployment

- **GitHub Account**: platense9@gmail.com (username: emilianoar)
- **Repository**: https://github.com/emilianoar/Pagina-del-Hotel
- **Production URL**: https://www.hotelavenida.com.ar
- **Deployment**: Push to `main` = auto-deploy to production

### Git Workflow
```bash
git add <files>
git commit -m "Description"
git push                    # Auto-deploys
```

## Analytics & Tracking

- **Google Ads**: gtag.js with ID `AW-1022889830` (in `<head>`)

## Testing Checklist

1. Desktop Chrome + Mobile Android Chrome (both must work)
2. Hard refresh after deploy (Ctrl+Shift+R) to clear cache
3. Test language switcher (ES/EN/POR) in all sections
4. Test carousel: swipe, arrows, dots, autoplay
5. Test lightbox: click gallery image, navigate, close with Esc
6. Test hamburger menu on mobile
7. Verify WhatsApp float button
8. Check all 3 breakpoints: 1024px, 768px, 500px

## Hotel Information

- **Name**: Hotel Avenida La Plata
- **Address**: Avenida 13 Nº 1443 Esquina 62, La Plata, Buenos Aires, Argentina (CP: 1900)
- **Phone**: +54 9 221 4516767
- **WhatsApp**: +54 9 221 5772759
- **Email**: info@hotelavenida.com.ar
- **Website**: https://hotelavenida.com.ar

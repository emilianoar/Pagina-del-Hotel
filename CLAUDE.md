# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Hotel Avenida La Plata, a 3-star hotel in La Plata, Argentina. The site was migrated from WordPress to a custom static implementation for improved performance and reduced maintenance costs.

## Technology Stack

- **Languages**: HTML5, CSS3, Vanilla JavaScript
- **No frameworks or build tools** - This is intentionally a pure static site
- **Image format**: WebP (optimized for web performance)
- **Font**: Google Fonts (Inter)

## Key Features

1. **Custom Image Carousel**: Touch/swipe support with lazy loading
2. **Multi-language Support**: Spanish (default), English, Portuguese via JavaScript with inline SVG flag icons
3. **WhatsApp Floating Button**: Scroll-based visibility toggle
4. **SEO Optimizations**: Schema.org structured data, meta tags, sitemap, Open Graph and Twitter Cards
5. **Performance Optimized**: Critical CSS inlined, lazy loading, WebP images
6. **Social Media Integration**: Open Graph meta tags and Twitter Cards for enhanced social sharing

## Project Structure

```
/
├── index.html              # Main website file
├── styles.css              # Main stylesheet
├── critical.css            # Critical above-the-fold CSS
├── main.js                 # JavaScript functionality
├── README.md               # Project readme
├── CLAUDE.md               # This file - AI assistant guidance
├── robots.txt              # SEO crawling rules
├── sitemap.xml             # Site structure for search engines
├── optimize-images.sh      # Image optimization script
├── Imagenes/
│   ├── carousel-optimized/ # Optimized carousel images
│   ├── imagenes originales/# Original image backups
│   ├── optimized/          # Script-generated optimized images
│   ├── hero-bg-optimized.webp         # Hero section background
│   ├── sobre-nosotros-optimized.webp  # About section image
│   └── WhatsApp_Logo_2-1.webp         # WhatsApp button icon
├── lighthouse-perf-check-desktop.json  # Desktop performance test
└── lighthouse-perf-check-mobile.json   # Mobile performance test
```

## Common Development Tasks

### Image Optimization
```bash
# Run the image optimization script (requires cwebp: brew install webp)
./optimize-images.sh
```

This script creates multiple versions of images:
- Desktop: 85% quality, original size
- Tablet: 75% quality, max 1200px width
- Mobile: 65% quality, max 768px width
- Thumbnails: 70% quality, 400px width

### Performance Testing
```bash
# Install Lighthouse CLI if not present
npm install -g lighthouse

# Run desktop performance test
lighthouse https://hotelavenida.com.ar --preset=desktop --output=json > lighthouse-desktop.json

# Run mobile performance test
lighthouse https://hotelavenida.com.ar --output=json > lighthouse-mobile.json
```

### Local Development
Since this is a static site, you can:
- Open `index.html` directly in a browser
- Use a simple HTTP server: `python3 -m http.server 8000`
- Use VS Code Live Server extension

## Responsive Design Breakpoints

The site uses progressive responsive design with the following breakpoints:
- **1600px**: Default desktop styles
- **1400px**: Navigation links hidden, section padding reduced to 120px
- **1300px**: Further padding reduction to 80px, button width adjustments
- **1280px**: Major layout shift to mobile-friendly design
- **600px**: Mobile optimizations
- **500px**: Small mobile adjustments
- **440px**: Minimum viewport optimizations

## Important Guidelines

1. **Maintain Static Nature**: Do not introduce frameworks, bundlers, or npm packages
2. **Performance First**: All changes should maintain or improve Core Web Vitals scores
3. **Image Format**: Always use WebP format for images (except favicon)
4. **Critical CSS**: Keep critical.css minimal - only above-the-fold styles
5. **JavaScript**: Keep vanilla JS, no jQuery or other libraries
6. **SEO**: Update sitemap.xml and structured data when adding new content

## Performance Targets

- Lighthouse Performance Score: 95+ (desktop), 90+ (mobile)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Page Size: < 1MB

## Hotel Information

- **Name**: Hotel Avenida La Plata
- **Address**: Avenida 13 Nº 1443 Esquina 62, La Plata, Buenos Aires, Argentina (CP: 1900)
- **Phone**: +54 9 221 4516767
- **WhatsApp**: +54 9 221 5772759
- **Email**: info@hotelavenida.com.ar
- **Website**: https://hotelavenida.com.ar

## Repository & Deployment

- **GitHub Account**: platense9@gmail.com (username: emilianoar)
- **Repository**: https://github.com/emilianoar/Pagina-del-Hotel
- **Production URL**: https://www.hotelavenida.com.ar
- **Deployment**: Changes pushed to `main` branch are automatically deployed to production

### Git Workflow
```bash
# After making changes:
git add <archivo>                    # Stage specific file
git commit -m "Descripción"          # Commit with message
git push                             # Push to GitHub (auto-deploys)
```

## Analytics & Tracking

- **Google Ads**: gtag.js with ID `AW-1022889830`
  - Location: `index.html` lines 7-14, inside `<head>` after `<title>`
  - Purpose: Conversion tracking for Google Ads campaigns

## Testing Checklist

When making changes:
1. Test on mobile and desktop viewports
2. Verify WhatsApp button functionality
3. Check language switcher works correctly and flag icons display properly
4. Test carousel touch/swipe on mobile
5. Run Lighthouse tests to ensure performance isn't degraded
6. Validate HTML and check for accessibility issues
7. Test social media sharing previews (Open Graph and Twitter Cards)
8. Verify responsive behavior at all breakpoints (1600px, 1400px, 1300px, 1280px, 600px, 500px, 440px)
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
2. **Multi-language Support**: Spanish (default), English, Portuguese via JavaScript
3. **WhatsApp Floating Button**: Scroll-based visibility toggle
4. **SEO Optimizations**: Schema.org structured data, meta tags, sitemap
5. **Performance Optimized**: Critical CSS inlined, lazy loading, WebP images

## Project Structure

```
/
├── index.html              # Main website file
├── styles.css              # Main stylesheet
├── critical.css            # Critical above-the-fold CSS
├── main.js                 # JavaScript functionality
├── robots.txt              # SEO crawling rules
├── sitemap.xml             # Site structure for search engines
├── optimize-images.sh      # Image optimization script
├── Imagenes/
│   ├── carousel-optimized/ # Optimized carousel images
│   ├── imagenes originales/# Original image backups
│   └── optimized/          # Script-generated optimized images
└── lighthouse-*.json       # Performance test results
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
lighthouse https://hotelavenidaenargentina.com --preset=desktop --output=json > lighthouse-desktop.json

# Run mobile performance test
lighthouse https://hotelavenidaenargentina.com --output=json > lighthouse-mobile.json
```

### Local Development
Since this is a static site, you can:
- Open `index.html` directly in a browser
- Use a simple HTTP server: `python3 -m http.server 8000`
- Use VS Code Live Server extension

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
- **Address**: Avenida 60 n°798, La Plata, Buenos Aires, Argentina
- **Phone**: +54 221 424-2046
- **WhatsApp**: +54 9 221 616-1002
- **Email**: havenida@yahoo.com.ar
- **Website**: https://hotelavenidaenargentina.com

## Testing Checklist

When making changes:
1. Test on mobile and desktop viewports
2. Verify WhatsApp button functionality
3. Check language switcher works correctly
4. Test carousel touch/swipe on mobile
5. Run Lighthouse tests to ensure performance isn't degraded
6. Validate HTML and check for accessibility issues
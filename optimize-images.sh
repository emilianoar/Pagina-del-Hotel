#!/bin/bash

# Script para optimizar imágenes WebP
# Requiere cwebp instalado (brew install webp)

echo "Optimizando imágenes WebP..."

# Crear directorio para imágenes optimizadas
mkdir -p Imagenes/optimized

# Optimizar imagen de fondo con diferentes calidades
if [ -f "Imagenes/imagen_de_fondo.webp" ]; then
    echo "Optimizando imagen de fondo..."
    # Alta calidad para escritorio
    cwebp -q 85 "Imagenes/imagen_de_fondo.webp" -o "Imagenes/optimized/imagen_de_fondo-desktop.webp"
    # Media calidad para tablets
    cwebp -q 75 -resize 1200 0 "Imagenes/imagen_de_fondo.webp" -o "Imagenes/optimized/imagen_de_fondo-tablet.webp"
    # Baja calidad para móviles
    cwebp -q 65 -resize 768 0 "Imagenes/imagen_de_fondo.webp" -o "Imagenes/optimized/imagen_de_fondo-mobile.webp"
fi

# Optimizar imágenes del carrusel
for img in Imagenes/20240923_*.webp; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "Optimizando $filename..."
        # Versión optimizada
        cwebp -q 80 "$img" -o "Imagenes/optimized/$filename"
        # Versión thumbnail
        cwebp -q 70 -resize 400 0 "$img" -o "Imagenes/optimized/thumb-$filename"
    fi
done

# Optimizar logo de WhatsApp
if [ -f "Imagenes/WhatsApp_Logo_2-1.webp" ]; then
    echo "Optimizando logo de WhatsApp..."
    cwebp -q 90 "Imagenes/WhatsApp_Logo_2-1.webp" -o "Imagenes/optimized/WhatsApp_Logo_2-1.webp"
fi

echo "Optimización completada. Las imágenes optimizadas están en Imagenes/optimized/"
echo "Tamaños de archivos:"
ls -lh Imagenes/optimized/
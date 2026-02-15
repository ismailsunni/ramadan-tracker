#!/bin/bash

# Generate PWA icons from SVG
# Requires: imagemagick (sudo apt install imagemagick)

if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    echo "  macOS: brew install imagemagick"
    exit 1
fi

# Source SVG
SVG_FILE="public/icon.svg"
OUTPUT_DIR="public"

echo "Generating PWA icons..."

# Generate 192x192 icon
convert -background none -resize 192x192 "$SVG_FILE" "$OUTPUT_DIR/icon-192.png"
echo "Generated icon-192.png"

# Generate 512x512 icon
convert -background none -resize 512x512 "$SVG_FILE" "$OUTPUT_DIR/icon-512.png"
echo "Generated icon-512.png"

# Generate favicon
convert -background none -resize 32x32 "$SVG_FILE" "$OUTPUT_DIR/favicon.ico"
echo "Generated favicon.ico"

echo "Done! PWA icons generated successfully."

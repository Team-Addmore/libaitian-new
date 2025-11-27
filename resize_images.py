#!/usr/bin/env python3
"""
Resize all images to 1200x1200 with black padding to maintain aspect ratio
"""
from PIL import Image
import os
from pathlib import Path

def resize_image_with_padding(input_path, output_path, target_size=1200):
    """
    Resize image to fit within target_size x target_size with black padding
    """
    # Open the image
    img = Image.open(input_path)

    # Convert RGBA to RGB if necessary
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (0, 0, 0))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Get original dimensions
    original_width, original_height = img.size
    print(f"Processing {input_path.name}: {original_width}x{original_height}")

    # Calculate scaling factor to fit within target size
    scale = min(target_size / original_width, target_size / original_height)
    new_width = int(original_width * scale)
    new_height = int(original_height * scale)

    # Resize image maintaining aspect ratio
    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Create new black background
    new_img = Image.new('RGB', (target_size, target_size), (0, 0, 0))

    # Calculate position to paste (center the image)
    paste_x = (target_size - new_width) // 2
    paste_y = (target_size - new_height) // 2

    # Paste resized image onto black background
    new_img.paste(img_resized, (paste_x, paste_y))

    # Save the result
    new_img.save(output_path, 'WEBP', quality=95)
    print(f"  → Saved as {target_size}x{target_size}: {output_path.name}")

def main():
    # Directory containing images
    image_dir = Path('public/images/sololv/detail_miniapp')

    # Process all webp files
    webp_files = sorted(image_dir.glob('*.webp'))

    print(f"Found {len(webp_files)} images to process\n")

    for image_path in webp_files:
        try:
            resize_image_with_padding(image_path, image_path, target_size=1200)
        except Exception as e:
            print(f"Error processing {image_path.name}: {e}")

    print(f"\n✓ All images resized to 1200x1200")
    print(f"✓ Original images backed up to: public/images/sololv/detail_miniapp_backup")

if __name__ == '__main__':
    main()

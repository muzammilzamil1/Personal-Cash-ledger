"""Makes the app icons. Run: python3 make_icons.py"""
from PIL import Image, ImageDraw, ImageFont
import glob

def font(size):
    for p in glob.glob('/usr/share/fonts/**/DejaVuSans-Bold.ttf', recursive=True):
        return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def icon(size, path):
    img = Image.new('RGB', (size, size), '#1f4e79')   # full square, iOS rounds the corners itself
    d = ImageDraw.Draw(img)
    # open book / ledger shape
    m = size * 0.22
    d.rounded_rectangle([m, m * 0.9, size - m, size - m * 0.9], radius=size * 0.06, fill='#ffffff')
    d.rectangle([size / 2 - size * 0.012, m * 0.9, size / 2 + size * 0.012, size - m * 0.9], fill='#cfd8e3')
    f = font(int(size * 0.42))
    d.text((size / 2, size / 2), '₹', font=f, fill='#1f4e79', anchor='mm')
    img.save(path)

icon(180, 'icon-180.png')   # iPhone home screen
icon(192, 'icon-192.png')
icon(512, 'icon-512.png')
print('icons done')

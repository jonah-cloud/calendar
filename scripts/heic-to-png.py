#!/usr/bin/env python3
"""
Convert HEIC/HEIF photos (what an iPhone shoots by default) into PNGs that can
actually be read. Used to get photographed worksheets — spelling lists, story
pages — into this project.

    pip install pillow-heif pillow
    python3 scripts/heic-to-png.py <in.heic|dir> [outdir]
"""
import sys, pathlib
import pillow_heif
from PIL import Image

pillow_heif.register_heif_opener()

def convert(src: pathlib.Path, outdir: pathlib.Path) -> pathlib.Path:
    img = Image.open(src)
    img = img.convert("RGB")
    # keep it readable but bounded, so text stays crisp without huge files
    if max(img.size) > 2400:
        img.thumbnail((2400, 2400), Image.LANCZOS)
    outdir.mkdir(parents=True, exist_ok=True)
    dst = outdir / (src.stem + ".png")
    img.save(dst, "PNG", optimize=True)
    return dst

def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = pathlib.Path(sys.argv[1])
    outdir = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else (
        src.parent if src.is_file() else src
    )
    files = (
        [src] if src.is_file()
        else sorted(p for p in src.iterdir() if p.suffix.lower() in (".heic", ".heif"))
    )
    if not files:
        sys.exit(f"no HEIC files found in {src}")
    for f in files:
        print(convert(f, outdir))

if __name__ == "__main__":
    main()

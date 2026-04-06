import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = join(__dirname, "..");
const src       = readFileSync(join(root, "public/icons/icon-source.svg"));
const out       = join(root, "public/icons");
const favOut    = join(root, "public");

const icons = [
  { size: 72,  file: "icon-72x72.png"  },
  { size: 96,  file: "icon-96x96.png"  },
  { size: 128, file: "icon-128x128.png" },
  { size: 144, file: "icon-144x144.png" },
  { size: 152, file: "icon-152x152.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 192, file: "icon-192x192.png" },
  { size: 384, file: "icon-384x384.png" },
  { size: 512, file: "icon-512x512.png" },
];

const favicons = [
  { size: 16, file: "favicon-16x16.png", dir: favOut },
  { size: 32, file: "favicon-32x32.png", dir: favOut },
];

for (const { size, file } of icons) {
  await sharp(src, { density: Math.ceil(size * 72 / 84) })
    .resize(size, size)
    .png()
    .toFile(join(out, file));
  console.log(`✓ ${size}×${size}  →  icons/${file}`);
}

for (const { size, file, dir } of favicons) {
  await sharp(src, { density: Math.ceil(size * 72 / 84) })
    .resize(size, size)
    .png()
    .toFile(join(dir, file));
  console.log(`✓ ${size}×${size}  →  ${file}`);
}

console.log("\nDone — all icons generated 🎉");

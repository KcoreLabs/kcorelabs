import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const mark =
  '<path d="M0 0h60v240H0zm80 120L155 0h70l-75 120zm0 15h70l75 105h-70z" fill="#7db7ff"/>';
await writeFile(
  "public/logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 160"><rect width="720" height="160" fill="#08111f"/><g transform="translate(30 30) scale(.4)">${mark}</g><text x="150" y="100" font-family="Arial,sans-serif" font-size="64" fill="#f5f8ff">Kcore Labs.</text></svg>`,
);
await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#08111f"/><g transform="translate(870 190)">${mark}</g><text x="70" y="100" font-family="Arial,sans-serif" font-size="32" fill="#f5f8ff">Kcore Labs.</text><text x="70" y="300" font-family="Arial,sans-serif" font-size="76" fill="#f5f8ff">Ideas into</text><text x="70" y="395" font-family="Arial,sans-serif" font-size="76" fill="#7db7ff">digital reality.</text><text x="70" y="545" font-family="Arial,sans-serif" font-size="22" fill="#b4c0d3">Independent digital studio · Based in India</text></svg>`,
  ),
)
  .png()
  .toFile("public/social.png");

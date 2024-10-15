import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cacheLocation = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../node_modules/.cache/lyne-cdn-fonts',
);
const preloadFontList = [
  [400, 'https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Roman.woff2'],
  [700, 'https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Bold.woff2'],
  [300, 'https://cdn.app.sbb.ch/fonts/v1_6_subset/SBBWeb-Light.woff2'],
] as const;

export interface PreloadedFont {
  weight: number;
  font: string;
}

async function downloadFont(fontUrl: string): Promise<ArrayBuffer> {
  // Performing too many HTTP requests in parallel or sequence causes fetch to fail.
  // We add a delay for each request to prevent the request failure.
  await new Promise((r) => setTimeout(r, 20));
  const r = await fetch(fontUrl);
  return await r.arrayBuffer();
}

export async function preloadFonts(): Promise<PreloadedFont[]> {
  mkdirSync(cacheLocation, { recursive: true });

  const preloadedFonts: PreloadedFont[] = [];
  console.log(`Preloading fonts`);
  for (const [weight, fontUrl] of preloadFontList) {
    const fontFile = basename(fontUrl);
    const fontCachePath = join(cacheLocation, fontFile);
    if (!existsSync(fontCachePath)) {
      let font: ArrayBuffer;
      try {
        font = await downloadFont(fontUrl);
      } catch (e) {
        console.log(`Failed to fetch ${fontUrl}`);
        throw e;
      }

      writeFileSync(fontCachePath, Buffer.from(font), 'utf8');
    }
    preloadedFonts.push({
      weight,
      font: `url(data:font-woff2;charset=utf-8;base64,${readFileSync(fontCachePath).toString('base64')}) format('woff2')`,
    });
  }
  console.log(`Finished preloading fonts`);
  return preloadedFonts;
}

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cacheLocation = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../node_modules/.cache/lyne-cdn-icons',
);
const preloadIconList = [
  'add-stop',
  'alternative',
  'app-icon-medium',
  'app-icon-small',
  'arrow-long-right-small',
  'arrow-right-small',
  'arrows-circle-small',
  'arrows-long-right-left-small',
  'arrows-right-left-small',
  'backpack-medium',
  'battery-level-empty-small',
  'battery-level-high-small',
  'bicycle-medium',
  'calendar-small',
  'cancellation',
  'chevron-small-down-medium',
  'chevron-small-down-small',
  'chevron-small-left-small',
  'chevron-small-right-small',
  'chevron-small-up-small',
  'circle-cross-small',
  'circle-dotted-part-small',
  'circle-dotted-part-x-small',
  'circle-dotted-small',
  'circle-exclamation-point-small',
  'circle-information-large',
  'circle-information-medium',
  'circle-information-small',
  'circle-minus-small',
  'circle-plus-medium',
  'circle-plus-small',
  'circle-three-dots-small',
  'circle-tick-small',
  'clock-small',
  'coins-small',
  'construction',
  'container-small',
  'context-menu-small',
  'cross-small',
  'dash-small',
  'delay',
  'diamond-small',
  'disruption',
  'dog-medium',
  'dog-small',
  'exclamation-point-small',
  'exit-small',
  'eye-small',
  'face-smiling-small',
  'folder-open-medium',
  'folder-open-small',
  'globe-small',
  'hamburger-menu-small',
  'heart-medium',
  'house-small',
  'ic-35',
  'info',
  'ir-27',
  'ir-35',
  'ir-37',
  'link-small',
  'location-pin-map-small',
  'magnifying-glass-small',
  'minus-small',
  'missed-connection',
  'pen-medium',
  'pen-small',
  'pie-medium',
  'pie-small',
  'platform-change',
  'plus-medium',
  'plus-small',
  'qrcode-small',
  'replacementbus',
  'reroute',
  'sa-abteilkinderwagen',
  'sa-b',
  'sa-bz',
  'sa-cc',
  'sa-ci',
  'sa-fz',
  'sa-nf',
  'sa-r',
  'sa-rr',
  'sa-rs',
  'sa-tg',
  'sa-vr',
  'sa-wl',
  'sa-wr',
  'sa-z',
  'shopping-cart-small',
  'swisspass-medium',
  'swisspass-small',
  'tick-small',
  'ticket-route-medium',
  'tickets-class-small',
  'train-medium',
  'train-small',
  'trash-small',
  'travel-backpack-medium',
  'user-small',
  'utilization-high',
  'utilization-high-high-contrast',
  'utilization-high-negative',
  'utilization-low',
  'utilization-low-high-contrast',
  'utilization-low-negative',
  'utilization-medium',
  'utilization-medium-high-contrast',
  'utilization-medium-negative',
  'utilization-none',
  'utilization-none-high-contrast',
  'utilization-none-negative',
  'walk-fast-small',
  'walk-slow-small',
  'walk-small',
  'wheelchair-small',
  'picto:bus-right',
  'picto:jetty-right',
  'picto:train-right',
  'picto:tram-right',
];

export interface PreloadedIcon {
  namespace: string;
  icon: string;
  svg: string;
}

async function downloadIcon(iconUrl: string): Promise<string> {
  // Performing too many HTTP requests in parallel or sequence causes fetch to fail.
  // We add a delay for each request to prevent the request failure.
  await new Promise((r) => setTimeout(r, 20));
  const r = await fetch(iconUrl);
  return await r.text();
}

export async function preloadIcons(): Promise<PreloadedIcon[]> {
  mkdirSync(cacheLocation, { recursive: true });

  const preloadedIcons: PreloadedIcon[] = [];
  console.log(`Preloading icons`);
  for (const iconName of preloadIconList) {
    const parts = iconName.split(':');
    const namespace = parts.length === 1 ? 'default' : parts[0];
    const icon = parts[1] ?? parts[0];
    const iconCachePath = join(cacheLocation, `${namespace}_${icon}.svg`);
    if (existsSync(iconCachePath)) {
      preloadedIcons.push({ namespace, icon, svg: readFileSync(iconCachePath, 'utf8') });
    } else {
      const iconUrl = `https://icons.app.sbb.ch/${namespace === 'default' ? 'icons' : namespace}/${icon}.svg`;
      let svg = '';
      try {
        // We want to retry once, as we noticed sometimes the icon downloads are flakey.
        try {
          svg = await downloadIcon(iconUrl);
        } catch {
          svg = await downloadIcon(iconUrl);
        }
      } catch (e) {
        console.log(`Failed to fetch ${namespace}:${icon} from ${iconUrl}`);
        throw e;
      }

      preloadedIcons.push({ namespace, icon, svg });
      writeFileSync(iconCachePath, svg, 'utf8');
    }
  }
  console.log(`Finished preloading icons`);
  return preloadedIcons;
}

import type { PlayApp } from "../types/app";
import rawApps from "../../data/apps.json";

export const apps: PlayApp[] = rawApps as PlayApp[];

export function getAppBySlug(slug: string): PlayApp | undefined {
  return apps.find((a) => a.slug === slug);
}

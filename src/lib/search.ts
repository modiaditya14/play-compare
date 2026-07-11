import Fuse from "fuse.js";
import type { PlayApp } from "../types/app";
import { apps } from "./apps";

const fuse = new Fuse(apps, {
  keys: ["name", "developer", "category"],
  threshold: 0.35,
});

export function searchApps(query: string): PlayApp[] {
  if (!query.trim()) return [];
  return fuse.search(query).map((r) => r.item).slice(0, 8);
}

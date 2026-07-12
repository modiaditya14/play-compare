import type { PlayApp } from "../types/app";

export type MetricRow = {
  label: string;
  valueA: string;
  valueB: string;
  winner: "A" | "B" | null; // null = informational only / tie
};

export function buildComparison(a: PlayApp, b: PlayApp): MetricRow[] {
  const rows: MetricRow[] = [];

  rows.push({
    label: "Rating",
    valueA: a.rating != null ? a.rating.toFixed(1) : "N/A",
    valueB: b.rating != null ? b.rating.toFixed(1) : "N/A",
    winner:
      a.rating == null || b.rating == null
        ? null
        : a.rating === b.rating
          ? null
          : a.rating > b.rating
            ? "A"
            : "B",
  });

  rows.push({
    label: "Reviews",
    valueA: a.reviews.toLocaleString(),
    valueB: b.reviews.toLocaleString(),
    winner: a.reviews === b.reviews ? null : a.reviews > b.reviews ? "A" : "B",
  });

  const formatInstalls = (n: number) => {
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  rows.push({
    label: "Installs",
    valueA: formatInstalls(a.installs),
    valueB: formatInstalls(b.installs),
    winner: a.installs === b.installs ? null : a.installs > b.installs ? "A" : "B",
  });

  rows.push({
    label: "Price",
    valueA: a.type === "Free" ? "Free" : `$${a.price.toFixed(2)}`,
    valueB: b.type === "Free" ? "Free" : `$${b.price.toFixed(2)}`,
    winner: a.price === b.price ? null : a.price < b.price ? "A" : "B",
  });

  rows.push({
    label: "Type",
    valueA: a.type,
    valueB: b.type,
    winner: null,
  });

  rows.push({
    label: "Content Rating",
    valueA: a.contentRating,
    valueB: b.contentRating,
    winner: null,
  });

  rows.push({
    label: "Last Updated",
    valueA: a.lastUpdated || "N/A",
    valueB: b.lastUpdated || "N/A",
    winner:
      a.lastUpdated && b.lastUpdated
        ? a.lastUpdated === b.lastUpdated
          ? null
          : a.lastUpdated > b.lastUpdated
            ? "A"
            : "B"
        : null,
  });

  return rows;
}

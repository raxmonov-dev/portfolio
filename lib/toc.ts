import { headingSlug } from "@/lib/slug";

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const title = match[2].replace(/[*_`]/g, "").trim();
    if (!title) continue;

    let id = headingSlug(title);
    const count = used.get(id) ?? 0;
    used.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;

    items.push({ id, title, level });
  }

  return items;
}

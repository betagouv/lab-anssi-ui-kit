#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, globSync } from "node:fs";
import { dirname, basename } from "node:path";

const COMPONENTS_GLOB = "src/lib/**/*.svelte";
const STORIES_GLOB = "stories/**/*.stories.svelte";
const OUT = process.argv[2] ?? "dist/ui-kit-components.json";

function parseComponent(file) {
  const src = readFileSync(file, "utf8");
  const opt = src.match(/<svelte:options[\s\S]*?customElement=\{\{([\s\S]*?)\n\s*\}\}/);
  if (!opt) return null;
  const block = opt[1];

  const tag = block.match(/tag:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (!tag) return null;

  const componentName = basename(file, ".svelte");

  const propsBlock = block.match(/props:\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? "";
  const props = [];
  const re = /(\w+):\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(propsBlock))) {
    const [, name, body] = m;
    props.push({
      name,
      attribute: body.match(/attribute:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? name,
      type: body.match(/type:\s*["'`]?(\w+)["'`]?/)?.[1] ?? "String",
    });
  }
  return { tagName: tag, componentName, source: file, props };
}

function parseStory(file) {
  const src = readFileSync(file, "utf8");

  const title = src.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? null;
  const component = src.match(/component:\s*(\w+)/)?.[1] ?? null;

  const tagInTemplate = src.match(/<(dsfr-[\w-]+)/)?.[1] ?? null;

  const snippet =
    src.match(/\{#snippet template[^}]*\}([\s\S]*?)\{\/snippet\}/)?.[1]?.trim() ?? null;

  const argTypesBlock = src.match(/argTypes:\s*\{([\s\S]*?)\n\s{4}\}/)?.[1] ?? "";
  const argMeta = {};
  const slots = [];
  const argRe = /(\w+):\s*\{([\s\S]*?)\n\s{6}\}/g;
  let a;
  while ((a = argRe.exec(argTypesBlock))) {
    const [, name, body] = a;
    const description = body
      .match(/description:\s*["'`]([\s\S]*?)["'`]\s*,/)?.[1]
      ?.replace(/<br>/g, " ")
      .trim();
    const isSlot = /table:\s*\{[^}]*category:\s*["'`]Slots["'`]/.test(body);
    if (isSlot) {
      slots.push({ name, ...(description && { description }) });
      continue;
    }
    const optionsRaw = body.match(/options:\s*\[([\s\S]*?)\]/)?.[1];
    const options = optionsRaw
      ? optionsRaw
          .split(",")
          .map((s) => s.trim().replace(/^["'`]|["'`]$/g, ""))
          .filter(Boolean)
      : undefined;
    argMeta[name] = { ...(description && { description }), ...(options && { options }) };
  }

  return { title, component, tagInTemplate, snippet, argMeta, slots };
}

const components = globSync(COMPONENTS_GLOB).map(parseComponent).filter(Boolean);
const stories = globSync(STORIES_GLOB).map(parseStory);

const storiesByComponent = new Map();
for (const s of stories) {
  if (!s.component) continue;
  const arr = storiesByComponent.get(s.component) ?? [];
  arr.push(s);
  storiesByComponent.set(s.component, arr);
}

function pickStory(componentName, candidates) {
  if (!candidates?.length) return null;
  const key = componentName.replace(/^Dsfr/, "").toLowerCase();
  const dedicated = candidates.find((s) =>
    s.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .endsWith(key),
  );
  if (dedicated) return dedicated;
  const composant = candidates.find((s) => /^composants/i.test(s.title ?? ""));
  if (composant) return composant;
  return candidates[0];
}

const merged = components.map((c) => {
  const story = pickStory(c.componentName, storiesByComponent.get(c.componentName));
  const props = c.props.map((p) => ({
    ...p,
    ...(story?.argMeta?.[p.name]?.description && {
      description: story.argMeta[p.name].description,
    }),
    ...(story?.argMeta?.[p.name]?.options && { options: story.argMeta[p.name].options }),
  }));
  return {
    tagName: c.tagName,
    title: story?.title ?? null,
    source: c.source,
    props,
    slots: story?.slots ?? [],
    example: story?.snippet ?? null,
  };
});

merged.sort((a, b) => a.tagName.localeCompare(b.tagName));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ schemaVersion: 1, components: merged }, null, 2));

const withStory = merged.filter((c) => c.example).length;
console.log(`✓ ${merged.length} composants (${withStory} avec exemple) → ${OUT}`);

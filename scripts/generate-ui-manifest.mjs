#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, globSync } from "node:fs";
import { dirname, basename } from "node:path";

const COMPONENTS_GLOB = "src/lib/**/*.svelte";
const STORIES_GLOB = "stories/**/*.stories.svelte";
const SHARED_TYPES_GLOB = "src/lib/types/*.ts";
const OUT = process.argv[2] ?? "dist/ui-kit-components.json";
const WEB_TYPES_OUT = "dist/web-types.json";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

function extractTypeAliases(src) {
  const out = {};
  const re =
    /(?:export\s+)?type\s+(\w+)\s*=\s*([\s\S]*?);\s*(?=\n\s*(?:export|type|import|interface|\/\*|\/\/|function|const|let|var|$))/g;
  let m;
  while ((m = re.exec(src + "\n"))) out[m[1]] = m[2].trim();
  return out;
}

const sharedTypes = {};
for (const f of globSync(SHARED_TYPES_GLOB)) {
  Object.assign(sharedTypes, extractTypeAliases(readFileSync(f, "utf8")));
}

function resolveType(expr, localTypes, depth = 0) {
  if (!expr || depth > 6) return null;
  expr = expr.trim().replace(/;$/, "");

  if (/^(string|number|boolean)$/.test(expr)) return { primitive: expr };

  if (/^\|?\s*(["'][^"']*["'])(\s*\|\s*["'][^"']*["'])*$/.test(expr)) {
    return { options: [...expr.matchAll(/["']([^"']*)["']/g)].map((x) => x[1]) };
  }

  const ext = expr.match(/^Extract<\s*(\w+)\s*,\s*([\s\S]+)\s*>$/);
  if (ext) {
    const base = resolveType(ext[1], localTypes, depth + 1);
    const subset = resolveType(ext[2], localTypes, depth + 1);
    if (base?.options && subset?.options)
      return { options: base.options.filter((x) => subset.options.includes(x)) };
    return null;
  }

  const exc = expr.match(/^Exclude<\s*(\w+)\s*,\s*([\s\S]+)\s*>$/);
  if (exc) {
    const base = resolveType(exc[1], localTypes, depth + 1);
    const subset = resolveType(exc[2], localTypes, depth + 1);
    if (base?.options && subset?.options)
      return { options: base.options.filter((x) => !subset.options.includes(x)) };
    return null;
  }

  if (/^\w+$/.test(expr)) {
    const def = localTypes[expr] ?? sharedTypes[expr];
    if (def) {
      const resolved = resolveType(def, localTypes, depth + 1);
      if (resolved) return resolved;
    }
    return { ref: expr };
  }

  return null;
}

function parseScript(svelteSrc) {
  const script = svelteSrc.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? "";
  const localTypes = extractTypeAliases(script);

  const ifaceBody = script.match(/interface\s+Props\s*\{([\s\S]*?)\n\s*\}/)?.[1];
  const props = {};
  if (!ifaceBody) return { localTypes, props, script };

  const re = /(?:\/\*\*\s*([\s\S]*?)\s*\*\/\s*\n\s*)?(\w+)\??:\s*([^;\n]+);?/g;
  let m;
  while ((m = re.exec(ifaceBody))) {
    const [, doc, name, typeExpr] = m;
    const description = doc?.replace(/^\s*\*\s?/gm, "").trim();
    props[name] = { typeExpr: typeExpr.trim(), ...(description && { description }) };
  }
  return { localTypes, props, script };
}

function parseEvents(script) {
  const found = new Map();

  const customRe =
    /new\s+CustomEvent\s*(?:<[^>]+>)?\s*\(\s*["']([^"']+)["'](?:\s*,\s*\{([\s\S]*?)\}\s*\))?/g;
  let c;
  while ((c = customRe.exec(script))) {
    const name = c[1];
    const detail = c[2]?.match(/detail\s*:\s*(\{[^{}]*\}|[^,}\n]+)/)?.[1]?.trim();
    if (!found.has(name) || (detail && !found.get(name).detail)) {
      found.set(name, { name, ...(detail && { detail }) });
    }
  }

  const dispatcherVar = script.match(
    /(?:export\s+)?const\s+(\w+)\s*=\s*createEventDispatcher\b/,
  )?.[1];
  if (dispatcherVar) {
    const callRe = new RegExp(`\\b${dispatcherVar}\\s*\\(\\s*["']([^"']+)["']`, "g");
    let d;
    while ((d = callRe.exec(script))) {
      if (!found.has(d[1])) found.set(d[1], { name: d[1] });
    }
  }

  return [...found.values()];
}

function parseComponent(file) {
  const src = readFileSync(file, "utf8");
  const opt = src.match(/<svelte:options[\s\S]*?customElement=\{\{([\s\S]*?)\n\s*\}\}/);
  if (!opt) return null;
  const block = opt[1];

  const tag = block.match(/tag:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (!tag) return null;

  const componentName = basename(file, ".svelte");

  const { localTypes, props: tsProps, script } = parseScript(src);
  const events = parseEvents(script);

  const propsBlock = block.match(/props:\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? "";
  const props = [];
  const re = /(\w+):\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(propsBlock))) {
    const [, name, body] = m;
    const tsInfo = tsProps[name];
    const resolved = tsInfo ? resolveType(tsInfo.typeExpr, localTypes) : null;
    props.push({
      name,
      attribute: body.match(/attribute:\s*["'`]([^"'`]+)["'`]/)?.[1] ?? name,
      type: body.match(/type:\s*["'`]?(\w+)["'`]?/)?.[1] ?? "String",
      ...(tsInfo?.typeExpr && { tsType: tsInfo.typeExpr }),
      ...(tsInfo?.description && { description: tsInfo.description }),
      ...(resolved?.options && { options: resolved.options }),
    });
  }
  return { tagName: tag, componentName, source: file, props, events };
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
  const props = c.props.map((p) => {
    const storyDesc = story?.argMeta?.[p.name]?.description;
    const storyOpts = story?.argMeta?.[p.name]?.options;
    return {
      ...p,
      ...(!p.description && storyDesc && { description: storyDesc }),
      ...(!p.options && storyOpts && { options: storyOpts }),
    };
  });
  return {
    tagName: c.tagName,
    title: story?.title ?? null,
    source: c.source,
    props,
    events: c.events,
    slots: story?.slots ?? [],
    example: story?.snippet ?? null,
  };
});

merged.sort((a, b) => a.tagName.localeCompare(b.tagName));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ schemaVersion: 1, components: merged }, null, 2));

const withStory = merged.filter((c) => c.example).length;
console.log(`✓ ${merged.length} composants (${withStory} avec exemple) → ${OUT}`);

const STORYBOOK_BASE = "https://betagouv.github.io/lab-anssi-ui-kit/?path=/docs";

function storybookId(title) {
  return title
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function attrType(p) {
  if (p.options?.length) return p.options.map((o) => `'${o}'`).join(" | ");
  if (p.type === "Boolean") return "boolean";
  if (p.type === "Number") return "number";
  return "string";
}

function buildWebTypes(components) {
  const elements = components.map((c) => {
    const eventHandlerType = "(event: CustomEvent) => void";

    const eventHandlerEntries = (c.events ?? []).map((e) => ({
      name: `on${e.name}`,
      ...(e.detail && { description: `detail: ${e.detail}` }),
    }));

    const attributes = [
      ...c.props.map((p) => ({
        name: p.attribute,
        ...(p.description && { description: p.description }),
        value: { type: attrType(p) },
      })),
      ...eventHandlerEntries.map((h) => ({ ...h, value: { type: eventHandlerType } })),
    ];

    const properties = [
      ...c.props.map((p) => ({
        name: p.name,
        ...(p.description && { description: p.description }),
        type: attrType(p),
      })),
      ...eventHandlerEntries.map((h) => ({ ...h, type: eventHandlerType })),
    ];

    const events = (c.events ?? []).map((e) => ({
      name: e.name,
      ...(e.detail && { description: `detail: ${e.detail}` }),
    }));

    const js = { properties };
    if (events.length) js.events = events;

    const element = { name: c.tagName, attributes, js };
    if (c.title) {
      element["doc-url"] = `${STORYBOOK_BASE}/${storybookId(c.title)}--docs`;
    }
    if (events.length) element.events = events;

    if (c.slots?.length) {
      element.slots = c.slots.map((s) => ({
        name: s.name,
        ...(s.description && { description: s.description }),
      }));
    }

    return element;
  });

  return {
    $schema: "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    name: pkg.name,
    version: pkg.version,
    "framework-config": {
      "enable-when": { "file-extensions": ["svelte", "html", "pug"] },
    },
    "description-markup": "markdown",
    contributions: { html: { elements } },
  };
}

writeFileSync(WEB_TYPES_OUT, JSON.stringify(buildWebTypes(merged), null, 2));
console.log(`✓ web-types → ${WEB_TYPES_OUT}`);

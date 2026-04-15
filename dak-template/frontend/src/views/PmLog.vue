<script setup>
// /pm-log — renders PROJECT.md (at the repo root) as HTML. Edit
// PROJECT.md, this page updates. See ~/.claude/templates/pm-log.md
// for the expected structure.
import { ref, onMounted } from "vue"
import { marked } from "marked"

// Vite's ?raw import type ships the whole file as a string at build
// time. The file lives at the repo root, so ../../ from frontend/src.
// eslint-disable-next-line import/no-unresolved
import mdSrc from "../../../PROJECT.md?raw"

const html = ref("")
onMounted(async () => {
  // Mermaid is heavy; lazy-load it only if the doc has mermaid blocks.
  const parsed = marked.parse(mdSrc)
  html.value = parsed
  if (mdSrc.includes("```mermaid")) {
    const { default: mermaid } = await import("mermaid")
    mermaid.initialize({ startOnLoad: false })
    await mermaid.run({ querySelector: ".pm-log pre code.language-mermaid" })
  }
})
</script>

<template>
  <div class="page pm-log">
    <header class="head">
      <div class="eyebrow">Project log</div>
      <h1>PM log</h1>
    </header>
    <article v-html="html"></article>
  </div>
</template>

<style scoped>
.page { max-width: 760px; }
.head { margin-bottom: 28px; }
.eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--text-accent);
}
h1 {
  font-family: var(--font-display);
  font-size: 32px;
  margin: 6px 0 10px;
}
article :deep(h2) {
  font-family: var(--font-display);
  margin-top: 28px;
  margin-bottom: 10px;
}
article :deep(h3) { margin-top: 18px; }
article :deep(p) { line-height: 1.55; opacity: 0.85; }
article :deep(code) {
  font-family: var(--font-mono);
  background: var(--bg-secondary);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
}
article :deep(pre) {
  background: var(--bg-secondary);
  padding: 14px;
  border-radius: 8px;
  overflow-x: auto;
}
</style>

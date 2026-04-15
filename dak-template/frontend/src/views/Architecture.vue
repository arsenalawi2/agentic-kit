<script setup>
// /architecture — reads public/tech-stack.json. The DAK hook auto-
// detects the stack from package.json / requirements.txt / docker-
// compose.yml and writes it to the JSON. You can hand-edit the JSON
// to add things the hook can't detect (Tailscale, external APIs) —
// the hook preserves hand-curated entries.
import { ref, onMounted } from "vue"

const data = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch("/tech-stack.json")
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
  } catch (e) {
    error.value = e.message
  }
})
</script>

<template>
  <div class="page">
    <header class="head">
      <div class="eyebrow">Under the hood</div>
      <h1>Architecture</h1>
    </header>

    <div v-if="error" class="state error">Couldn't load: {{ error }}</div>
    <div v-else-if="!data" class="state">Loading stack…</div>
    <div v-else class="groups">
      <section v-for="g in data.groups" :key="g.label" class="group">
        <h2>{{ g.label }}</h2>
        <ul>
          <li v-for="t in g.items" :key="t.name">
            <span class="tech-name">{{ t.name }}</span>
            <span v-if="t.version" class="tech-version">{{ t.version }}</span>
            <span v-if="t.note" class="tech-note">— {{ t.note }}</span>
          </li>
        </ul>
      </section>
    </div>
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
.state { padding: 40px; text-align: center; opacity: 0.7; }
.state.error { color: #c44; }
.groups { display: flex; flex-direction: column; gap: 24px; }
.group h2 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-tertiary);
}
.group ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.tech-name { font-weight: 600; }
.tech-version {
  margin-left: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  opacity: 0.7;
}
.tech-note { margin-left: 8px; opacity: 0.7; }
</style>

<script setup>
// /journey — reads public/journey-data.json. You (Claude Code) update
// the JSON after significant work; this page just renders it.
// Schema: see ~/.claude/templates/journey.md
import { ref, onMounted } from "vue"

const data = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch("/journey-data.json")
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
      <div class="eyebrow">Narrative</div>
      <h1>Journey</h1>
      <p class="lead">Phase-by-phase story of how this project came together.</p>
    </header>

    <div v-if="error" class="state error">Couldn't load: {{ error }}</div>
    <div v-else-if="!data" class="state">Loading journey…</div>
    <ol v-else class="phases">
      <li v-for="p in data.phases" :key="p.title" class="phase">
        <div class="phase-num">{{ p.number }}</div>
        <div>
          <div class="phase-title">{{ p.title }}</div>
          <p class="phase-body">{{ p.body }}</p>
        </div>
      </li>
    </ol>
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
.lead { opacity: 0.78; }
.state { padding: 40px; text-align: center; opacity: 0.7; }
.state.error { color: #c44; }
.phases { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
.phase {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border-light);
  border-radius: 8px;
}
.phase-num {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-accent);
}
.phase-title { font-weight: 600; font-family: var(--font-display); }
.phase-body { margin-top: 6px; opacity: 0.82; line-height: 1.5; }
</style>

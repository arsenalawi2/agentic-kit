<script setup>
// DAK project shell — sidebar + RouterView. Swap in your project's
// own navigation; just keep the four auto-pages (/vibe-code,
// /journey, /architecture, /pm-log) wired.
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">{{ "{{PROJECT_NAME}}" }}</div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/journey">Journey</RouterLink>
        <RouterLink to="/architecture">Architecture</RouterLink>
        <RouterLink to="/vibe-code">Vibe code</RouterLink>
        <RouterLink to="/pm-log">PM log</RouterLink>
      </nav>
    </aside>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
}
.sidebar {
  padding: 24px 16px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
}
nav { display: flex; flex-direction: column; gap: 4px; }
nav a {
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 13px;
}
nav a:hover { background: var(--bg-hover); color: var(--text-primary); }
nav a.router-link-active { color: var(--text-accent); font-weight: 600; }
.main { padding: 24px; }
</style>

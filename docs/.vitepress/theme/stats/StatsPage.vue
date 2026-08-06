<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { data as statsData } from './stats.data'
import type { PageStats, ScopeStats } from './stats.data'

const query = ref('')
const expanded = ref(new Set<string>())

type Kind = 'page' | 'department' | 'section' | 'subsection'

interface Row {
  key: string
  depth: number
  kind: Kind
  heading: string
  lines: number
  type?: string
  url?: string
  expandable?: boolean
}

const typeOrder: Record<string, number> = { index: 0, blog: 1, utility: 2 }

const typeLabel: Record<string, string> = {
  index: 'Index',
  blog: 'Blog',
  utility: 'Utility',
}

const sorted = computed<PageStats[]>(() =>
  [...statsData].sort(
    (a, b) =>
      (typeOrder[a.type] ?? 3) - (typeOrder[b.type] ?? 3) || a.title.localeCompare(b.title)
  )
)

const totals = computed(() => {
  let depts = 0
  let sections = 0
  let subsections = 0
  let lines = 0
  let indexPages = 0
  for (const p of statsData) {
    if (p.type === 'index') indexPages++
    lines += p.lines
    for (const d of p.departments) {
      depts++
      sections += d.sections?.length ?? 0
      for (const s of d.sections ?? []) subsections += s.subsections?.length ?? 0
    }
  }
  return { pages: statsData.length, indexPages, depts, sections, subsections, lines }
})

const visiblePages = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return sorted.value
  return sorted.value.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.url.toLowerCase().includes(q) ||
      p.departments.some((d) => d.heading.toLowerCase().includes(q))
  )
})

const rows = computed(() => {
  const out: Row[] = []
  const next = (p: PageStats) => statsData.indexOf(p)
  for (const p of visiblePages.value) {
    const pk = String(next(p))
    const pageExpandable = p.departments.length > 0
    out.push({
      key: pk,
      depth: 0,
      kind: 'page',
      heading: p.title,
      lines: p.lines,
      type: p.type,
      url: p.url,
      expandable: pageExpandable,
    })
    if (!pageExpandable || !expanded.value.has(pk)) continue
    p.departments.forEach((d, di) => {
      const dk = `${pk}.${di}`
      out.push({
        key: dk,
        depth: 1,
        kind: 'department',
        heading: d.heading,
        lines: d.lines,
        expandable: (d.sections?.length ?? 0) > 0,
      })
      if (!(d.sections?.length ?? 0) || !expanded.value.has(dk)) return
      d.sections?.forEach((s, si) => {
        const sk = `${dk}.${si}`
        out.push({
          key: sk,
          depth: 2,
          kind: 'section',
          heading: s.heading,
          lines: s.lines,
          expandable: (s.subsections?.length ?? 0) > 0,
        })
        if (!(s.subsections?.length ?? 0) || !expanded.value.has(sk)) return
        s.subsections?.forEach((ss, xi) => {
          out.push({
            key: `${sk}.${xi}`,
            depth: 3,
            kind: 'subsection',
            heading: ss.heading,
            lines: ss.lines,
          })
        })
      })
    })
  }
  return out
})

const toggle = (key: string): void => {
  const next = new Set(expanded.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expanded.value = next
}

const expandAll = (): void => {
  const keys = new Set<string>()
  for (const p of visiblePages.value) {
    if (p.departments.length === 0) continue
    const pk = String(statsData.indexOf(p))
    keys.add(pk)
    p.departments.forEach((d, di) => {
      const dk = `${pk}.${di}`
      if ((d.sections?.length ?? 0) > 0) keys.add(dk)
      d.sections?.forEach((s, si) => {
        const sk = `${dk}.${si}`
        if ((s.subsections?.length ?? 0) > 0) keys.add(sk)
      })
    })
  }
  expanded.value = keys
}

const collapseAll = (): void => {
  expanded.value = new Set()
}

watch(query, () => {
  if (query.value.trim()) expandAll()
  else collapseAll()
})
</script>

<template>
  <div class="stats-page">
    <div class="stats-summary">
      <span class="stat"><b>{{ totals.pages }}</b> pages</span>
      <span class="stat"><b>{{ totals.indexPages }}</b> index pages</span>
      <span class="stat"><b>{{ totals.depts }}</b> departments</span>
      <span class="stat"><b>{{ totals.sections }}</b> sections</span>
      <span class="stat"><b>{{ totals.subsections }}</b> subsections</span>
      <span class="stat"><b>{{ totals.lines }}</b> lines</span>
    </div>

    <div class="stats-toolbar">
      <input
        v-model="query"
        type="search"
        class="stats-filter"
        placeholder="Filter pages, departments, sections…"
        aria-label="Filter statistics"
      />
      <div class="stats-actions">
        <button type="button" class="stats-action" @click="expandAll">Expand all</button>
        <button type="button" class="stats-action" @click="collapseAll">Collapse all</button>
      </div>
    </div>

    <div class="stats-tree">
      <div class="tree-row tree-head">
        <span class="tree-name-cell">Name</span>
        <span class="tree-num">Lines</span>
      </div>

      <template v-for="row in rows" :key="row.key">
        <div class="tree-row" :style="{ '--ind': row.depth }">
          <span class="tree-name-cell">
            <span v-if="row.expandable" class="tree-caret" role="button" tabindex="0"
              @click="toggle(row.key)"
              @keydown.enter="toggle(row.key)"
              >{{ expanded.has(row.key) ? '▾' : '▸' }}</span
            >
            <template v-if="row.kind === 'page'">
              <a v-if="row.url" :href="row.url" class="tree-link">{{ row.heading }}</a>
              <span v-else class="tree-text">{{ row.heading }}</span>
              <span v-if="row.type" class="tree-type">{{ typeLabel[row.type] }}</span>
            </template>
            <span v-else class="tree-scope" :class="`tree-scope-${row.kind}`">{{
              row.heading
            }}</span>
          </span>
          <span class="tree-num">{{ row.lines }}</span>
        </div>
      </template>

      <p v-if="rows.length === 0" class="tree-empty">No pages match your filter.</p>
    </div>
  </div>
</template>

<style scoped>
.stats-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stats-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.1rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
}

.stat b {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
  margin-right: 0.25rem;
}

.stats-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stats-filter {
  flex: 1 1 240px;
  padding: 0.45rem 0.8rem;
  font: inherit;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.stats-filter:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.stats-actions {
  display: flex;
  gap: 0.5rem;
}

.stats-action {
  padding: 0.45rem 0.8rem;
  font: inherit;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.stats-action:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.stats-tree {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
}

.tree-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.tree-head {
  border-top: 0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
}

.tree-name-cell {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: calc(var(--ind) * 1.2rem);
  color: var(--vp-c-text-1);
}

.tree-caret {
  flex: none;
  width: 1rem;
  text-align: center;
  color: var(--vp-c-text-3);
  cursor: pointer;
  user-select: none;
}

.tree-caret:hover {
  color: var(--vp-c-brand-1);
}

.tree-link {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: none;
}

.tree-link:hover {
  color: var(--vp-c-brand-1);
}

.tree-text {
  font-weight: 600;
}

.tree-type {
  flex: none;
  padding: 0.05rem 0.4rem;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 6px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.tree-scope {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}

.tree-row:not(.tree-head):hover {
  background: var(--vp-c-bg-soft);
}

.tree-num {
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--vp-c-text-2);
}

.tree-head .tree-num {
  color: var(--vp-c-text-3);
}

.tree-empty {
  margin: 0;
  padding: 1rem 0.9rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}
</style>
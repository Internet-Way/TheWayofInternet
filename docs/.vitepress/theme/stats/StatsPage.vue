<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { data as statsData } from './stats.data'
import type { PageStats } from './stats.data'
import { MARKER_ALIASES } from '../../plugins/markdown/markers'

const query = ref('')
const expanded = ref(new Set<string>())

interface ScopeRow {
  key: string
  depth: number
  kind: 'department' | 'section' | 'subsection'
  heading: string
  lines: number
  markers: Record<string, number>
  expandable: boolean
}

const keyOf = (p: PageStats): string => p.url

/** Folders whose pages are rewritten to serve at the site root (except blogs). */
const FLAT_FOLDERS = ['index', 'utilpages', 'special']

const hrefOf = (p: PageStats): string => {
  const seg = p.url.split('/').filter(Boolean)
  if (seg.length > 1 && FLAT_FOLDERS.includes(seg[0])) return '/' + seg.slice(1).join('/')
  return p.url
}

const sorted = computed<PageStats[]>(() =>
  [...statsData].sort((a, b) => a.title.localeCompare(b.title))
)

const glance = computed(() => {
  let depts = 0
  let sections = 0
  let subsections = 0
  let lines = 0
  let indexPages = 0
  let blogPages = 0
  const markers: Record<string, number> = {}
  for (const p of statsData) {
    if (p.type === 'index') indexPages++
    else if (p.type === 'blog') blogPages++
    lines += p.lines
    for (const [k, n] of Object.entries(p.markers)) markers[k] = (markers[k] ?? 0) + n
    for (const d of p.departments) {
      depts++
      sections += d.sections?.length ?? 0
      for (const s of d.sections ?? []) subsections += s.subsections?.length ?? 0
    }
  }
  return [
    { label: 'Pages', value: statsData.length },
    { label: 'Index pages', value: indexPages },
    { label: 'Blog pages', value: blogPages },
    { label: 'Lines', value: lines },
    { label: 'Departments', value: depts },
    { label: 'Sections', value: sections },
    { label: 'Subsections', value: subsections },
    { label: 'Marked lines', value: Object.values(markers).reduce((a, b) => a + b, 0) },
  ]
})

const markerTotals = computed(() =>
  Object.entries(
    statsData.reduce<Record<string, number>>((acc, p) => {
      for (const [k, n] of Object.entries(p.markers)) acc[k] = (acc[k] ?? 0) + n
      return acc
    }, {})
  )
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
)

const starCount = (markers: Record<string, number> | undefined): number => markers?.star ?? 0
const glowingCount = (markers: Record<string, number> | undefined): number =>
  markers?.['glowing-star'] ?? 0

const visiblePages = computed(() => {
  const indexPages = sorted.value.filter((p) => p.type === 'index')
  const q = query.value.trim().toLowerCase()
  if (!q) return indexPages
  return indexPages.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.url.toLowerCase().includes(q) ||
      p.departments.some((d) => d.heading.toLowerCase().includes(q))
  )
})

const scopeRows = (p: PageStats): ScopeRow[] => {
  const out: ScopeRow[] = []
  p.departments.forEach((d, di) => {
    const dk = `${keyOf(p)}#${di}`
    out.push({
      key: dk,
      depth: 1,
      kind: 'department',
      heading: d.heading,
      lines: d.lines,
      markers: d.markers,
      expandable: (d.sections?.length ?? 0) > 0,
    })
    if (!expanded.value.has(dk)) return
    d.sections?.forEach((s, si) => {
      const sk = `${dk}.${si}`
      out.push({
        key: sk,
        depth: 2,
        kind: 'section',
        heading: s.heading,
        lines: s.lines,
        markers: s.markers,
        expandable: (s.subsections?.length ?? 0) > 0,
      })
      if (!expanded.value.has(sk)) return
      s.subsections?.forEach((ss, xi) => {
        out.push({
          key: `${sk}.${xi}`,
          depth: 3,
          kind: 'subsection',
          heading: ss.heading,
          lines: ss.lines,
          markers: ss.markers,
          expandable: false,
        })
      })
    })
  })
  return out
}

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
    keys.add(keyOf(p))
    p.departments.forEach((d, di) => {
      const dk = `${keyOf(p)}#${di}`
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
    <section class="stats-block">
      <h3 class="stats-title">At a Glance</h3>
      <div class="stats-tree">
        <div class="tree-row tree-head two-col">
          <span>Metric</span>
          <span class="tree-num">Count</span>
        </div>
        <div v-for="row in glance" :key="row.label" class="tree-row two-col">
          <span class="tree-name-cell">{{ row.label }}</span>
          <span class="tree-num tree-num-strong">{{ row.value }}</span>
        </div>
      </div>
    </section>

    <section v-if="markerTotals.length" class="stats-block">
      <h3 class="stats-title">Markers</h3>
      <div class="stats-tree">
        <div class="tree-row tree-head two-col">
          <span>Marker</span>
          <span class="tree-num">Lines</span>
        </div>
        <div v-for="[k, n] in markerTotals" :key="k" class="tree-row two-col">
          <span class="tree-name-cell">
            <span
              class="marker-tip"
              :data-marker="k"
              :data-tip="MARKER_ALIASES[k]?.label"
            >
              <span :class="MARKER_ALIASES[k]?.icon"></span>
            </span>
            <span class="tree-scope">{{ MARKER_ALIASES[k]?.label }}</span>
          </span>
          <span class="tree-num tree-num-strong">{{ n }}</span>
        </div>
      </div>
    </section>

    <section class="stats-block">
      <h3 class="stats-title">Pages</h3>
      <div class="stats-toolbar">
        <input
          v-model="query"
          type="search"
          class="stats-filter"
          placeholder="Filter index pages, departments, sections…"
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
          <span class="tree-star" title="Stars">
            <span class="i-twemoji-star tree-head-icon"></span>
          </span>
          <span class="tree-star" title="Glowing stars">
            <span class="i-twemoji-glowing-star tree-head-icon"></span>
          </span>
          <span class="tree-num">Lines</span>
        </div>

        <div v-for="p in visiblePages" :key="p.url" class="tree-page">
          <div
            class="tree-row tree-page-row"
            :class="{ 'row-expandable': p.departments.length > 0 }"
            @click="p.departments.length > 0 && toggle(keyOf(p))"
          >
            <span class="tree-name-cell">
              <span
                v-if="p.departments.length > 0"
                class="tree-caret"
                :class="{ open: expanded.has(keyOf(p)) }"
                role="button"
                tabindex="0"
                aria-label="Expand page"
                @click.stop="toggle(keyOf(p))"
                @keydown.enter.stop="toggle(keyOf(p))"
              >
                <svg class="caret-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </span>
              <span v-else class="tree-caret tree-caret-ghost"></span>
              <a :href="hrefOf(p)" class="tree-link" @click.stop>{{ p.title }}</a>
            </span>
            <span class="tree-star">{{ starCount(p.markers) }}</span>
            <span class="tree-star">{{ glowingCount(p.markers) }}</span>
            <span class="tree-num">{{ p.lines }}</span>
          </div>

          <TransitionGroup v-if="expanded.has(keyOf(p))" name="tree" tag="div" class="tree-branch">
            <div
              v-for="r in scopeRows(p)"
              :key="r.key"
              class="tree-row tree-scope-row"
              :class="{ 'row-expandable': r.expandable }"
              :style="{ '--ind': r.depth }"
              @click="r.expandable && toggle(r.key)"
            >
              <span class="tree-name-cell">
                <span
                  v-if="r.expandable"
                  class="tree-caret"
                  :class="{ open: expanded.has(r.key) }"
                  role="button"
                  tabindex="0"
                  aria-label="Expand section"
                  @click.stop="toggle(r.key)"
                  @keydown.enter.stop="toggle(r.key)"
                >
                  <svg class="caret-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </span>
                <span v-else class="tree-caret tree-caret-ghost"></span>
                <span class="tree-scope" :class="`tree-scope-${r.kind}`">{{ r.heading }}</span>
              </span>
              <span class="tree-star">{{ starCount(r.markers) }}</span>
              <span class="tree-star">{{ glowingCount(r.markers) }}</span>
              <span class="tree-num">{{ r.lines }}</span>
            </div>
          </TransitionGroup>
        </div>

        <p v-if="visiblePages.length === 0" class="tree-empty">No index pages match your filter.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stats-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.stats-block {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.stats-title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

.marker-tip {
  display: inline-flex;
  align-items: center;
  vertical-align: -0.125em;
  cursor: help;
  margin-right: 0.45rem;
}

.marker-tip > span {
  width: 1.25em;
  height: 1.25em;
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
  grid-template-columns: minmax(0, 1fr) 56px 56px 64px;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
}

.tree-row.two-col {
  grid-template-columns: minmax(0, 1fr) 120px;
}

.tree-row:hover {
  background: var(--vp-c-bg-soft);
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

.tree-page-row {
  background: var(--vp-c-bg-soft);
}

.tree-page-row.row-expandable {
  cursor: pointer;
}

.tree-page-row:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft));
}

.tree-branch {
  position: relative;
}

.tree-branch::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.4rem;
  width: 1px;
  background: var(--vp-c-divider);
}

.tree-scope-row.row-expandable {
  cursor: pointer;
}

.tree-name-cell {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: calc(var(--ind, 0) * 1.35rem);
  color: var(--vp-c-text-1);
}

.tree-caret {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
  user-select: none;
}

.tree-caret-ghost {
  cursor: default;
}

.tree-caret:hover {
  color: var(--vp-c-brand-1);
}

.caret-svg {
  width: 0.85em;
  height: 0.85em;
  transition: transform 0.18s ease;
}

.tree-caret.open .caret-svg {
  transform: rotate(90deg);
}

.tree-link {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: none;
}

.tree-link:hover {
  color: var(--vp-c-brand-1);
}

.tree-scope {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}

.tree-scope-department {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tree-star {
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: var(--vp-c-text-2);
}

.tree-head-icon {
  width: 1.05em;
  height: 1.05em;
}

.tree-head .tree-star {
  color: var(--vp-c-text-3);
}

.tree-num {
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--vp-c-text-2);
}

.tree-num-strong {
  font-weight: 700;
  color: var(--vp-c-text-1);
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

.tree-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tree-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.tree-leave-active {
  transition: opacity 0.12s ease;
}

.tree-leave-to {
  opacity: 0;
}
</style>

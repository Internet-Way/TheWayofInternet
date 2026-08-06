<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as statsData } from '../stats/stats.data'
import type { PageStats, ScopeStats } from '../stats/stats.data'

interface VPHeader {
  level: number
  title: string
  slug: string
  link: string
  children: VPHeader[]
}

const route = useRoute()
const { page } = useData()
let timer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

const open = ref(false)
const scopeKind = ref<'page' | 'department' | 'section' | 'subsection'>('page')
const scopeName = ref('')
const scopeData = ref<ScopeStats | null>(null)
const pageData = ref<PageStats | null>(null)
const tipPos = ref({ top: 0, left: 0 })
const tipEl = ref<HTMLElement | null>(null)

const kindLabel = {
  page: 'Page',
  department: 'Department',
  section: 'Section',
  subsection: 'Subsection',
} as const

let panel: HTMLElement | null = null
let btnHost: HTMLElement | null = null
let btn: HTMLButtonElement | null = null

const findPage = (path: string): PageStats | null => {
  const clean = path.replace(/\/+$/, '') || '/'
  return statsData.find((p) => p.url === clean) ?? null
}

/** Index path of a header node (by slug) inside the VitePress headers tree. */
const findPath = (headers: VPHeader[], slug: string): number[] | null => {
  const walk = (nodes: VPHeader[], path: number[]): number[] | null => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.slug === slug) return [...path, i]
      if (node.children?.length) {
        const found = walk(node.children, [...path, i])
        if (found) return found
      }
    }
    return null
  }
  return walk(headers, [])
}

/** Map an index path onto the parsed stats tree (same heading order, so paths match). */
const applyPath = (
  p: PageStats,
  path: number[]
): { kind: 'department' | 'section' | 'subsection'; data: ScopeStats } | null => {
  const d = p.departments[path[0]]
  if (!d) return null
  if (path.length === 1) return { kind: 'department', data: d }
  const s = d.sections?.[path[1]]
  if (!s) return null
  if (path.length === 2) return { kind: 'section', data: s }
  const ss = s.subsections?.[path[2]]
  if (!ss) return null
  return { kind: 'subsection', data: ss }
}

const setPageScope = (): void => {
  scopeKind.value = 'page'
  scopeName.value = pageData.value?.title ?? ''
  scopeData.value = null
}

const setScope = (kind: 'department' | 'section' | 'subsection', data: ScopeStats): void => {
  scopeKind.value = kind
  scopeName.value = data.heading
  scopeData.value = data
}

const hideTip = (): void => {
  open.value = false
  btn?.classList.remove('open')
}

const scheduleHide = (): void => {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(hideTip, 150)
}

const cancelHide = (): void => {
  if (hideTimer) clearTimeout(hideTimer)
}

const positionTip = (host: HTMLElement): void => {
  const r = host.getBoundingClientRect()
  open.value = true
  nextTick(() => {
    const el = tipEl.value
    const w = el ? el.offsetWidth : 220
    const h = el ? el.offsetHeight : 0
    const left = r.left - w - 10
    const top = r.top + r.height / 2 - h / 2
    tipPos.value = {
      left: Math.max(8, left < 8 ? r.right + 10 : left),
      top: Math.min(Math.max(8, top), window.innerHeight - h - 8),
    }
  })
}

const detach = (): void => {
  btn?.remove()
  btn = null
  if (btnHost) {
    btnHost.style.position = ''
    btnHost.style.paddingRight = ''
  }
  btnHost = null
  hideTip()
}

const attachTo = (host: HTMLElement): void => {
  if (btnHost === host) return
  detach()
  host.style.position = 'relative'
  host.style.paddingRight = '26px'
  btnHost = host
  btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'sii-chip'
  btn.setAttribute('aria-label', `Show statistics for ${kindLabel[scopeKind.value]}: ${scopeName.value}`)
  btn.innerHTML = '<span class="sii-icon" aria-hidden="true">i</span>'
  btn.addEventListener('mouseenter', () => {
    cancelHide()
    const current = btn
    if (current) {
      current.classList.add('open')
      positionTip(host)
    }
  })
  btn.addEventListener('mouseleave', scheduleHide)
  btn.addEventListener('focus', () => {
    cancelHide()
    btn?.classList.add('open')
    positionTip(host)
  })
  btn.addEventListener('blur', scheduleHide)
  host.appendChild(btn)
}

const onOver = (e: MouseEvent): void => {
  if (!panel || !pageData.value) return
  const target = e.target as HTMLElement
  const link = target.closest('a.outline-link') as HTMLAnchorElement | null
  const title = target.closest('.outline-title') as HTMLElement | null
  if (link) {
    const slug = (link.getAttribute('href') ?? '').replace(/^#/, '')
    const path = findPath(page.value.headers as unknown as VPHeader[], slug)
    const resolved = path ? applyPath(pageData.value, path) : null
    if (resolved) setScope(resolved.kind, resolved.data)
    else setPageScope()
    attachTo(link)
    return
  }
  if (title) {
    setPageScope()
    attachTo(title)
    return
  }
  const titleEl = panel.querySelector('.outline-title') as HTMLElement | null
  if (titleEl && panel.contains(target)) {
    setPageScope()
    attachTo(titleEl)
  }
}

const onPanelLeave = (): void => {
  detach()
}

const cleanup = (): void => {
  detach()
  if (panel) {
    panel.removeEventListener('mouseover', onOver)
    panel.removeEventListener('mouseleave', onPanelLeave)
  }
  panel = null
}

const setup = (tries = 0): void => {
  cleanup()
  const nav = document.querySelector<HTMLElement>('#VPContent nav.VPDocAsideOutline')
  if (!nav) {
    if (tries < 10) timer = setTimeout(() => setup(tries + 1), 100)
    return
  }
  panel = nav
  pageData.value = findPage(location.pathname)
  panel.addEventListener('mouseover', onOver)
  panel.addEventListener('mouseleave', onPanelLeave)
}

const statRows = computed(() => {
  const rows: { label: string; value: number }[] = []
  const d = scopeData.value
  if (scopeKind.value === 'page') {
    const p = pageData.value
    if (!p) return rows
    rows.push({ label: 'Departments', value: p.departments.length })
    rows.push({
      label: 'Sections',
      value: p.departments.flatMap((x) => x.sections ?? []).length,
    })
    rows.push({
      label: 'Subsections',
      value: p.departments.flatMap((x) => x.sections ?? []).flatMap((y) => y.subsections ?? []).length,
    })
    rows.push({ label: 'Lines', value: p.lines })
  } else if (scopeKind.value === 'department' && d) {
    rows.push({ label: 'Sections', value: d.sections?.length ?? 0 })
    rows.push({
      label: 'Subsections',
      value: d.sections?.flatMap((s) => s.subsections ?? []).length ?? 0,
    })
    rows.push({ label: 'Lines', value: d.lines })
  } else if (scopeKind.value === 'section' && d) {
    rows.push({ label: 'Subsections', value: d.subsections?.length ?? 0 })
    rows.push({ label: 'Lines', value: d.lines })
  } else if (d) {
    rows.push({ label: 'Lines', value: d.lines })
  }
  return rows
})

const tipStyle = computed(() => ({
  top: `${tipPos.value.top}px`,
  left: `${tipPos.value.left}px`,
}))

onMounted(async () => {
  await nextTick()
  setup()
  watch(
    () => route.path,
    () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => setup(), 150)
    }
  )
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  if (hideTimer) clearTimeout(hideTimer)
  cleanup()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="tipEl"
      class="sii-tooltip"
      role="tooltip"
      :style="tipStyle"
    >
      <div class="sii-head">
        <span class="sii-kind">{{ kindLabel[scopeKind] }}</span>
        <span class="sii-title">{{ scopeName }}</span>
      </div>
      <dl class="sii-rows">
        <template v-for="row in statRows" :key="row.label">
          <dt class="sii-label">{{ row.label }}</dt>
          <dd class="sii-value">{{ row.value }}</dd>
        </template>
      </dl>
    </div>
  </Teleport>
</template>

<style>
.sii-chip {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  padding: 0;
  font: inherit;
  font-size: 0.68rem;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  color: var(--vp-button-brand-text);
  background: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  z-index: 2;
}

a.outline-link:hover > .sii-chip,
a.outline-link:focus-within > .sii-chip,
.outline-title:hover > .sii-chip,
.sii-chip:focus-visible,
.sii-chip.open {
  opacity: 1;
}

.sii-chip:hover,
.sii-chip:focus-visible {
  background: var(--vp-c-brand-2);
  outline: none;
}

.sii-tooltip {
  position: fixed;
  z-index: 1400;
  width: 220px;
  max-width: calc(100vw - 16px);
  box-sizing: border-box;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.16);
  font-size: 0.82rem;
}

.sii-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 8px;
}

.sii-kind {
  flex: none;
  padding: 0.05rem 0.45rem;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
}

.sii-title {
  flex: 1;
  min-width: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sii-rows {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.15rem 1rem;
  margin: 0;
  font-size: 0.84rem;
}

.sii-label {
  color: var(--vp-c-text-2);
}

.sii-value {
  margin: 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

@media (max-width: 560px) {
  .sii-chip {
    opacity: 1;
  }
}
</style>
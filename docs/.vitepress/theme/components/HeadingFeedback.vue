<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

declare const __DISCORD_WEBHOOK_EDIT__: string

const route = useRoute()
let timer: ReturnType<typeof setTimeout> | undefined

const penIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>'

const open = ref(false)
const where = ref('')
const what = ref('')
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const configured = Boolean(__DISCORD_WEBHOOK_EDIT__)

const clearPencils = () => {
  document.querySelectorAll('.mdh-btn').forEach((el) => el.remove())
}

const setup = () => {
  clearPencils()
  const doc = document.querySelector('#VPContent .vp-doc')
  if (!doc) return
  doc.querySelectorAll('h1, h2, h3, h4').forEach((h) => {
    if (!h.id) return
    ;(h as HTMLElement).style.position = 'relative'
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'mdh-btn'
    btn.setAttribute('aria-label', 'Suggest an edit')
    btn.innerHTML = penIcon
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      openFor(h.id)
    })
    h.appendChild(btn)
  })
}

const openFor = (id: string) => {
  where.value = `${location.pathname}#${id}`
  what.value = ''
  status.value = 'idle'
  open.value = true
}

const close = () => {
  open.value = false
  status.value = 'idle'
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

const submit = async () => {
  errorMsg.value = ''
  if (!what.value.trim()) {
    status.value = 'error'
    errorMsg.value = 'Please write your suggestion first.'
    return
  }
  if (!configured) {
    status.value = 'error'
    errorMsg.value = 'This channel is not configured yet.'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(__DISCORD_WEBHOOK_EDIT__, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'bitindex feedback',
        embeds: [
          {
            title: 'Fix a mistake',
            color: 0x3498db,
            fields: [
              { name: 'Where', value: where.value, inline: false },
              { name: 'What', value: what.value, inline: false }
            ],
            footer: { text: `Submitted from bitindex • ${new Date().toLocaleString()}` }
          }
        ]
      })
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'success'
    what.value = ''
  } catch {
    status.value = 'error'
    errorMsg.value = 'Something went wrong while sending. Please try again.'
  }
}

onMounted(async () => {
  setup()
  watch(
    () => route.path,
    () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => setup(), 150)
    }
  )
  await nextTick()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="mdh-overlay" @click.self="close">
      <div class="mdh-box" role="dialog" aria-modal="true" aria-label="Suggest an edit">
        <div class="mdh-head">
          <span class="mdh-title">Suggest an edit</span>
          <button type="button" class="mdh-close" aria-label="Close" @click="close">&times;</button>
        </div>
        <div class="mdh-row">
          <span class="mdh-label">Where</span>
          <code class="mdh-where">{{ where }}</code>
        </div>
        <div class="mdh-row">
          <label class="mdh-label" for="mdh-what">What</label>
          <textarea
            id="mdh-what"
            v-model="what"
            rows="4"
            placeholder="Describe the change…"
            @keydown.ctrl.enter="submit"
          ></textarea>
        </div>
        <p v-if="status === 'error'" class="mdh-note mdh-error">{{ errorMsg }}</p>
        <p v-else-if="status === 'success'" class="mdh-note mdh-ok">Thanks, your edit was sent.</p>
        <div class="mdh-foot">
          <button type="button" class="mdh-cancel" @click="close">Cancel</button>
          <button
            type="button"
            class="mdh-send"
            :disabled="status === 'sending' || !configured"
            @click="submit"
          >
            {{ status === 'sending' ? 'Sending…' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.mdh-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -0.87em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  font-size: inherit;
  font-weight: 500;
  color: var(--vp-c-text-3);
  opacity: 0;
  -webkit-user-select: none;
  user-select: none;
  transition: color 0.25s, opacity 0.25s;
}

.mdh-btn svg {
  width: 1em;
  height: 1em;
}

.mdh-btn:hover {
  color: var(--vp-c-brand-1);
}

.mdh-btn:focus-visible {
  opacity: 1;
  outline: none;
  color: var(--vp-c-brand-1);
}

.vp-doc h1:hover .mdh-btn,
.vp-doc h1 .mdh-btn:focus-visible,
.vp-doc h2:hover .mdh-btn,
.vp-doc h2 .mdh-btn:focus-visible,
.vp-doc h3:hover .mdh-btn,
.vp-doc h3 .mdh-btn:focus-visible,
.vp-doc h4:hover .mdh-btn,
.vp-doc h4 .mdh-btn:focus-visible {
  opacity: 1;
}

.vp-doc h2 .mdh-btn {
  top: 24px;
}

@media (max-width: 560px) {
  .mdh-btn {
    opacity: 1;
  }
}
</style>

<style scoped>
.mdh-overlay {
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 16px 16px;
  background: rgba(0, 0, 0, 0.35);
}

.mdh-box {
  width: 440px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.mdh-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.mdh-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mdh-close {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: var(--vp-c-text-3);
  padding: 0 2px;
}

.mdh-close:hover {
  color: var(--vp-c-text-1);
}

.mdh-row:not(:last-child) {
  margin-bottom: 12px;
}

.mdh-label {
  display: block;
  margin: 0 0 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.mdh-where {
  display: block;
  padding: 8px 10px;
  font-size: 12.5px;
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow-wrap: anywhere;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 11px;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

textarea:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.mdh-note {
  margin: 10px 0 0;
  font-size: 13px;
}

.mdh-note-err,
.mdh-error {
  color: var(--vp-c-danger-1);
}

.mdh-ok {
  color: var(--vp-c-brand-1);
}

.mdh-foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.mdh-cancel {
  padding: 8px 14px;
  font: inherit;
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
}

.mdh-cancel:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.mdh-send {
  padding: 8px 18px;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.mdh-send:hover:not(:disabled) {
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.mdh-send:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
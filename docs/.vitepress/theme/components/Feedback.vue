<script setup lang="ts">
import { computed, ref } from 'vue'

declare const __DISCORD_WEBHOOK_ADD_REMOVE__: string
declare const __DISCORD_WEBHOOK_STAR_UNSTAR__: string
declare const __DISCORD_WEBHOOK_EDIT__: string
declare const __DISCORD_WEBHOOK_THANKS__: string

type FeedbackType = 'add' | 'remove' | 'star' | 'unstar' | 'edit' | 'thanks'

const types: { value: FeedbackType; label: string }[] = [
  { value: 'add', label: 'Add a link' },
  { value: 'remove', label: 'Remove a link' },
  { value: 'star', label: 'Star a link' },
  { value: 'unstar', label: 'Unstar a link' },
  { value: 'edit', label: 'Fix a mistake' },
  { value: 'thanks', label: 'Say thanks' }
]

const type = ref<FeedbackType>('add')

const name = ref('')
const link = ref('')
const shortDesc = ref('')
const longDesc = ref('')
const contact = ref('')
const editWhere = ref('')
const editWhat = ref('')
const thanksMsg = ref('')

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const webhookMap: Record<FeedbackType, string> = {
  add: __DISCORD_WEBHOOK_ADD_REMOVE__,
  remove: __DISCORD_WEBHOOK_ADD_REMOVE__,
  star: __DISCORD_WEBHOOK_STAR_UNSTAR__,
  unstar: __DISCORD_WEBHOOK_STAR_UNSTAR__,
  edit: __DISCORD_WEBHOOK_EDIT__,
  thanks: __DISCORD_WEBHOOK_THANKS__
}

const activeWebhook = computed(() => webhookMap[type.value])
const configured = computed(() => Boolean(activeWebhook.value))

const titles: Record<FeedbackType, string> = {
  add: 'Add Link',
  remove: 'Remove Link',
  star: 'Star Link',
  unstar: 'Unstar Link',
  edit: 'Fix a mistake',
  thanks: 'Say thanks'
}

const colors: Record<FeedbackType, number> = {
  add: 0x2ecc71,
  remove: 0xe74c3c,
  star: 0xf1c40f,
  unstar: 0xe67e22,
  edit: 0x3498db,
  thanks: 0x9b59b6
}

const isLinkForm = computed(() =>
  type.value === 'add' || type.value === 'remove' || type.value === 'star' || type.value === 'unstar'
)
const showName = computed(() => type.value === 'add' || type.value === 'star')
const longRequired = computed(() => type.value === 'remove' || type.value === 'star' || type.value === 'unstar')

const truncate = (s: string, n = 1000) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

const validate = (): string | null => {
  if (isLinkForm.value) {
    if (showName.value && !name.value.trim()) return 'Name is required'
    if (!link.value.trim()) return 'Link is required'
    if (showName.value && !shortDesc.value.trim()) return 'Short description is required'
    if (longRequired.value && !longDesc.value.trim()) return 'Description is required'
    if (!contact.value.trim()) return 'Contact is required'
  } else if (type.value === 'edit') {
    if (!editWhere.value.trim()) return 'Where is required'
    if (!editWhat.value.trim()) return 'What is required'
  } else if (!thanksMsg.value.trim()) {
    return 'Message is required'
  }
  return null
}

const buildFields = () => {
  if (isLinkForm.value) {
    const fields: { name: string; value: string; inline?: boolean }[] = []
    if (showName.value) {
      fields.push(
        { name: 'Name', value: truncate(name.value.trim()), inline: true },
        { name: 'Link', value: link.value.trim(), inline: false },
        { name: 'Short description', value: truncate(shortDesc.value.trim()), inline: false }
      )
    } else {
      fields.push({ name: 'Link', value: link.value.trim(), inline: false })
    }
    fields.push({ name: 'Long description', value: truncate(longDesc.value.trim()), inline: false })
    fields.push({ name: 'Contact', value: truncate(contact.value.trim()), inline: true })
    return fields
  }
  if (type.value === 'edit') {
    return [
      { name: 'Where', value: truncate(editWhere.value.trim()), inline: false },
      { name: 'What', value: truncate(editWhat.value.trim()), inline: false }
    ]
  }
  return [{ name: 'Message', value: truncate(thanksMsg.value.trim()), inline: false }]
}

const resetForm = () => {
  name.value = ''
  link.value = ''
  shortDesc.value = ''
  longDesc.value = ''
  contact.value = ''
  editWhere.value = ''
  editWhat.value = ''
  thanksMsg.value = ''
}

const submit = async () => {
  errorMsg.value = ''
  const err = validate()
  if (err) {
    status.value = 'error'
    errorMsg.value = err
    return
  }
  if (!configured.value) {
    status.value = 'error'
    errorMsg.value = 'This channel is not configured yet. Please try again later.'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(activeWebhook.value, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'bitindex feedback',
        embeds: [
          {
            title: titles[type.value],
            color: colors[type.value],
            fields: buildFields(),
            footer: { text: `Submitted from bitindex • ${new Date().toLocaleString()}` }
          }
        ]
      })
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'success'
    resetForm()
  } catch {
    status.value = 'error'
    errorMsg.value = 'Something went wrong while sending. Please try again.'
  }
}
</script>

<template>
  <div class="panel">
    <div class="field">
      <label for="f-type">Request type</label>
      <div class="select">
        <select id="f-type" v-model="type">
          <option v-for="t in types" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
      </div>
    </div>

    <template v-if="isLinkForm">
      <div class="grid">
        <div v-if="showName" class="field">
          <label for="f-name">Name <span class="req">*</span></label>
          <input id="f-name" v-model="name" type="text" placeholder="Your name" />
        </div>
        <div class="field">
          <label for="f-contact">Contact <span class="req">*</span></label>
          <input id="f-contact" v-model="contact" type="text" placeholder="Email or Discord username" />
        </div>
        <div class="field">
          <label for="f-link">Link <span class="req">*</span></label>
          <input id="f-link" v-model="link" type="text" placeholder="https://example.com" />
        </div>
        <div v-if="showName" class="field">
          <label for="f-short">Short description <span class="req">*</span></label>
          <input id="f-short" v-model="shortDesc" type="text" placeholder="One-line summary" />
        </div>
      </div>
      <div class="field">
        <label for="f-long">
          {{ showName ? 'Long description' : 'Reason' }}
          <span v-if="longRequired" class="req">*</span>
          <span v-else class="opt">optional</span>
        </label>
        <textarea
          id="f-long"
          v-model="longDesc"
          rows="3"
          :placeholder="longRequired ? 'Why?' : 'Details, if needed…'"
        ></textarea>
      </div>
    </template>

    <template v-else-if="type === 'edit'">
      <div class="field">
        <label for="f-where">Where <span class="req">*</span></label>
        <input id="f-where" v-model="editWhere" type="text" placeholder="Page or anchor, e.g. /media/ai#chatbots" />
      </div>
      <div class="field">
        <label for="f-what">What <span class="req">*</span></label>
        <textarea id="f-what" v-model="editWhat" rows="4" placeholder="Describe the change…"></textarea>
      </div>
    </template>

    <template v-else>
      <div class="field">
        <label for="f-thanks">Message <span class="req">*</span></label>
        <input id="f-thanks" v-model="thanksMsg" type="text" placeholder="Short thank-you note" maxlength="300" />
      </div>
    </template>

    <div class="footer">
      <p v-if="configured" class="note">{{ types.find((t) => t.value === type)?.label }}</p>
      <p v-else class="note iswarn">This channel is not configured yet.</p>
      <p v-if="status === 'error'" class="note note-error" aria-live="polite">{{ errorMsg }}</p>
      <p v-else-if="status === 'success'" class="note note-ok" aria-live="polite">Thanks, your feedback was sent.</p>
      <button
        type="button"
        class="btn"
        :disabled="status === 'sending' || !configured"
        @click="submit"
      >
        {{ status === 'sending' ? 'Sending…' : 'Send' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.panel {
  max-width: 640px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.field {
  margin-bottom: 14px;
}

.field label {
  display: block;
  margin: 0 0 6px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-2);
}

.req {
  color: var(--vp-c-danger-1);
}

.opt {
  margin-left: 4px;
  font-weight: 400;
  color: var(--vp-c-text-3);
}

input,
textarea,
select {
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
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

textarea {
  resize: vertical;
  min-height: 72px;
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.select {
  position: relative;
}

.select::after {
  content: '';
  position: absolute;
  right: 14px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid var(--vp-c-text-3);
  border-bottom: 1.5px solid var(--vp-c-text-3);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}

.select select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 36px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 14px;
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-top: 18px;
}

.note {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.note.iswarn {
  color: var(--vp-c-warning-1, #c26b1d);
}

.note-error {
  color: var(--vp-c-danger-1);
}

.note-ok {
  color: var(--vp-c-brand-1);
}

.btn {
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

.btn:hover:not(:disabled) {
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
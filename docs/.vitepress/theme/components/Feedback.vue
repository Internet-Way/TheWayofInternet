<script setup lang="ts">
import { computed, ref } from 'vue'

declare const __DISCORD_WEBHOOK_ADD_STAR__: string
declare const __DISCORD_WEBHOOK_REMOVE_UNSTAR__: string
declare const __DISCORD_WEBHOOK_EDIT__: string
declare const __DISCORD_WEBHOOK_THANKS__: string

type FeedbackType = 'add' | 'remove' | 'edit' | 'thanks'

const types: { value: FeedbackType; label: string }[] = [
  { value: 'add', label: 'Add Link / Star Link' },
  { value: 'remove', label: 'Remove Link / Unstar Link' },
  { value: 'edit', label: 'Suggest Edit' },
  { value: 'thanks', label: 'Say Thanks' }
]

const type = ref<FeedbackType>('add')
const addMode = ref<'add' | 'star'>('add')
const removeMode = ref<'remove' | 'unstar'>('remove')

const name = ref('')
const link = ref('')
const shortDesc = ref('')
const longDesc = ref('')
const contact = ref('')

const rmLink = ref('')
const rmLongDesc = ref('')
const rmContact = ref('')

const editWhere = ref('')
const editWhat = ref('')

const thanksMsg = ref('')

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const webhookMap: Record<FeedbackType, string> = {
  add: __DISCORD_WEBHOOK_ADD_STAR__,
  remove: __DISCORD_WEBHOOK_REMOVE_UNSTAR__,
  edit: __DISCORD_WEBHOOK_EDIT__,
  thanks: __DISCORD_WEBHOOK_THANKS__
}

const activeWebhook = computed(() => webhookMap[type.value])
const webhookConfigured = computed(() => Boolean(activeWebhook.value))

const typeTitle = computed(() => {
  switch (type.value) {
    case 'add':
      return addMode.value === 'star' ? '⭐ Star Link' : '➕ Add Link'
    case 'remove':
      return removeMode.value === 'unstar' ? '⭐ Unstar Link' : '➖ Remove Link'
    case 'edit':
      return '✏️ Suggest Edit'
    case 'thanks':
      return '💜 Say Thanks'
  }
})

const truncate = (s: string, n = 1000) =>
  s.length > n ? s.slice(0, n - 1) + '…' : s

const validate = (): string | null => {
  if (type.value === 'add') {
    if (!name.value.trim()) return 'Name is required'
    if (!link.value.trim()) return 'Link is required'
    if (!shortDesc.value.trim()) return 'Short Description is required'
    if (addMode.value === 'star' && !longDesc.value.trim())
      return 'Long Description is required for Star Link'
    if (!contact.value.trim()) return 'Contact is required'
  } else if (type.value === 'remove') {
    if (!rmLink.value.trim()) return 'Link is required'
    if (!rmLongDesc.value.trim()) return 'Long Description is required'
    if (!rmContact.value.trim()) return 'Contact is required'
  } else if (type.value === 'edit') {
    if (!editWhere.value.trim()) return 'Where is required'
    if (!editWhat.value.trim()) return 'What is required'
  } else {
    if (!thanksMsg.value.trim()) return 'Message is required'
  }
  return null
}

const buildFields = () => {
  if (type.value === 'add') {
    const fields: { name: string; value: string; inline?: boolean }[] = [
      { name: 'Action', value: addMode.value === 'star' ? 'Star Link' : 'Add Link', inline: true },
      { name: 'Name', value: truncate(name.value.trim()), inline: true },
      { name: 'Link', value: link.value.trim(), inline: false },
      { name: 'Short Description', value: truncate(shortDesc.value.trim()), inline: false }
    ]
    if (longDesc.value.trim())
      fields.push({ name: 'Long Description', value: truncate(longDesc.value.trim()), inline: false })
    fields.push({ name: 'Contact', value: truncate(contact.value.trim()), inline: true })
    return fields
  }
  if (type.value === 'remove') {
    return [
      { name: 'Action', value: removeMode.value === 'unstar' ? 'Unstar Link' : 'Remove Link', inline: true },
      { name: 'Link', value: rmLink.value.trim(), inline: false },
      { name: 'Long Description', value: truncate(rmLongDesc.value.trim()), inline: false },
      { name: 'Contact', value: truncate(rmContact.value.trim()), inline: true }
    ]
  }
  if (type.value === 'edit') {
    return [
      { name: 'Where', value: truncate(editWhere.value.trim()), inline: false },
      { name: 'What', value: truncate(editWhat.value.trim()), inline: false }
    ]
  }
  return [{ name: 'Message', value: truncate(thanksMsg.value.trim()), inline: false }]
}

const colors: Record<FeedbackType, number> = {
  add: 0x2ecc71,
  remove: 0xe74c3c,
  edit: 0x3498db,
  thanks: 0x9b59b6
}

const resetForm = () => {
  name.value = ''
  link.value = ''
  shortDesc.value = ''
  longDesc.value = ''
  contact.value = ''
  rmLink.value = ''
  rmLongDesc.value = ''
  rmContact.value = ''
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
  if (!webhookConfigured.value) {
    status.value = 'error'
    errorMsg.value = 'This feedback channel is not configured yet. Please try again later.'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(activeWebhook.value, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'bitindex Feedback',
        embeds: [
          {
            title: typeTitle.value,
            color: colors[type.value],
            fields: buildFields(),
            footer: {
              text: `Submitted from bitindex • ${new Date().toLocaleString()}`
            }
          }
        ]
      })
    })
    if (!res.ok) throw new Error(`Discord responded with ${res.status}`)
    status.value = 'success'
    resetForm()
  } catch (e) {
    status.value = 'error'
    errorMsg.value = 'Something went wrong while sending. Please try again.'
  }
}
</script>

<template>
  <div class="feedback-card">
    <div class="f-group">
      <label class="f-label" for="feedback-type">Feedback Type</label>
      <select id="feedback-type" v-model="type" class="f-input">
        <option v-for="t in types" :key="t.value" :value="t.value">
          {{ t.label }}
        </option>
      </select>
    </div>

    <template v-if="type === 'add'">
      <div class="f-seg" role="tablist" aria-label="Add or Star">
        <button
          type="button"
          class="f-seg-btn"
          :class="{ active: addMode === 'add' }"
          @click="addMode = 'add'"
        >
          ➕ Add Link
        </button>
        <button
          type="button"
          class="f-seg-btn"
          :class="{ active: addMode === 'star' }"
          @click="addMode = 'star'"
        >
          ⭐ Star Link
        </button>
      </div>
      <div class="f-group">
        <label class="f-label" for="f-name">Name <span class="req">*</span></label>
        <input id="f-name" v-model="name" class="f-input" type="text" placeholder="Your name" />
      </div>
      <div class="f-group">
        <label class="f-label" for="f-link">Link <span class="req">*</span></label>
        <input id="f-link" v-model="link" class="f-input" type="text" placeholder="https://example.com" />
      </div>
      <div class="f-group">
        <label class="f-label" for="f-short">Short Description <span class="req">*</span></label>
        <input id="f-short" v-model="shortDesc" class="f-input" type="text" placeholder="What is it?" />
      </div>
      <div class="f-group">
        <label class="f-label" for="f-long">
          Long Description <span v-if="addMode === 'star'" class="req">*</span>
          <span v-else class="opt">optional</span>
        </label>
        <textarea
          id="f-long"
          v-model="longDesc"
          class="f-input f-area"
          rows="4"
          placeholder="Details, features, why it deserves a spot…"
        ></textarea>
      </div>
      <div class="f-group">
        <label class="f-label" for="f-contact">
          Contact Email / Discord Username <span class="req">*</span>
        </label>
        <input id="f-contact" v-model="contact" class="f-input" type="text" placeholder="So we can reach you" />
      </div>
    </template>

    <template v-else-if="type === 'remove'">
      <div class="f-seg" role="tablist" aria-label="Remove or Unstar">
        <button
          type="button"
          class="f-seg-btn"
          :class="{ active: removeMode === 'remove' }"
          @click="removeMode = 'remove'"
        >
          ➖ Remove Link
        </button>
        <button
          type="button"
          class="f-seg-btn"
          :class="{ active: removeMode === 'unstar' }"
          @click="removeMode = 'unstar'"
        >
          ⭐ Unstar Link
        </button>
      </div>
      <div class="f-group">
        <label class="f-label" for="f-rm-link">Link <span class="req">*</span></label>
        <input id="f-rm-link" v-model="rmLink" class="f-input" type="text" placeholder="https://example.com" />
      </div>
      <div class="f-group">
        <label class="f-label" for="f-rm-long">Long Description <span class="req">*</span></label>
        <textarea
          id="f-rm-long"
          v-model="rmLongDesc"
          class="f-input f-area"
          rows="4"
          placeholder="Why should it be removed/unstarred?"
        ></textarea>
      </div>
      <div class="f-group">
        <label class="f-label" for="f-rm-contact">
          Contact Email / Discord Username <span class="req">*</span>
        </label>
        <input id="f-rm-contact" v-model="rmContact" class="f-input" type="text" placeholder="So we can reach you" />
      </div>
    </template>

    <template v-else-if="type === 'edit'">
      <div class="f-group">
        <label class="f-label" for="f-edit-where">
          Where <span class="req">*</span>
        </label>
        <input
          id="f-edit-where"
          v-model="editWhere"
          class="f-input"
          type="text"
          placeholder="Page link or anchor, e.g. /media/ai#chatbots"
        />
      </div>
      <div class="f-group">
        <label class="f-label" for="f-edit-what">What <span class="req">*</span></label>
        <textarea
          id="f-edit-what"
          v-model="editWhat"
          class="f-input f-area"
          rows="5"
          placeholder="Describe the change you want…"
        ></textarea>
      </div>
    </template>

    <template v-else>
      <div class="f-group">
        <label class="f-label" for="f-thanks">Message <span class="req">*</span></label>
        <input
          id="f-thanks"
          v-model="thanksMsg"
          class="f-input"
          type="text"
          placeholder="A short thank you message"
          maxlength="300"
        />
      </div>
    </template>

    <p v-if="!webhookConfigured" class="f-hint">
      This feedback channel is not configured yet.
    </p>

    <p v-if="status === 'error'" class="f-status f-error">{{ errorMsg }}</p>
    <p v-else-if="status === 'success'" class="f-status f-success">
      Thanks! Your feedback has been submitted.
    </p>

    <button
      type="button"
      class="f-submit"
      :disabled="status === 'sending' || !webhookConfigured"
      @click="submit"
    >
      {{ status === 'sending' ? 'Sending…' : 'Submit Feedback' }}
    </button>
  </div>
</template>

<style scoped>
.feedback-card {
  max-width: 680px;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  margin: 24px 0;
}

.f-group:not(:last-child) {
  margin-bottom: 16px;
}

.f-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.req {
  color: #e74c3c;
}

.opt {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.f-input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
}

.f-input:focus {
  border-color: var(--vp-c-brand-1);
}

.f-area {
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
}

select.f-input {
  cursor: pointer;
}

.f-seg {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.f-seg-btn {
  flex: 1;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.f-seg-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.f-seg-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.f-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 12px 0 0;
}

.f-status {
  font-size: 14px;
  margin: 12px 0 0;
}

.f-error {
  color: #e74c3c;
}

.f-success {
  color: #2ecc71;
}

.f-submit {
  margin-top: 20px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-button-brand-text);
  background: var(--vp-button-brand-bg);
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.f-submit:hover:not(:disabled) {
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.f-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

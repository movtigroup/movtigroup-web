<template>
  <div class="contact-page">
    <section class="page-header" v-reveal>
      <div class="container">
        <h1>{{ $t('nav.contact') }}</h1>
        <p>Get in touch with the MovtiGroup team</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info" v-reveal>
            <h2>Contact Information</h2>
            <div class="info-item">
              <span class="info-icon"><UiIcon icon="mail" :size="18" /></span>
              <div>
                <strong>Email</strong>
                <p><a href="mailto:info@movtigroup.me">info@movtigroup.me</a></p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon"><BrandIcon icon="github" :size="18" /></span>
              <div>
                <strong>GitHub</strong>
                <p><a href="https://github.com/movtigroup" target="_blank" rel="noopener">github.com/movtigroup</a></p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon"><BrandIcon icon="linkedin" :size="17" /></span>
              <div>
                <strong>LinkedIn</strong>
                <p><a href="https://www.linkedin.com/company/movtigroup/" target="_blank" rel="noopener">linkedin.com/company/movtigroup</a></p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon"><UiIcon icon="git-branch" :size="18" /></span>
              <div>
                <strong>Hamgit</strong>
                <p><a href="https://hamgit.ir/tahavey18/MovtiGroup" target="_blank" rel="noopener">hamgit.ir/tahavey18/MovtiGroup</a></p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon"><BrandIcon icon="x" :size="15" /></span>
              <div>
                <strong>X (Twitter)</strong>
                <p><a href="https://x.com/movtigroup" target="_blank" rel="noopener">@movtigroup</a></p>
              </div>
            </div>
          </div>

          <div class="contact-form" v-reveal="{ delay: 120 }">
            <h2>Send us a message</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="form.name" required maxlength="120" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required maxlength="200" />
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" v-model="form.subject" required maxlength="200" />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" rows="5" required maxlength="5000"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Sending…' : 'Send Message' }}
              </button>
              <p v-if="status === 'success'" class="form-feedback success">
                ✓ Thank you! Your message has been received — we will get back to you soon.
              </p>
              <p v-else-if="status === 'error'" class="form-feedback error">
                ✗ Something went wrong ({{ errorMessage }}). Please try again or email us directly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { locale } = useI18n()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const status = ref('idle') // idle | sending | success | error
const errorMessage = ref('')

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

const submitForm = async () => {
  status.value = 'sending'
  errorMessage.value = ''
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { ...form, locale: locale.value }
    })
    status.value = 'success'
    resetForm()
    setTimeout(() => { status.value = 'idle' }, 8000)
  } catch (err) {
    status.value = 'error'
    errorMessage.value = err?.data?.message || err?.message || 'network error'
  }
}

useSeoMeta({
  title: 'Contact Us — MovtiGroup',
  description: 'Get in touch with the MovtiGroup team — questions, feedback, collaborations and support.'
})
</script>

<style scoped>
.form-feedback {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.form-feedback.success {
  background: rgba(0, 206, 201, 0.12);
  border: 1px solid rgba(0, 206, 201, 0.35);
  color: var(--accent);
}

.form-feedback.error {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.35);
  color: #ff6b6b;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>

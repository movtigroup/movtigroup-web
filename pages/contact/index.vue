<template>
  <div class="contact-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('nav.contact') }}</h1>
        <p>Get in touch with the MovtiGroup team</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Contact Information</h2>
            <div class="info-item">
              <span class="info-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>info@movtigroup.me</p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">🐙</span>
              <div>
                <strong>GitHub</strong>
                <p>github.com/movtigroup</p>
              </div>
            </div>
            <div class="info-item">
              <span class="info-icon">🐦</span>
              <div>
                <strong>Twitter</strong>
                <p>@movtigroup</p>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h2>Send us a message</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="form.name" required />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required />
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" v-model="form.subject" required />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  alert('Thank you for your message! We will get back to you soon.')
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}
</script>

<style scoped>
.contact-page {
  padding-top: 100px;
}

.page-header {
  text-align: center;
  padding: 3rem 0;
  background: var(--bg-card);
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-muted);
}

.contact-content {
  padding: 3rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info h2,
.contact-form h2 {
  color: var(--text-bright);
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: var(--radius);
}

.info-icon {
  font-size: 1.5rem;
}

.info-item strong {
  color: var(--text-bright);
  display: block;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: var(--text-muted);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(108,92,231,0.1);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>

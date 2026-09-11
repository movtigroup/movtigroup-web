<template>
  <section class="page-hero">
    <div class="page-hero-bg" aria-hidden="true"></div>
    <div class="page-hero-grid" aria-hidden="true"></div>
    <div class="container page-hero-inner">
      <span v-if="badge" class="page-hero-badge">
        <UiIcon icon="sparkles" :size="13" />
        {{ badge }}
      </span>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p class="page-hero-subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' }
})
</script>

<style scoped>
.page-hero {
  position: relative;
  text-align: center;
  padding: 7.5rem 0 3.5rem;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(600px 260px at 50% 0%, rgba(108, 92, 231, 0.22), transparent 70%),
    radial-gradient(420px 220px at 82% 18%, rgba(0, 206, 201, 0.14), transparent 70%),
    radial-gradient(420px 220px at 18% 24%, rgba(253, 121, 168, 0.10), transparent 70%);
  animation: heroBgShift 9s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes heroBgShift {
  from { opacity: 0.75; transform: translateY(0); }
  to { opacity: 1; transform: translateY(-8px); }
}

.page-hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(560px 300px at 50% 0%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(560px 300px at 50% 0%, #000 30%, transparent 75%);
  pointer-events: none;
}

.page-hero-inner {
  position: relative;
}

.page-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(108, 92, 231, 0.4);
  background: rgba(108, 92, 231, 0.12);
  color: #a29bfe;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1.1rem;
  animation: badgeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.page-hero-title {
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  background: linear-gradient(120deg, #fff 30%, #a29bfe 65%, var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
  animation: titleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.08s;
}

.page-hero-subtitle {
  color: var(--text-muted);
  font-size: clamp(1rem, 2.4vw, 1.15rem);
  max-width: 620px;
  margin: 0 auto;
  animation: titleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both 0.18s;
}

@keyframes titleIn {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes badgeIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 480px) {
  .page-hero {
    padding: 6.5rem 0 2.5rem;
  }
}
</style>

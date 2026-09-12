<template>
  <div class="collaborations-page">
    <PageHero
      :title="$t('nav.collaborations')"
      :subtitle="$t('collaborations.heroSubtitle')"
      :badge="$t('collaborations.heroBadge')"
    />

    <section class="collaborations-content">
      <div class="container">
        <div class="card-grid">
          <div
            v-for="(collab, i) in collabs"
            :key="collab.name"
            class="card collab-card"
            v-reveal="{ delay: (i % 3) * 120 }"
          >
            <div class="collab-header">
              <div class="collab-icon">
                <BrandIcon
                  v-if="collab.icon.kind === 'brand'"
                  :icon="collab.icon.value"
                  :raw="collab.icon.raw"
                  :size="26"
                />
                <UiIcon v-else :icon="collab.icon.value" :size="26" />
              </div>
              <div>
                <h3>{{ collab.name }}</h3>
                <span class="collab-tag">{{ collab.tag }}</span>
              </div>
            </div>
            <p>{{ collab.description }}</p>
            <a :href="collab.url" target="_blank" rel="noopener" class="btn btn-primary btn-small">
              {{ $t('collaborations.viewGithub') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const collabs = useCollaborations()

useSeoMeta({
  title: () => `${t('nav.collaborations')} — MovtiGroup`,
  description: () => t('collaborations.heroSubtitle')
})
</script>

<style scoped>
.collaborations-page {
  padding-bottom: 2rem;
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

.collaborations-content {
  padding: 3rem 0;
}

.collab-card {
  padding: 2rem;
}

.collab-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.collab-icon {
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(0, 206, 201, 0.18));
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
  transition: var(--transition);
}

.collab-card:hover .collab-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 22px rgba(108, 92, 231, 0.45);
}

.collab-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.25rem;
}

.collab-tag {
  color: var(--accent);
  font-size: 0.85rem;
}

.collab-card p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}
</style>

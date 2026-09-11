<template>
  <div class="projects-page">
    <section class="page-header" v-reveal>
      <div class="container">
        <h1>{{ $t('nav.projects') }}</h1>
        <p>Open source tools and frameworks built with passion</p>
      </div>
    </section>

    <section class="projects-content">
      <div class="container">
        <div class="card-grid">
          <div class="card project-card" v-reveal="{ delay: 0 }">
            <div class="project-icon"><BrandIcon icon="nousresearch" :size="30" /></div>
            <h3>Hermes Agent</h3>
            <p>Self-hosted AI agent framework with deep integration for developers and teams seeking full control.</p>
            <div class="project-links">
              <a href="https://github.com/NousResearch/hermes-agent" target="_blank" class="btn btn-primary btn-small">GitHub</a>
            </div>
          </div>
          <div class="card project-card" v-reveal="{ delay: 120 }">
            <div class="project-icon"><UiIcon icon="code" :size="28" /></div>
            <h3>Kilo Code</h3>
            <p>Open-source AI coding assistant with model routing, benchmarking, and autonomous coding capabilities.</p>
            <div class="project-links">
              <a href="https://github.com/kilo-org/kilo" target="_blank" class="btn btn-primary btn-small">GitHub</a>
            </div>
          </div>
          <div class="card project-card" v-reveal="{ delay: 240 }">
            <div class="project-icon"><UiIcon icon="atom" :size="28" /></div>
            <h3>Dirac.run</h3>
            <p>Advanced AI agent platform for automated task execution, research, and multi-step problem solving.</p>
            <div class="project-links">
              <a href="https://github.com/dirac-run/dirac" target="_blank" class="btn btn-primary btn-small">GitHub</a>
            </div>
          </div>
          <div class="card project-card" v-reveal="{ delay: 0 }">
            <div class="project-icon"><BrandIcon icon="telegram" :size="28" /></div>
            <h3>ArmiGram</h3>
            <p>Visual Social Network - A modern platform for sharing visual content with AI-powered features.</p>
            <div class="project-links">
              <a href="#" class="btn btn-primary btn-small">Learn More</a>
            </div>
          </div>
          <div class="card project-card" v-reveal="{ delay: 120 }">
            <div class="project-icon"><BrandIcon icon="midjourney" :size="28" /></div>
            <h3>AnimeTi</h3>
            <p>Anime & Entertainment Platform - Streaming and community platform for anime enthusiasts.</p>
            <div class="project-links">
              <a href="#" class="btn btn-primary btn-small">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
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

.projects-content {
  padding: 3rem 0;
}

.project-card {
  padding: 2rem;
  text-align: center;
}

.project-icon {
  display: inline-grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(0, 206, 201, 0.18));
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.project-card:hover .project-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 22px rgba(108, 92, 231, 0.45);
  transform: translateY(-3px) scale(1.05);
}

.project-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.project-card p {
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-links {
  margin-top: 1rem;
}
</style>

<script setup>
useSeoMeta({
  title: 'Open Source Projects — MovtiGroup',
  description: 'Explore open source tools and frameworks built by MovtiGroup: AI agents, automation, developer infrastructure and more.'
})
</script>

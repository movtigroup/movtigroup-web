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
          <div class="card project-card" v-for="(project, index) in projects" :key="project.name" v-reveal="{ delay: (index % 3) * 120 }">
            <div class="project-icon">
              <UiIcon v-if="project.uiIcon" :icon="project.uiIcon" :size="28" />
              <BrandIcon v-else-if="project.brandIcon" :icon="project.brandIcon" :size="28" />
            </div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-links">
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="btn btn-primary btn-small">
                <BrandIcon icon="github" :size="14" /> GitHub
              </a>
              <a v-if="project.homepage" :href="project.homepage" target="_blank" rel="noopener" class="btn btn-secondary btn-small">
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-more" v-reveal>
      <div class="container">
        <p>
          This is a selection — explore the full list on
          <a href="https://github.com/orgs/movtigroup/repositories" target="_blank" rel="noopener">GitHub</a>
          or <a href="https://hamgit.ir/tahavey18/MovtiGroup" target="_blank" rel="noopener">Hamgit</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Open Source Projects — MovtiGroup',
  description: 'Explore open source tools and frameworks built by MovtiGroup: AI proxies, mirrors, encoding libraries, Docker tooling and more.'
})

// Flagship MovtiGroup open-source projects (github.com/movtigroup)
const projects = [
  {
    name: 'MovtiGroup Web',
    brandIcon: 'github',
    description: 'This very website — a bilingual (EN/FA) Nuxt 3 site with Nuxt Content v3, full SEO, self-hosted fonts and Docker deployment.',
    github: 'https://github.com/movtigroup/movtigroup-web',
    homepage: 'https://movtigroup.me'
  },
  {
    name: 'Liara Chat Completion Proxy',
    brandIcon: 'openai',
    description: 'Advanced proxy for AI chat-completion models with multi-model support, failover and professional features on Liara Cloud.',
    github: 'https://github.com/movtigroup/Liara_Chat_Completion_Proxy'
  },
  {
    name: 'Iran System Encoding',
    uiIcon: 'code',
    description: 'Library for the Iran System character encoding — convert legacy Persian text for SMS and embedded systems.',
    github: 'https://github.com/movtigroup/Iran-System-encoding',
    homepage: 'https://movtigroup.github.io/Iran-System-encoding/'
  },
  {
    name: 'Docker Installer',
    uiIcon: 'layers',
    description: 'One-command Docker installation script tuned for servers in Iran, with registry mirrors baked in.',
    github: 'https://github.com/movtigroup/docker',
    homepage: 'https://install.3cn.ir'
  },
  {
    name: 'Mirror',
    uiIcon: 'arrow-right',
    description: 'Documentation and browse mirror for 🇮🇷 — fast access to popular developer resources from inside Iran.',
    github: 'https://github.com/movtigroup/Mirror',
    homepage: 'https://mirro.movtigroup.ir'
  },
  {
    name: 'Mirror Developer',
    uiIcon: 'code',
    description: 'Unified mirror proxy for PyPI, npm, Go modules, NuGet and Maven — speed up package managers for local teams.',
    github: 'https://github.com/movtigroup/mirror-developer'
  },
  {
    name: 'Ubuntu & Debian Mirror',
    uiIcon: 'layers',
    description: 'Smart apt mirror proxy for Ubuntu and Debian with caching and automatic upstream selection.',
    github: 'https://github.com/movtigroup/ubuntu-debian'
  },
  {
    name: 'Docker Mirror Proxy',
    brandIcon: 'github',
    description: 'Docker Hub mirror proxy for Iran — pull images without rate limits or connectivity issues.',
    github: 'https://github.com/movtigroup/mirro-docker'
  },
  {
    name: 'Core Rust VPN',
    uiIcon: 'shield',
    description: 'High-performance SSH VPN core written in Rust for fast, secure tunneling.',
    github: 'https://github.com/movtigroup/core-rust-vpn'
  }
]
</script>

<style scoped>
.projects-page {
  padding-top: 100px;
}

.projects-more {
  padding: 2rem 0 3rem;
  text-align: center;
  color: var(--text-muted);
}

.projects-more a {
  color: var(--accent);
}
</style>

<template>
  <div class="projects-page">
    <PageHero
      title="Open Source Projects"
      subtitle="Tools and frameworks built with passion — AI infrastructure, mirrors, encoding libraries and developer tooling."
      badge="9 open-source projects"
    />

    <section
      v-for="group in groups"
      :key="group.title"
      class="project-group"
    >
      <div class="container">
        <div class="group-header" v-reveal>
          <h2>{{ group.title }}</h2>
          <span class="group-count">{{ group.projects.length }}</span>
        </div>
        <div class="project-list">
          <a
            v-for="(project, i) in group.projects"
            :key="project.name"
            :href="project.github || project.homepage"
            target="_blank"
            rel="noopener"
            class="project-row card"
            v-reveal="{ delay: (i % 3) * 90 }"
          >
            <div class="project-icon">
              <BrandIcon
                v-if="project.brandIcon"
                :icon="project.brandIcon"
                :raw="project.rawIcon"
                :size="26"
              />
              <UiIcon v-else :icon="project.uiIcon" :size="26" />
            </div>
            <div class="project-main">
              <div class="project-title-row">
                <h3>{{ project.name }}</h3>
                <span class="project-category">{{ project.category }}</span>
              </div>
              <p>{{ project.description }}</p>
            </div>
            <div class="project-links" @click.prevent>
              <a
                v-if="project.homepage"
                :href="project.homepage"
                target="_blank"
                rel="noopener"
                class="row-link"
              >
                <UiIcon icon="globe" :size="15" /> Website
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="row-link primary"
              >
                <BrandIcon icon="github" :size="15" /> GitHub
              </a>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="collabs-section">
      <div class="container">
        <div class="section-header" v-reveal>
          <h2>Key Collaborations</h2>
          <p>Open-source projects and teams we build with — switch through them below.</p>
        </div>
        <CollabSlider :items="collabs" />
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

const collabs = useCollaborations()

// Grouped, ordered listing: AI & DX → Infrastructure & Mirrors → Security
const groups = [
  {
    title: 'AI & Developer Experience',
    projects: [
      {
        name: 'MovtiGroup Web',
        category: 'Website',
        brandIcon: 'github',
        description: 'This very website — a bilingual (EN/FA) Nuxt 3 site with Nuxt Content v3, full SEO, self-hosted fonts and Docker deployment.',
        github: 'https://github.com/movtigroup/movtigroup-web',
        homepage: 'https://movtigroup.me'
      },
      {
        name: 'Liara Chat Completion Proxy',
        category: 'AI Proxy',
        uiIcon: 'bot',
        description: 'Advanced proxy for AI chat-completion models with multi-model support, failover and professional features on Liara Cloud.',
        github: 'https://github.com/movtigroup/Liara_Chat_Completion_Proxy'
      },
      {
        name: 'Iran System Encoding',
        category: 'Library',
        uiIcon: 'type',
        description: 'Library for the Iran System character encoding — convert legacy Persian text for SMS and embedded systems.',
        github: 'https://github.com/movtigroup/Iran-System-encoding',
        homepage: 'https://movtigroup.github.io/Iran-System-encoding/'
      }
    ]
  },
  {
    title: 'Infrastructure & Mirrors',
    projects: [
      {
        name: 'Docker Installer',
        category: 'Docker',
        uiIcon: 'container',
        description: 'One-command Docker installation script tuned for servers in Iran, with registry mirrors baked in.',
        github: 'https://github.com/movtigroup/docker',
        homepage: 'https://install.3cn.ir'
      },
      {
        name: 'Docker Mirror Proxy',
        category: 'Docker',
        uiIcon: 'boxes',
        description: 'Docker Hub mirror proxy for Iran — pull images without rate limits or connectivity issues.',
        github: 'https://github.com/movtigroup/mirro-docker'
      },
      {
        name: 'Mirror',
        category: 'Mirror',
        uiIcon: 'globe',
        description: 'Documentation and browse mirror for 🇮🇷 — fast access to popular developer resources from inside Iran.',
        github: 'https://github.com/movtigroup/Mirror',
        homepage: 'https://mirro.movtigroup.ir'
      },
      {
        name: 'Mirror Developer',
        category: 'Mirror',
        uiIcon: 'package',
        description: 'Unified mirror proxy for PyPI, npm, Go modules, NuGet and Maven — speed up package managers for local teams.',
        github: 'https://github.com/movtigroup/mirror-developer'
      },
      {
        name: 'Ubuntu & Debian Mirror',
        category: 'Mirror',
        uiIcon: 'download-cloud',
        description: 'Smart apt mirror proxy for Ubuntu and Debian with caching and automatic upstream selection.',
        github: 'https://github.com/movtigroup/ubuntu-debian'
      }
    ]
  },
  {
    title: 'Security',
    projects: [
      {
        name: 'Core Rust VPN',
        category: 'VPN',
        uiIcon: 'shield-check',
        description: 'High-performance SSH VPN core written in Rust for fast, secure tunneling.',
        github: 'https://github.com/movtigroup/core-rust-vpn'
      }
    ]
  }
]
</script>

<style scoped>
.projects-page {
  padding-bottom: 2rem;
}

.project-group {
  padding: 1.6rem 0;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
}

.group-header h2 {
  color: var(--text-bright);
  font-size: 1.3rem;
}

.group-count {
  display: inline-grid;
  place-items: center;
  min-width: 1.7rem;
  height: 1.7rem;
  padding: 0 0.4rem;
  border-radius: 999px;
  background: rgba(108, 92, 231, 0.15);
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Clean row-based listing */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  max-width: 980px;
}

.project-row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 1.2rem;
  align-items: center;
  padding: 1.15rem 1.3rem;
  text-decoration: none;
  cursor: pointer;
}

.project-icon {
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.16));
  border: 1px solid rgba(108, 92, 231, 0.32);
  color: #a29bfe;
  transition: var(--transition);
}

.project-row:hover .project-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
}

.project-title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.project-title-row h3 {
  color: var(--text-bright);
  font-size: 1.05rem;
}

.project-category {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.16rem 0.6rem;
  border-radius: 999px;
  background: rgba(108, 92, 231, 0.14);
  border: 1px solid rgba(108, 92, 231, 0.3);
  color: #a29bfe;
}

.project-main p {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.65;
  margin-top: 0.3rem;
}

.project-links {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.row-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.85rem;
  border-radius: 9px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.82rem;
  white-space: nowrap;
  transition: var(--transition);
}

.row-link:hover {
  color: #fff;
  border-color: var(--primary);
  background: rgba(108, 92, 231, 0.2);
}

.row-link.primary {
  background: var(--gradient);
  border-color: transparent;
  color: #fff;
}

.row-link.primary:hover {
  filter: brightness(1.12);
}

/* Collaborations slider section */
.collabs-section {
  padding: 3rem 0 1rem;
}

.projects-more {
  padding: 1.5rem 0 3rem;
  text-align: center;
  color: var(--text-muted);
}

.projects-more a {
  color: var(--accent);
}

@media (max-width: 768px) {
  .project-row {
    grid-template-columns: 46px 1fr;
  }

  .project-icon {
    width: 44px;
    height: 44px;
  }

  .project-links {
    grid-column: 2;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>

<template>
  <div class="projects-page">
    <PageHero
      :title="$t('projects.heroTitle')"
      :subtitle="$t('projects.heroSubtitle')"
      :badge="$t('projects.heroBadge')"
    />

    <section
      v-for="group in groups"
      :key="group.titleKey"
      class="project-group"
    >
      <div class="container">
        <div class="group-header" v-reveal>
          <h2>{{ $t(group.titleKey) }}</h2>
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
              <p>{{ $t('projects.items.' + project.key) }}</p>
            </div>
            <div class="project-links" @click.prevent>
              <a
                v-if="project.homepage"
                :href="project.homepage"
                target="_blank"
                rel="noopener"
                class="row-link"
              >
                <UiIcon icon="globe" :size="15" /> {{ $t('projects.website') }}
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="row-link primary"
              >
                <BrandIcon icon="github" :size="15" /> {{ $t('projects.github') }}
              </a>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="collabs-section">
      <div class="container">
        <div class="section-header" v-reveal>
          <h2>{{ $t('collaborations.keyTitle') }}</h2>
          <p>{{ $t('collaborations.heroSubtitle') }}</p>
        </div>
        <CollabSlider :items="collabs" />
      </div>
    </section>

    <section class="projects-more" v-reveal>
      <div class="container">
        <p>
          {{ $t('projects.morePrefix') }}
          <a href="https://github.com/orgs/movtigroup/repositories" target="_blank" rel="noopener">GitHub</a>
          /
          <a href="https://hamgit.ir/tahavey18/MovtiGroup" target="_blank" rel="noopener">Hamgit</a>
          {{ $t('projects.moreSuffix') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('projects.heroTitle')} — MovtiGroup`,
  description: () => t('projects.heroSubtitle')
})

const collabs = useCollaborations()

// Grouped, ordered listing: AI & DX → Infrastructure & Mirrors → Security
const groups = [
  {
    titleKey: 'projects.groupAI',
    projects: [
      {
        name: 'MovtiGroup Web',
        category: 'Website',
        key: 'web',
        brandIcon: 'github',
        github: 'https://github.com/movtigroup/movtigroup-web',
        homepage: 'https://movtigroup.me'
      },
      {
        name: 'Liara Chat Completion Proxy',
        category: 'AI Proxy',
        key: 'liara',
        uiIcon: 'bot',
        github: 'https://github.com/movtigroup/Liara_Chat_Completion_Proxy'
      },
      {
        name: 'Iran System Encoding',
        category: 'Library',
        key: 'iranEncoding',
        uiIcon: 'type',
        github: 'https://github.com/movtigroup/Iran-System-encoding',
        homepage: 'https://movtigroup.github.io/Iran-System-encoding/'
      }
    ]
  },
  {
    titleKey: 'projects.groupInfra',
    projects: [
      {
        name: 'Docker Installer',
        category: 'Docker',
        key: 'dockerInstaller',
        uiIcon: 'container',
        github: 'https://github.com/movtigroup/docker',
        homepage: 'https://install.3cn.ir'
      },
      {
        name: 'Docker Mirror Proxy',
        category: 'Docker',
        key: 'dockerMirror',
        uiIcon: 'boxes',
        github: 'https://github.com/movtigroup/mirro-docker'
      },
      {
        name: 'Mirror',
        category: 'Mirror',
        key: 'mirror',
        uiIcon: 'globe',
        github: 'https://github.com/movtigroup/Mirror',
        homepage: 'https://mirro.movtigroup.ir'
      },
      {
        name: 'Mirror Developer',
        category: 'Mirror',
        key: 'mirrorDev',
        uiIcon: 'package',
        github: 'https://github.com/movtigroup/mirror-developer'
      },
      {
        name: 'Ubuntu & Debian Mirror',
        category: 'Mirror',
        key: 'ubuntuMirror',
        uiIcon: 'download-cloud',
        github: 'https://github.com/movtigroup/ubuntu-debian'
      }
    ]
  },
  {
    titleKey: 'projects.groupSec',
    projects: [
      {
        name: 'Core Rust VPN',
        category: 'VPN',
        key: 'rustVpn',
        uiIcon: 'shield-check',
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

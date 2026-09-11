<template>
  <div class="teams-page">
    <PageHero
      :title="$t('teams.title')"
      :subtitle="$t('teams.subtitle')"
      :badge="`${members.length} ${$t('teams.membersLabel')}`"
    />

    <section class="team-grid-section">
      <div class="container">
        <div class="team-grid">
          <div
            v-for="(member, index) in members"
            :key="member.name"
            class="card team-card"
            v-reveal="{ delay: index * 120 }"
          >
            <div class="member-avatar">
              <img :src="member.avatar" :alt="member.name" loading="lazy" />
            </div>
            <h3>{{ member.name }}</h3>
            <span class="role-badge" :class="member.roleClass">{{ member.role }}</span>
            <div v-if="member.socials.length" class="member-social">
              <a
                v-for="social in member.socials"
                :key="social.type"
                :href="social.url"
                target="_blank"
                rel="noopener"
                class="social-link"
                :class="social.type"
              >
                <BrandIcon :icon="social.type" :size="15" />
                {{ social.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="join-cta" v-reveal>
      <h2>{{ $t('teams.joinTitle') }}</h2>
      <p>{{ $t('teams.joinText') }}</p>
      <NuxtLink :to="localePath('/contact')" class="btn btn-primary btn-join">
        <UiIcon icon="mail" :size="16" />
        {{ $t('teams.joinCta') }}
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const members = computed(() => [
  {
    name: 'Taha Tehrani Nasab',
    avatar: '/images/team/taha-tehrani-nasab.jpg',
    role: t('teams.roles.dev'),
    roleClass: 'role-dev',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/ththt-dev' },
      { type: 'linkedin', label: t('teams.linkedin'), url: 'https://www.linkedin.com/in/taha-tehrani-nasab' }
    ]
  },
  {
    name: 'Sara Tehrani Nasab',
    avatar: '/images/team/sara-tehrani-nasab.jpg',
    role: t('teams.roles.tech'),
    roleClass: 'role-tech',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/saratehran' }
    ]
  },
  {
    name: 'Abbas Tehrani Nasab',
    avatar: '/images/team/abbas-tehrani-nasab.svg',
    role: t('teams.roles.mgmt'),
    roleClass: 'role-mgmt',
    socials: []
  },
  {
    name: 'sanaminatozak',
    avatar: '/images/team/sanaminatozak.jpg',
    role: t('teams.roles.tech'),
    roleClass: 'role-tech',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/sanaminatozak' }
    ]
  },
  {
    name: 'Agent AI',
    avatar: '/images/team/agent-ai.jpg',
    role: t('teams.roles.ai'),
    roleClass: 'role-ai',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/ththlo' }
    ]
  }
])

useSeoMeta({
  title: () => `${t('teams.title')} — MovtiGroup`,
  description: () => t('teams.subtitle'),
  ogTitle: () => t('teams.title'),
  ogDescription: () => t('teams.subtitle')
})
</script>

<style scoped>
.teams-page {
  padding-bottom: 4rem;
}

/* Grid */
.team-grid-section {
  padding: 2rem 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
}

.team-card {
  text-align: center;
  padding: 2rem 1.25rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.team-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--gradient);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.45s ease;
}

.team-card:hover::before {
  transform: scaleX(1);
}

.member-avatar {
  width: 108px;
  height: 108px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  padding: 3px;
  background: var(--gradient);
  transition: var(--transition);
}

.team-card:hover .member-avatar {
  transform: scale(1.07) rotate(2deg);
  box-shadow: 0 8px 30px rgba(108, 92, 231, 0.45);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  background: var(--bg-card-hover);
}

.team-card h3 {
  margin-bottom: 0.5rem;
  color: var(--text-bright);
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.role-badge.role-dev { background: rgba(108, 92, 231, 0.18); color: #a29bfe; }
.role-badge.role-tech { background: rgba(0, 206, 201, 0.15); color: var(--accent); }
.role-badge.role-mgmt { background: rgba(253, 121, 168, 0.15); color: #fd79a8; }
.role-badge.role-ai { background: rgba(255, 218, 121, 0.15); color: #ffda79; }

.member-social {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-primary);
  transition: var(--transition);
}

.social-link:hover {
  transform: translateY(-2px);
  color: #fff;
}

.social-link.github:hover { background: rgba(108, 92, 231, 0.25); border-color: var(--primary); }
.social-link.linkedin:hover { background: rgba(9, 132, 227, 0.25); border-color: #0984e3; }

/* Join CTA */
.join-cta {
  text-align: center;
  padding: 3.5rem 1.5rem 1rem;
}

.join-cta h2 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: var(--text-bright);
}

.join-cta p {
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto 1.5rem;
}

.btn-join {
  animation: ctaPulse 2.6s ease-in-out infinite;
}

@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.45); }
  50% { box-shadow: 0 0 0 12px rgba(108, 92, 231, 0); }
}
</style>

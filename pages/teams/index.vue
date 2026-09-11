<template>
  <div class="teams-page">
    <section class="teams-hero" v-reveal>
      <div class="teams-hero-glow" aria-hidden="true"></div>
      <h1>{{ $t('teams.title') }}</h1>
      <p>{{ $t('teams.subtitle') }}</p>
      <div class="team-count-badge">
        <span>👥</span>
        <span>{{ $t('teams.membersLabel') }}</span>
        <span class="count-num">{{ members.length }}</span>
      </div>
    </section>

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
                :key="social.label"
                :href="social.url"
                target="_blank"
                rel="noopener"
                class="social-link"
                :class="social.type"
              >
                <img :src="social.icon" :alt="social.label" width="16" height="16" />
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
        ✉️ {{ $t('teams.joinCta') }}
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const icon = (name) => `/images/icons/${name}`

const members = computed(() => [
  {
    name: 'Taha Tehrani Nasab',
    avatar: '/images/team/taha-tehrani-nasab.jpg',
    role: t('teams.roles.dev'),
    roleClass: 'role-dev',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/ththt-dev', icon: icon('github.svg') },
      { type: 'linkedin', label: t('teams.linkedin'), url: 'https://www.linkedin.com/in/taha-tehrani-nasab', icon: icon('linkedin.svg') }
    ]
  },
  {
    name: 'Sara Tehrani Nasab',
    avatar: '/images/team/sara-tehrani-nasab.jpg',
    role: t('teams.roles.tech'),
    roleClass: 'role-tech',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/saratehran', icon: icon('github.svg') }
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
      { type: 'github', label: t('teams.github'), url: 'https://github.com/sanaminatozak', icon: icon('github.svg') }
    ]
  },
  {
    name: 'Agent AI',
    avatar: '/images/team/agent-ai.jpg',
    role: t('teams.roles.ai'),
    roleClass: 'role-ai',
    socials: [
      { type: 'github', label: t('teams.github'), url: 'https://github.com/ththlo', icon: icon('github.svg') }
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
  padding-top: 120px;
  padding-bottom: 4rem;
}

/* Hero */
.teams-hero {
  position: relative;
  text-align: center;
  padding: 4rem 1.5rem 3rem;
  overflow: hidden;
}

.teams-hero-glow {
  position: absolute;
  inset: auto 0 -60% 0;
  height: 300px;
  background: radial-gradient(ellipse at center, rgba(108, 92, 231, 0.25), transparent 65%);
  animation: heroGlow 7s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes heroGlow {
  from { transform: translateY(0) scale(1); opacity: 0.7; }
  to { transform: translateY(-24px) scale(1.12); opacity: 1; }
}

.teams-hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.teams-hero p {
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto 1.5rem;
}

.team-count-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.9rem;
}

.team-count-badge .count-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  background: var(--gradient);
  color: #fff;
  font-weight: 700;
  animation: badgePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.35s;
}

@keyframes badgePop {
  from { transform: scale(0); }
  to { transform: scale(1); }
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

.social-link img { width: 16px; height: 16px; }

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

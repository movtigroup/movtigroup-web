<template>
  <div class="home-page">
    <!-- Hero Slider -->
    <section class="hero-slider">
      <div class="hero-slides">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="hero-slide"
          :class="{ active: currentSlide === index }"
        >
          <div class="hero-slide-bg"></div>
          <div class="hero-slide-content">
          <div class="hero-slide-icon">
            <UiIcon :icon="slide.icon" :size="46" />
          </div>
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.subtitle }}</p>
            <NuxtLink :to="localePath(slide.link)" class="btn btn-primary">
              {{ slide.cta }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="hero-dots">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          class="hero-dot"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
        ></button>
      </div>
    </section>

    <!-- Stats Counter -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card card" v-reveal="{ delay: 0 }">
          <div class="stat-number" data-target="160">0</div>
          <div class="stat-label">{{ $t('stats.totalPosts') }}</div>
        </div>
        <div class="stat-card card" v-reveal="{ delay: 100 }">
          <div class="stat-number" data-target="95">0</div>
          <div class="stat-label">{{ $t('stats.englishPosts') }}</div>
        </div>
        <div class="stat-card card" v-reveal="{ delay: 200 }">
          <div class="stat-number" data-target="65">0</div>
          <div class="stat-label">{{ $t('stats.farsiPosts') }}</div>
        </div>
        <div class="stat-card card" v-reveal="{ delay: 300 }">
          <div class="stat-number" data-target="5">0</div>
          <div class="stat-label">{{ $t('stats.teamMembers') }}</div>
        </div>
        <div class="stat-card card" v-reveal="{ delay: 400 }">
          <div class="stat-number" data-target="6">0</div>
          <div class="stat-label">{{ $t('stats.collaborations') }}</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <div class="section-header" v-reveal>
        <h2>{{ $t('features.title') }}</h2>
        <p>{{ $t('features.subtitle') }}</p>
      </div>
      <div class="card-grid">
        <div class="card feature-card" v-reveal="{ delay: 0 }">
          <div class="feature-icon"><UiIcon icon="zap" :size="28" /></div>
          <h3>{{ $t('features.speed.title') }}</h3>
          <p>{{ $t('features.speed.description') }}</p>
        </div>
        <div class="card feature-card" v-reveal="{ delay: 120 }">
          <div class="feature-icon"><UiIcon icon="shield" :size="28" /></div>
          <h3>{{ $t('features.security.title') }}</h3>
          <p>{{ $t('features.security.description') }}</p>
        </div>
        <div class="card feature-card" v-reveal="{ delay: 240 }">
          <div class="feature-icon"><UiIcon icon="message" :size="28" /></div>
          <h3>{{ $t('features.support.title') }}</h3>
          <p>{{ $t('features.support.description') }}</p>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="latest-posts-section">
      <div class="section-header" v-reveal>
        <h2>{{ $t('nav.blog') }}</h2>
        <p>Latest articles on technology, AI, and software engineering.</p>
      </div>
      <div class="card-grid">
        <article
          v-for="(post, index) in latestPosts"
          :key="post.path"
          class="card post-card"
          v-reveal="{ delay: (index % 3) * 120 }"
        >
          <NuxtLink :to="postLink(post)" class="post-cover" tabindex="-1" aria-hidden="true">
            <img :src="coverFor(post)" :alt="post.title" loading="lazy" width="1200" height="630" />
          </NuxtLink>
          <div class="post-card-body">
            <div class="post-card-top">
              <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
            </div>
            <h3><NuxtLink :to="postLink(post)">{{ post.title }}</NuxtLink></h3>
            <p class="post-card-desc">{{ post.description }}</p>
            <div class="post-card-footer">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <NuxtLink :to="postLink(post)" class="btn btn-primary btn-small">Read More</NuxtLink>
            </div>
          </div>
        </article>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <NuxtLink :to="localePath('/blog')" class="btn btn-primary">View All Articles</NuxtLink>
      </div>
    </section>

    <!-- Brands -->
    <section class="brands-section">
      <div class="section-header">
        <h2>{{ $t('brands.title') }}</h2>
        <p>{{ $t('brands.subtitle') }}</p>
      </div>
      <div class="card-grid" style="max-width: 700px; margin: 0 auto;">
        <div class="card brand-card" v-reveal="{ delay: 0 }">
          <div class="brand-icon"><BrandIcon icon="telegram" :size="30" /></div>
          <h3>ArmiGram</h3>
          <p>Visual Social Network</p>
        </div>
        <div class="card brand-card" v-reveal="{ delay: 120 }">
          <div class="brand-icon"><BrandIcon icon="midjourney" :size="30" /></div>
          <h3>AnimeTi</h3>
          <p>Anime & Entertainment Platform</p>
        </div>
      </div>
    </section>

    <!-- Collaborations -->
    <section class="collaborations-section">
      <div class="section-header">
        <h2>{{ $t('collaborations.title') }}</h2>
        <p>{{ $t('collaborations.subtitle') }}</p>
      </div>
      <div class="card-grid">
        <div class="card collab-card" v-reveal="{ delay: 0 }">
          <div class="collab-icon"><UiIcon icon="atom" :size="26" /></div>
          <h3>Dirac.run</h3>
          <p>AI Inference Platform - Advanced AI agent platform for automated task execution, research, and multi-step problem solving.</p>
        </div>
        <div class="card collab-card" v-reveal="{ delay: 120 }">
          <div class="collab-icon"><UiIcon icon="code" :size="26" /></div>
          <h3>Kilo Code</h3>
          <p>Open-source AI coding assistant with model routing, benchmarking, and autonomous coding capabilities.</p>
        </div>
        <div class="card collab-card" v-reveal="{ delay: 240 }">
          <div class="collab-icon"><BrandIcon icon="nousresearch" :size="26" /></div>
          <h3>Hermes Agent</h3>
          <p>Self-hosted AI agent framework with deep integration for developers and teams seeking full control.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-box" v-reveal>
        <h2>{{ $t('cta.title') }}</h2>
        <p>{{ $t('cta.subtitle') }}</p>
        <div class="cta-actions">
          <a href="https://github.com/movtigroup" target="_blank" class="btn btn-primary">
            {{ $t('cta.github') }}
          </a>
          <NuxtLink :to="localePath('/contact')" class="btn btn-secondary">
            {{ $t('cta.contact') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
const currentSlide = ref(0)

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://movtigroup.me').replace(/\/$/, '')

const slides = [
  { icon: 'rocket', title: t('hero.slide1.title'), subtitle: t('hero.slide1.subtitle'), cta: t('hero.slide1.cta'), link: '/blog' },
  { icon: 'book-open', title: t('hero.slide2.title'), subtitle: t('hero.slide2.subtitle'), cta: t('hero.slide2.cta'), link: '/blog' },
  { icon: 'layers', title: t('hero.slide3.title'), subtitle: t('hero.slide3.subtitle'), cta: t('hero.slide3.cta'), link: '/projects' }
]

const postLink = usePostLink()

// Fetch latest posts
const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog_en')
    .order('date', 'DESC')
    .limit(6)
    .all()
)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Auto-rotate slider
let sliderTimer
onMounted(() => {
  sliderTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
  initStatCounters()
})
onUnmounted(() => {
  if (sliderTimer) clearInterval(sliderTimer)
})

// Count-up animation for the stats section (fires once, even on scroll jumps)
const initStatCounters = () => {
  const numbers = document.querySelectorAll('.stat-number')
  const section = document.querySelector('.stats-section')
  if (!numbers.length || !section) return

  const fmt = (n) => n.toLocaleString(locale.value === 'fa' ? 'fa-IR' : 'en-US')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    numbers.forEach((el) => { el.textContent = el.dataset.target })
    return
  }

  const animate = (el) => {
    const target = Number(el.dataset.target || '0')
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = fmt(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  const maybeAnimate = () => {
    if (section.getBoundingClientRect().top < window.innerHeight * 0.85) {
      numbers.forEach(animate)
      window.removeEventListener('scroll', onScroll)
    }
  }
  const onScroll = () => maybeAnimate()

  window.addEventListener('scroll', onScroll, { passive: true })
  maybeAnimate()
}

useSeoMeta({
  title: 'MovtiGroup — Innovative Software Solutions & Open Source Tools',
  description: 'MovtiGroup builds innovative software solutions and open source tools for developers. Articles on AI, DevOps, and software engineering in English and Persian.',
  ogTitle: 'MovtiGroup',
  ogDescription: 'Innovative Software Solutions & Open Source Tools',
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/og-image.png`,
  twitterTitle: 'MovtiGroup',
  twitterDescription: 'Innovative Software Solutions & Open Source Tools'
})
</script>

<style scoped>
/* Hero Slider */
.hero-slider {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
}

/* Ambient floating gradient orbs */
.hero-slider::before,
.hero-slider::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.16;
  pointer-events: none;
  animation: orbFloat 14s ease-in-out infinite alternate;
}

.hero-slider::before {
  background: var(--primary);
  top: 6%;
  left: -120px;
}

.hero-slider::after {
  background: var(--accent);
  bottom: -140px;
  right: -120px;
  animation-delay: -7s;
}

@keyframes orbFloat {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(70px, -50px) scale(1.18); }
}

/* Staggered entrance for the active slide content */
.hero-slide.active .hero-slide-content > * {
  animation: heroIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-slide.active .hero-slide-content > :nth-child(1) { animation-delay: 0.05s; }
.hero-slide.active .hero-slide-content > :nth-child(2) { animation-delay: 0.18s; }
.hero-slide.active .hero-slide-content > :nth-child(3) { animation-delay: 0.31s; }
.hero-slide.active .hero-slide-content > :nth-child(4) { animation-delay: 0.44s; }

@keyframes heroIn {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.hero-slide.active .hero-slide-icon {
  animation: iconFloat 3.2s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  padding: 2rem;
}

.hero-slide.active {
  opacity: 1;
}

.hero-slide-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(108,92,231,0.15) 0%, transparent 70%);
  z-index: 0;
}

.hero-slide-content {
  position: relative;
  text-align: center;
  max-width: 700px;
  z-index: 1;
}

.hero-slide-icon {
  display: inline-grid;
  place-items: center;
  width: 92px;
  height: 92px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.25), rgba(0, 206, 201, 0.2));
  border: 1px solid rgba(108, 92, 231, 0.4);
  color: #a29bfe;
  margin-bottom: 1.5rem;
}

.hero-slide-content h2 {
  font-size: 3rem;
  color: var(--text-bright);
  margin-bottom: 1rem;
}

.hero-slide-content p {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.hero-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--text-muted);
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
}

.hero-dot.active {
  background: var(--primary);
  border-color: var(--primary);
}

/* Stats Section */
.stats-section {
  padding: 4rem 0;
  background: var(--bg-card);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Features Section */
.features-section {
  padding: 4rem 0;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  display: inline-grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(0, 206, 201, 0.18));
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.feature-card:hover .feature-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 22px rgba(108, 92, 231, 0.45);
  transform: translateY(-3px) scale(1.05);
}

.feature-card h3 {
  color: var(--text-bright);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.7;
}

/* Latest Posts */
.latest-posts-section {
  padding: 4rem 0;
  background: var(--bg-card);
}

.post-card-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.post-chip {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(108,92,231,0.2);
  color: var(--primary);
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.post-card h3 {
  margin-bottom: 0.5rem;
}

.post-card h3 a {
  color: var(--text-bright);
}

.post-card h3 a:hover {
  color: var(--primary);
}

.post-card-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-date {
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Brands */
.brands-section {
  padding: 4rem 0;
}

.brand-card {
  text-align: center;
  padding: 2rem;
}

.brand-icon {
  display: inline-grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 17px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(0, 206, 201, 0.18));
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
  margin-bottom: 1rem;
  transition: var(--transition);
}

.brand-card:hover .brand-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 22px rgba(108, 92, 231, 0.45);
  transform: translateY(-3px) scale(1.05);
}

.brand-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.brand-card p {
  color: var(--text-muted);
}

/* Collaborations */
.collaborations-section {
  padding: 4rem 0;
  background: var(--bg-card);
}

.collab-card {
  padding: 1.5rem;
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
  margin-bottom: 1rem;
  transition: var(--transition);
}

.collab-card:hover .collab-icon {
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 6px 22px rgba(108, 92, 231, 0.45);
}

.collab-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.collab-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CTA */
.cta-section {
  padding: 4rem 0;
}

.cta-box {
  background: var(--bg-card);
  padding: 3rem;
  border-radius: var(--radius);
  text-align: center;
}

.cta-box h2 {
  color: var(--text-bright);
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-box p {
  color: var(--text-muted);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-slide-content h2 {
    font-size: 2rem;
  }
  .hero-slide-content p {
    font-size: 1rem;
  }
  .stat-number {
    font-size: 2.5rem;
  }
}
</style>

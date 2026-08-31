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
            <div class="hero-slide-icon">🚀</div>
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.subtitle }}</p>
            <NuxtLink :to="slide.link" class="btn btn-primary">
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
        <div class="stat-card">
          <div class="stat-number" data-target="131">0</div>
          <div class="stat-label">{{ $t('stats.totalPosts') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="74">0</div>
          <div class="stat-label">{{ $t('stats.englishPosts') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="57">0</div>
          <div class="stat-label">{{ $t('stats.farsiPosts') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="21">0</div>
          <div class="stat-label">{{ $t('stats.categories') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" data-target="5">0</div>
          <div class="stat-label">{{ $t('stats.collaborations') }}</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <div class="section-header">
        <h2>{{ $t('features.title') }}</h2>
        <p>{{ $t('features.subtitle') }}</p>
      </div>
      <div class="card-grid">
        <div class="card feature-card">
          <div class="feature-icon">⚡</div>
          <h3>{{ $t('features.speed.title') }}</h3>
          <p>{{ $t('features.speed.description') }}</p>
        </div>
        <div class="card feature-card">
          <div class="feature-icon">🛡️</div>
          <h3>{{ $t('features.security.title') }}</h3>
          <p>{{ $t('features.security.description') }}</p>
        </div>
        <div class="card feature-card">
          <div class="feature-icon">💬</div>
          <h3>{{ $t('features.support.title') }}</h3>
          <p>{{ $t('features.support.description') }}</p>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <section class="latest-posts-section">
      <div class="section-header">
        <h2>{{ $t('nav.blog') }}</h2>
        <p>Latest articles on technology, AI, and software engineering.</p>
      </div>
      <div class="card-grid">
        <article v-for="post in latestPosts" :key="post._path" class="card post-card">
          <div class="post-card-top">
            <span class="post-chip">{{ post.lang === 'en' ? 'English' : 'فارسی' }}</span>
          </div>
          <h3><NuxtLink :to="post._path">{{ post.title }}</NuxtLink></h3>
          <p class="post-card-desc">{{ post.description }}</p>
          <div class="post-card-footer">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <NuxtLink :to="post._path" class="btn btn-primary btn-small">Read More</NuxtLink>
          </div>
        </article>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <NuxtLink to="/blog" class="btn btn-primary">View All Articles</NuxtLink>
      </div>
    </section>

    <!-- Brands -->
    <section class="brands-section">
      <div class="section-header">
        <h2>{{ $t('brands.title') }}</h2>
        <p>{{ $t('brands.subtitle') }}</p>
      </div>
      <div class="card-grid" style="max-width: 700px; margin: 0 auto;">
        <div class="card brand-card">
          <div class="brand-icon">📸</div>
          <h3>ArmiGram</h3>
          <p>Visual Social Network</p>
        </div>
        <div class="card brand-card">
          <div class="brand-icon">🎬</div>
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
        <div class="card collab-card">
          <div class="collab-icon">🧠</div>
          <h3>Dirac.run</h3>
          <p>AI Inference Platform - Advanced AI agent platform for automated task execution, research, and multi-step problem solving.</p>
        </div>
        <div class="card collab-card">
          <div class="collab-icon">💻</div>
          <h3>Kilo Code</h3>
          <p>Open-source AI coding assistant with model routing, benchmarking, and autonomous coding capabilities.</p>
        </div>
        <div class="card collab-card">
          <div class="collab-icon">🤖</div>
          <h3>Hermes Agent</h3>
          <p>Self-hosted AI agent framework with deep integration for developers and teams seeking full control.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-box">
        <h2>{{ $t('cta.title') }}</h2>
        <p>{{ $t('cta.subtitle') }}</p>
        <div class="cta-actions">
          <a href="https://github.com/movtigroup" target="_blank" class="btn btn-primary">
            {{ $t('cta.github') }}
          </a>
          <NuxtLink to="/contact" class="btn btn-secondary">
            {{ $t('cta.contact') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const currentSlide = ref(0)

const slides = [
  { title: t('hero.slide1.title'), subtitle: t('hero.slide1.subtitle'), cta: t('hero.slide1.cta'), link: '/blog' },
  { title: t('hero.slide2.title'), subtitle: t('hero.slide2.subtitle'), cta: t('hero.slide2.cta'), link: '/blog' },
  { title: t('hero.slide3.title'), subtitle: t('hero.slide3.subtitle'), cta: t('hero.slide3.cta'), link: '/projects' }
]

// Fetch latest posts
const { data: latestPosts } = await useAsyncData('latest-posts', () => 
  queryContent('en')
    .sort({ date: -1 })
    .limit(6)
    .find()
)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Auto-rotate slider
onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
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
  font-size: 4rem;
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
  font-size: 3rem;
  margin-bottom: 1rem;
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

.post-card {
  padding: 1.5rem;
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
  font-size: 4rem;
  margin-bottom: 1rem;
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
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

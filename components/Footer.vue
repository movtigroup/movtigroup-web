<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3 class="footer-logo">
            <img src="/images/logo.png" alt="MovtiGroup logo" class="footer-logo-img" width="30" height="30" />
            MovtiGroup
          </h3>
          <p>{{ $t('footer.madeWith') }}</p>
        </div>
        <div class="footer-links">
          <h4>{{ $t('nav.home') }}</h4>
          <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/projects')">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink :to="localePath('/teams')">{{ $t('nav.teams') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')">{{ $t('nav.about') }}</NuxtLink>
        </div>
        <div class="footer-social">
          <h4>Social</h4>
          <a href="https://github.com/movtigroup" target="_blank" rel="noopener">
            <BrandIcon icon="github" :size="16" /> GitHub
          </a>
          <a href="https://www.linkedin.com/company/movtigroup/" target="_blank" rel="noopener">
            <BrandIcon icon="linkedin" :size="15" /> LinkedIn
          </a>
          <a href="https://hamgit.ir/tahavey18/MovtiGroup" target="_blank" rel="noopener">
            <UiIcon icon="git-branch" :size="15" /> Hamgit
          </a>
          <a href="https://x.com/movtigroup" target="_blank" rel="noopener">
            <BrandIcon icon="x" :size="14" /> X (Twitter)
          </a>
          <a href="mailto:info@movtigroup.me">
            <UiIcon icon="mail" :size="15" /> Email
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} MovtiGroup. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const localePath = useLocalePath()
</script>

<style scoped>
.footer {
  background: var(--bg-card);
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer h3 {
  color: var(--text-bright);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.footer h4 {
  color: var(--text-bright);
  margin-bottom: 1rem;
}

.footer a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  color: var(--text-muted);
  padding: 0.3rem 0;
  transition: var(--transition);
}

.footer a:hover {
  color: var(--accent);
  transform: translateX(2px);
}

[dir='rtl'] .footer a:hover {
  transform: translateX(-2px);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.footer-logo-img {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(108, 92, 231, 0.35);
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
}
</style>

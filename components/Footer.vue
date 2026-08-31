<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>MovtiGroup</h3>
          <p>{{ $t('footer.madeWith') }}</p>
        </div>
        <div class="footer-links">
          <h4>{{ $t('nav.home') }}</h4>
          <NuxtLink to="/blog">{{ $t('nav.blog') }}</NuxtLink>
          <NuxtLink to="/projects">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink to="/about">{{ $t('nav.about') }}</NuxtLink>
        </div>
        <div class="footer-social">
          <h4>Social</h4>
          <a href="https://github.com/movtigroup" target="_blank">GitHub</a>
          <a href="https://twitter.com/movtigroup" target="_blank">Twitter</a>
          <a href="mailto:info@movtigroup.me">Email</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} MovtiGroup. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

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
  display: block;
  color: var(--text-muted);
  padding: 0.3rem 0;
}

.footer a:hover {
  color: var(--accent);
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
}
</style>

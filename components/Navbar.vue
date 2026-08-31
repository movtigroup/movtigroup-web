<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-container">
      <NuxtLink to="/" class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">MovtiGroup</span>
      </NuxtLink>
      
      <nav class="nav-links" :class="{ active: mobileMenuOpen }">
        <NuxtLink to="/" class="nav-link">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink to="/blog" class="nav-link">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink to="/projects" class="nav-link">{{ $t('nav.projects') }}</NuxtLink>
        <NuxtLink to="/about" class="nav-link">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">{{ $t('nav.contact') }}</NuxtLink>
      </nav>
      
      <div class="nav-actions">
        <div class="lang-switcher">
          <button 
            v-for="locale in $i18n.locales" 
            :key="locale.code"
            class="lang-btn"
            :class="{ active: $i18n.locale === locale.code }"
            @click="setLocale(locale.code)"
          >
            {{ locale.code.toUpperCase() }}
          </button>
        </div>
        <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: var(--transition);
  background: transparent;
}

.navbar.scrolled {
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem 0;
  box-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-bright);
}

.logo:hover {
  color: var(--text-bright);
}

.logo-icon {
  font-size: 1.6rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-primary);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient);
  transition: var(--transition);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-bright);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switcher {
  display: flex;
  gap: 0.25rem;
  background: var(--bg-card);
  padding: 0.25rem;
  border-radius: 8px;
}

.lang-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: var(--transition);
}

.lang-btn.active {
  background: var(--primary);
  color: white;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-toggle span {
  width: 25px;
  height: 2px;
  background: var(--text-bright);
  transition: var(--transition);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--bg-dark);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }
  
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .mobile-toggle {
    display: flex;
  }
}
</style>

<template>
  <div class="error-page" :dir="isFa ? 'rtl' : 'ltr'">
    <div class="error-bg" aria-hidden="true"></div>
    <div class="container error-inner">
      <p class="error-code">{{ error?.statusCode || 500 }}</p>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-text">{{ description }}</p>
      <div class="error-actions">
        <button class="btn btn-primary" @click="goHome">
          {{ isFa ? 'بازگشت به خانه' : 'Back to Home' }}
        </button>
        <NuxtLink :to="blogLink" class="btn btn-secondary">
          {{ isFa ? 'مشاهده بلاگ' : 'Browse the Blog' }}
        </NuxtLink>
      </div>
      <p class="error-hint">
        {{ isFa
          ? 'MovtiGroup — وب‌سایت دوزبانه؛ نسخه فارسی و انگلیسی در دسترس است.'
          : 'MovtiGroup — bilingual website; Persian and English versions are available.' }}
      </p>
    </div>
  </div>
</template>

<script setup>
// Locale-aware error page (404 / 500 / 502 / …) for both EN and FA.
// Locale detection order (works even during hard failures):
//   1. the URL recorded on the error object
//   2. the live request URL
//   3. the i18n locale cookie
const props = defineProps({
  error: { type: Object, default: () => ({}) }
})

const errUrl = String(props.error?.url || '')
const reqUrl = useRequestURL()
const isFa = ref(/\/fa(\/|$|\?)/.test(errUrl))

try {
  if (!isFa.value) isFa.value = useRequestURL().pathname.startsWith('/fa')
} catch { /* not in request context */ }
try {
  if (!isFa.value) isFa.value = useCookie('i18n_redirected').value === 'fa'
} catch { /* no app context */ }

const code = computed(() => Number(props.error?.statusCode) || 500)

const title = computed(() => {
  const fa = isFa.value
  switch (code.value) {
    case 404: return fa ? 'صفحه پیدا نشد' : 'Page not found'
    case 500: return fa ? 'خطای سرور' : 'Server error'
    case 502: return fa ? 'خطای درگاه' : 'Bad gateway'
    case 403: return fa ? 'دسترسی مجاز نیست' : 'Access denied'
    default: return fa ? 'مشکلی پیش آمد' : 'Something went wrong'
  }
})

const description = computed(() => {
  const fa = isFa.value
  switch (code.value) {
    case 404: return fa
      ? 'صفحه‌ای که دنبالش بودید وجود ندارد یا جابه‌جا شده است.'
      : 'The page you are looking for does not exist or has been moved.'
    case 500: return fa
      ? 'خطایی در سرور رخ داد. لطفاً کمی بعد دوباره تلاش کنید.'
      : 'An unexpected error occurred on our side. Please try again shortly.'
    case 502: return fa
      ? 'سرور موقتاً در دسترس نیست. لطفاً کمی بعد دوباره تلاش کنید.'
      : 'The server is temporarily unreachable. Please try again shortly.'
    default: return fa
      ? 'خطایی رخ داد. لطفاً دوباره تلاش کنید.'
      : 'An error occurred. Please try again.'
  }
})

const blogLink = computed(() => (isFa.value ? '/fa/blog' : '/blog'))

const goHome = () => clearError({ redirect: isFa.value ? '/fa' : '/' })
</script>

<style scoped>
.error-page {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--bg-dark);
  overflow: hidden;
}

.error-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(600px 300px at 50% 20%, rgba(108, 92, 231, 0.25), transparent 70%),
    radial-gradient(500px 260px at 80% 80%, rgba(0, 206, 201, 0.15), transparent 70%);
}

.error-inner {
  position: relative;
  text-align: center;
  padding: 2rem 1.5rem;
}

.error-code {
  font-size: clamp(5rem, 16vw, 9rem);
  font-weight: 800;
  line-height: 1;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem;
}

.error-title {
  color: var(--text-bright);
  font-size: clamp(1.5rem, 5vw, 2.2rem);
  margin-bottom: 0.9rem;
}

.error-text {
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 auto 2rem;
  line-height: 1.8;
}

.error-actions {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.error-hint {
  color: var(--text-muted);
  font-size: 0.82rem;
  opacity: 0.7;
}
</style>

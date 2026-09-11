<template>
  <div
    class="collab-slider"
    role="region"
    aria-roledescription="carousel"
    aria-label="Key collaborations"
    @mouseenter="pause = true"
    @mouseleave="pause = false"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="slider-viewport" dir="ltr">
      <div class="slider-track" :style="{ transform: `translateX(-${index * 100}%)` }">
        <div
          v-for="(collab, i) in items"
          :key="collab.name"
          class="slide"
          :aria-hidden="i !== index"
        >
          <div class="slide-card card" v-reveal>
            <div class="collab-icon">
              <BrandIcon
                v-if="collab.icon.kind === 'brand'"
                :icon="collab.icon.value"
                :raw="collab.icon.raw"
                :size="30"
              />
              <UiIcon v-else :icon="collab.icon.value" :size="28" />
            </div>
            <div class="slide-body">
              <div class="slide-title-row">
                <h3>{{ collab.name }}</h3>
                <span class="collab-tag">{{ collab.tag }}</span>
              </div>
              <p>{{ collab.description }}</p>
              <a :href="collab.url" target="_blank" rel="noopener" class="btn btn-primary btn-small slide-link">
                <BrandIcon icon="github" :size="14" />
                View on GitHub
                <UiIcon icon="arrow-right" :size="13" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slider-controls" dir="ltr">
      <button class="slider-btn" aria-label="Previous" @click="go(index - 1)">
        <UiIcon icon="chevron-left" :size="18" />
      </button>
      <div class="slider-dots">
        <button
          v-for="(collab, i) in items"
          :key="i"
          class="slider-dot"
          :class="{ active: i === index }"
          :aria-label="`Go to ${collab.name}`"
          @click="go(i)"
        ></button>
      </div>
      <button class="slider-btn" aria-label="Next" @click="go(index + 1)">
        <UiIcon icon="chevron-right" :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true }
})

const index = ref(0)
const pause = ref(false)
let timer

const go = (i) => {
  const n = props.items.length
  index.value = ((i % n) + n) % n
}

const restart = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    if (!pause.value && document.visibilityState === 'visible') go(index.value + 1)
  }, 6000)
}

// touch swipe
let touchX = null
const onTouchStart = (e) => { touchX = e.changedTouches?.[0]?.clientX ?? null }
const onTouchEnd = (e) => {
  if (touchX === null) return
  const dx = (e.changedTouches?.[0]?.clientX ?? 0) - touchX
  if (Math.abs(dx) > 48) go(index.value + (dx < 0 ? 1 : -1))
  touchX = null
}

onMounted(() => restart())
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.collab-slider {
  max-width: 860px;
  margin: 0 auto;
}

.slider-viewport {
  overflow: hidden;
  border-radius: var(--radius);
}

.slider-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide {
  flex: 0 0 100%;
  min-width: 100%;
  padding: 4px;
}

.slide-card {
  display: flex;
  gap: 1.4rem;
  align-items: flex-start;
  padding: 1.8rem;
  min-height: 200px;
}

.collab-icon {
  display: inline-grid;
  place-items: center;
  width: 62px;
  height: 62px;
  flex: none;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(0, 206, 201, 0.18));
  border: 1px solid rgba(108, 92, 231, 0.35);
  color: #a29bfe;
}

.slide-body {
  flex: 1;
}

.slide-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.slide-title-row h3 {
  color: var(--text-bright);
  font-size: 1.15rem;
}

.collab-tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(0, 206, 201, 0.12);
  border: 1px solid rgba(0, 206, 201, 0.3);
  color: var(--accent);
}

.slide-body p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.slide-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.1rem;
}

.slider-btn {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
}

.slider-btn:hover {
  border-color: var(--primary);
  color: #fff;
  background: var(--primary);
  transform: translateY(-1px);
}

.slider-dots {
  display: flex;
  gap: 0.5rem;
}

.slider-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: none;
  background: var(--bg-card-hover);
  border: 1px solid var(--border);
  cursor: pointer;
  padding: 0;
  transition: var(--transition);
}

.slider-dot.active {
  width: 26px;
  background: var(--gradient);
  border-color: transparent;
}

@media (max-width: 640px) {
  .slide-card {
    flex-direction: column;
    padding: 1.3rem;
    min-height: 0;
  }
}
</style>
